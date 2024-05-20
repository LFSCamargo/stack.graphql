<script lang="ts" setup>
import { BuildingLibraryIcon } from "@heroicons/vue/24/outline";
import { BackButton } from "../../../components";
import { useRequireAuth } from "../../../guards";
import { useRouter } from "vue-router";

useRequireAuth();

const router = useRouter();

function selectTransfer(e: MouseEvent, path: string) {
  e.preventDefault();
  router.push(path);
}
</script>

<template>
  <div
    class="w-screen bg-dot-white/20 h-screen flex items-center justify-center"
  >
    <div
      className="absolute pointer-events-none inset-0 hidden md:flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    ></div>
    <form class="flex flex-col p-5 md:max-w-lg animate-fade w-full gap-3">
      <BackButton />
      <div class="flex flex-col p-2 gap-2">
        <img src="/logo-name.svg" class="h-10 w-32" />
        <h1 class="text-2xl">Solicitar Transferência</h1>
        <span class="opacity-40 max-w-xs">
          Qual o tipo de transferência que deseja realizar?
        </span>
        <div class="flex flex-1 flex-col gap-4 items-center mt-3">
          <button
            class="bg-white/80 text-black flex font-light justify-between flex-1 items-center p-2 rounded-full w-full px-4"
            @click="selectTransfer($event, 'withdrawal-request/pix-withdrawal')"
          >
            Solicitar Pix (até 1 dia útil)
            <img src="/pix.svg" class="w-5" />
          </button>
          <button
            class="bg-white/80 font-light text-black flex-1 justify-between items-center flex p-2 rounded-full w-full px-4"
            @click="selectTransfer($event, 'withdrawal-request/ted-withdrawal')"
          >
            TED (até 2 dias úteis)
            <BuildingLibraryIcon class="w-5" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
