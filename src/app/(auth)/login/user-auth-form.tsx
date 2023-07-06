"use client"

import * as React from "react"

import { signIn } from 'next-auth/react';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast()
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const profileFormSchema = z.object({
    email: z.string({required_error: "El mail es obligatorio."}).email(),
  })
  
  type ProfileFormValues = z.infer<typeof profileFormSchema>

  const defaultValues: Partial<ProfileFormValues> = {
    email: ""
  }
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true)

    const email= values.email
    console.log("email " + email);
    console.log("values " + JSON.stringify(values));
   
    toast({
      title: "Enviando mail!!!",
    })

    signIn('email', {...values, redirect: false })
    .then((callback) => {
      console.log(callback);
      
      if (callback?.ok) {
        router.push('/emailverify')
      }

      if (callback?.error) {
        toast({
          title: "Algo salió mal",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <p className="text-white">{callback?.error}</p>
            </pre>
          ),
        })
      }
    })
    .finally(() => setIsLoading(false))
  }

  function signGoogle() {
    signIn("google")
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="nombre@email.com" {...field} />
              </FormControl>
              <FormDescription>
                Ingresa tu email y te enviaremos un link de acceso
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button disabled={isLoading} className="w-full">
            {isLoading && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Ingresar con Email
          </Button>
      </form>
    </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("google")}>
        {isLoading ? (
          <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Icons.google2 className="w-4 h-4 mr-2" />
        )}{" "}
        <p className="ml-3">Google</p>
      </Button>
    </div>
  )
}