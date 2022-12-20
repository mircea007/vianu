import Head from 'next/head'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

import Header from '../../components/Header' // .tsx
import { getPbData } from '../api/getpb' // .ts

import User from '../../components/User' // .tsx
import { SubmitButton } from '../../components/Forms' // .tsx

interface PageProps {
  pbdatastr: string
}



const Home: NextPage<PageProps> = ({ pbdatastr }) => {
  const router = useRouter()
  const pbdata = JSON.parse(pbdatastr)[0]

  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault()

    setLoading(true)

    const response = await fetch("/api/submit", {
      method: "post",
      body: JSON.stringify({ pbname: pbdata.name }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      }
    })

    const json_response = await response.json()

    if (response.status == 200) {
      router.push('/monitor?pb=' + pbdata.name)
    } else if (response.status == 400 && json_response.error == 'Not logged in') {
      setErr('Not logged in!')
    } else { // 500
      setErr('Server error!')
    }

    setLoading(false)
  }

  return (
    <div>
      <Head>
        <title>VianuArena *</title>
      </Head>

      <Header />

      <main className="w-full p-8 flex flex-col gap-2">
        <div className="w-full flex flex-row justify-between items-end">
          <h1 className="text-5xl mb-4">{pbdata.title}</h1>
          <div className="text-lg">
            <Link href={"/monitor?pb=" + pbdata.name}>vezi solutiile trimise</Link>
          </div>
        </div>
        <hr />
        <div className="flex flex-row gap-2 w-full justify-between">
          <span> autori: {pbdata.authors} </span>
          <span> sursa: {pbdata.source} </span>
          <span className="flex flex-row gap-2"> adaugata de: <User uname={pbdata.contrib} /> </span>
          <span> rezolvata de {pbdata.solves} </span>
        </div>
        <hr className="mb-4" />
        <div dangerouslySetInnerHTML={{ __html: pbdata.statement }} />
        <hr className="mt-4" />
        <form onSubmit={submit}>
          <SubmitButton message="Sursa ta este in curs de evaluare. Te rugam sa astepti cateva momente!" value="trimite" disabled={loading} />
        </form>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const pbname = ctx.query.pb as string
  const data = await getPbData(pbname)

  if (!data.length)
    return { notFound: true }

  return {
    props: {
      pbdatastr: JSON.stringify(data)
    }
  }
}

export default Home
