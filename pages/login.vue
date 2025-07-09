<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email" class="form-label">
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          required
          class="login-input"
          :class="{ error: errors.email }"
          placeholder="seu@email.com"
        />
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">
          Senha
        </label>
        <input
          id="password"
          v-model="form.senha"
          type="password"
          autocomplete="current-password"
          required
          class="login-input"
          :class="{ error: errors.senha }"
          placeholder="Sua senha"
        />
        <p v-if="errors.senha" class="error-message">{{ errors.senha }}</p>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="login-button"
      >
        <div v-if="isLoading" class="loading-spinner"></div>
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </button>

      <div class="login-credentials">
        <p class="credentials-title">Credenciais de teste:</p>
        <div class="credentials-list">
          <div class="credential-item">
            <span class="email">admin@gerenciador.com</span> / <span class="password">admin123</span>
          </div>
          <div class="credential-item">
            <span class="email">user@gerenciador.com</span> / <span class="password">user123</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useHead({
  title: 'Login - Gerenciador de Projetos'
})

const authStore = useAuthStore()
const uiStore = useUIStore()
const { isLoading, error } = storeToRefs(authStore)
const { login, clearError } = authStore
const { showError, showSuccess } = uiStore

const form = reactive({
  email: '',
  senha: ''
})

const errors = reactive({
  email: '',
  senha: ''
})
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

watch(error, (newError) => {
  if (newError) {
    showError('Erro no login', newError)
  }
})

onMounted(() => {
  form.email = 'admin@gerenciador.com'
  form.senha = 'admin123'
})
</script> 