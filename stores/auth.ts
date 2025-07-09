import { defineStore } from 'pinia'
import type { Usuario, LoginInput, LoginResponse } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref<Usuario | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const config = useRuntimeConfig()
  const login = async (credentials: LoginInput): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<Usuario[]>(`${config.public.apiBase}/usuarios`, {
        query: {
          email: credentials.email,
          senha: credentials.senha
        }
      })

      if (response.length === 0) {
        throw new Error('Credenciais inválidas')
      }

      const foundUser = response[0]
      
      const loginResponse: LoginResponse = {
        usuario: {
          id: foundUser.id,
          email: foundUser.email,
          nome: foundUser.nome,
          token: foundUser.token
        },
        token: foundUser.token
      }

      usuario.value = loginResponse.usuario
      isAuthenticated.value = true

      if (process.client) {
        localStorage.setItem('auth-token', loginResponse.token)
        localStorage.setItem('user-data', JSON.stringify(loginResponse.usuario))
      }

      return true
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer login'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    usuario.value = null
    isAuthenticated.value = false
    error.value = null

    if (process.client) {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('user-data')
    }

    navigateTo('/login')
  }

  const checkAuth = () => {
    if (process.client) {
      const token = localStorage.getItem('auth-token')
      const userData = localStorage.getItem('user-data')

      if (token && userData) {
        try {
          usuario.value = JSON.parse(userData)
          isAuthenticated.value = true
          return true
        } catch (error) {
          logout()
          return false
        }
      }
    }
    return false
  }

  const clearError = () => {
    error.value = null
  }

  const getToken = computed(() => {
    if (process.client) {
      return localStorage.getItem('auth-token')
    }
    return null
  })

  const getUserName = computed(() => usuario.value?.nome || '')

  if (process.client) {
    checkAuth()
  }

  return {
    usuario: readonly(usuario),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    login,
    logout,
    checkAuth,
    clearError,
    
    getToken,
    getUserName
  }
}) 