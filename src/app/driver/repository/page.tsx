import { getFilesOfCurrentUser } from "@/services/fileService";
import { revalidatePath } from "next/cache";
import { columns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";
import UploadthingPicker from "../upload/uploadthing-picker";
import Link from "next/link";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DataPage() {

  const clientId= process.env.GOOGLE_CLIENT_ID
  if (!clientId) return <div>No Google Client Id found</div>

  const developerKey= process.env.GOOGLE_DRIVE_API_KEY
  if (!developerKey) return <div>No Google Developer Key found</div>

  async function onUploadComplete() {
  "use server"

    revalidatePath("/driver/files")
  }

  const files= await getFilesOfCurrentUser()

  return (
    <div className="flex flex-col items-center w-full p-2 mx-2">
      <p className="mb-4 text-3xl font-bold mt-7">Repositorio de datos</p>

      <div className="container w-full p-3 py-10 border rounded-md">
        <DataTable columns={columns} data={files} />      
      </div>
      <Link href="/driver/upload" className="self-end">
         <Button className="flex gap-4 mt-2"><UploadCloud size={23} />Subir Archivos</Button>                  
      </Link>

    </div>
  )
}
