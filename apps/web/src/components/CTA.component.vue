<script setup lang="ts">
import { SectionTile, Button } from ".";
</script>

<template>
  <div id="contact" class="bg-[url('/bg.svg')] bg-cover">
    <div
      class="sm:bg-black/50 bg-black/10 md:bg-black/0 py-44 flex-col gap-1 z-40 px-10 items-center justify-center flex animate-fade"
    >
      <SectionTile> O equilibrio entre o tradicional e o moderno </SectionTile>
      <span class="text-3xl sm:text-6xl text-center">
        Nós Vamos Ajudá-Lo <br />
        A Cada Passo Do Caminho
      </span>
      <br />
      <span class="max-w-xs sm:max-w-xl text-center sm:text-lg">
        Melhorar o compromisso dos funcionários, controlar os custos e riscos do
        empregador e automatizar a administração do plano de benefícios. A
        plataforma permitirá diminuir o custo médio por utilizador, em
        comparação com a solução previamente integrada.
      </span>
      <div class="flex mt-6 flex-row gap-2">
        <Button variant="primary" class="sm:px-6 sm:py-4 text-lg">
          Seja Ipe Bank
        </Button>
      </div>
    </div>
  </div>
</template>
