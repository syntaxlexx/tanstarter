import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/signin", replace: true });
    }

    // `context.queryClient` is also available in our loaders
    // https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query
    // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
  },
});

function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-x-0 top-0 z-50 border-b bg-background/40 backdrop-blur-sm">
        <SiteHeader />
      </div>
      <main className="container pt-16 min-h-[calc(100vh-5rem)]">
        <Outlet />
      </main>
      <SiteFooter className="bg-accent" />
    </div>
  );
}
