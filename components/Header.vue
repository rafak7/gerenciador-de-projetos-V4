<template>
  <header class="main-header">
    <div class="header-content">
      <div class="header-wrapper">
        <div class="header-left">
          <button
            @click="$emit('toggle-sidebar')"
            class="menu-toggle"
            aria-label="Abrir menu"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <h1 class="page-title">
            {{ pageTitle }}
          </h1>
        </div>

        <div class="header-right">
          <button
            @click="toggleDarkMode"
            class="dark-mode-toggle"
            aria-label="Alternar modo escuro"
          >
            <svg v-if="!darkMode" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <div class="user-menu" ref="userMenuRef">
            <button
              @click="showUserMenu = !showUserMenu"
              class="user-trigger"
            >
              <div class="user-avatar">
                <span>{{ userInitials }}</span>
              </div>
              <span class="user-name">
                {{ userName || 'Usuário' }}
              </span>
              <svg class="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition
              enter-active-class="dropdown-enter-active"
              enter-from-class="dropdown-enter-from"
              enter-to-class="dropdown-enter-to"
              leave-active-class="dropdown-leave-active"
              leave-from-class="dropdown-leave-from"
              leave-to-class="dropdown-leave-to"
            >
              <div v-if="showUserMenu" class="user-dropdown">
                <button
                  @click="handleLogout"
                  class="dropdown-item"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sair</span>
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits<{
  'toggle-sidebar': []
}>()

const authStore = useAuthStore()
const uiStore = useUIStore()
const { darkMode } = storeToRefs(uiStore)
const { toggleDarkMode } = uiStore
const { getUserName: userName } = storeToRefs(authStore)
const { logout } = authStore

const showUserMenu = ref(false)
const userMenuRef = ref<HTMLElement>()
const pageTitle = computed(() => {
  const route = useRoute()
  const titles: Record<string, string> = {
    '/projetos': 'Projetos',
    '/projetos/novo': 'Novo Projeto',
    '/login': 'Login'
  }
  
  if (route.path.includes('/projetos/') && route.path.includes('/editar')) {
    return 'Editar Projeto'
  }
  
  if (route.path.includes('/projetos/') && !route.path.includes('/novo')) {
    return 'Detalhes do Projeto'
  }
  
  return titles[route.path] || 'Gerenciador de Projetos'
})

const userInitials = computed(() => {
  return userName.value?.charAt(0).toUpperCase() || 'U'
})

const handleLogout = () => {
  showUserMenu.value = false
  logout()
}
onClickOutside(userMenuRef, () => {
  showUserMenu.value = false
})
</script> 