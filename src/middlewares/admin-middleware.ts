import { User, UserRole } from "@/types";
import { createMiddleware } from "@tanstack/react-start";
import { authMiddleware } from "./auth-guard";

const adminMiddleware = createMiddleware()
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    if ((context.user as User).role !== UserRole.ADMIN) {
      throw new Error("Unauthorized");
    }
    return next();
  });

export default adminMiddleware;
