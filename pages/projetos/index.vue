<template>
  <div class="projetos-page">
    <div class="page-header">
      <div class="header-content">
        <h1>Projetos</h1>
        <p>Gerencie todos os seus projetos</p>
      </div>
      <NuxtLink to="/projetos/novo" class="new-project-btn">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Novo Projeto
      </NuxtLink>
    </div>

    <div class="filters-card">
      <div class="filters-grid">
        <div class="filter-group">
          <label>Buscar</label>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Nome do projeto..."
          />
        </div>
        <div class="filter-group">
          <label>Categoria</label>
          <select v-model="selectedCategoria">
            <option value="">Todas as categorias</option>
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
              {{ categoria }}
            </option>
          </select>
        </div>
        <div class="filter-group">
          <label>Tipo</label>
          <select v-model="selectedTipo">
            <option value="">Todos os tipos</option>
            <option v-for="tipo in tipos" :key="tipo" :value="tipo">
              {{ tipo }}
            </option>
          </select>
        </div>
        <div class="filter-group">
          <label>Ordenar por</label>
          <select v-model="sortBy">
            <option value="nome">Nome</option>
            <option value="preco">Preço</option>
            <option value="categoria">Categoria</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading.list" class="loading-state">
      <div class="spinner"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-content">
        <h3>Erro ao carregar projetos</h3>
        <p>{{ error }}</p>
        <button @click="loadProjetos" class="retry-btn">
          Tentar novamente
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div v-else-if="projetos.length > 0" class="projects-grid">
      <div
        v-for="projeto in projetos"
        :key="projeto.id"
        class="project-card"
      >
        <div class="project-info">
          <h3>{{ projeto.nome }}</h3>
          <p class="description">{{ projeto.descricao }}</p>
        </div>
        
        <div class="project-details">
          <span class="price">{{ formatCurrency(projeto.preco) }}</span>
          <div class="tags">
            <span class="tag categoria">{{ projeto.categoria }}</span>
            <span class="tag tipo">{{ projeto.tipo }}</span>
          </div>
        </div>
        
        <div class="project-actions">
          <NuxtLink :to="`/projetos/${projeto.id}`" class="action-btn view-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span class="view-text">Ver</span>
          </NuxtLink>
          <NuxtLink :to="`/projetos/${projeto.id}/editar`" class="action-btn edit-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span class="edit-text">Editar</span>
          </NuxtLink>
          <button @click="confirmDelete(projeto)" class="action-btn delete-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span class="delete-text">Excluir</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3>Nenhum projeto encontrado</h3>
      <p>Comece criando um novo projeto.</p>
      <NuxtLink to="/projetos/novo" class="create-btn">
        Criar Novo Projeto
      </NuxtLink>
    </div>

    <!-- Pagination -->
    <div v-if="projetos.length > 0" class="pagination">
      <div class="pagination-info">
        Mostrando {{ (pagination.currentPage - 1) * pagination.itemsPerPage + 1 }} a 
        {{ Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems) }} 
        de {{ pagination.totalItems }} projetos
      </div>
      <div class="pagination-controls">
        <button
          @click="prevPage"
          :disabled="!hasPrevPage"
          class="page-btn"
        >
          Anterior
        </button>
        <button
          @click="nextPage"
          :disabled="!hasNextPage"
          class="page-btn"
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
    sortBy: sortBy.value as any
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
    // Recarregar projetos após exclusão para atualizar paginação
    loadProjetos()
  } else {
    showError('Erro ao excluir', 'Não foi possível excluir o projeto')
  }
}

const nextPage = async () => {
  if (hasNextPage.value) {
    const newPage = pagination.value.currentPage + 1
    await fetchProjetos({
      search: searchTerm.value || undefined,
      categoria: selectedCategoria.value || undefined,
      tipo: selectedTipo.value || undefined,
      sortBy: sortBy.value as any,
      page: newPage
    })
  }
}

const prevPage = async () => {
  if (hasPrevPage.value) {
    const newPage = pagination.value.currentPage - 1
    await fetchProjetos({
      search: searchTerm.value || undefined,
      categoria: selectedCategoria.value || undefined,
      tipo: selectedTipo.value || undefined,
      sortBy: sortBy.value as any,
      page: newPage
    })
  }
}

// Watchers
watchDebounced([searchTerm, selectedCategoria, selectedTipo, sortBy], () => {
  // Resetar para página 1 quando filtros mudarem
  setFilters({ page: 1 })
  loadProjetos()
}, { debounce: 300 })

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
/* Estilos específicos da página já estão no SCSS */
</style> 