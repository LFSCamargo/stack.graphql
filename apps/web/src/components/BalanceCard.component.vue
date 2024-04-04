<script lang="ts" setup>
import { CardUser } from "@ipe.stack/apollo";
import { Avatar } from ".";
import { FormatUtility } from "../utils";

const props = defineProps<{
  cardUser?: CardUser | null;
}>();
</script>

<template>
  <div
    class="flex flex-row md:w-[520px] border-cardBackground overflow-hidden border rounded-3xl"
  >
    <div
      class="flex flex-1 flex-col items-start p-4 md:p-8 bg-cardBackground rounded-2xl"
    >
      <Avatar />
      <div class="flex flex-col mt-2 gap-2">
        <span class="text-background font-medium text-xs">
          Seja bem-vindo, de volta <br />
          <h1 class="text-xl font-semibold">
            {{ props.cardUser?.name }}
          </h1>
        </span>
      </div>

      <span class="text-background mt-4 font-medium text-xs">
        Saldo disponível <br />
        <h1 class="text-2xl font-semibold">
          <small>R$</small>
          {{ Number(props.cardUser?.balance || 0).toFixed(2) }}
        </h1>
      </span>
    </div>
    <div
      class="flex flex-1 bg-background rounded-2xl flex-col justify-between p-4 py-6 items-center"
    >
      <div class="flex-col justify-start items-start flex">
        <div class="md:w-44">
          <span class="text-zinc-400 text-sm font-medium leading-normal">
            Entradas / Mês <br />
          </span>
          <span class="text-white text-base font-bold leading-normal">
            R$
          </span>
          <span class="text-white text-2xl font-medium">
            {{ FormatUtility.formatCurrency(1406.98) }}
          </span>
        </div>
        <div class="flex-col justify-start items-start flex">
          <div
            class="px-2 bg-lime-300 rounded-full justify-start items-start gap-2.5 inline-flex"
          >
            <div class="text-black text-sm font-semibold leading-tight">
              +1.00%
            </div>
          </div>
        </div>
      </div>
      <div class="flex-col justify-center items-start flex">
        <div class="md:w-44">
          <span class="text-zinc-400 text-sm font-medium leading-normal">
            Saídas / Mês <br />
          </span>
          <span class="text-white text-base font-bold leading-normal">
            R$
          </span>
          <span class="text-white text-2xl font-medium">
            {{ FormatUtility.formatCurrency(406.98) }}
          </span>
        </div>
        <div class="flex-col justify-start items-start flex">
          <div
            class="px-2 bg-red-400 rounded-full justify-start items-start gap-2.5 inline-flex"
          >
            <div class="text-black text-sm font-semibold leading-tight">
              -0.03%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
