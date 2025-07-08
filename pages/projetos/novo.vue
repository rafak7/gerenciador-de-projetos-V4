<template>
  <div class="create-project-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <NuxtLink to="/projetos" class="breadcrumb-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-4 4m4-4l-4-4" />
        </svg>
        Projetos
      </NuxtLink>
      <span class="breadcrumb-separator">></span>
      <span class="breadcrumb-current">Novo Projeto</span>
    </nav>

    <!-- Hero Header -->
    <div class="page-hero">
      <div class="hero-background">
        <div class="hero-pattern"></div>
      </div>
      <div class="hero-content">
        <div class="hero-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div class="hero-text">
          <h1>Criar Novo Projeto</h1>
          <p>Preencha as informações abaixo para criar um novo projeto</p>
        </div>
        <div class="progress-indicator">
          <div class="progress-step" :class="{ active: currentStep >= 1 }">
            <div class="step-number">1</div>
            <span>Informações</span>
          </div>
          <div class="progress-line" :class="{ active: currentStep >= 2 }"></div>
          <div class="progress-step" :class="{ active: currentStep >= 2 }">
            <div class="step-number">2</div>
            <span>Categoria</span>
          </div>
          <div class="progress-line" :class="{ active: currentStep >= 3 }"></div>
          <div class="progress-step" :class="{ active: currentStep >= 3 }">
            <div class="step-number">3</div>
            <span>Finalizar</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Form -->
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="project-form">
        <!-- Basic Information Card -->
        <div class="form-card info-card">
          <div class="card-header">
            <div class="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="card-title">
              <h2>Informações Básicas</h2>
              <p>Digite o nome e descrição do seu projeto</p>
            </div>
          </div>

          <div class="card-content">
            <div class="form-group">
              <label for="nome" class="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Nome do Projeto *
              </label>
              <div class="input-wrapper">
                <input
                  id="nome"
                  v-model="form.nome"
                  type="text"
                  required
                  :class="{ 'error': errors.nome }"
                  placeholder="Ex: Sistema de E-commerce"
                  @input="updateProgress"
                />
              </div>
              <p v-if="errors.nome" class="error-message">{{ errors.nome }}</p>
            </div>

            <div class="form-group">
              <label for="descricao" class="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descrição *
              </label>
              <div class="input-wrapper">
                <textarea
                  id="descricao"
                  v-model="form.descricao"
                  rows="4"
                  required
                  :class="{ 'error': errors.descricao }"
                  placeholder="Descreva os detalhes e objetivos do projeto..."
                  @input="updateProgress"
                />
              </div>
              <p v-if="errors.descricao" class="error-message">{{ errors.descricao }}</p>
            </div>
          </div>
        </div>

        <!-- Financial Information Card -->
        <div class="form-card financial-card">
          <div class="card-header">
            <div class="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="card-title">
              <h2>Informações Financeiras</h2>
              <p>Defina o valor do investimento</p>
            </div>
          </div>

          <div class="card-content">
            <div class="form-group">
              <label for="preco" class="form-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Valor do Projeto *
              </label>
              <div class="input-wrapper price-input">
                <span class="currency-prefix">R$</span>
                <input
                  id="preco"
                  v-model.number="form.preco"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  :class="{ 'error': errors.preco }"
                  placeholder="0,00"
                  @input="updateProgress"
                />
              </div>
              <p v-if="errors.preco" class="error-message">{{ errors.preco }}</p>
              <div class="price-suggestions">
                <button
                  type="button"
                  v-for="suggestion in priceSuggestions"
                  :key="suggestion.value"
                  @click="form.preco = suggestion.value"
                  class="price-suggestion"
                >
                  {{ suggestion.label }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Classification Card -->
        <div class="form-card classification-card">
          <div class="card-header">
            <div class="card-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div class="card-title">
              <h2>Classificação</h2>
              <p>Selecione a categoria e tipo do projeto</p>
            </div>
          </div>

          <div class="card-content">
            <div class="form-grid">
              <div class="form-group">
                <label for="categoria" class="form-label">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-4 4m4-4l-4-4" />
                  </svg>
                  Categoria *
                </label>
                <div class="select-wrapper">
                  <select
                    id="categoria"
                    v-model="form.categoria"
                    required
                    :class="{ 'error': errors.categoria }"
                    @change="updateProgress"
                  >
                    <option value="">Escolha uma categoria</option>
                    <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                      {{ categoria }}
                    </option>
                  </select>
                  <svg class="select-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p v-if="errors.categoria" class="error-message">{{ errors.categoria }}</p>
              </div>

              <div class="form-group">
                <label for="tipo" class="form-label">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Tipo de Desenvolvimento *
                </label>
                <div class="select-wrapper">
                  <select
                    id="tipo"
                    v-model="form.tipo"
                    required
                    :class="{ 'error': errors.tipo }"
                    @change="updateProgress"
                  >
                    <option value="">Escolha um tipo</option>
                    <option v-for="tipo in tipos" :key="tipo" :value="tipo">
                      {{ tipo }}
                    </option>
                  </select>
                  <svg class="select-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p v-if="errors.tipo" class="error-message">{{ errors.tipo }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="form-actions">
          <div class="actions-content">
            <div class="form-summary">
              <h3>Resumo do Projeto</h3>
              <div class="summary-items">
                <div class="summary-item" v-if="form.nome">
                  <span class="summary-label">Nome:</span>
                  <span class="summary-value">{{ form.nome }}</span>
                </div>
                <div class="summary-item" v-if="form.categoria">
                  <span class="summary-label">Categoria:</span>
                  <span class="summary-value">{{ form.categoria }}</span>
                </div>
                <div class="summary-item" v-if="form.tipo">
                  <span class="summary-label">Tipo:</span>
                  <span class="summary-value">{{ form.tipo }}</span>
                </div>
                <div class="summary-item" v-if="form.preco">
                  <span class="summary-label">Valor:</span>
                  <span class="summary-value">{{ formatCurrency(form.preco) }}</span>
                </div>
              </div>
            </div>

            <div class="button-group">
              <NuxtLink to="/projetos" class="btn btn-secondary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Cancelar
              </NuxtLink>
              
              <button
                type="submit"
                :disabled="loading.create || !isFormValid"
                class="btn btn-primary"
              >
                <svg v-if="!loading.create" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <div v-if="loading.create" class="spinner"></div>
                {{ loading.create ? 'Criando Projeto...' : 'Criar Projeto' }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NovoProjetoInput } from '~/types'

// Middleware
definePageMeta({
  middleware: 'auth'
})

// Stores
const projetosStore = useProjetosStore()
const uiStore = useUIStore()
const { loading } = storeToRefs(projetosStore)
const { createProjeto } = projetosStore
const { showSuccess, showError } = uiStore

// State
const form = reactive<NovoProjetoInput>({
  nome: '',
  descricao: '',
  preco: 0,
  categoria: '',
  tipo: ''
})

const errors = reactive({
  nome: '',
  descricao: '',
  preco: '',
  categoria: '',
  tipo: ''
})

const currentStep = ref(1)

const categorias = ref([
  'E-commerce', 'Delivery', 'Analytics', 'CRM', 'Educação',
  'Finanças', 'Saúde', 'Mídia', 'SaaS', 'IoT'
])

const tipos = ref([
  'Web Development', 'Mobile Development', 'Desktop Development',
  'API Development', 'Data Science', 'DevOps'
])

const priceSuggestions = ref([
  { label: 'R$ 5.000', value: 5000 },
  { label: 'R$ 10.000', value: 10000 },
  { label: 'R$ 25.000', value: 25000 },
  { label: 'R$ 50.000', value: 50000 },
  { label: 'R$ 100.000', value: 100000 }
])

// Computed
const isFormValid = computed(() => {
  return form.nome.trim().length >= 3 &&
         form.descricao.trim().length >= 10 &&
         form.preco > 0 &&
         form.categoria &&
         form.tipo
})

// Methods
const updateProgress = () => {
  let step = 1
  if (form.nome && form.descricao) {
    step = 2
  }
  if (form.categoria && form.tipo) {
    step = 3
  }
  currentStep.value = step
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  if (!form.nome.trim()) {
    errors.nome = 'Nome é obrigatório'
    isValid = false
  } else if (form.nome.length < 3) {
    errors.nome = 'Nome deve ter pelo menos 3 caracteres'
    isValid = false
  }

  if (!form.descricao.trim()) {
    errors.descricao = 'Descrição é obrigatória'
    isValid = false
  } else if (form.descricao.length < 10) {
    errors.descricao = 'Descrição deve ter pelo menos 10 caracteres'
    isValid = false
  }

  if (!form.preco || form.preco <= 0) {
    errors.preco = 'Preço deve ser maior que zero'
    isValid = false
  }

  if (!form.categoria) {
    errors.categoria = 'Categoria é obrigatória'
    isValid = false
  }

  if (!form.tipo) {
    errors.tipo = 'Tipo é obrigatório'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    const newProjeto = await createProjeto(form)
    
    if (newProjeto) {
      showSuccess('Projeto criado', 'O projeto foi criado com sucesso!')
      await navigateTo('/projetos')
    } else {
      showError('Erro ao criar projeto', 'Não foi possível criar o projeto')
    }
  } catch (error) {
    showError('Erro ao criar projeto', 'Ocorreu um erro inesperado')
  }
}

// SEO
useHead({
  title: 'Novo Projeto - Gerenciador de Projetos'
})
</script> 