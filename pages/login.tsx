import Head from 'next/head'
//import Image from 'next/image'

export default function Home() {
  var gigel = "geaigel";

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <main>
        <h1 className="text-3xl">Vianu Arena (*)</h1>
        <div>Your are logged in as {gigel}</div>
        <div>
          Problem list:
          <table>
          <tr><th>Problem ID</th><th>Source</th><th>Solves</th></tr>
          <tr><td>a</td><td>a</td><td>a</td></tr>
          <tr><td>a</td><td>a</td><td>a</td></tr>
          <tr><td>a</td><td>a</td><td>a</td></tr>
          <tr><td>a</td><td>a</td><td>a</td></tr>
          </table>
        </div>
      </main>
    </div>
  )
}
