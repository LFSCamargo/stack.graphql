<script setup lang="ts">
import { Toaster } from "vue-sonner";
import { Header } from "./components";
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <Toaster theme="dark" position="bottom-right" />
  </div>
</template>
