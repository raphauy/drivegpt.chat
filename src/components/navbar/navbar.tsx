
import { ThemeToggle } from "@/components/chadcn/theme-toggle"
import Logo from "./logo"
import Menu from "./menu"
import LoginComponent from "./LoginComponent"

export function Navbar() {

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex items-center">        
        <Logo />
        <div className="flex-1">
          <Menu />
        </div>
        {/* @ts-expect-error Server Component */}
        <LoginComponent />
        <ThemeToggle />
      </div>
    </header>
  )
}
