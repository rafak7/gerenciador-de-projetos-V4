<template>
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

  <div v-else-if="currentProjeto" class="space-y-6">
    <!-- Header with actions -->
    <div class="flex justify-between items-start">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ currentProjeto.nome }}
        </h1>
        <div class="flex items-center space-x-4 mt-2">
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
            {{ currentProjeto.categoria }}
          </span>
          <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
            {{ currentProjeto.tipo }}
          </span>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <NuxtLink
          :to="`/projetos/${currentProjeto.id}/editar`"
          class="btn-secondary"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </NuxtLink>
        <button
          @click="confirmDelete"
          class="btn-danger"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Excluir
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Project details -->
      <div class="lg:col-span-2">
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Descrição do Projeto
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ currentProjeto.descricao }}
          </p>
        </div>
      </div>

      <!-- Sidebar with info -->
      <div class="space-y-6">
        <!-- Price card -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informações do Projeto
          </h3>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Valor do Projeto
              </label>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                {{ formatCurrency(currentProjeto.preco) }}
              </p>
            </div>
            
            <div>
              <label class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Categoria
              </label>
              <p class="text-gray-900 dark:text-white font-medium">
                {{ currentProjeto.categoria }}
              </p>
            </div>
            
            <div>
              <label class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Tipo de Desenvolvimento
              </label>
              <p class="text-gray-900 dark:text-white font-medium">
                {{ currentProjeto.tipo }}
              </p>
            </div>
          </div>
        </div>

        <!-- Actions card -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ações Rápidas
          </h3>
          <div class="space-y-3">
            <NuxtLink
              :to="`/projetos/${currentProjeto.id}/editar`"
              class="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 px-3 rounded-md text-center text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Projeto
            </NuxtLink>
            
            <button
              @click="duplicateProjeto"
              class="w-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-2 px-3 rounded-md text-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Duplicar Projeto
            </button>
            
            <NuxtLink
              to="/projetos"
              class="w-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-2 px-3 rounded-md text-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar para Lista
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Stores
const projetosStore = useProjetosStore()
const uiStore = useUIStore()
const { currentProjeto, loading, error } = storeToRefs(projetosStore)
const { fetchProjetoById, deleteProjeto, createProjeto, resetCurrentProjeto } = projetosStore
const { showSuccess, showError } = uiStore

// Route
const route = useRoute()
const projetoId = parseInt(route.params.id as string)

// Methods
const loadProjeto = async () => {
  await fetchProjetoById(projetoId)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const confirmDelete = () => {
  if (currentProjeto.value && confirm(`Tem certeza que deseja excluir o projeto "${currentProjeto.value.nome}"?`)) {
    handleDelete()
  }
}

const handleDelete = async () => {
  if (!currentProjeto.value) return
  
  const success = await deleteProjeto(currentProjeto.value.id)
  if (success) {
    showSuccess('Projeto excluído', 'O projeto foi removido com sucesso')
    await navigateTo('/projetos')
  } else {
    showError('Erro ao excluir', 'Não foi possível excluir o projeto')
  }
}

const duplicateProjeto = async () => {
  if (!currentProjeto.value) return
  
  const { nome, descricao, preco, tipo, categoria } = currentProjeto.value
  const duplicatedData = {
    nome: `${nome} (Cópia)`,
    descricao,
    preco,
    tipo,
    categoria
  }
  
  const newProjeto = await createProjeto(duplicatedData)
  if (newProjeto) {
    showSuccess('Projeto duplicado', 'Uma cópia do projeto foi criada com sucesso')
    await navigateTo(`/projetos/${newProjeto.id}`)
  } else {
    showError('Erro ao duplicar', 'Não foi possível duplicar o projeto')
  }
}

// Lifecycle
onMounted(() => {
  if (projetoId) {
    loadProjeto()
  }
})

onUnmounted(() => {
  resetCurrentProjeto()
})

// SEO
const pageTitle = computed(() => 
  currentProjeto.value ? 
    `${currentProjeto.value.nome} - Gerenciador de Projetos` : 
    'Projeto - Gerenciador de Projetos'
)

useHead({
  title: pageTitle
})
</script> 