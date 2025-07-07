<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Carregando...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Verificar autenticação e redirecionar
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user-data')
    
    if (token && userData) {
      try {
        JSON.parse(userData)
        // Usuário autenticado, redirecionar para projetos
        navigateTo('/projetos')
      } catch (error) {
        // Dados corrompidos, limpar e ir para login
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
        navigateTo('/login')
      }
    } else {
      // Usuário não autenticado, ir para login
      navigateTo('/login')
    }
  }
})

// SEO
useHead({
  title: 'Gerenciador de Projetos'
})
</script> 