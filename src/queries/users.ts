import { db } from "@/database/db";
import { users } from "@/database/schema";
import adminMiddleware from "@/middlewares/admin-middleware";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const fetchUsers = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
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
  .middleware([adminMiddleware])
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

export type CreateUserInput = {
  name: string;
  email: string;
  role?: string;
};

export const createUser = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: CreateUserInput) => input)
  .handler(async ({ data }) => {
    // Check if email is already taken
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      throw new Error("Email is already taken");
    }

    console.info(`Creating user...`, data);
    const now = new Date();
    const user = await db
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        emailVerified: false,
        role: data.role || "user",
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return user[0];
  });

export const createUserMutationOptions = () => ({
  mutationKey: ["users", "create"],
  mutationFn: (data: CreateUserInput) => createUser({ data }),
});

export const deleteUser = createServerFn({})
  .middleware([adminMiddleware])
  .validator((userId: string) => userId)
  .handler(async ({ data: userId }) => {
    console.info(`Deleting user with id ${userId}...`);
    const deletedUser = await db.delete(users).where(eq(users.id, userId)).returning();

    if (!deletedUser.length) {
      throw new Error("User not found");
    }

    return deletedUser[0];
  });

export const deleteUserMutationOptions = () => ({
  mutationKey: ["users", "delete"],
  mutationFn: (userId: string) => deleteUser({ data: userId }),
});
