import Item from "@/components/service";
import { getPosts } from "@/lib/prisma/posts";
import { getUsers } from "@/lib/prisma/users";
import { User } from "@/types/User";
import { users as TUsers } from "@prisma/client";

export default async function Home() {
  // const users: Item[] = await fetch(
  //   `https://jsonplaceholder.typicode.com/users`
  // ).then((res) => res.json());

  // const users: any = await getUsers();
  // const posts: any = await getPosts();

  // console.log(users);
  // console.log(posts);

  const { users = [], error }: { users?: TUsers[]; error?: any } =
    await getUsers({});

  if (error) {
    throw error;
  }

  return (
    <div className="text-center text-2xl justify-center">
      <h3 className="mb-2 mt-2" style={{ color: "gray" }}>
        Үйлчилгээ
      </h3>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!users?.length && "No posts found."}

        {users.map((user: any) => (
          <Item key={user.id} item={user} />
        ))}
      </ul>
    </div>
  );
}
