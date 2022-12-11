import { getToken, removeToken } from './JWT.ts'
import { useEffect, useState } from 'react'
import { UserIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

export function Header({ className }){
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

  useEffect( _ => {
    getUserData()
  }, [] )

  return (
    <div className={"w-full bg-main-700 flex flex-row justify-between " + className}>
      <a className="flex flex-row items-center text-5xl italic p-3" href="/">
        <span className="text-main-400">Vianu</span>
        <span className="text-white">Arena
          <sup className="text-3xl">*</sup>
        </span>
      </a>

      {login ? (
        <div className="text-white bg-main-600 h-full p-2 flex flex-col gap-1">
          <div className="flex flex-row gap-1">
            <UserIcon className="h-6" />
            <span className="text-lg">{uname}</span>
          </div>
          <button onClick={ _ => {
            removeToken()
            router.reload()
          }} className="flex flex-row gap-1 hover:">
            Logout
            <ArrowRightOnRectangleIcon className="h-6" />
          </button>
        </div>
      ) : (
        <div className="text-white bg-main-600 h-full flex flex-col self-stretch p-2">
          <a className="transition duration-200 text-lg text-white rounded-lg hover:bg-main-500 hover:text-white p-1 flex flex-row justify-between" href="/login">Login <ArrowLeftOnRectangleIcon className="h-6" /></a>
          <a className="transition duration-200 text-lg text-white rounded-lg hover:bg-main-500 hover:text-white p-1 flex flex-row justify-between" href="/register">Register <ArrowLeftOnRectangleIcon className="h-6" /></a>
        </div>
      )}

    </div>
  )
}