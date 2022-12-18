import { UserIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function User({ className, uname }: { className?: string, uname: string }){
  return (
    <Link href={"/profil/" + uname} className={"flex flex-row gap-1 p-1 " + className}>
      <UserIcon className="h-6" />
      <span className="text-lg">{uname}</span>
    </Link>
  )
}