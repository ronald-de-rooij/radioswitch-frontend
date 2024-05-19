export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts', '@nuxtjs/tailwindcss', 'nuxt-primevue'],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  primevue: {
    options: {
      ripple: true,
      unstyled: true,
      ptOptions: {
        mergeProps: true,
      },
    },
    importPT: { as: 'Lara', from: '~/presets/lara' },
  },
  ssr: false,
  tailwindcss: {
    exposeConfig: false,
    cssPath: ['~/assets/css/tailwind.scss', { injectPosition: 0 }],
    configPath: 'tailwind.config',
    viewer: true,
  },
})
