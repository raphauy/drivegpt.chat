import { UserFormValues } from "@/app/admin/users/add/usersForm";
import { prisma } from "@/utils/server/db";

export default async function getUsers() {

  const found = await prisma.user.findMany({
    orderBy: {
      email: 'asc',
    },
  })

  return found;
};


export async function getUser(id: string) {

  const found = await prisma.user.findUnique({
    where: {
      id
    },
  })

  return found
}

export async function createUser(data: UserFormValues) {
  
  const created= await prisma.user.create({
    data
  })

  return created
}

export async function editUser(id: string, data: UserFormValues) {
  console.log(data);
  
  const created= await prisma.user.update({
    where: {
      id
    },
    data
  })

  return created
}

export async function deleteUser(id: string) {
  
  const deleted= await prisma.user.delete({
    where: {
      id
    },
  })

  return deleted
}