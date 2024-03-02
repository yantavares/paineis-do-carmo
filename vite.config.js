// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/paineis-do-carmo/",
  plugins: [react()],
  resolve: {
    alias: {
      "src/": "/src/",
    },
  },
});
