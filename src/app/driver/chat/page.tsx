import Chat from "./chat";
import RightBar from "./rightBar";


export default async function ChatPage() {
  
  return (
    <div className="flex flex-grow w-full">

      <div className="flex self-start justify-center flex-1">
        <Chat />
      </div>
      {/* @ts-expect-error Server Component */}
      <RightBar />

    </div>
)
}
