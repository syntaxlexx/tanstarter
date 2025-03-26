import authClient from "@/lib/auth-client";
import { PropsWithChildren } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props extends PropsWithChildren {
  redirectTo?: string;
}

const LogoutButton = ({ children, redirectTo = "/signin" }: Props) => {
  return (
    <Button
      onClick={async () => {
        const resp = await authClient.signOut();

        if (resp.data?.success) {
          toast.success("Logged out successfully");
          if (window) {
            window.location.href = redirectTo;
          }
        }
      }}
    >
      {children ?? "Logout"}
    </Button>
  );
};

export default LogoutButton;
