import { defineStore } from 'pinia'
import type { Notification } from '~/types'

export const useUIStore = defineStore('ui', () => {
  const sidebarOpen = ref(false)
  const sidebarCollapsed = ref(false)
  const darkMode = ref(false)
  const notifications = ref<Notification[]>([])
  const loading = ref({
    global: false,
    page: false
  })

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  const openSidebar = () => {
    sidebarOpen.value = true
  }

  const toggleSidebarCollapse = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    
    if (process.client) {
      localStorage.setItem('sidebar-collapsed', sidebarCollapsed.value.toString())
    }
  }

  const initializeSidebarState = () => {
    if (process.client) {
      const savedState = localStorage.getItem('sidebar-collapsed')
      if (savedState) {
        sidebarCollapsed.value = savedState === 'true'
      }
    }
  }

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    
    if (process.client) {
      localStorage.setItem('dark-mode', darkMode.value.toString())
      
      if (darkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const initializeDarkMode = () => {
    if (process.client) {
      const savedMode = localStorage.getItem('dark-mode')
      if (savedMode) {
        darkMode.value = savedMode === 'true'
      } else {
        darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      if (darkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const notificationTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newNotification: Notification = {
      id,
      duration: 5000, // 5 segundos por padrão
      ...notification
    }
    
    if (notifications.value.length >= 5) {
      const oldestNotification = notifications.value[0]
      removeNotification(oldestNotification.id)
    }
    
    notifications.value.push(newNotification)
    
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
      
      const timeoutId = notificationTimeouts.get(id)
      if (timeoutId) {
        clearTimeout(timeoutId)
        notificationTimeouts.delete(id)
      }
    }
  }

  const clearAllNotifications = () => {
    notificationTimeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId)
    })
    notificationTimeouts.clear()
    
    notifications.value = []
  }

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

  const hasNotifications = computed(() => notifications.value.length > 0)
  const notificationCount = computed(() => notifications.value.length)
  const isLoading = computed(() => loading.value.global || loading.value.page)

  if (process.client) {
    initializeDarkMode()
    initializeSidebarState()
  }

  return {
    sidebarOpen: readonly(sidebarOpen),
    sidebarCollapsed: readonly(sidebarCollapsed),
    darkMode: readonly(darkMode),
    notifications: readonly(notifications),
    loading: readonly(loading),
    
    toggleSidebar,
    closeSidebar,
    openSidebar,
    toggleSidebarCollapse,
    toggleDarkMode,
    initializeDarkMode,
    initializeSidebarState,
    addNotification,
    removeNotification,
    clearAllNotifications,
    
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    setGlobalLoading,
    setPageLoading,
    
    hasNotifications,
    notificationCount,
    isLoading
  }
}) 