<script setup lang="ts">
import dayjs from "dayjs";
import { Button, BalanceCard, CreditCard } from "../../components";
import {
  useCardUserQuery,
  CardUserDocument,
  CardUser,
} from "@ipe.stack/apollo";
import { useRouter } from "vue-router";
import { useRequireAuth } from "../../guards";
import { useCardUserPaginatedTransactions } from "../../hooks";
import { useApolloClient } from "@vue/apollo-composable";
import { onMounted } from "vue";

const { result, refetch } = useCardUserQuery();
const { client } = useApolloClient();
const router = useRouter();

useRequireAuth();

onMounted(() => {
  refetch();
});

const { data, fetchMoreTransactions } = useCardUserPaginatedTransactions();

async function logout() {
  localStorage.clear();

  client.writeQuery({
    query: CardUserDocument,
    data: {
      cardUser: null,
    },
  });

  router.push("/auth/login");
}
</script>

<template>
  <div class="bg-dot-white/20 items-center min-h-screen flex-col">
    <div
      class="max-w-screen-xl animate-fade flex flex-col p-4 pt-32 md:pt-40 mx-auto gap-10"
    >
      <div class="flex flex-col">
        <div class="flex flex-col px-2 animate-fade-left pb-4">
          <span class="t"> Conta Cartão </span>
          <span class="text-4xl md:text-2xl"> Minha Conta </span>
        </div>
        <!-- User Balance and Credit Card Information -->
        <div
          v-if="!!result?.cardUser"
          class="flex animate-fade-right flex-col md:flex-row gap-4"
        >
          <BalanceCard :card-user="result?.cardUser as CardUser" />
          <CreditCard :card-user="result?.cardUser as CardUser" />
        </div>
        <!-- Actions -->
        <div class="flex flex-col animate-fade-up pb-4 mt-6">
          <span class="text-xs"> Ações </span>
          <div class="flex flex-row flex-wrap mt-4 gap-2">
            <Button
              @click="router.push('/account/withdrawal-request')"
              variant="primary"
            >
              Solicitar Transfência
            </Button>
            <Button
              @click="router.push('/account/request-card-password-change')"
              variant="primary"
            >
              Alterar Senha do Cartão
            </Button>
            <Button
              @click="router.push('/account/change-password')"
              variant="primary"
            >
              Alterar Senha do Portal
            </Button>
            <Button
              @click="router.push('/account/change-password')"
              variant="primary"
            >
              Ver Extrato
            </Button>
            <Button @click="logout()" variant="outline">Sair da Conta</Button>
          </div>
        </div>
      </div>
      <!-- Transactions -->
      <div class="flex flex-col flex-1 animate-fade-up">
        <div class="flex flex-col px-2">
          <span class="text-xs"> Conta Cartão </span>
          <span class="text-2xl font-medium"> Transaçãoes </span>
        </div>
        <div class="mt-4 flex flex-col gap-4">
          <div
            v-for="transaction in data?.cardUserTransactions.data"
            :key="transaction._id"
            class="w-full px-3.5 py-2.5 bg-neutral-700/30 rounded-2xl backdrop-blur-xl justify-start items-center gap-3 inline-flex"
          >
            <div
              class="grow shrink basis-0 justify-start items-center gap-3 flex"
            >
              <div class="flex-col justify-start items-start gap-1 inline-flex">
                <div
                  class="self-stretch justify-start items-start gap-1.5 inline-flex"
                >
                  <div
                    class="text-white px-2 text-base font-medium leading-snug"
                  >
                    {{ transaction.description }}
                  </div>
                </div>
              </div>
              <div
                class="grow shrink basis-0 flex-col justify-start items-end gap-1 inline-flex"
              >
                <div
                  class="w-28 px-2 justify-start items-start gap-1.5 inline-flex"
                >
                  <div
                    class="grow shrink basis-0 text-right text-lime-300 text-base font-medium leading-snug"
                  >
                    R$ {{ transaction.amount.toFixed(2) }}
                  </div>
                </div>
                <div class="flex-col justify-start items-start gap-1 flex">
                  <div
                    class="self-stretch text-sm text-right text-neutral-400 font-medium leading-snug"
                  >
                    {{
                      dayjs(transaction.createdAt).format("DD/MM/YYYY HH:mm")
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            v-if="data?.cardUserTransactions.pageInfo.hasNextPage"
            variant="primary"
            @click="fetchMoreTransactions()"
          >
            Carregar mais
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
