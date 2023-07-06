"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { File } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  eliminate: () => Promise<File | null>;
}

export default function DeleteForm({ eliminate }: Props) {
  const router= useRouter()

  async function handleClick() {
    await eliminate()

    toast({
      description: (
        <pre className="p-4 mt-2 rounded-md bg-slate-950">
          <p className="text-xl text-white">Archivo eliminado</p>
        </pre>
      ),
    })

    router.push(`/driver/repository?refresh=${new Date().getMilliseconds()}`)
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
        Eliminar
      </Button>
    </div>
  )
}
