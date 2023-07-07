import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Command } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "./user-auth-form"
import getSession from "@/services/session"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default async function AuthenticationPage() {
  const session= await getSession()
  if (session)
    redirect("/driver/chat")

  return (
    <>
      <div className="container relative h-[800px] grid flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Command className="w-6 h-6 mr-2" /> Drive ChatGPT App
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Chat with all your data!&rdquo;
              </p>
              <footer className="text-sm">Raphael Carvalho</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Identificación de usuarios
              </h1>
              <p className="text-sm text-muted-foreground">
                Puedes utilizar tu email o tu cuenta de Google
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-sm text-center text-muted-foreground">
              Al continuar, aceptas nuestros{" "}
              <Link
                href="/legal/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Términos y condiciones
              </Link>{" "}
              y {" "}
              <Link
                href="/legal/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de Privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}