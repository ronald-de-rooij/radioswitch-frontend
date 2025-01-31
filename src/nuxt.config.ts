export default defineNuxtConfig({
  compatibilityDate: '2025-01-08',

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    appManifest: false,
  },

  devtools: { enabled: true },
  ssr: false,
  components: [{ path: '~/components', pathPrefix: false }],
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
  ],

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },

  primevue: {
    options: {
      theme: 'none',
      ripple: true,
      ptOptions: {
        mergeProps: true,
      },
    },
  },

  css: ['primeicons/primeicons.css'],

  tailwindcss: {
    exposeConfig: false,
    cssPath: ['~/assets/tailwind.scss', { injectPosition: 0 }],
    configPath: 'tailwind.config',
    viewer: true,
  },

  imports: {
    presets: [
      {
        from: 'zod',
        imports: ['z'],
      },
      {
        from: '@primevue/forms/resolvers/zod',
        imports: ['zodResolver'],
      },
    ],
  },

})
