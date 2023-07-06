import { Button } from '@/components/ui/button'
import getSession from '@/services/session'
import Link from 'next/link'
import React from 'react'

interface Props{
    message: string
}

export default async function NotAlowedPage({ message }: Props) {

  const session= await getSession() 

  return (
    <>
      <section className="flex justify-center">
        <div className="flex flex-col items-center w-1/2 p-4 mt-10 bg-gray-200 border border-gray-300 rounded-xl">
          <p className="mt-10 text-3xl font-bold">Not authorized</p>
          <p className="mt-3 text-xl">{message}</p>
          {
            session ? 
            <Link href={"/"}><Button className='w-24 mt-10'>Home</Button></Link> :
            <Link href={"/login"}><Button className='w-24 mt-10'>Login</Button></Link> 
          }
        </div>
      </section>
    </>
  )
}

