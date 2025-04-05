import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";
import { Route as IndexRoute } from "@/routes/(public)";
import { Link, useRouter } from "@tanstack/react-router";

export default function SiteHeader() {
  const { queryClient } = IndexRoute.useRouteContext();
  const { user } = IndexRoute.useLoaderData();
  const router = useRouter();

  return (
    <header className="absolute right-4 top-4 flex items-center gap-4">
      <ThemeToggle />
      {user ? (
        <Button
          onClick={async () => {
            await authClient.signOut();
            await queryClient.invalidateQueries({ queryKey: ["user"] });
            await router.invalidate();
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
    </header>
  );
}
