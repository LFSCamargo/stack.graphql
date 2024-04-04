<template>
  <div class="flex flex-row gap-2 items-center">
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.954651" width="12" height="12" rx="2" fill="#BEF264" />
      <circle cx="6.5" cy="6.95465" r="4" fill="#022C22" />
    </svg>

    <span class="text-xs sm:text-base">
      <slot />
    </span>
  </div>
</template>
