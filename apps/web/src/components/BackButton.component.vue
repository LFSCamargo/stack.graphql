<script setup lang="ts">
import { defineProps } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const props = defineProps<{
  to?: string;
}>();

const router = useRouter();

const goBack = () => {
  if (props.to) {
    return router.push(props.to);
  }

  return router.back();
};
</script>

<template>
  <div
    @click="goBack()"
    class="w-24 h-10 justify-start cursor-pointer items-center gap-2.5 inline-flex"
  >
    <div
      class="p-3 bg-white rounded-2xl justify-center items-center gap-2.5 flex"
    >
      <ArrowLeftIcon class="w-5 h-5 text-black" />
    </div>
    <div
      class="text-white text-base font-normal font-['DM Sans'] leading-normal"
    >
      Voltar
    </div>
  </div>
</template>
