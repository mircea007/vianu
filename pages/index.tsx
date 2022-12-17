import Head from 'next/head'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { Header } from '../components/Header' // .tsx
import { Table } from '../components/Table' // .tsx
import { getPbPage } from './api/pblist' // .ts

interface PbData {
  id?: number
  name: string
  title: string
  source: string
  authors: string
  contrib?: string
  solves: number
}

interface PageProps {
  tdata_string: string;
}

const Home: NextPage<PageProps> = ({ tdata_string }) => {
  const tdata = JSON.parse( tdata_string ).map( (row: PbData, idx: number) => [
    (<Link href={"/problema/" + row.name} key={idx}>{row.title}</Link>),
    row.source,
    row.authors,
    row.solves,
  ])

  return (
    <div>
      <Head>
        <title>VianuArena *</title>
      </Head>

      <Header/>
      <main className="w-full p-8 flex flex-col gap-2">
        <span className="text-2xl">Arhiva de probleme</span>
        <hr />
        <Table
          className="w-full" 
          addIndexes={true}
          header={[ 'Problema', 'Sursa', 'Autori', 'Rezolvata de' ]}
          data={tdata}
        />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const data = await getPbPage( 0 )

  return { props: {
    tdata_string: JSON.stringify( data )
  } }
}

export default Home
