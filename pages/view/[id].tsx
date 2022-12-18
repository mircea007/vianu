import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'

import { Header } from '../../components/Header' // .tsx
import User from '../../components/User' // .tsx
import { getSubData } from '../api/view' // .ts
import { Table } from '../../components/Table' // .tsx

interface PageProps {
  subdatastr: string
}

const Home: NextPage<PageProps> = ({ subdatastr }) => {
  const subdata = JSON.parse( subdatastr )[0]

  const points2col = (points: number) => {
    if( !points )
      return 'text-red-600'

    if( points == 100 )
      return 'text-green-600'

    if( points >= 50 )
      return 'text-yellow-600'

    return 'text-red-600'
  }

  return (
    <div>
      <Head>
        <title>VianuArena *</title>
      </Head>

      <Header/>
      <main className="w-full p-8 flex flex-col gap-2">
        <h1 className="text-5xl mb-12">Raport Submisia #{subdata.id}</h1>
        <div className="grid grid-cols-4 divide-y text-center">
          <div className="hidden" />
          <span>{(new Date(+subdata.sdate)).toLocaleString( 'ro-RO' )}</span>
          <div> problema <Link href={"/problema/" + subdata.pbname}>{subdata.pbtitle}</Link> </div>
          <User uname={subdata.uname} className="place-content-center"/>
          <span>vezi sursa</span>
          <span className={points2col( subdata.points )}>{subdata.verdict}</span>
          <span>{subdata.points} puncte</span>
          <span>timp: {subdata.time}ms</span>
          <span>memorie: {subdata.memory}kb</span>
        </div>
        <hr className="mb-4"/>

        <h2 className="text-3xl mb-2">Raport Evaluator</h2>
        <Table data={subdata.tests.map((row) => [
          (<span className={row.verdict == 'Accepted' ? 'text-green-600' : 'text-red-600'}>{row.verdict}</span>),
          row.points,
          row.time + 'ms',
          row.memory + 'kb'
        ])} header={['Raport', 'Puncte', 'Timp', 'Memorie']} addIndexes={true} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const data = await getSubData( ctx.query.id as number );

  if( !data.length )
    return { notFound: true }

  return { props: {
    subdatastr: JSON.stringify( data )
  } }
}

export default Home
