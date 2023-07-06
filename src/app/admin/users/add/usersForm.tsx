"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-hot-toast"

export const roles= [
  "user",
  "admin",
  "driver"
]

const formSchema = z.object({
  
  name: z.string().optional(),
  email: z.string().email(),    
  role: z.string({required_error: "Role is required."}),
})

export type UserFormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<UserFormValues> = {}

interface Props{
  user?: User
  processData: (json: UserFormValues) => Promise<User | null>
}

export function UserForm({ user, processData }: Props) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  const router= useRouter()

  async function onSubmit(data: UserFormValues) {
    
    const fresh= await processData(data)

    let message= "User created 🏁"
    if (user)
      message= "User edited 🏁"
      
    toast.success(message, { duration: 4000 })

    fresh && router.push(`/admin/users?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (user) {
      
      form.setValue("email", user.email)
      form.setValue("role", user.role)
      user.name && form.setValue("name", user.name)
    }
  
  }, [form, user])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-8 bg-white border rounded-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="User name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="User email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wine Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    {
                      user ? 
                      <SelectValue className="text-muted-foreground">{form.getValues("role")}</SelectValue> :
                      <SelectValue className="text-muted-foreground" placeholder="Select a Role" />
                    }
                    
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button onClick={() => history.back()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
          <Button type="submit" className="w-32 ml-2" >Save</Button>
        </div>
      </form>
    </Form>
  )
}