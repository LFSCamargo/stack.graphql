<script lang="ts" setup>
const forYouFeatures = [
  {
    title: "Saques Nos Caixas Da Rede Banco24Horas",
    description: "Saques ilimitados com tarifas abaixo do mercado.",
  },
  {
    title: "Depósitos Por Boleto",
    description: "Emita boletos e traga dinheiro para a sua conta Ipê Bank.",
  },
  {
    title: "Conta e Cartão Exclusivos",
    description:
      "Conta digital, cartão de débito, cartão virtual e crédito pré-pago.",
  },
  {
    title: "Atendimento 24 Horas",
    description:
      "Conte com a gente 24h por dia, 7 dias por semana pelo chat do app.",
  },
  {
    title: "PIX e todas as suas funções",
    description:
      "Pague contas, envie e receba dinheiro sem as taxas do mercado.",
  },
  {
    title: "Transferências e TEDs Ilimitados",
    description:
      "Movimente seu dinheiro para qualquer conta em qualquer banco sem taxas abusivas.",
  },
];
</script>

<template>
  <div id="for-you" class="flex flex-col mx-auto p-4 max-w-screen-xl w-full">
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
          Soluções financeiras para você
        </div>
      </div>

      <div className="py-4 justify-start items-start gap-60 inline-flex">
        <div
          className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex"
        >
          <div
            className="self-stretch text-zinc-900 text-5xl font-normal font-['DM Sans'] leading-10"
          >
            Explore O Que Estamos<br />Fazendo De Melhor para Você
          </div>
          <div
            className=" text-neutral-500 text-lg font-normal font-['DM Sans'] leading-relaxed"
          >
            Revitalizamos a gestão financeira com soluções modernas, elevando a
            experiência tradicional a novos patamares. Descubra como podemos
            transformar sua jornada financeira pessoal.
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap gap-4 md:gap-14 md:p-4">
        <div
          v-for="feature in forYouFeatures"
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
