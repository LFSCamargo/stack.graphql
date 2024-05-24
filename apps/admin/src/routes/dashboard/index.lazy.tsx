import { DashboardCard } from "@/components/dashboard/card";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Lock, Users } from "lucide-react";

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
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Seja bem vindo ao painel administrativo do Ipê Bank
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <DashboardCard
            to="/dashboard/manage-clients"
            title="Usuários"
            description="Gerencie os usuários do sistema"
            icon={<Users className="h-6 w-6" />}
          />

          <DashboardCard
            to="/user/change-password"
            title="Alterar Senha"
            description="Altere a senha da sua conta"
            icon={<Lock className="h-6 w-6" />}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/dashboard/")({
  component: Dashboard,
});
