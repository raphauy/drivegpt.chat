import { embedSupabase } from "@/services/supabase";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function embedPDF(path: string, userId: string, fileId: string) {
    console.log("embedPDF: " + path);
    
    const loader = new PDFLoader(path);

    const docs = await loader.load();
    console.log(docs[0].metadata);

    await embedSupabase(docs, userId, fileId)
    console.log("embedPDF done");
}
