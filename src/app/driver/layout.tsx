import { getCurrentUser } from "@/services/session";
import NotAlowedPage from "../(auth)/unauthorized/page";
import SideBar from "./sideBar";

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    /* @ts-expect-error Server Component */
    return <NotAlowedPage message="You must be logged in." />
  }

  if (currentUser?.role !== "driver" && currentUser?.role !== "admin") {
    /* @ts-expect-error Server Component */
    return <NotAlowedPage message="Only driver role allowed." />
  }

  return (
    <>
      <div className="flex flex-grow">
        <SideBar />
        <div className="flex flex-col items-center flex-grow">{children}</div>
      </div>
    </>
  )
}
