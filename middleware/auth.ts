export default defineNuxtRouteMiddleware((to, from) => {
  const protectedRoutes = ['/projetos/novo', '/projetos/[id]/editar']
  const isProtectedRoute = protectedRoutes.some(route => 
    to.path.includes(route.replace('[id]', '')) || to.path === route
  )
  
  if (process.client && isProtectedRoute) {
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user-data')
    
    if (!token || !userData) {
      return navigateTo('/login')
    }
    
    try {
      JSON.parse(userData)
    } catch (error) {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('user-data')
      return navigateTo('/login')
    }
  }
}) 