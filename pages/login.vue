<template>
  <div>
    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <div class="mt-1">
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            class="input-field"
            :class="{ 'border-red-500': errors.email }"
            placeholder="seu@email.com"
          />
          <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Senha
        </label>
        <div class="mt-1">
          <input
            id="password"
            v-model="form.senha"
            type="password"
            autocomplete="current-password"
            required
            class="input-field"
            :class="{ 'border-red-500': errors.senha }"
            placeholder="Sua senha"
          />
          <p v-if="errors.senha" class="error-message">{{ errors.senha }}</p>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <div v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </div>

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Credenciais de teste:<br>
          <strong>admin@gerenciador.com</strong> / <strong>admin123</strong><br>
          <strong>user@gerenciador.com</strong> / <strong>user123</strong>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// Layout
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

// SEO
useHead({
  title: 'Login - Gerenciador de Projetos'
})

// Stores
const authStore = useAuthStore()
const uiStore = useUIStore()
const { isLoading, error } = storeToRefs(authStore)
const { login, clearError } = authStore
const { showError, showSuccess } = uiStore

// Form state
const form = reactive({
  email: '',
  senha: ''
})

const errors = reactive({
  email: '',
  senha: ''
})

// Methods
const validateForm = () => {
  errors.email = ''
  errors.senha = ''
  
  if (!form.email) {
    errors.email = 'Email é obrigatório'
    return false
  }
  
  if (!form.email.includes('@')) {
    errors.email = 'Email deve ser válido'
    return false
  }
  
  if (!form.senha) {
    errors.senha = 'Senha é obrigatória'
    return false
  }
  
  if (form.senha.length < 6) {
    errors.senha = 'Senha deve ter pelo menos 6 caracteres'
    return false
  }
  
  return true
}

const handleLogin = async () => {
  clearError()
  
  if (!validateForm()) {
    return
  }
  
  try {
    const success = await login(form)
    
    if (success) {
      showSuccess('Login realizado', 'Bem-vindo ao sistema!')
      await navigateTo('/projetos')
    } else {
      showError('Erro no login', error.value || 'Credenciais inválidas')
    }
  } catch (err) {
    showError('Erro no login', 'Ocorreu um erro inesperado')
  }
}

// Clear errors when error changes
watch(error, (newError) => {
  if (newError) {
    showError('Erro no login', newError)
  }
})

// Auto-fill for demo
onMounted(() => {
  form.email = 'admin@gerenciador.com'
  form.senha = 'admin123'
})
</script> 