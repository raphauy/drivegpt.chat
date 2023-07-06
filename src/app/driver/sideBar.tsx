"use client"

import LoadingSpinner from "@/components/loadingSpinner";
import clsx from "clsx";
import { Database, Globe, UploadCloud } from "lucide-react";
import { DownloadCloud, Home, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {

  const path= usePathname()
  if (!path) return <LoadingSpinner />

  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200 dark:hover:text-black"
  const selectedClasses= "font-bold border-r-2 border-r-first-color"

  const chatSelected= path.endsWith("chat")
  const chat= clsx(commonClasses, chatSelected  && selectedClasses)

  const repositorySelected= path.endsWith("repository")
  const repository= clsx(commonClasses, repositorySelected  && selectedClasses)

  const uploadSelected= path.endsWith("upload")
  const upload= clsx(commonClasses, uploadSelected  && selectedClasses)

  const websitesSelected= path.endsWith("websites")
  const websites= clsx(commonClasses, websitesSelected  && selectedClasses)

  const pClasses= "hidden sm:block lg:w-36"

  return (
    <>
      <section className="flex flex-col gap-3 py-4 mt-3 border-r border-r-tinta-vino/50">
        <Link href="/driver/chat" className={chat}>
          <MessageCircle size={23} />
          <p className={pClasses}>Chatear</p>                  
        </Link>

        {divider()}

        <Link href="/driver/repository" className={repository}>
          <Database size={23} />
          <p className={pClasses}>Repositorio</p>                  
        </Link>

        <Link href="/driver/upload" className={upload}>
          <UploadCloud size={23} />
          <p className={pClasses}>Subir Archivos</p>                  
        </Link>

        <Link href="/driver/websites" className={websites}>
          <Globe size={23} />
          <p className={pClasses}>Escanear Sitio Web</p>                  
        </Link>

        {divider()}


      </section>
    </>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-tinta-vino/50" />
}
