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

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification: Notification = {
      id,
      duration: 5000, // 5 segundos por padrão
      ...notification
    }
    
    notifications.value.push(newNotification)
    
    // Auto remover após o tempo especificado
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAllNotifications = () => {
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
      duration: duration || 8000 // Erros ficam mais tempo
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