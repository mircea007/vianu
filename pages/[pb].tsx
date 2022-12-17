import Head from 'next/head'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'

import { Header } from '../components/Header' // .tsx

interface PageProps {}

const Home: NextPage<PageProps> = ({  }) => {
  return (
    <div>
      <Head>
        <title>VianuArena *</title>
      </Head>

      <Header/>
      <main className="w-full p-8 flex flex-col gap-2">
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {

  return { props: {
  } }
}

export default Home
