import { seo } from "@/lib/seo";
import { site } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { DataTable } from "@/components/dashboard/data-table";
import data from "@/components/dashboard/data.json";
import { SectionCards } from "@/components/dashboard/sections-card";

export const Route = createFileRoute("/admin/")({
  component: DashboardIndex,
  head: () => ({
    meta: [
      ...seo({
        title: "Admin Dashboard | " + site.name,
      }),
    ],
  }),
});

function DashboardIndex() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="max-w-full overflow-hidden">
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
