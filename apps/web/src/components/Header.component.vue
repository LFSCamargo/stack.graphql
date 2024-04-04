<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { Button } from ".";
import { useCardUserQuery } from "@ipe.stack/apollo";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const router = useRouter();
const location = useRoute();

const isDrawerOpen = ref(false);

const user = localStorage.getItem("user");

const { result } = useCardUserQuery({
  fetchPolicy: "network-only",
  pollInterval: 6000,
});

function goToRoute(route: string) {
  router.push(route);
}

function goToSection(id: string) {
  if (location.path !== "/") {
    router.push("/");
  }
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <div
    class="flex flex-1 p-4 w-full items-center justify-center fixed top-0 right-0 z-50"
  >
    <div
      class="animate-fade-down ring-1 ring-white/10 animate-delay-100 max-w-screen-xl bg-black w-full flex flex-row justify-between p-3 pl-4 rounded-full items-center w3-animate-top"
    >
      <div class="flex flex-row pl-2 items-center gap-8">
        <RouterLink to="/">
          <img src="/logo-name.svg" class="h-8" />
        </RouterLink>

        <div class="hidden md:flex flex-row gap-5">
          <a @click="goToSection('about')" class="font-light cursor-pointer">
            Sobre Nós
          </a>
          <a @click="goToSection('for-you')" class="font-light cursor-pointer">
            Para Você
          </a>
          <a
            @click="goToSection('for-your-company')"
            class="font-light cursor-pointer"
          >
            Para Sua Empresa
          </a>
          <a @click="goToSection('contact')" class="font-light cursor-pointer">
            Contato
          </a>
        </div>
      </div>

      <div class="flex md:hidden">
        <button @click="isDrawerOpen = true" class="px-4">
          <Bars3Icon class="w-6" />
        </button>
      </div>

      <div class="hidden md:flex flex-wrap flex-row items-center gap-2">
        <Button
          v-if="result?.cardUser || !!user"
          @click="goToRoute('/account')"
          variant="primary"
        >
          Minha Conta
        </Button>
        <Button
          v-if="!result?.cardUser"
          @click="goToRoute('/auth/login')"
          variant="primary"
        >
          Acessar Conta Cartão
        </Button>
        <Button v-if="!result?.cardUser" variant="outline">
          Seja Ipê Bank
        </Button>
      </div>
    </div>
  </div>
</template>
