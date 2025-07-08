// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  // TypeScript configuration
  typescript: {
    typeCheck: false // Desabilitado para evitar erros de inicialização
  },
  
  // SSR configuration
  ssr: true,
  
  // CSS Framework
  css: ['~/assets/scss/main.scss'],
  
  // Modules
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  
  // Dev server config
  devServer: {
    port: 3000,
    host: 'localhost'
  },
  
  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  },
  
  // Head configuration
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
  
  // Build configuration
  build: {
    transpile: ['@headlessui/vue', '@heroicons/vue']
  }
})
