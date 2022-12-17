import Head from 'next/head'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { Header } from '../../components/Header' // .tsx
import { getPbData } from '.././api/getpb' // .ts

interface PageProps {
  pbdatastr: string
}

const Home: NextPage<PageProps> = ({ pbdatastr }) => {
  const pbdata = JSON.parse( pbdatastr )[0]

  return (
    <div>
      <Head>
        <title>VianuArena *</title>
      </Head>

      <Header/>
      <main className="w-full p-8 flex flex-col gap-2">
        Problema {pbdata.title} <br />
        scrisa de {pbdata.authors} <br />
        sursa {pbdata.source} <br />
        adaugata de {pbdata.contrib} <br />
        si rezolvata de {pbdata.solves} <br />
        <hr />
        <div dangerouslySetInnerHTML={{__html: pbdata.statement}} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const data = await getPbData( ctx.query.pb );

  return { props: {
    pbdatastr: JSON.stringify( data )
  } }
}

export default Home
