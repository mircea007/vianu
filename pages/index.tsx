import Head from 'next/head'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'

import { Header } from '../components/Header' // .tsx
import { Table } from '../components/Table' // .tsx
import { getPbPage } from './api/pblist' // .ts


interface PbData {
  id: number
  name: string
  source: string
  author?: string
  contributor?: string
  solves: number
}

interface PageProps {
  tdata_string: string;
}

const table_head = [
  { prop: 'name', name: 'Problema' },
  { prop: 'source', name: 'Sursa' },
  { prop: 'author', name: 'Autor' },
  { prop: 'contributor', name: 'Adaugata de' },
  { prop: 'solves', name: 'Rezolvata de' }
];

const Home: NextPage<PageProps> = ({ tdata_string }) => {
  return (
    <div>
      <Head>
        <title>VianuArena *</title>
      </Head>

      <Header/>
      <main className="w-full p-8 flex flex-col gap-2">
        <span className="text-2xl">Arhiva de probleme</span>
        <hr />
        <Table<PbData>
          data={ JSON.parse( tdata_string ) }
          header={ table_head }
          className="w-full" 
          addIndexes={true}
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
