import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AddClientForm } from "@/components/manage-clients";

function AddClient() {
  return (
    <DashboardLayout
      pageTitle="Adicionar Cliente"
      breadcrumbRoutes={[
        {
          href: "/dashboard",
          name: "Dashboard",
        },
        {
          href: "/dashboard/manage-clients",
          name: "Gerenciar Clientes",
        },
        {
          href: "/dashboard/manage-clients/add",
          name: "Adicionar Cliente",
        },
      ]}
    >
      <AddClientForm />
    </DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/dashboard/manage-clients/add/")({
  component: () => <AddClient />,
});
