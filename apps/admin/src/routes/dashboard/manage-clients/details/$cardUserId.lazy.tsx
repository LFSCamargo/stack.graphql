import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { TransactionSkeleton } from "@/components/manage-clients";
import { InjestTransactionModal } from "@/components/modals";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { Breakpoints } from "@/constants/breakpoints";
import { usePaginationState } from "@/hooks/usePaginationState";
import { FormatUtility } from "@/utils/formatting";
import {
  useCardUserByIdQuery,
  useTransactionsByCardUserIdQuery,
} from "@ipe.stack/apollo/generated/react";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

const ClientDetais = () => {
  const isMobile = useMediaQuery(Breakpoints.md);
  const [transactionsModalVisible, setTransactionModalVisible] =
    useState(false);
  const { items, setItems, isFetchingMore, setIsFetchingMore, pageSize } =
    usePaginationState();
  const { cardUserId } = useParams({
    from: "/dashboard/manage-clients/details/$cardUserId",
  });

  const { data, loading } = useCardUserByIdQuery({
    variables: {
      cardUserByIdId: cardUserId,
    },
  });

  const {
    data: transactions,
    loading: loadingTransactions,
    fetchMore,
  } = useTransactionsByCardUserIdQuery({
    variables: {
      cardUserId,
      input: {
        limit: 10,
        offset: 0,
      },
    },
  });

  async function onLoadMore(e: React.SyntheticEvent) {
    e.preventDefault();
    if (isFetchingMore) return;
    const t = toast.loading("Carregando mais transações...");
    try {
      await fetchMore({
        variables: {
          cardUserId,
          input: {
            limit: items + pageSize,
            offset: 0,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });

      setItems((prev) => prev + pageSize);
      setTimeout(() => {
        toast.dismiss(t);
      }, 500);
    } catch (error) {
      toast.error("Erro ao carregar mais transações.", {
        id: t,
      });
    } finally {
      setIsFetchingMore(false);
    }
  }

  return (
    <DashboardLayout
      pageTitle="Detalhes do Cliente"
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
          href: "/dashboard/manage-clients/details/" + cardUserId,
          name:
            loading || !data?.cardUserById?.name
              ? "Detalhes do Cliente"
              : data?.cardUserById?.name,
        },
      ]}
    >
      <div className="flex max-h-screen flex-1 flex-col">
        <div className="flex flex-col gap-1 px-1">
          <h1 className="text-sm tracking-tight opacity-50">
            Detalhes do Cliente
          </h1>
          {!loading && (
            <h1 className="text-2xl font-bold tracking-tight">
              {data?.cardUserById?.name}
            </h1>
          )}
          {loading && <Skeleton className="h-6 w-40" />}
          <p className="opacity-40">
            Aqui você pode visualizar, adicionar, editar e remover clientes.
          </p>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
          <Card className="w-full md:w-auto md:flex-[0.3]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Saldo da Conta
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              {!loading && (
                <div className="text-2xl font-bold">
                  R${Number(data?.cardUserById?.balance ?? 0).toFixed(2)}
                </div>
              )}
              {loading && <Skeleton className="h-8 w-40" />}
              <p className="text-xs text-muted-foreground">
                {Number(data?.cardUserById?.balanceChange || 0) >= 0 && "+"}
                {Number(data?.cardUserById?.balanceChange).toFixed(2)}% em
                comparação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card className="w-full md:w-auto md:flex-[0.5]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium"></CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              {!loading && (
                <div className="text-2xl font-bold">
                  {FormatUtility.formatCreditCard(
                    data?.cardUserById?.cardNumber || "",
                  )}
                </div>
              )}
              {loading && <Skeleton className="h-8 w-52" />}
              {!loading && (
                <p className="text-xs text-muted-foreground">
                  {data?.cardUserById?.name}
                </p>
              )}

              {loading && <Skeleton className="mt-1 h-4 w-40" />}
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-3 mt-4">
          <CardHeader className="relative">
            <CardTitle>Transações</CardTitle>
            <CardDescription>
              Lista de transações realizadas pelo cliente.
            </CardDescription>
            <CardContent className="hidden md:absolute md:right-0 md:block">
              <InjestTransactionModal
                cardUserId={cardUserId}
                visible={transactionsModalVisible}
                onOpenChange={setTransactionModalVisible}
              />
            </CardContent>

            {isMobile && (
              <div className="mt-4 flex w-full flex-1">
                <InjestTransactionModal
                  cardUserId={cardUserId}
                  visible={transactionsModalVisible}
                  onOpenChange={setTransactionModalVisible}
                />
              </div>
            )}
          </CardHeader>
          <CardContent>
            {transactions?.transactionsByCardUserId.data.map((transaction) => (
              <div className="flex items-center py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(Number(transaction.date)).toLocaleDateString(
                      "pt-BR",
                    )}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  R$ {Number(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
            {loadingTransactions && [
              <TransactionSkeleton />,
              <TransactionSkeleton />,
              <TransactionSkeleton />,
            ]}

            {!loadingTransactions &&
              !transactions?.transactionsByCardUserId.data.length && (
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Usuário ainda não possui transações.
                    </p>
                  </div>
                </div>
              )}
          </CardContent>
          {transactions?.transactionsByCardUserId.pageInfo.hasNextPage && (
            <CardFooter>
              <Button
                onClick={onLoadMore}
                disabled={isFetchingMore}
                className="mt-4 flex-1"
              >
                Carregar mais
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export const Route = createLazyFileRoute(
  "/dashboard/manage-clients/details/$cardUserId",
)({
  component: () => <ClientDetais />,
});
