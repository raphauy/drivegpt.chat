
import { Button } from "@/components/ui/button";
import { getFilesOfCurrentUser } from "@/services/fileService";
import { Files, Globe } from "lucide-react";
import Link from "next/link";

export default async function RightBar() {

  const files= await getFilesOfCurrentUser()

  return (
    <>
      <section className="flex-col hidden px-2 border-l lg:flex border-r-tinta-vino/50">

        <div className="flex items-center gap-1 py-2">
          <Files size={23} />
          <p className="text-xl font-bold">{files.length} Archivos:</p>
        </div>
        {files.length === 0 && <Button variant="outline"><Link href="/driver/upload">Cargar</Link></Button>} 
        <div className="flex flex-col items-start">
          {
            files.map(file => {
              const end= file.name.length > 25 ? "..." : ""

              return (
                <Button key={file.id} variant="link"><Link href={file.externalUrl} target="_blank">{file.name.substring(0,25)+end}</Link></Button>
                )
            })
          }
        </div>

        {divider()}

        <div className="flex items-center gap-1 py-2">
          <Globe size={23} />
          <p className="text-xl font-bold">Sitios Web:</p>                  
        </div>

        {divider()}

      </section>
    </>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-tinta-vino/50" />
}
