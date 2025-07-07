<template>
  <div class="max-w-2xl mx-auto">
    <div class="card">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Novo Projeto</h1>
        <p class="text-gray-600 dark:text-gray-400">Preencha as informações do projeto</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome do Projeto *
          </label>
          <input
            id="nome"
            v-model="form.nome"
            type="text"
            required
            class="input-field mt-1"
            :class="{ 'border-red-500': errors.nome }"
            placeholder="Nome do projeto"
          />
          <p v-if="errors.nome" class="error-message">{{ errors.nome }}</p>
        </div>

        <div>
          <label for="descricao" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descrição *
          </label>
          <textarea
            id="descricao"
            v-model="form.descricao"
            rows="4"
            required
            class="input-field mt-1"
            :class="{ 'border-red-500': errors.descricao }"
            placeholder="Descreva o projeto detalhadamente"
          />
          <p v-if="errors.descricao" class="error-message">{{ errors.descricao }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="preco" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preço (R$) *
            </label>
            <input
              id="preco"
              v-model.number="form.preco"
              type="number"
              step="0.01"
              min="0"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.preco }"
              placeholder="0.00"
            />
            <p v-if="errors.preco" class="error-message">{{ errors.preco }}</p>
          </div>

          <div>
            <label for="categoria" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Categoria *
            </label>
            <select
              id="categoria"
              v-model="form.categoria"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.categoria }"
            >
              <option value="">Selecione uma categoria</option>
              <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                {{ categoria }}
              </option>
            </select>
            <p v-if="errors.categoria" class="error-message">{{ errors.categoria }}</p>
          </div>
        </div>

        <div>
          <label for="tipo" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo *
          </label>
          <select
            id="tipo"
            v-model="form.tipo"
            required
            class="input-field mt-1"
            :class="{ 'border-red-500': errors.tipo }"
          >
            <option value="">Selecione um tipo</option>
            <option v-for="tipo in tipos" :key="tipo" :value="tipo">
              {{ tipo }}
            </option>
          </select>
          <p v-if="errors.tipo" class="error-message">{{ errors.tipo }}</p>
        </div>

        <div class="flex space-x-4 pt-6">
          <button
            type="submit"
            :disabled="loading.create"
            class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <div v-if="loading.create" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ loading.create ? 'Criando...' : 'Criar Projeto' }}
          </button>
          <NuxtLink to="/projetos" class="btn-secondary flex-1 text-center">
            Cancelar
          </NuxtLink>
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

const categorias = ref([
  'E-commerce', 'Delivery', 'Analytics', 'CRM', 'Educação',
  'Finanças', 'Saúde', 'Mídia', 'SaaS', 'IoT'
])

const tipos = ref([
  'Web Development', 'Mobile Development', 'Desktop Development',
  'API Development', 'Data Science', 'DevOps'
])

// Methods
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