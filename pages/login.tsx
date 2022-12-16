import Head from 'next/head'
import { useState, useEffect } from 'react'
import { InputField, SubmitButton } from '../components/Forms' // .tsx
import { Header } from '../components/Header' // .tsx
import { useRouter } from 'next/router'
import { getToken, setToken } from '../components/JWT' // .ts

export default function Home() {
  const [uname, setUname] = useState( { value: '', comment: '' } )
  const [pass, setPass] = useState( { value: '', comment: '' } )
  const [loading, setLoading] = useState( false )

  const router = useRouter()

  const submit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if( !uname.value ){
      setUname( { value: '', comment: 'You must choose a username' } )
      return
    }

    if( !pass.value ){
      setPass( { value: '', comment: 'You must choose a password' } )
      return
    }

    const userData = {
      name: uname.value,
      pass: pass.value,
    }

    setLoading( true )

    const response = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify( userData ),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      }
    })

    const json_response = await response.json()

    if( response.status == 400 ){
      if( json_response.error == 'No user with that name' )
        setUname( { value: '', comment: 'Username does not exist' } )
      else if( json_response.error == 'Password incorect' )
        setPass( { value: '', comment: 'Password incorect' } )
    }else if( response.status == 200 ){
      setToken( json_response.token )
      router.push( '/' )
    }

    setLoading( false )
  }

  return (
    <div>
      <Head>
        <title>Log In</title>
      </Head>

      <Header className="fixed top-0"/>
      <main className = "w-full h-screen flex justify-center items-center">
        <form onSubmit={submit} className="flex flex-col items-center bg-main-50 p-6 gap-2 rounded-xl m-16 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h2 className="text-5xl text-main-500 mb-2">Log In</h2>
          <hr className="border-main-500 w-full border-1"/>
          <InputField
            type="text"
            label="Username"
            value={uname.value}
            onChange={ (evt: React.ChangeEvent<HTMLInputElement>) => setUname( { value: evt.target.value, comment: '' } ) }
            comment={uname.comment}
            placeholder="Your nickname"
          />
          <InputField
            type="password"
            label="Password"
            value={pass.value}
            onChange={ (evt: React.ChangeEvent<HTMLInputElement>) => {
              setPass( { value: evt.target.value, comment: '' } )
            } }
            comment={pass.comment}
            placeholder="Secure password"
          />
          <SubmitButton value="Log in" disabled={loading}/>
        </form>
      </main>
    </div>
  )
}
