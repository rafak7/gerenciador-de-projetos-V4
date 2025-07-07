import { defineStore } from 'pinia'
import type { Notification } from '~/types'

export const useUIStore = defineStore('ui', () => {
  // State
  const sidebarOpen = ref(false)
  const darkMode = ref(false)
  const notifications = ref<Notification[]>([])
  const loading = ref({
    global: false,
    page: false
  })

  // Actions
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  const openSidebar = () => {
    sidebarOpen.value = true
  }

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    
    // Persistir preferência
    if (process.client) {
      localStorage.setItem('dark-mode', darkMode.value.toString())
      
      // Aplicar classe no documento
      if (darkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const initializeDarkMode = () => {
    if (process.client) {
      // Verificar preferência salva
      const savedMode = localStorage.getItem('dark-mode')
      if (savedMode) {
        darkMode.value = savedMode === 'true'
      } else {
        // Usar preferência do sistema
        darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      // Aplicar classe no documento
      if (darkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  // Map para controlar timeouts das notificações
  const notificationTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newNotification: Notification = {
      id,
      duration: 5000, // 5 segundos por padrão
      ...notification
    }
    
    // Limitar a 5 notificações simultâneas
    if (notifications.value.length >= 5) {
      const oldestNotification = notifications.value[0]
      removeNotification(oldestNotification.id)
    }
    
    notifications.value.push(newNotification)
    
    // Auto remover após o tempo especificado
    if (newNotification.duration && newNotification.duration > 0) {
      const timeoutId = setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
      
      notificationTimeouts.set(id, timeoutId)
    }
    
    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
      
      // Limpar timeout se existir
      const timeoutId = notificationTimeouts.get(id)
      if (timeoutId) {
        clearTimeout(timeoutId)
        notificationTimeouts.delete(id)
      }
    }
  }

  const clearAllNotifications = () => {
    // Limpar todos os timeouts
    notificationTimeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId)
    })
    notificationTimeouts.clear()
    
    notifications.value = []
  }

  // Notification helpers
  const showSuccess = (title: string, message: string, duration?: number) => {
    return addNotification({
      type: 'success',
      title,
      message,
      duration
    })
  }

  const showError = (title: string, message: string, duration?: number) => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration: duration || 7000 // Erros ficam mais tempo
    })
  }

  const showWarning = (title: string, message: string, duration?: number) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      duration
    })
  }

  const showInfo = (title: string, message: string, duration?: number) => {
    return addNotification({
      type: 'info',
      title,
      message,
      duration
    })
  }

  const setGlobalLoading = (isLoading: boolean) => {
    loading.value.global = isLoading
  }

  const setPageLoading = (isLoading: boolean) => {
    loading.value.page = isLoading
  }

  // Getters
  const hasNotifications = computed(() => notifications.value.length > 0)
  const notificationCount = computed(() => notifications.value.length)
  const isLoading = computed(() => loading.value.global || loading.value.page)

  // Initialize on client
  if (process.client) {
    initializeDarkMode()
  }

  return {
    // State
    sidebarOpen: readonly(sidebarOpen),
    darkMode: readonly(darkMode),
    notifications: readonly(notifications),
    loading: readonly(loading),
    
    // Actions
    toggleSidebar,
    closeSidebar,
    openSidebar,
    toggleDarkMode,
    initializeDarkMode,
    addNotification,
    removeNotification,
    clearAllNotifications,
    
    // Notification helpers
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // Loading actions
    setGlobalLoading,
    setPageLoading,
    
    // Getters
    hasNotifications,
    notificationCount,
    isLoading
  }
}) 