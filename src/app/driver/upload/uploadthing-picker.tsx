"use client";
 
import LoadingSpinner from "@/components/loadingSpinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";
import { Database, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
 
interface Props{
    uploadComplete: (res: any) => Promise<boolean>
}

export default function UploadthingPicker({ uploadComplete }: Props) {
  const [loading, setLoading] = useState(false)

  return (
    <div>
        <UploadDropzone
            endpoint="pdfUploader"
            onUploadProgress={() => setLoading(true)}
            onClientUploadComplete={async (res) => {
            const success= await uploadComplete(res)
            if (success) {
                toast({
                    description: (
                        <pre className="p-4 mt-2 rounded-md bg-slate-950">
                        <p className="text-xl text-white">Archivo procesado con éxito</p>
                        </pre>
                    ),
                })              
            } else {
                toast({
                    title: "Algo salió mal",
                    variant: "destructive",
                    description: (
                      <pre className="p-4 mt-2 rounded-md bg-slate-950">
                        <p className="text-xl text-white">No se pudo procesar el archivo</p>
                      </pre>
                    ),
                  })          
            }
            setLoading(false)
            }}
            onUploadError={(error: Error) => {
                console.log(`ERROR! ${error.message}`);

                toast({
                    title: "Algo salió mal",
                    variant: "destructive",
                    description: (
                      <pre className="p-4 mt-2 rounded-md bg-slate-950">
                        <p className="text-xl text-white">No se pudo procesar el archivo</p>
                      </pre>
                    ),
                  })          
                setLoading(false)
            }}
        />

        {
            loading ? 

            <LoadingSpinner /> :

            <div className="flex gap-5 mt-10">
                <Link href={`/driver/repository?refresh=${new Date().getMilliseconds()}`} className="self-center mt-16">
                    <Button className="flex w-48 gap-2"><Database />Ver Repositorio</Button>
                </Link>
                <Link href="/driver/chat" className="self-center mt-16">
                    <Button className="flex w-48 gap-2"><MessageCircle />Chatear</Button>
                </Link>
            </div>
        }
    </div>
);
}