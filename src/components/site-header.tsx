import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";
import { site } from "@/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export default function SiteHeader() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  const router = useRouter();

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
                <Button
                  onClick={async () => {
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.navigate({ to: "/signin", replace: true });
                        },
                      },
                    });
                  }}
                  type="button"
                  variant="ghost"
                >
                  Sign out
                </Button>
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
