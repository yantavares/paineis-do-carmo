// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/art-gallery-pibic/",
  plugins: [react()],
  resolve: {
    alias: {
      // Set the alias
      "src/": "/src/",
    },
  },
});
