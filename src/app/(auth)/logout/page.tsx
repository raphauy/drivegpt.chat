"use client"

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export default function LogoutPage() {
  signOut({callbackUrl: "/"})
  return (<></>)
}
