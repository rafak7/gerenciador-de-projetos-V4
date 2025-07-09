<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Carregando...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user-data')
    
    if (token && userData) {
      try {
        JSON.parse(userData)
        navigateTo('/projetos')
      } catch (error) {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
        navigateTo('/login')
      }
    } else {
      navigateTo('/login')
    }
  }
})

useHead({
  title: 'Gerenciador de Projetos'
})
</script> 