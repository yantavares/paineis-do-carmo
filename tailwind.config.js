/** @type {import('tailwindcss').Config} */
export default {
  files: [],
  references: [
    {
      path: "./tsconfig.app.json",
    },
    {
      path: "./tsconfig.node.json",
    },
  ],
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
};
