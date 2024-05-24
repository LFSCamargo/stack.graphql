import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ChangePasswordForm } from "@/components/user/change-password-form";

function ChangePassword() {
  return (
    <DashboardLayout
      pageTitle="Alterar Senha"
      breadcrumbRoutes={[
        { name: "Dashboard", href: "/dashboard" },
        { name: "Alterar Senha", href: "/user/change-password" },
      ]}
    >
      <ChangePasswordForm />
    </DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/user/change-password")({
  component: () => <ChangePassword />,
});
