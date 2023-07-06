import Link from "next/link"

import { columns } from "./columns"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import getUsers from "@/services/userService"
import { DataTable } from "./data-table"
 
export default async function WinesPage() {
  
  const users= await getUsers()

  return (
    <div className="w-full">      

      <div className="flex justify-end my-5 text-lg font-semibold text-muted-foreground dark:text-white">
        <Link href={`/admin/users/add`} 
          className="flex items-center justify-center">
          <Button><PlusCircle size={22} className="mr-2"/>Add</Button>
        </Link>
      </div>

      <div className="container p-3 py-10 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={users} />      
      </div>
    </div>
)
}
