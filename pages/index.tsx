import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  var gigel = "geaigel";

  return (
    <div>
      <Head>
        <title>Vianu Arena (*)</title>
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

      <footer className="w-full p-2 bg-gray-500 text-white">
        Made with love by Mircea Rebengiuc. <a href="https://github.com/mircea007/vianu">contribute!</a>
      </footer>
    </div>
  )
}
