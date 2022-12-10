import Head from 'next/head'
import { useState, useEffect } from 'react'
import { InputField, SubmitButton } from '../components/Forms.tsx'
import { Header } from '../components/Header.tsx'

const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/

export default function Home() {
  const [uname, setUname] = useState( { value: '', comment: '' } )
  const [pass, setPass] = useState( { value: '', comment: '' } )
  const [conf, setConf] = useState( { value: '', comment: '' } )
  const [email, setEmail] = useState( { value: '', comment: '' } )

  const submit = async (evt) => {
    evt.preventDefault()

    if( !uname.value ){
      setUname( { value: '', comment: 'You must choose a username' } )
      return
    }

    if( !pass.value ){
      setPass( { value: '', comment: 'You must choose a password' } )
      return
    }

    if( pass.value.length <= 6 ){
      setPass( { value: pass.value, comment: 'Password too short!' } )
      setConf( { value: '', comment: '' } )
      return
    }

    if( conf.value != pass.value ){
      setConf( { value: '', comment: 'Passwords do not match!' } )
      return
    }

    if( !regex.test( email.value ) ){
      setEmail( { value: '', comment: 'Enter a valid email!' } )
      return
    }

    const userData = {
      name: uname.value,
      pass: pass.value,
      email: email.value
    }

    //console.log( uname.value + ' ' + pass.value + ' ' + conf.value + ' ' + email.value );

    const response = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify( userData ),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      }
    })

    const json_response = await response.text()

    if( response.status == 400 )
      if( json_response == 'User already exists' )
        setUname( { value: '', comment: 'Username taken' } )
  }

  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>

      <Header className="fixed top-0"/>
      <main className = "w-full h-screen flex justify-center items-center">
        <form onSubmit={submit} className="flex flex-col items-center bg-main-50 p-6 gap-2 rounded-xl m-16 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h2 className="text-5xl text-main-500 mb-2">Register</h2>
          <hr className="border-main-500 w-full border-1"/>
          <InputField
            type="text"
            label="Username"
            value={uname.value}
            onChange={ evt => setUname( { value: evt.target.value, comment: '' } ) }
            comment={uname.comment}
            placeholder="Your nickname"
          />
          <InputField
            type="password"
            label="Password"
            value={pass.value}
            onChange={ evt => {
              setPass( { value: evt.target.value, comment: '' } )
              setConf( { value: '', comment: '' } )
            } }
            comment={pass.comment}
            placeholder="Secure password"
          />
          <InputField
            type="password"
            label="Confirm"
            value={conf.value}
            onChange={ evt => setConf( { value: evt.target.value, comment: '' } ) }
            comment={conf.comment}
            placeholder="Confirm password"
          />
          <InputField
            type="email"
            label="Email"
            value={email.value}
            onChange={ evt => setEmail( { value: evt.target.value, comment: '' } ) }
            comment={email.comment}
            placeholder="you@example.com"
          />
          <SubmitButton value="Sign Up"/>
        </form>
      </main>
    </div>
  )
}
