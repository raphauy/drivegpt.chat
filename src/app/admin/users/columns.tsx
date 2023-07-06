"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export type User = {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  role: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )
    },
    cell: ({ row }) => {
      const data = row.original      
      return (<p className="pl-3">{data.name}</p>)
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
  )
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Role
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
  )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email Verified
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.original     
      if (!data.emailVerified) return <div></div> 
      return (<p>{data.emailVerified.toDateString()}  </p>)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original     
 
      return (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/admin/users/edit?userId=${data.id}`} className="flex items-center">
              <Edit size={30} className="pr-2 hover:cursor-pointer text-sky-400"/>
          </Link>
          <Link href={`/admin/users/delete?userId=${data.id}`} className="flex items-center">
            <Trash2 className="text-red-400 hover:cursor-pointer"/>
          </Link>
        </div>

      )
    },
  },
]
