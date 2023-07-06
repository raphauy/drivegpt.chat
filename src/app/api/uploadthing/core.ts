import { createFile } from "@/services/fileService"
import { saveFile } from "@/services/fileStorageService"
import { getCurrentUser } from "@/services/session"
import { createUploadthing, type FileRouter } from "uploadthing/next"
 
const f = createUploadthing()
 
export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 1 }, })
    .middleware(async ({ req }) => {
      const user = await getCurrentUser()
 
      if (!user) throw new Error("Unauthorized")
 
      return { userId: user.id, userEmail: user.email }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log(metadata) 
      console.log(file)
      const fileData= {
        name: file.name,
        externalId: file.key,
        externalUrl: file.url,
        size: file.size,
        userId: metadata.userId,
        type: "pdf",
        status: "done"    
      }
      createFile(fileData)
    }),
} satisfies FileRouter
 
export type OurFileRouter = typeof ourFileRouter