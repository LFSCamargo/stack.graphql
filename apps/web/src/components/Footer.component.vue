<template>
  <footer class="pt-20">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="sm:flex items-start sm:justify-between">
        <div class="flex text-teal-600 sm:justify-start">
          <img src="/logo-name.svg" />
        </div>

        <div class="flex flex-row my-10 sm:my-0 flex-wrap gap-10">
          <div class="flex flex-col gap-3">
            <span class="text-neutral-500">Soluções</span>
            <a class="">Para Você</a>
            <a class="">Para sua Empresa</a>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-neutral-500">Outros</span>
            <a class="">Sobre Nós</a>
            <a class="">Seja Ipê Bank</a>
            <a class="">Acessar Conta Cartão</a>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <a
            href="https://x.com/ipebank"
            class="h-14 p-1 bg-white rounded-full justify-start items-center gap-4 pr-5 inline-flex"
          >
            <div class="cursor-pointer w-12 h-12 relative">
              <div
                class="w-12 h-12 left-0 top-0 absolute bg-lime-300 rounded-full flex items-center justify-center"
              >
                <img src="/twitter.svg" class="w-6" />
              </div>
              <div
                class="w-6 h-6 px-1.5 left-[12px] top-[12px] absolute justify-center items-center inline-flex"
              ></div>
            </div>
            <div
              class="grow shrink basis-0 text-zinc-900 text-base font-medium font-['DM Sans'] leading-normal"
            >
              Siga-nos no X
            </div>
          </a>
          <a
            href="https://www.instagram.com/ipebank/"
            class="h-14 p-1 bg-white rounded-full justify-start items-center gap-4 pr-5 inline-flex"
          >
            <div class="w-12 h-12 relative">
              <div
                class="w-12 h-12 left-0 top-0 absolute bg-lime-300 rounded-full flex items-center justify-center"
              ></div>
              <div
                class="w-6 h-6 px-0 left-[12px] top-[12px] absolute items-center justify-center inline-flex"
              >
                <img src="/instagram.svg" class="w-96" />
              </div>
            </div>
            <div
              class="grow shrink basis-0 text-zinc-900 text-base font-medium font-['DM Sans'] leading-normal"
            >
              Siga-nos no Instagram
            </div>
          </a>
        </div>
      </div>
    </div>
    <img src="/waves.svg" class="relative bottom-0 left-0" />
  </footer>
</template>
