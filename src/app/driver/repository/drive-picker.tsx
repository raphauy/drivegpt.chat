"use client"

import { Icons } from '@/components/icons';
import { LoadingSpinnerChico } from '@/components/loadingSpinner';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { DriveFile } from '@/types/drive-files';
import { File } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useDrivePicker from 'react-google-drive-picker';


interface Props{
    clientId: string
    developerKey: string
    processData: (json: DriveFile) => Promise<File | null>
}

export default function DrivePicker({ clientId, developerKey, processData }: Props) {
  const [openPicker, authResponse] = useDrivePicker()
  const [loading, setLoading] = useState(false)
  const router= useRouter()


  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId,
      developerKey,
      viewId: "PDFS",
      // token: token, // pass oauth token in case you already have one
      //token: "1//04RTdVbt_rqwbCgYIARAAGAQSNwF-L9IrbzYsvCchnHJriyi2TLLqep_2x6hrYJwAEyKvm1CFdO3OTvyeAg6YJr1ti8KzEwy3O5A",
      //customScopes: ["https://www.googleapis.com/auth/drive.readonly"],
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: false,
      // customViews: customViewsArray, // custom view
      callbackFunction: async (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        if (data.action === 'picked') {
            setLoading(true)
            const pdf= data.docs[0]
            console.log(pdf)

            const fresh= await processData(pdf)            
            if (fresh === null) {
              toast({
                title: "Algo salió mal",
                variant: "destructive",
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <p className="text-xl text-white">El archivo no se pudo procesar</p>
                  </pre>
                ),
              })          
            } else {
              toast({
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <p className="text-xl text-white">Archivo procesado con éxito</p>
                  </pre>
                ),
              })          
            }
            setLoading(false)

            fresh && router.push(`/driver/files?${fresh.id}`)
        }
        
      },
    })
  }

  

  
  return (
    <div>
            <Button className="my-7" onClick={() => handleOpenPicker()}>
                <Icons.google2 />
                {!loading && <p className="ml-3">Cargar archivo</p>}
                {loading && <LoadingSpinnerChico/>}
            </Button>
    </div>
  );
}

