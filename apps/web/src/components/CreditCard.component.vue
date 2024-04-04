<script lang="ts" setup>
import { CardUser } from "@ipe.stack/apollo";
import { FormatUtility } from "../utils";

const props = defineProps<{
  cardUser?: CardUser | null;
}>();
</script>

<template>
  <div
    class="w-full md:w-[400px] h-[230px] bg-dot-white/10 flex-col flex items-start p-8 justify-end bg-background rounded-3xl ring-1 ring-cardBackground/30"
  >
    <div class="flex flex-row w-full justify-end items-end">
      <img src="/elo.svg" class="w-16 rela top-0 right-0 mb-16" />
    </div>
    <span class="text-xs"> Numero do Cartão </span>
    <span class="text-2xl">
      {{
        FormatUtility.formatCreditCard(props?.cardUser?.cardNumber || "")
      }}</span
    >
  </div>
</template>
