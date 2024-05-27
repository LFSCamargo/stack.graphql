<script lang="ts" setup>
import { BackButton } from "../../components";
import { useRequireAuth } from "../../guards";

useRequireAuth();
</script>

<template>
  <div
    class="w-screen bg-dot-white/20 h-screen flex items-center justify-center"
  >
    <div
      className="absolute pointer-events-none inset-0 hidden md:flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    ></div>
    <div class="flex flex-col p-5 md:max-w-lg animate-fade w-full gap-3">
      <BackButton />
      <div class="flex flex-col p-2 gap-2">
        <img src="/logo-name.svg" class="h-10 w-32" />
        <h1 class="text-2xl">Solicitar Transferência</h1>
        <span class="opacity-40 max-w-xs">
          Para efetuar uma transferência informe-nos alguns dados abaixo
        </span>
      </div>
    </div>
  </div>
</template>
