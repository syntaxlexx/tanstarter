import LogoutButton from "@/components/logout-button";
import { seo } from "@/lib/seo";
import { site } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
  head: () => ({
    meta: [
      ...seo({
        title: "Dashboard | " + site.name,
      }),
    ],
  }),
});

function DashboardIndex() {
  return (
    <div className="container pt-16">
      <div className="space-y-4">
        <p>Dashboard index page</p>

        <LogoutButton />
      </div>
    </div>
  );
}
