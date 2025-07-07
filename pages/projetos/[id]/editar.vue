<template>
  <div class="max-w-2xl mx-auto">
    <div v-if="loading.single" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="card border-red-200 bg-red-50 dark:bg-red-900/20">
      <div class="text-red-600 dark:text-red-400 text-center">
        <h3 class="font-medium">Erro ao carregar projeto</h3>
        <p class="text-sm mt-1">{{ error }}</p>
        <div class="mt-4 space-x-2">
          <button @click="loadProjeto" class="btn-primary">
            Tentar novamente
          </button>
          <NuxtLink to="/projetos" class="btn-secondary">
            Voltar para projetos
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else-if="currentProjeto" class="card">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Editar Projeto</h1>
        <p class="text-gray-600 dark:text-gray-400">Atualize as informações do projeto</p>
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
            :disabled="loading.update"
            class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <div v-if="loading.update" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ loading.update ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
          <NuxtLink :to="`/projetos/${projetoId}`" class="btn-secondary flex-1 text-center">
            Cancelar
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EditarProjetoInput } from '~/types'

// Middleware
definePageMeta({
  middleware: 'auth'
})

// Stores
const projetosStore = useProjetosStore()
const uiStore = useUIStore()
const { currentProjeto, loading, error } = storeToRefs(projetosStore)
const { fetchProjetoById, updateProjeto } = projetosStore
const { showSuccess, showError } = uiStore

// Route
const route = useRoute()
const projetoId = parseInt(route.params.id as string)

// State
const form = reactive<EditarProjetoInput>({
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
const loadProjeto = async () => {
  await fetchProjetoById(projetoId)
  if (currentProjeto.value) {
    // Preencher formulário com dados do projeto atual
    form.nome = currentProjeto.value.nome
    form.descricao = currentProjeto.value.descricao
    form.preco = currentProjeto.value.preco
    form.categoria = currentProjeto.value.categoria
    form.tipo = currentProjeto.value.tipo
  }
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
  if (!validateForm()) return

  const result = await updateProjeto(projetoId, form)
  
  if (result) {
    showSuccess('Projeto atualizado', 'As alterações foram salvas com sucesso')
    await navigateTo(`/projetos/${projetoId}`)
  } else {
    showError('Erro ao atualizar', 'Não foi possível salvar as alterações')
  }
}

// Load project data on mount
onMounted(() => {
  loadProjeto()
})

// SEO
useHead({
  title: 'Editar Projeto - Gerenciador de Projetos',
  meta: [
    { name: 'description', content: 'Edite as informações do seu projeto' }
  ]
})
</script> 