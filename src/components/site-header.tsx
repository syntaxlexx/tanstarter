import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";
import { site } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SiteHeader() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  return (
    <header>
      <div className="container flex py-2.5 items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold">
          {site.name}
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isSessionPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {session ? (
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>

                  <Button
                    onClick={async () => {
                      const { error } = await authClient.signOut();

                      if (error) {
                        toast.error(error.message);
                      } else {
                        window.location.href = "/";
                      }
                    }}
                    type="button"
                    variant="ghost"
                  >
                    Sign out
                  </Button>
                </div>
              ) : (
                <Button type="button" asChild variant="ghost">
                  <Link to="/signin">Sign in</Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
