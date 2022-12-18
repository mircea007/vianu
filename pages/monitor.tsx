import Head from 'next/head'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { Header } from '../components/Header' // .tsx
import { Table } from '../components/Table' // .tsx
import { getMonitor } from './api/monitor' // .ts
import User from '../components/User' // .tsx

interface SubData {
}

interface PageProps {
  tdata_string: string
}

const Home: NextPage<PageProps> = ({ tdata_string }) => {
  const tdata = JSON.parse( tdata_string ).map( (row: SubData, idx: number) => [
    row.id, // in viitor aici va fi un link
    (<User uname={row.uname}/>),
    (<Link href={"/problema/" + row.problem}>{row.problem}</Link>),
    (new Date()).toLocaleString( 'ro-RO' ),
    row.verdict + (row.poins != null ? (': ' + row.points) : '')
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
          header={[ 'Id', 'Utilizator', 'Problema', 'Timp trimitere', 'Raport' ]}
          data={tdata}
        />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const data = await getMonitor( ctx.query.pb )

  return { props: {
    tdata_string: JSON.stringify( data )
  } }
}

export default Home
