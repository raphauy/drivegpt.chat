
import * as dotenv from "dotenv"
import { createWriteStream } from 'fs'
import * as fsp from 'fs/promises'
import fetch from 'node-fetch'
import { pipeline } from 'stream'
import { promisify } from 'util'

dotenv.config()

type UTFileMetadata= {
  url: string
  key: string
  name: string
  size: number
}

export async function saveFile(fileUrl: string, name: string): Promise<string> {
  const BASE_PATH= process.env.TMP_FILE_PATH || "tmp"
  
  const filePath = `${BASE_PATH}/${name}`
  console.log(`Descargando archivo en: ${filePath}`)

  const response = await fetch(fileUrl);

  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  if (!response.body) throw new Error('Response body is null');

  const pipe = promisify(pipeline);
  await pipe(response.body, createWriteStream(filePath));

  console.log(`Archivo guardado en: ${filePath}`)

  return filePath
}


export function deleteFileOnFileSystem(filePath: string): Promise<void> {
  
  return fsp.unlink(filePath)
    .then(() => {
      console.log(`Archivo ${filePath} eliminado correctamente.`);
    })
    .catch(err => {
      console.error(`Error al eliminar el archivo ${filePath}:`, err);
      throw err;
    });
}
