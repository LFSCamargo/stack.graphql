import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

function RequestDetails() {
  const { requestId } = useParams({
    from: "/dashboard/requests/$requestId",
  });
  return (
    <DashboardLayout
      pageTitle="Detalhes da solicitação"
      breadcrumbRoutes={[
        {
          href: "/dashboard",
          name: "Dashboard",
        },
        {
          href: "/dashboard/requests",
          name: "Solicitações",
        },
        {
          href: "/dashboard/requests/" + requestId,
          name: "Detalhes da solicitação",
        },
      ]}
    ></DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/dashboard/requests/$requestId")({
  component: () => <RequestDetails />,
});
