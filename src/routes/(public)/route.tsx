import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative">
      <div className="fixed inset-x-0 top-0 z-50 border-b bg-background/40 backdrop-blur-sm">
        <SiteHeader />
      </div>

      <main className="min-h-[calc(100vh-5rem)]">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
