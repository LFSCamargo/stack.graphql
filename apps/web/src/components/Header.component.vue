<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { Button } from ".";
import { CardUserDocument, useCardUserQuery } from "@ipe.stack/apollo";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { useApolloClient } from "@vue/apollo-composable";

const router = useRouter();
const location = useRoute();
const { client } = useApolloClient();

const isDrawerOpen = ref(false);

const user = localStorage.getItem("user");

const { result } = useCardUserQuery({
  fetchPolicy: "network-only",
  pollInterval: 6000,
});

async function logout() {
  isDrawerOpen.value = false;
  localStorage.clear();

  client.writeQuery({
    query: CardUserDocument,
    data: {
      cardUser: null,
    },
  });

  router.push("/");
}

function goToRoute(route: string) {
  router.push(route);
  isDrawerOpen.value = false;
}

function goToSection(id: string) {
  isDrawerOpen.value = false;
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

    <div
      v-if="isDrawerOpen"
      class="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-50 flex flex-col items-center justify-end"
    >
      <div
        class="bg-black w-full pt-6 max-w-screen-xl rounded-t-3xl ring-1 ring-white/10 backdrop-blur-xl flex flex-col p-4 gap-4 rounded-lg"
      >
        <div class="flex flex-row px-2 justify-between items-center">
          <img src="/logo-name.svg" class="h-8" />
          <button @click="isDrawerOpen = false">
            <XMarkIcon class="w-6 text-white" />
          </button>
        </div>
        <div class="flex flex-col mt-2 gap-4">
          <a
            v-if="location.path === '/'"
            @click="goToSection('about')"
            class="font-light px-2 cursor-pointer"
          >
            Sobre Nós
          </a>
          <a
            v-if="location.path === '/'"
            @click="goToSection('for-you')"
            class="font-light px-2 cursor-pointer"
          >
            Para Você
          </a>
          <a
            v-if="location.path === '/'"
            @click="goToSection('for-your-company')"
            class="font-light px-2 cursor-pointer"
          >
            Para Sua Empresa
          </a>
          <a
            v-if="result?.cardUser || !!user"
            @click="goToRoute('/account')"
            class="font-light px-2 cursor-pointer"
          >
            Minha Conta
          </a>
          <a
            v-if="result?.cardUser || !!user"
            @click="goToRoute('/account')"
            class="font-light px-2 cursor-pointer"
          >
            Alterar Senha do Portal
          </a>
        </div>

        <Button
          v-if="result?.cardUser || !!user"
          @click="logout()"
          variant="primary"
        >
          Sair da Minha Conta
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
