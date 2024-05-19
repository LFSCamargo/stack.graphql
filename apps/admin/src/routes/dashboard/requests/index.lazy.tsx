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
    >
      <div className="mb-6 flex flex-col items-center lg:flex lg:flex-row lg:justify-between">
        <div className="mb-4 flex w-full flex-1 flex-col gap-1 lg:mb-0">
          <h1 className="text-2xl font-bold tracking-tight">Solicitações</h1>
          <p className="opacity-40">
            Aqui você pode visualizar, aceitar, rejeitar: Saques PIX/TED e
            alterações de senha do cartão.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/dashboard/requests/")({
  component: () => <Requests />,
});
