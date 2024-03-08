export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],
  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  css: ["primevue/resources/themes/lara-dark-teal/theme.css"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
  ssr: false,
  tailwindcss: {
    exposeConfig: false,
    cssPath: ["~/assets/css/tailwind.scss", { injectPosition: 0 }],
    configPath: "tailwind.config",
    viewer: true,
  },
})
