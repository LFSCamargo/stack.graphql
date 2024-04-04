<script lang="ts" setup>
const forYourCompanyFeatures = [
  {
    title: "Empréstimos E Financiamentos",
    description:
      "Antecipação de recebíveis, Financiamento de Imóveis, Financiamento de Veículos",
  },
  {
    title: "TAG Veículos",
    description:
      "Economize tempo e dinheiro com nosso TAG para pedágio e estacionamento.",
  },
  {
    title: "Maquininha de Cartão ",
    description:
      "Mais do que uma maquininha, tem conta, cartão e muito mais, com as menores tarifas.",
  },
  {
    title: "Benefícios",
    description: "Ofertas exclusivas para você aproveitar.",
  },
  {
    title: "Investimentos",
    description: "Invista em renda fixa e variável.",
  },
  {
    title: "Câmbio",
    description:
      "Envio e recebimento de valores ao exterior com agilidade e menor custo.",
  },
  {
    title: "Market Place",
    description: "Milhares de produtos e descontos exclusivos.",
  },
  {
    title: "Cartão De Crédito",
    description: "Faça suas compras presenciais e eletrônicas.",
  },
];
</script>

<template>
  <div
    id="for-your-company"
    class="flex flex-col mx-auto p-4 max-w-screen-xl w-full"
  >
    <div
      class="bg-cardBackground pb-20 rounded-3xl w-full text-black p-10 md:p-16"
    >
      <div
        className="w-full h-9 pb-4 border-b border-zinc-300 justify-start items-center gap-2 inline-flex"
      >
        <div className="w-2 h-2 bg-emerald-950 rounded-full" />
        <div
          className="text-zinc-900 text-sm font-medium font-['DM Sans'] leading-tight"
        >
          Soluções financeiras para sua empresa
        </div>
      </div>

      <div className="py-4 justify-start items-start gap-60 inline-flex">
        <div
          className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex"
        >
          <div
            className="self-stretch text-zinc-900 text-5xl font-normal font-['DM Sans'] leading-10"
          >
            Explore O Que Estamos <br />
            Fazendo De Melhor para sua Empresa
          </div>
          <div
            className=" text-neutral-500 text-lg font-normal font-['DM Sans'] leading-relaxed"
          >
            Modernizamos a gestão financeira empresarial, combinando inovação
            com a solidez da tradição. Explore nossas soluções e leve sua
            empresa a novos horizontes financeiros
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap gap-4 md:gap-14 md:p-4">
        <div
          v-for="feature in forYourCompanyFeatures"
          :key="feature.title"
          className="w-full max-w-xs flex-col justify-start items-start inline-flex"
        >
          <div
            className="w-12 h-12 mb-2 py-3 bg-lime-300 rounded-lg justify-center items-center inline-flex"
          />
          <div
            className="self-stretch flex-col justify-start items-start gap-3 flex"
          >
            <div
              className="self-stretch text-zinc-900 text-2xl font-medium font-['DM Sans'] leading-9"
            >
              {{ feature.title }}
            </div>
            <div
              className="self-stretch opacity-80 text-neutral-500 text-base font-normal font-['DM Sans'] leading-normal"
            >
              {{ feature.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
