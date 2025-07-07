export default defineNuxtRouteMiddleware((to, from) => {
  // Verificar se está tentando acessar uma rota protegida
  const protectedRoutes = ['/projetos/novo', '/projetos/[id]/editar']
  const isProtectedRoute = protectedRoutes.some(route => 
    to.path.includes(route.replace('[id]', '')) || to.path === route
  )
  
  // Verificar autenticação apenas no cliente
  if (process.client && isProtectedRoute) {
    // Verificar se há token no localStorage
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user-data')
    
    // Se não há token ou dados de usuário, redirecionar para login
    if (!token || !userData) {
      return navigateTo('/login')
    }
    
    // Verificar se os dados são válidos
    try {
      JSON.parse(userData)
    } catch (error) {
      // Dados corrompidos, limpar e redirecionar
      localStorage.removeItem('auth-token')
      localStorage.removeItem('user-data')
      return navigateTo('/login')
    }
  }
}) 