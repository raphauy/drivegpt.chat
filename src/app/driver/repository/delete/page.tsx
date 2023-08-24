import { Separator } from '@/components/ui/separator'
import { revalidatePath } from 'next/cache'
import DeleteForm from './deleteForm'
import { deleteFile, getFile } from '@/services/fileService'
import { File } from '@prisma/client'
import { ServerResult } from '@/types/common'

interface Props{
    searchParams: {
        fileId: string
    }
}
  
export default async function DeletePage({ searchParams }: Props) {
    const fileId= searchParams.fileId
  
    const file= await getFile(fileId)
   
    if (!file) <div>File not found</div>

    async function eliminate(): Promise<ServerResult> {
        "use server"
        
        if (!file) {
            return { success: false, error: "File is null or undefined" };
        }

        console.log("eliminate(), file.id: " + file.id);

        const result= await deleteFile(file.id)
        if (result?.success) {
            revalidatePath("/driver/repository")
        }
        return result
    }
    
    return (
        <div className="flex flex-col items-center w-full p-10 my-5 space-y-6">
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium text-center">Eliminar el archivo {file?.name}</h3>

                <Separator className="my-5" />
                
                <p className="mb-5 text-lg">Si continúas borraras la información del archivo de la base de datos, pero puedes volver a subirlo cuando quieras</p>

                <DeleteForm eliminate={eliminate} />
            </div>
        
        </div>
    )
}