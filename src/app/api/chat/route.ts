import { getCurrentUser } from '@/services/session';
import { authOptions } from '@/utils/server/auth';
import { createClient } from '@supabase/supabase-js';
import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { LLMChain, PromptTemplate } from 'langchain'
import { CallbackManager } from 'langchain/callbacks'
import { ChatOpenAI } from 'langchain/chat_models/openai';

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { headers } from 'next/dist/client/components/headers';
import { NextRequest } from 'next/server';

export const runtime = 'edge'

const options = {
  db: { schema: 'embedding' }
}
const client = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_PRIVATE_KEY || "",
  options
)

export async function POST(req: NextRequest) {
  const { messages, userId } = await req.json()
  const input= messages[messages.length - 1].content
  console.log(input)  
  const headersList = headers();
  const referer = headersList.get('referer') || "";
  //const userId= new URL(referer).searchParams.get('userId');
  console.log(userId)  
  

  const { stream, handlers } = LangChainStream()

  const model = new ChatOpenAI({
    streaming: true,
    temperature: 0,
    callbackManager: CallbackManager.fromHandlers(handlers)
  })

  const template = `
  Eres un bot asistente. Tu trabajo es hacer que el cliente se sienta escuchado y comprendido. 
  Reflexiona sobre la entrada que recibes. 
  Toma en cuenta la siguiente información como parte del contexto:\n {context}\n 
  Pregunta: {question}`;
  const prompt = new PromptTemplate({ template, inputVariables: ["question", "context"] })

/*
*/
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const vectorStore= await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      //@ts-ignore
      client,
      tableName: "documents",
      queryName: "match_documents"
    }
  )

  //similaritySearchWithScore
  //const docs= await vectorStore.similaritySearch(input, 10, {"user":user?.id})
  const docsWithNumber= await vectorStore.similaritySearchWithScore(input, 10, {"user":userId})

  let ctx= ""
  docsWithNumber.forEach(docWithNumber => {
    const similarityScore= docWithNumber[1]
    if (similarityScore > 0.78) {
      ctx+= docWithNumber[0].pageContent
      console.log(similarityScore)    
      console.log(docWithNumber[0])    
    }
  });
  ctx= ctx.replace("\n", " ")
  
  const chain = new LLMChain({ llm: model, prompt })
  chain.call({ question: input, context: ctx })
  .catch(console.error)

  return new StreamingTextResponse(stream)
}
