import { auth } from "./lib/auth";

export type Session = typeof auth.$Infer.Session;

export const UserRole = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export type User = Session["user"] & {
  role: UserRoleType;
};
