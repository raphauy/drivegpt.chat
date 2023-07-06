import { createClient } from "@supabase/supabase-js";
import { Document } from "langchain/dist/document";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import * as dotenv from "dotenv"

dotenv.config()

const options = {
  db: { schema: 'embedding' },
  auth: {persistSession: false}
}
export const client = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_PRIVATE_KEY || "",
  options
)

const loader = new DirectoryLoader(process.env.TMP_FILE_PATH || "tmp", {
  //".txt": (path) => new TextLoader(path),
  ".pdf": (path) => new PDFLoader(path),
})


export async function processEmbeddings(userId: string, fileId: string) {
  console.log("Embed supa");

  const docs= await loader.load()
  //const normalizedDocs= normalizeDocuments(docs)
  embedSupabase(docs, userId, fileId)
}

export async function embedSupabase(docs: Document<Record<string, any>>[], userId: string, fileId: string) {

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await textSplitter.splitDocuments(docs);
  console.log("size: " + splitDocs.length);

  splitDocs.forEach(doc => {
    doc.metadata["user"]=userId
    doc.metadata["file"]=fileId
  })

  await SupabaseVectorStore.fromDocuments(
    splitDocs,
    new OpenAIEmbeddings(),
    {
      //@ts-ignore
      client,
      tableName: "documents",
      queryName: "match_documents"
    }
  )
  console.log("Data stored");
 
}
export async function deleteSections(file: string) {
  const { data, error } = await client
    .from('documents')
    .select('id, metadata')

  if (error) {
    console.error("Error fetching documents: ", error);
    return;
  }

  const idsToDelete = data
    ?.filter(doc => doc.metadata.file === file)
    .map(doc => doc.id) || [];

  if (idsToDelete.length === 0) {
    console.log("No documents to delete.");
    return;
  }

  const { data: deleteData, error: deleteError } = await client
    .from('documents')
    .delete()
    .in('id', idsToDelete);

  if (deleteError) {
    console.error("Error deleting documents: ", deleteError);
  } else {
    console.log(`Deleted documents.`);
  }
}


export async function getContents(file: string): Promise<string[]> {
  const { data, error } = await client
    .from('documents')
    .select('content')
    .filter('metadata->file', 'eq', file)
    
  if (error) {
    console.error(error);
    return [];
  }
    
  if (!data) {
    return [];
  }

  return data.map(document => document.content);
}