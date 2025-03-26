import authClient from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props extends PropsWithChildren {
  redirectTo?: string;
}

const LogoutButton = ({ children, redirectTo = "/signin" }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      onClick={async () => {
        setIsLoading(true);
        const resp = await authClient.signOut();
        setIsLoading(false);

        if (resp.data?.success) {
          toast.success("Logged out successfully");
          if (window) {
            window.location.href = redirectTo;
          }
        }
      }}
      disabled={isLoading}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children ?? "Logout"}
    </Button>
  );
};

export default LogoutButton;
