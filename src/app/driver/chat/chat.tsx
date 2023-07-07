'use client'

import { LoadingSvg } from '@/components/loadingSpinner'
import { useChat } from 'ai/react'
import { Bot, Send, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Chat() {
  const session= useSession()
  const userId= session.data?.user.id
  const { messages, input, handleInputChange, handleSubmit } = useChat({ body: {userId}})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(!loading)
    console.log("loading...");
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length])
  

  return (
    <div className="flex flex-col items-center w-full max-w-2xl p-4 m-4 font-medium border rounded-md shadow-xl dark:shadow-white">
      <div className="flex-1 w-full">
        {messages.length > 0 ? 
          messages.map(m => (
              <div key={m.id} className="flex pb-1 mx-2 mb-5 whitespace-pre-wrap border-b">
                <p className="font-bold">
                  {m.role === 'user' ? <User size={31} /> : <Bot size={31}/>}
                </p>
                <p className='pl-1'>{m.content}</p>
              </div>
            ))
          : 
          null
        }
        {loading && 
          <div className="flex flex-col mb-2">
            <p className="text-center">Estoy buceando en los datos</p>
            <LoadingSvg />
          </div>
        }

      </div>

      <form onSubmit={handleSubmit} className='flex items-center w-full p-4 border border-gray-300 rounded-md shadow '>
        <input
          className="w-full bg-transparent focus:outline-none"
          value={input}
          placeholder="Pregunta lo que quieras :-)"
          onChange={handleInputChange}
          disabled={loading}
        />
        <button><Send /></button>
      </form>
    </div>
)
}
