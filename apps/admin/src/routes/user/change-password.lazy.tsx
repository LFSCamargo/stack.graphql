import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createLazyFileRoute } from "@tanstack/react-router";

function ChangePassword() {
  return (
    <DashboardLayout
      pageTitle="Alterar Senha"
      breadcrumbRoutes={[
        { name: "Dashboard", href: "/dashboard" },
        { name: "Alterar Senha", href: "/user/change-password" },
      ]}
    >
      <div>Hello /user/change-password!</div>
    </DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/user/change-password")({
  component: () => <ChangePassword />,
});
