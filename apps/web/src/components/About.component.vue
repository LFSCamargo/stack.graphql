<script lang="ts" setup>
const sectionInfo = [
  {
    value: "1007+",
    label: "Usuários Cadastrados",
  },
  {
    value: "630",
    label: "Clientes",
  },
  {
    value: "74",
    label: "Empresas",
  },
  {
    value: "100%",
    label: "De Sucesso",
  },
];
</script>

<template>
  <section
    id="about"
    class="flex flex-col-reverse md:flex-row gap-10 mx-auto py-10 md:py-40 justify-between max-w-screen-xl p-4 md:p-10"
  >
    <div class="flex max-w-2xl p-4 md:p-0 flex-1 w-full flex-col gap-10">
      <span class="md:text-lg">
        Uma plataforma digital capaz de oferecer uma boa experiência ao
        utilizador, para que este possa selecionar os benefícios que melhor
        atendem às suas necessidades individuais, sejam estas em relação à saúde
        ou ao seu bem-estar Transformação Digital de todos os processos
        associados a benefícios para que estes se tornem mais eficazes e
        eficientes, em conformidade com a estrutura de segurança de dados
      </span>
      <div class="grid grid-cols-2 md:flex md:flex-col gap-4">
        <div
          v-for="info in sectionInfo"
          :key="info.label"
          className=" flex-col justify-start items-start gap-2 inline-flex"
        >
          <div
            className="self-stretch text-white text-5xl font-normal font-['DM Sans'] leading-10"
          >
            {{ info.value }}
          </div>
          <div
            className="self-stretch text-white text-lg font-normal font-['DM Sans'] leading-relaxed"
          >
            {{ info.label }}
          </div>
        </div>
      </div>
    </div>
    <img
      class="max-w-[600px] object-cover flex rounded-2xl"
      src="/img/about.avif"
      alt=""
    />
  </section>
</template>
