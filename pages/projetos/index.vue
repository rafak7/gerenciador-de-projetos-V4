<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Projetos</h1>
        <p class="text-gray-600 dark:text-gray-400">Gerencie todos os seus projetos</p>
      </div>
      <NuxtLink
        to="/projetos/novo"
        class="btn-primary"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Novo Projeto
      </NuxtLink>
    </div>

    <!-- Filtros -->
    <div class="card">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar
          </label>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Nome do projeto..."
            class="input-field"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Categoria
          </label>
          <select v-model="selectedCategoria" class="input-field">
            <option value="">Todas as categorias</option>
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
              {{ categoria }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo
          </label>
          <select v-model="selectedTipo" class="input-field">
            <option value="">Todos os tipos</option>
            <option v-for="tipo in tipos" :key="tipo" :value="tipo">
              {{ tipo }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ordenar por
          </label>
          <select v-model="sortBy" class="input-field">
            <option value="nome">Nome</option>
            <option value="preco">Preço</option>
            <option value="categoria">Categoria</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading.list" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="card border-red-200 bg-red-50 dark:bg-red-900/20">
      <div class="text-red-600 dark:text-red-400">
        <h3 class="font-medium">Erro ao carregar projetos</h3>
        <p class="text-sm mt-1">{{ error }}</p>
        <button @click="loadProjetos" class="btn-primary mt-3">
          Tentar novamente
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div v-else-if="projetos.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="projeto in projetos"
        :key="projeto.id"
        class="card hover:shadow-lg transition-shadow duration-200"
      >
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ projeto.nome }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
              {{ projeto.descricao }}
            </p>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ formatCurrency(projeto.preco) }}
            </span>
            <div class="flex space-x-2">
              <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                {{ projeto.categoria }}
              </span>
              <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full">
                {{ projeto.tipo }}
              </span>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <NuxtLink
              :to="`/projetos/${projeto.id}`"
              class="flex-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 px-3 rounded-md text-center text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              Ver Detalhes
            </NuxtLink>
            <NuxtLink
              :to="`/projetos/${projeto.id}/editar`"
              class="flex-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 py-2 px-3 rounded-md text-center text-sm font-medium hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
            >
              Editar
            </NuxtLink>
            <button
              @click="confirmDelete(projeto)"
              class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 px-3 rounded-md text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nenhum projeto encontrado</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Comece criando um novo projeto.</p>
      <div class="mt-6">
        <NuxtLink to="/projetos/novo" class="btn-primary">
          Criar Novo Projeto
        </NuxtLink>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="projetos.length > 0" class="flex items-center justify-between">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        Mostrando {{ (pagination.currentPage - 1) * pagination.itemsPerPage + 1 }} a 
        {{ Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems) }} 
        de {{ pagination.totalItems }} projetos
      </p>
      <div class="flex space-x-2">
        <button
          @click="prevPage"
          :disabled="!hasPrevPage"
          class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          @click="nextPage"
          :disabled="!hasNextPage"
          class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Projeto } from '~/types'

// Stores
const projetosStore = useProjetosStore()
const uiStore = useUIStore()
const { projetos, loading, error, pagination, hasNextPage, hasPrevPage } = storeToRefs(projetosStore)
const { fetchProjetos, deleteProjeto, setFilters } = projetosStore
const { showSuccess, showError } = uiStore

// State
const searchTerm = ref('')
const selectedCategoria = ref('')
const selectedTipo = ref('')
const sortBy = ref('nome')
const categorias = ref<string[]>([])
const tipos = ref<string[]>([])

// Methods
const loadProjetos = () => {
  fetchProjetos({
    search: searchTerm.value || undefined,
    categoria: selectedCategoria.value || undefined,
    tipo: selectedTipo.value || undefined,
    sortBy: sortBy.value as any,
    page: pagination.value.currentPage
  })
}

const loadOptions = async () => {
  try {
    const config = useRuntimeConfig()
    const [categoriasRes, tiposRes] = await Promise.all([
      $fetch<{id: number, nome: string}[]>(`${config.public.apiBase}/categorias`),
      $fetch<{id: number, nome: string}[]>(`${config.public.apiBase}/tipos`)
    ])
    categorias.value = categoriasRes.map(cat => cat.nome)
    tipos.value = tiposRes.map(tipo => tipo.nome)
  } catch (err) {
    console.error('Erro ao carregar opções:', err)
  }
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const confirmDelete = (projeto: Projeto) => {
  if (confirm(`Tem certeza que deseja excluir o projeto "${projeto.nome}"?`)) {
    handleDelete(projeto.id)
  }
}

const handleDelete = async (id: number) => {
  const success = await deleteProjeto(id)
  if (success) {
    showSuccess('Projeto excluído', 'O projeto foi removido com sucesso')
  } else {
    showError('Erro ao excluir', 'Não foi possível excluir o projeto')
  }
}

const nextPage = () => {
  if (hasNextPage.value) {
    setFilters({ page: pagination.value.currentPage + 1 })
    loadProjetos()
  }
}

const prevPage = () => {
  if (hasPrevPage.value) {
    setFilters({ page: pagination.value.currentPage - 1 })
    loadProjetos()
  }
}

// Watchers
watchDebounced([searchTerm, selectedCategoria, selectedTipo, sortBy], loadProjetos, { debounce: 300 })

// Lifecycle
onMounted(async () => {
  await Promise.all([loadProjetos(), loadOptions()])
})

// SEO
useHead({
  title: 'Projetos - Gerenciador de Projetos'
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 