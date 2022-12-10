import Head from 'next/head'
import { useState, useEffect } from 'react'

function Input( { type, value, onChange, comment, label, placeholder, className } ){
  let error = 1;
  if( !comment ){
    error = 0;
    comment = (<wbr />)
  }

  if( !className )
    className=""

  return (
    <div className={className}>
      <div className="p-1">
        <span className="text-lg font-bold mb-2">{label}</span>
        <br />
        <input
        className={"transition transition-all duration-300 float-right px-1 outline outline-2 rounded-lg " + (error ? "outline-red-300 focus:outline-red-400" : "outline-gray-300 focus:outline-main-300")}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        />
      </div> <br />
      <span className="test-md h-4 text-red-500">{comment}</span>
    </div>
  )
}

function Submit({ value }){
  return (
    <input
    className="font-bold uppercase bg-main-500 text-white p-2 rounded-lg hover:bg-main-600 cursor-pointer focus:outline focus:outline-2 focus:outline-main-300"
    type="submit"
    value={value ? value : "Submit"}
    />
  )
}

const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/

export default function Home() {
  const [uname, setUname] = useState( { value: '', comment: '' } );
  const [pass, setPass] = useState( { value: '', comment: '' } );
  const [conf, setConf] = useState( { value: '', comment: '' } );
  const [email, setEmail] = useState( { value: '', comment: '' } );

  const submit = evt => {
    evt.preventDefault();

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

    console.log( uname.value + ' ' + pass.value + ' ' + conf.value + ' ' + email.value );
  }

  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>

      <main>
        <h1 className="text-3xl">Vianu Arena (*)</h1>
        <form onSubmit={submit} className="flex flex-col items-center bg-main-50 p-2 rounded-xl max-w-fit">
          <Input
            type="text"
            label="Username"
            value={uname.value}
            onChange={ evt => setUname( { value: evt.target.value, comment: '' } ) }
            comment={uname.comment}
            placeholder="Your nickname"
          />
          <Input
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
          <Input
            type="password"
            label="Confirm"
            value={conf.value}
            onChange={ evt => setConf( { value: evt.target.value, comment: '' } ) }
            comment={conf.comment}
            placeholder="Confirm password"
          />
          <Input
            type="email"
            label="Email"
            value={email.value}
            onChange={ evt => setEmail( { value: evt.target.value, comment: '' } ) }
            comment={email.comment}
            placeholder="you@example.com"
          />
          <Submit value="Sign In"/>
        </form>
      </main>
    </div>
  )
}
