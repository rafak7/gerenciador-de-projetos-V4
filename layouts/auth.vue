<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div class="flex min-h-screen items-center justify-center p-6">
      <div class="w-full max-w-md">
        <!-- Logo/Title -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Gerenciador de Projetos
          </h1>
          <p class="text-gray-600 dark:text-gray-300 mt-2">
            Faça login para acessar o sistema
          </p>
        </div>

        <!-- Card Container -->
        <div class="card">
          <NuxtPage />
        </div>

        <!-- Footer -->
        <div class="text-center mt-6">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            © {{ currentYear }} Gerenciador de Projetos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <NotificationContainer />

    <!-- Loading Overlay -->
    <LoadingOverlay v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
// Stores
const uiStore = useUIStore()
const { isLoading } = storeToRefs(uiStore)

// Current year for footer
const currentYear = new Date().getFullYear()

// SEO
useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script> 