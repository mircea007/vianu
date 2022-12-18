import { getToken, removeToken } from './JWT' // .ts
import { useEffect, useState } from 'react'
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import User from './User' // .tsx

function PointlessAnimation( { text, className }: { text: string, className?: string } ){
  return (<div className={"flex flex-row gap-0 " + (className || '')}>{text.split('').map( (ch: string, idx: number) => (
    <span key={idx} className="inline-block hover:-translate-y-2 transition duration-200">{ch}</span>
  ))}</div>)
}

export default function Header( { className }: { className?: string } ){
  const [login, setLogin] = useState( false )
  const [uname, setUname] = useState( '' )

  const router = useRouter()

  async function getUserData(){
    const token = getToken()

    if( token ){
      const response = await fetch("/api/get_user_data", {
        method: "post",
        body: JSON.stringify( token ),
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        }
      })

      const user_data = await response.json()

      setLogin( true )
      setUname( user_data.name )
    }
  }

  useEffect( () => {
    getUserData()
  }, [] )

  return (
    <div className={"w-full bg-main-700 flex flex-row justify-between " + className || ""}>
      <Link className="nostyle flex flex-row items-center text-5xl italic p-3" href="/">
        <PointlessAnimation className="text-main-400" text="Vianu"></PointlessAnimation>
        <span className="text-white flex flex-row gap-0">
          <PointlessAnimation text="Arena" />
          <sup className="text-3xl">*</sup>
        </span>
      </Link>

      <div className="text-white h-full flex flex-row gap-0">
        <div className="flex items-center justify-center p-2">
          <Link href="/monitor" className="subtle text-2xl">Monitor</Link>
        </div>
        {login ? (
          <div className="bg-main-600 h-full p-2 flex flex-col items-center">
            <User uname={uname} className="subtle hover:bg-main-500 transition duration-200 p-1 rounded-lg"/>
            <button onClick={ _ => {
              removeToken()
              router.reload()
            }} className="transition duration-200 text-lg text-white rounded-lg hover:bg-main-500 hover:text-white p-1 flex flex-row max-w-fit">
              Logout
              <ArrowRightOnRectangleIcon className="h-6" />
            </button>
          </div>
        ) : (
          <div className="text-white bg-main-600 h-full flex flex-col self-stretch p-2">
            <Link className="nostyle transition duration-200 text-lg rounded-lg hover:bg-main-500 p-1 flex flex-row justify-between" href="/login">Login <ArrowLeftOnRectangleIcon className="h-6" /></Link>
            <Link className="nostyle transition duration-200 text-lg rounded-lg hover:bg-main-500 p-1 flex flex-row justify-between" href="/register">Register <ArrowLeftOnRectangleIcon className="h-6" /></Link>
          </div>
        )}
      </div>

    </div>
  )
}