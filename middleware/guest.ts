export default defineNuxtRouteMiddleware((to, from) => {
  // Verificar apenas no cliente
  if (process.client) {
    // Verificar se há token no localStorage
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user-data')
    
    // Se há token e dados de usuário, redirecionar para projetos
    if (token && userData) {
      try {
        JSON.parse(userData)
        // Usuário autenticado tentando acessar página de login
        return navigateTo('/projetos')
      } catch (error) {
        // Dados corrompidos, limpar
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
      }
    }
  }
}) 