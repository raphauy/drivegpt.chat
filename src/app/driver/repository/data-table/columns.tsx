"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { FileSearch, ArrowUpDown, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export type File = {
  id: string
  name: string
  size: number
  externalUrl: string
  type: string
  status: string  
}

export const statuses = ["done","pending"]


export const columns: ColumnDef<File>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const file= row.original     
 
      return (
        <Link href={file.externalUrl} target="_blank">
          <Button variant="link" className="whitespace-nowrap">
            {file.name}
          </Button>
        </Link>
      )
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
        return (
          <Button variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tamaño
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const file= row.original
      const mb= file.size/1024/1024
 
      return (
        <p className="font-bold text-center text-gray-500 rounded-md">{mb.toFixed(2)} MB</p>        
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
        return (
          <Button variant="ghost" 
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tipo
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
        return (
          <Button variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Estado
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const file= row.original     
      let color= ""
      if (file.status === "done")
        color= "bg-green-400"
      else if (file.status === "pending")
        color= "bg-yellow-400"
 
      return (
        <p className={`font-bold text-center text-gray-500 rounded-md ${color}`}>{file.status}</p>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const file= row.original     
 
      return (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/driver/repository/delete?fileId=${file.id}`} className="flex items-center">
              <Trash2 className="text-red-400"/>
          </Link>
          {/**
          <Link href={`/driver/repository/sections?fileId=${file.id}`} className="flex items-center">
              <FileSearch/>
          </Link>
           */}
        </div>
      )
    },
  },
]
