export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user-data')
    
    if (token && userData) {
      try {
        JSON.parse(userData)
        return navigateTo('/projetos')
      } catch (error) {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
      }
    }
  }
}) 