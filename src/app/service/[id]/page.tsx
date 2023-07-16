import { FunctionComponent } from "react";
// import { Post as TPost } from "@prisma/client";
import { notFound } from "next/navigation";
import { getUserById, getUsers } from "@/lib/prisma/users";
import { users as TUsers } from "@prisma/client";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  // const res = await fetch(
  //   `https://jsonplaceholder.typicode.com/posts/${id}`
  // ).then((res) => res.json());

  const res = await getUserById(id);

  return {
    name: res.user?.name,
    phone: res.user?.phone,
  };
}

export async function generateStaticParams() {
  // const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
  //   (res) => res.json()
  // );

  const { users = [], error }: { users?: TUsers[]; error?: any } =
    await getUsers({});

  if (error) {
    throw error;
  }

  return users.map((user: any) => ({
    id: user.id.toString(),
  }));
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const { user, error } = await getUserById(id);

  if (error) {
    throw error;
  }

  // if (res.status === 404) {
  //   notFound();
  // }

  // if (res.status !== 200) {
  //   throw new Error("Алдаа гарлаа");
  // }

  // const post: any = await res.json();

  return (
    <>
      <h1 className="text-2xl uppercase pb-2">{user?.name}</h1>

      <article>
        Байршил: <p>{user?.company.name}</p>
      </article>

      <div className="text-center text-green-800">
        Боломжит захиалах цагуудыг харуулах
      </div>
    </>
  );
};

export default Page;
