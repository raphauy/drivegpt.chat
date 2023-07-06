import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UserForm, UserFormValues } from "./usersForm";
import { createUser } from "@/services/userService";


export const revalidate= 0

interface Props{
    searchParams: {
        wineId: string
    },
  }  

export default async function AddWinePage({ searchParams }: Props) {

    async function saveData(data: UserFormValues): Promise<User | null> {
    "use server"
    
    const created= await createUser(data)

    console.log(created);
    
    revalidatePath("/admin")
    
    return created
    }

    return (
    <div className="flex flex-col items-center w-full max-w-4xl my-10 space-y-6">
        <h3 className="text-lg font-medium text-center">Agregar Vino</h3>

        <Separator className="my-5" />

        <div className="w-full">
            <UserForm processData={saveData} />
        </div>

    </div>
    )
}