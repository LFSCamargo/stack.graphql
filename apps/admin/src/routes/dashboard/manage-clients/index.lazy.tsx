import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Table } from "@/components/core";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useCardUsersQuery } from "@ipe.stack/apollo/generated/react";
import { Button, Icons } from "@/components/ui";
import { useState } from "react";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

function ManageClients() {
  const navigate = useNavigate();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [items, setItems] = useState(ITEMS_PER_PAGE);
  const { data, loading, fetchMore } = useCardUsersQuery({
    variables: {
      input: {
        limit: ITEMS_PER_PAGE,
      },
    },
  });

  async function onLoadMore(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsFetchingMore(true);
    const t = toast.loading("Carregando mais clientes...");
    try {
      await fetchMore({
        variables: {
          input: {
            limit: items + ITEMS_PER_PAGE,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });

      if (data) {
        setItems(items + ITEMS_PER_PAGE);
      }

      setTimeout(() => {
        toast.dismiss(t);
      }, 500);
    } catch (error) {
      toast.error("Erro ao carregar mais clientes.", {
        id: t,
      });
    } finally {
      setIsFetchingMore(false);
    }
  }

  if (loading) {
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
      >
        <div className="flex h-full items-center justify-center">
          <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

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
    >
      <div className="mb-6 flex flex-col items-center lg:flex lg:flex-row lg:justify-between">
        <div className="hidden w-full flex-1 flex-col gap-1 lg:flex">
          <h1 className="text-2xl font-bold tracking-tight">
            Gerenciamento de clientes
          </h1>
          <p className="opacity-40">
            Aqui você pode visualizar, adicionar, editar e remover clientes.
          </p>
        </div>
        <Button className="w-full lg:mt-4 lg:w-auto" asChild>
          <Link to="/dashboard/manage-clients/add">Adicionar Cliente</Link>
        </Button>
      </div>
      <div className="overflow-x-hidden rounded-2xl border border-white/10">
        <Table
          columns={["Nome", "Número do Cartão", "Saldo"]}
          hiddenColumns={["id"]}
          data={(data?.cardUsers?.data || []).map((user) => ({
            id: user._id,
            Nome: user.name,
            "Número do Cartão": user.cardNumber,
            Saldo: `R$ ${Number(user.balance || 0).toFixed(2)}`,
          }))}
          onRowClick={(row) => {
            navigate({
              to: `/dashboard/manage-clients/details/${row.id}`,
            });
          }}
        />
      </div>
      {data?.cardUsers?.pageInfo.hasNextPage && (
        <div className="mt-5 flex flex-row justify-between px-2">
          <Button disabled={isFetchingMore} onClick={onLoadMore}>
            Carregar Mais
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}

export const Route = createLazyFileRoute("/dashboard/manage-clients/")({
  component: () => <ManageClients />,
});
