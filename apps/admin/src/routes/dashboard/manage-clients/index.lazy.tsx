import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createLazyFileRoute } from "@tanstack/react-router";

function ManageClients() {
  return (
    <DashboardLayout
      pageTitle="Gerenciar Clientes"
      breadcrumbRoutes={[
        {
          href: "/dashboard",
          name: "Dashboard",
        },
        {
          href: "/dashboard/manage-users",
          name: "Gerenciar Clientes",
        },
      ]}
    ></DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/dashboard/manage-clients/")({
  component: () => <ManageClients />,
});
