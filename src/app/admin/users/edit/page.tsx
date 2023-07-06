import { Separator } from "@/components/ui/separator";
import { editUser, getUser } from "@/services/userService";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UserForm, UserFormValues } from "../add/usersForm";


export const revalidate= 0

interface Props{
    searchParams: {
        userId: string
    },
  }  

export default async function AddWinePage({ searchParams }: Props) {
    
    const userId= searchParams.userId
    const user= await getUser(userId)

    if (!user) return <div>User not found, id: {userId}</div>
 

    async function editData(data: UserFormValues): Promise<User | null> {
    "use server"

    const edited= await editUser(userId, data)    

    revalidatePath("/admin/users")
    
    return edited
    }

    return (
    <div className="flex flex-col items-center w-full max-w-4xl my-10 space-y-6">
        <div className="min-w-[600px]">
        <h3 className="text-lg font-medium text-center">Edit User</h3>

        <Separator className="my-5" />

        <div className="w-full">
            <UserForm processData={editData} user={user} />        
        </div>
        
        </div>
        
    </div>
    )
}