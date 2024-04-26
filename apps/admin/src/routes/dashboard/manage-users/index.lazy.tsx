import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createLazyFileRoute } from "@tanstack/react-router";

function ManageUsers() {
  return (
    <DashboardLayout
      pageTitle="Gerenciar Administradores"
      breadcrumbRoutes={[
        {
          href: "/dashboard",
          name: "Dashboard",
        },
        {
          href: "/dashboard/manage-users",
          name: "Gerenciar Administradores",
        },
      ]}
    ></DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/dashboard/manage-users/")({
  component: () => <ManageUsers />,
});
