import Head from 'next/head'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { Header } from '../../components/Header' // .tsx
import { getUserData } from '../api/getuser' // .ts

interface PageProps {
  userdatastr: string
}

const Home: NextPage<PageProps> = ({ userdatastr }) => {
  const userdata = JSON.parse( userdatastr )[0]

  return (
    <div>
      <Head>
        <title>VianuArena *</title>
      </Head>

      <Header/>
      <main className="w-full p-8 flex flex-col gap-2">
        <h1 className="text-5xl mb-4">{userdata.name}</h1>
        Registered {Math.round((+(new Date()) - userdata.rdate) / 3600000)} hours ago
        <hr />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const data = await getUserData( ctx.query.user as string );

  if( !data.length )
    return { notFound: true }

  return { props: {
    userdatastr: JSON.stringify( data )
  } }
}

export default Home
