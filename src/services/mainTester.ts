import * as dotenv from "dotenv"
import { saveFile } from "./fileStorageService"
import { deleteSections } from "./supabase";

dotenv.config()

async function main() {

 
  const file= "4dc96673-c50c-4d45-ab42-811aea7b81ef_Raphael_Carvalho_cover_letter.pdf"
  console.log("deletting file: " + file);
  
  await deleteSections(file)



  // const filePath = `${BASE_PATH}/${fileId}.pdf`
  // await embedPDF(filePath)

  // await deleteFileOnFileSystem(fileId)

}

main().catch((err) => console.error(err))
