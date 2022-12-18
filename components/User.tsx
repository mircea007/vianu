import { UserIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function User({ className, uname }: { className?: string, uname: string }){
  return (
    <Link href={"/profil/" + uname} className={"flex flex-row gap-1 p-1 " + className}>
      <UserIcon className="w-6 h-6 p-0.5 rounded-full border border-2 border-current" />
      <span className="text-md">{uname}</span>
    </Link>
  )
}