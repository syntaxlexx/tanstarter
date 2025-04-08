import { db } from "@/database/db";
import { users } from "@/database/schema";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const fetchUsers = createServerFn({ method: "GET" })
  // .validator((postId: string) => postId)
  .handler(async () => {
    console.info(`Fetching users...`);
    const data = await db.query.users.findMany();

    return data;
  });

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

export const findUser = createServerFn({ method: "GET" })
  .validator((userId: string) => userId)
  .handler(async ({ data }) => {
    console.info(`Fetching user with id ${data}...`);
    const user = await db.query.users.findFirst({
      where: eq(users.id, data),
    });

    return user;
  });

export const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["users", userId],
    queryFn: () => findUser({ data: userId }),
  });
