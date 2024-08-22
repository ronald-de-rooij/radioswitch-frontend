import path from 'node:path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  components: [{ path: '~/components', pathPrefix: false }],
  modules: ['@nuxtjs/google-fonts', '@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-primevue'],
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
    importPT: { from: path.resolve(__dirname, './presets/lara/') },
  },
  css: ['primeicons/primeicons.css'],
  tailwindcss: {
    exposeConfig: false,
    cssPath: ['~/assets/css/tailwind.scss', { injectPosition: 0 }],
    configPath: 'tailwind.config',
    viewer: true,
  },
})
