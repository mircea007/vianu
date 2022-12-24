import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'

import Header from '../../components/Header' // .tsx
import User from '../../components/User' // .tsx
import { getSubData } from '../api/view' // .ts
import Table from '../../components/Table' // .tsx

interface PageProps {
  subdatastr: string
}

interface TestType {
  verdict: string
  points: number
  time: number
  memory: number
}

const Home: NextPage<PageProps> = ({ subdatastr }) => {
  const subdata = JSON.parse( subdatastr )[0]

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
          <span className={getCol( subdata.points, subdata.verdict )}>{subdata.verdict}</span>
          <span>{subdata.points} puncte</span>
          <span>timp: {subdata.time}ms</span>
          <span>memorie: {subdata.memory}kb</span>
        </div>
        <hr className="mb-4"/>

        <h2 className="text-3xl mb-2">Raport Evaluator</h2>
        {subdata.tests.error ?
        (<span className="text-xl text-red-600">{subdata.tests.error}</span>) :
        (<Table data={subdata.tests.map((row: TestType) => [
          (<span key={0} className={row.verdict == 'Accepted' ? 'text-green-600' : 'text-red-600'}>{row.verdict}</span>),
          row.points,
          row.time + 'ms',
          row.memory + 'kb'
        ])} header={['Raport', 'Puncte', 'Timp', 'Memorie']} addIndexes={true} />)}
        <h2 className="text-3xl mb-2">Sursa</h2>
        {subdata.source ? (
          <pre>
            <table className="w-full">
              <tbody>
                <tr><th className="w-4"></th><th></th></tr>
                {subdata.source.split(/\r?\n/).map( (line, idx) => (
                  <tr key={idx}><td className="select-none text-right">{idx + 1}</td><td className="pl-4">{line}</td></tr>
                ) )}
              </tbody>
            </table>
          </pre>
        ) : (
          <span className="text-red-600">Eroare in gasirea sursei</span>
        )}
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const data = await getSubData( +(ctx.query.id as string) );

  if( !data.length )
    return { notFound: true }

  return { props: {
    subdatastr: JSON.stringify( data )
  } }
}

export default Home
