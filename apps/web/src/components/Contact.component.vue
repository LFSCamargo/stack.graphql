<script lang="ts" setup>
import { Button } from ".";
</script>

<template>
  <div
    id="contact"
    class="flex flex-col-reverse md:flex-row items-center gap-10 mx-auto justify-between max-w-screen-xl p-4 md:p-10"
  >
    <div class="flex max-w-2xl p-4 md:p-0 flex-1 w-full flex-col gap-2">
      <div class="p-2">
        <h1 class="text-4xl font-normal">Contato Rápido</h1>
        <span class="md:text-lg">
          Em caso de dúvidas, vamos ajudá-lo através do nosso Atendimento
        </span>
      </div>
      <div class="flex flex-col gap-3">
        <input placeholder="Nome" type="text" autocomplete="off" />
        <input placeholder="Sobrenome" type="text" autocomplete="off" />
        <input
          placeholder="Email para contato"
          autocomplete="off"
          type="text"
        />

        <div>
          <Button variant="primary" class="p-4 px-6">
            Enviar Informações
          </Button>
        </div>
      </div>
    </div>
    <img
      class="max-w-[600px] w-full max-h-[500px] object-cover flex rounded-2xl"
      src="/img/contact.avif"
      alt=""
    />
  </div>
</template>
