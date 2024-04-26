import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createLazyFileRoute } from "@tanstack/react-router";

function Requests() {
  return (
    <DashboardLayout
      pageTitle="Solicitações"
      breadcrumbRoutes={[
        {
          href: "/dashboard",
          name: "Dashboard",
        },
        {
          href: "/dashboard/requests",
          name: "Solicitações",
        },
      ]}
    ></DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/dashboard/requests/")({
  component: () => <Requests />,
});
