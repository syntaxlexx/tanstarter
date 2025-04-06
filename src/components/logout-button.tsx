import authClient from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props extends PropsWithChildren {
  redirectTo?: string;
  text?: string;
}

const LogoutButton = ({ children, text = "Logout", redirectTo = "/signin" }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const resp = await authClient.signOut();

    if (resp.data?.success) {
      toast.success("Logged out successfully");
      if (window) {
        window.location.href = redirectTo;
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div onClick={handleLogout} className="cursor-pointer relative">
      {children ? (
        children
      ) : (
        <Button disabled={isLoading} className="relative">
          {isLoading && (
            <Loader2 className="size-4 animate-spin absolute right-2 top-2" />
          )}
          {text}
        </Button>
      )}
    </div>
  );
};

export default LogoutButton;
