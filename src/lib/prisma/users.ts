import { Prisma } from '@prisma/client';
import prisma from '.';

export async function getUsers(args: any) {
  try {
    const result = await prisma.users.findMany(args);

    // console.log('result ', result)

    return { users: result };
  } catch (error) {
    return { error };
  }
}

export async function getUserById(id: string) {
  try {
    const result = await prisma.users.findUnique({
      where: { id },
    });

    return { user: result };
  } catch (error) {
    return { error };
  }
}