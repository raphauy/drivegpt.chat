
import { Button } from "@/components/ui/button";
import getSession from "@/services/session"
import Image from "next/image";
import Link from "next/link";
import { DropdownMenuProfile } from "./dropDownMenuProfile";

export default async function LoginComponent() {    

    const session= await getSession()
    const user= session?.user

    if (!user) return loginButton()

    return (
        <section className="text-base text-gray-700 sm:flex sm:justify-between">
            <div className="flex items-center justify-between cursor-pointer">
                <DropdownMenuProfile>
                    <div className="flex items-center gap-1">
                        <p className="hidden sm:block text-muted-foreground">{user.email}</p>
                        {user.image && <Image className="w-12 border rounded-full border-spacing-1" src={user?.image} width={116} height={35} alt="logo" />}
                        {!user.image && <div 
                        className="flex items-center justify-center w-12 h-12 text-2xl rounded-full bg-first-color hover:opacity-80">R</div>}
                    </div>
                </DropdownMenuProfile>
            </div>
        </section>
)
}


function loginButton() {

    return (
        <Link href="/login"><Button className="w-24">Login</Button></Link>        
    )
}