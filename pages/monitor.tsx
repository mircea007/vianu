import Head from 'next/head'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import Header from '../components/Header' // .tsx
import Table from '../components/Table' // .tsx
import { getMonitor } from './api/monitor' // .ts
import User from '../components/User' // .tsx

interface SubData {
  id: number,
  uname: string
  problem: string
  sdate: number
  points: number
  verdict: string
  time: number
  memory: number
}

interface PageProps {
  tdata_string: string
}

const Home: NextPage<PageProps> = ({ tdata_string }) => {
  const getCol = ( points: number, verdict: string ) => {
    if( verdict == 'Evaluating...' )
      return 'text-gray-400'

    if( !points )
      return 'text-red-600'

    if( points == 100 )
      return 'text-green-600'

    if( points >= 50 )
      return 'text-yellow-600'

    return 'text-red-600'
  }

  const tdata = JSON.parse( tdata_string ).map( (row: SubData, idx: number) => [
    '#' + row.id, // in viitor aici va fi un link
    (<User key={0} uname={row.uname}/>),
    (<Link key={1} href={"/problema/" + row.problem}>{row.problem}</Link>),
    (new Date(+row.sdate)).toLocaleString( 'ro-RO' ),
    (<Link key={2} href={"/view/" + row.id} className={'subtle ' + getCol( row.points, row.verdict )}>{row.verdict + ': ' + row.points + 'p'}</Link>),
    row.time + 'ms',
    row.memory + 'kb'
  ])

  return (
    <div>
      <Head>
        <title>VianuArena *</title>
      </Head>

      <Header/>
      <main className="w-full p-8 flex flex-col gap-2">
        <span className="text-2xl">Monitorul de evaluare</span>
        <hr />
        <Table
          className="w-full" 
          addIndexes={false}
          header={[ 'Id', 'Utilizator', 'Problema', 'Timp trimitere', 'Raport', 'Timp', 'Memorie' ]}
          data={tdata}
        />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const data = await getMonitor( ctx.query.pb as string )

  return { props: {
    tdata_string: JSON.stringify( data )
  } }
}

export default Home
