"use client"

import { LoadingSpinnerChico } from "@/components/loadingSpinner";
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { User } from "@prisma/client"
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  eliminate: () => Promise<User | null>;
}

export default function DeleteForm({ eliminate }: Props) {
  const router= useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    await eliminate()
    setLoading(false)

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-xl text-white">User deleted</p>
        </pre>
      ),
    })

    router.push("/admin/users")
  }
  
  return (
    <div>
      <Button
        onClick={() => history.back()}
        type="button"
        variant={"secondary"}
        className="w-32"
      >
        Cancel
      </Button>
      <Button onClick={handleClick} variant="destructive" className="w-32 ml-2">
      {
          loading ? 
          <LoadingSpinnerChico /> :
          <p>Delete</p>
        }
      </Button>
    </div>
  )
}
