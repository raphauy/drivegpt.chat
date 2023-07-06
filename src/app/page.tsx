import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function IndexPage() {
  return (
    <section className="grid items-center justify-center gap-6 pt-6 pb-8 md:py-10">
      
      <div className="flex max-w-[980px] flex-col justify-center gap-3">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
          Drive ChatGPT App
        </h1>
        <p className="max-w-[800px] text-muted-foreground text-2xl mt-5">
          Drive ChatGPT through your own data!
        </p>
        <p className="max-w-[800px] text-lg text-muted-foreground text-center">
          by Raphael Carvalho
        </p>
        <Link href="/driver/chat" className="self-center mt-16">
          <Button className="flex w-48 gap-2"><MessageCircle />Chat</Button>
        </Link>
      </div>      
      
    </section>
  )
}
