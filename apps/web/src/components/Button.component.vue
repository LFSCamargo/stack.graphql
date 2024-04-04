<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps<{
  variant: "primary" | "outline";
}>();

const className = computed(() => {
  return props.variant === "primary"
    ? "inline-flex items-center gap-2 bg-mainGreen p-2 px-4 !text-black rounded-full hover:ring-2 hover:ring-white/10 active:ring-2 active:ring-white/30 transition-all"
    : "inline-flex items-center gap-2 bg-transparent border border-white/30 p-2 px-4 !text-white rounded-full hover:ring-2 hover:ring-white/10 active:ring-2 active:ring-white/30 transition-all";
});
</script>

<template>
  <button :class="className">
    <slot />
  </button>
</template>
