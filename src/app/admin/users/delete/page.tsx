import { Separator } from '@/components/ui/separator'
import { deleteUser, getUser } from '@/services/userService'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import DeleteForm from './deleteForm'

interface Props{
    searchParams: {
        userId: string
    }
}
  
export default async function DeletePage({ searchParams }: Props) {
    const userId= searchParams.userId
  
    const user= await getUser(userId)
   
    if (!user) <div>User not found</div>

    async function eliminate(): Promise<User | null> {
        "use server"
        
        const deleted= user && await deleteUser(user.id)

        revalidatePath("/admin/users")

        return deleted
    }


    return (
        <div className="flex flex-col items-center w-full my-5 space-y-6">
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium text-center">Delete User {user?.email}</h3>

                <Separator className="my-5" />
                
                <p className="mb-5 text-lg">This operation cannot be undone</p>

                <DeleteForm eliminate={eliminate} />
            </div>
        
        </div>
    )
}