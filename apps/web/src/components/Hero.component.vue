<script setup lang="ts">
import { SectionTile, GradientText, Button } from ".";

function scrollIntoView(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section
    id="hero"
    class="flex flex-col gap-2 w-screen sm:min-h-[100vh] min-h-[100vh] sm:max-h-screen items-center justify-center overflow-hidden"
  >
    <div
      class="bg-background/50 md:bg-background/0 w-screen h-screen flex-col py-50 gap-1 z-40 items-center justify-center flex animate-fade"
    >
      <img src="/tree-gradient.svg" class="h-" />
      <SectionTile> O equilibrio entre o tradicional e o moderno </SectionTile>
      <GradientText class="text-4xl sm:text-6xl text-center">
        Seja bem-vindo <br />
        ao Ipê Bank
      </GradientText>
      <br />
      <span class="max-w-xs sm:max-w-xl text-center sm:text-lg">
        Uma plataforma digital capaz de oferecer uma boa experiência ao
        utilizador, para que este possa selecionar os benefícios que melhor
        atendem às suas necessidades individuais, sejam estas em relação à saúde
        ou ao seu bem-estar.
      </span>
      <div class="flex mt-6 flex-row gap-2">
        <Button
          @click="scrollIntoView('for-you')"
          variant="primary"
          class="sm:px-6 sm:py-4 text-lg"
        >
          Para Mim
        </Button>
        <Button
          @click="scrollIntoView('for-your-company')"
          variant="primary"
          class="sm:px-6 sm:py-4 text-lg"
        >
          Para Minha Empresa
        </Button>
      </div>
    </div>

    <img
      class="sm:h-[500px] hidden xl:w-[400px] sm:w-[300px] absolute -left-0 top-32 z-0 object-cover rounded-r-3xl lg:block animate-fade-right"
      src="/img/hero-4.png"
      alt=""
    />
    <img
      class="md:h-[250px] md:w-[400px] hidden h-[250px] w-[120px] absolute right-0 top-28 z-0 object-cover rounded-l-3xl lg:block animate-fade-left"
      src="/img/ipe-card.png"
      alt=""
    />
    <img
      class="h-[180px] w-[150px] sm:w-[300px] xl:w-[500px] lg:w-[400px] absolute bottom-0 left-0 lg:left-32 z-0 object-cover rounded-tr-3xl lg:rounded-t-3xl lg:block animate-fade-up"
      src="/img/hero-3.png"
      alt=""
    />
    <img
      class="xl:h-[300px] h-[240px] w-[100px] sm:w-[280px] lg:w-[400px] absolute bottom-0 right-0 lg:right-20 z-0 object-cover rounded-tl-3xl lg:rounded-t-3xl lg:block animate-fade-up"
      src="/img/hero-4.png"
      alt=""
    />
    <div
      class="w-full absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent animate-fade-up to-background"
    ></div>
  </section>
</template>
