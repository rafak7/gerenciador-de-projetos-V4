<template>
  <div class="login-page" :class="{ dark: uiStore.darkMode }">
    
    <div class="theme-toggle">
      <button @click="uiStore.toggleDarkMode()" class="theme-toggle-btn">
        <svg v-if="!uiStore.darkMode" class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <svg v-else class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    </div>

    <div class="login-container">
      <div class="login-card">
        
        <div class="login-header">
          <h1 class="login-title">
            Gerenciador de Projetos
          </h1>
          <p class="login-subtitle">
            Faça login para acessar o sistema
          </p>
        </div>

        
        <NuxtPage />

        
        <div class="login-footer">
          <p class="copyright">
            © {{ currentYear }} Gerenciador de Projetos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>

    
    <NotificationContainer />

    
    <LoadingOverlay v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
const uiStore = useUIStore()
const { isLoading } = storeToRefs(uiStore)

const currentYear = new Date().getFullYear()

useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script> 