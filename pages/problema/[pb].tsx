import Head from 'next/head'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { Header } from '../../components/Header' // .tsx
import { getPbData } from '../api/getpb' // .ts

import User from '../../components/User' // .tsx

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
        <h1 className="text-5xl mb-4">{pbdata.title}</h1>
        <hr />
        <div className="flex flex-row gap-2 w-full justify-between">
          <span> autori: {pbdata.authors} </span>
          <span> sursa: {pbdata.source} </span>
          <span className="flex flex-row gap-2"> adaugata de: <User uname={pbdata.contrib} /> </span>
          <span> rezolvata de {pbdata.solves} </span>
        </div>
        <hr className="mb-4"/>
        <div dangerouslySetInnerHTML={{__html: pbdata.statement}} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const data = await getPbData( ctx.query.pb as string );

  if( !data.length )
    return { notFound: true }

  return { props: {
    pbdatastr: JSON.stringify( data )
  } }
}

export default Home
