import { Prisma } from '@prisma/client';
import prisma from '.';

export async function getPosts(args: any) {
  try {
    const result = await prisma.posts.findMany(args);

    return { posts: result };
  } catch (error) {
    return { error };
  }
}

export async function getPostById(id: string) {
  try {
    const result = await prisma.posts.findUnique({
      where: { id },
    });

    return { post: result };
  } catch (error) {
    return { error };
  }
}