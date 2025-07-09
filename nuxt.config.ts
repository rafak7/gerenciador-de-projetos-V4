export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  typescript: {
    typeCheck: false
  },
  
  ssr: true,
  
  css: ['~/assets/scss/main.scss'],
  
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  
  devServer: {
    port: 3000,
    host: 'localhost'
  },
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  },
  
  app: {
    head: {
      title: 'Gerenciador de Projetos',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sistema de gerenciamento de projetos com Vue 3 e Nuxt 3' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  build: {
    transpile: ['@headlessui/vue', '@heroicons/vue']
  }
})
