import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: true,
  plugins: [vue(), pages()],
  server: {
    port: 3000,
  },
});
