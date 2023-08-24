"use client"

import { LoadingSpinnerChico } from "@/components/loadingSpinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ServerResult } from "@/types/common";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface Props {
  eliminate: () => Promise<ServerResult>;
}

export default function DeleteForm({ eliminate }: Props) {
  const router= useRouter()
  const [loading, setLoading] = useState(false)


  async function handleClick() {
    setLoading(true)
    const result= await eliminate()
    setLoading(false)

    if (result.success) {
      toast({title: "Archivo eliminado"})  
    } else {
      toast({
        title: "Error al eliminar",
        variant: "destructive",
        description: result.error
      })
    }

    router.push("/driver/repository")
  }
  
  return (
    <div>
      <Button
        onClick={() => history.back()}
        type="button"
        variant={"secondary"}
        className="w-32"
      >
        Cancelar
      </Button>
      <Button onClick={handleClick} variant="destructive" className="w-32 ml-2">
        {
          loading ? 
          <LoadingSpinnerChico /> :
          <p>Eliminar</p>
        }
      </Button>
    </div>
  )
}
