import { utapi } from "uploadthing/server";
import { prisma } from "@/utils/server/db"
import { getCurrentUser } from "./session"
import { deleteFileOnFileSystem, saveFile } from "./fileStorageService"
import { embedPDF } from "./vectorDBService"
import { deleteSections } from "./supabase"

interface FileType{
    name: string
    externalId: string
    externalUrl: string
    size: number
    userId: string
    type: string
    status: string  
}

export async function getFilesOfCurrentUser() {

  const user= await getCurrentUser()
  if (!user)
    throw new Error("No user in the session")

  const found = await prisma.file.findMany({
    where: {
        userId: user.id
    },
    orderBy: {
        name: 'asc',
    },
  })

  return found;
}
  
export async function getFilesByUser(userId: string) {

  const found = await prisma.file.findMany({
    where: {
        userId
    },
    orderBy: {
        name: 'asc',
    },
  })

  return found;
}
  
export async function getFile(id: string) {

  const found = await prisma.file.findUnique({
    where: {
      id
    },
  })

  return found
}

export async function getFileByExternalId(externalId: string) {

  const found = await prisma.file.findMany({
    where: {
      externalId
    },
  })

  return found
}


export async function createFile(data: FileType) {

  const files= await getFilesByUser(data.userId)
  console.log("files: " + files.length)
  console.log(files)
  
  if (files.some(file => file.name === data.name)) {
    console.log("User already have this file, must delete and upload again");
    throw new Error("User already have this file, must delete and upload again")      
  }

  const filePath = await saveFile(data.externalUrl, data.name)

  await embedPDF(filePath, data.userId, data.externalId)

  await deleteFileOnFileSystem(filePath)

  //utapi.deleteFiles(data.externalId)

  const created= await prisma.file.create({
    data: {
      ...data,
    }
  })

  return created
}

export async function editFile(id: string, data: FileType) {
  
  const created= await prisma.file.update({
    where: {
      id
    },
    data
  })

  return created
}

export async function deleteFile(id: string) {
  
  const deleted= await prisma.file.delete({
    where: {
      id
    },
  })
  await deleteSections(deleted.externalId)

  return deleted
}