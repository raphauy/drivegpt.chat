import { revalidatePath } from 'next/cache'
import React from 'react'
import UploadthingPicker from './uploadthing-picker'
import { getFileByExternalId } from '@/services/fileService'
import { FileKey } from 'lucide-react'

export default function UploadPage() {
  
    async function onUploadComplete(res: any) {
    "use server"
      let success= false

      const fileKey= res[0].fileKey

      for (let i = 1; i <= 5; i++) {
          const files= await getFileByExternalId(fileKey)
          if (files.length > 0){
              console.log("######### encontrado!");
              success= true
              break
          }
          console.log("######### durmiendo...");
          
          await new Promise(resolve => setTimeout(resolve, 3000))
      }     
  
      revalidatePath("/driver/repository")
      return success
    }
  
  
    return (
      <div className="flex flex-col items-center w-full p-2 mx-2">
        <p className="mb-4 text-3xl font-bold mt-7">Subir Archivos</p>
  
        {/** <DrivePicker clientId={clientId} developerKey={developerKey} processData={saveData} /> */}
        <UploadthingPicker uploadComplete={onUploadComplete}/>  
  
      </div>
    )
  }
  