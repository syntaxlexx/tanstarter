import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Header } from "@/components/dashboard/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/admin")({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/signin", replace: true });
    }

    if (context.user.role !== "admin") {
      throw redirect({ to: "/dashboard", replace: true });
    }

    // `context.queryClient` is also available in our loaders
    // https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query
    // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
  },
  loader: async ({ context }) => {
    return {
      ...context,
    };
  },
});

function DashboardLayout() {
  const state = Route.useLoaderData();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header user={state.user} />

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
