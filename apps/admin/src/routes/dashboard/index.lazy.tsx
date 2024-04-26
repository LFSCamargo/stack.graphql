import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createLazyFileRoute } from "@tanstack/react-router";

function Dashboard() {
  return (
    <DashboardLayout
      pageTitle="Dashboard"
      breadcrumbRoutes={[
        {
          href: "/dashboard",
          name: "Dashboard",
        },
      ]}
    ></DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/dashboard/")({
  component: Dashboard,
});
