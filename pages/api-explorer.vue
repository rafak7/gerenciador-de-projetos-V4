<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Servidor API - Explorer
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Visualize e teste os endpoints GET disponíveis no servidor JSON (localhost:3001)
      </p>
    </div>

    <!-- Status da API -->
    <div class="mb-6">
      <div class="flex items-center space-x-2">
        <div :class="[
          'w-3 h-3 rounded-full',
          apiStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
        ]"></div>
        <span class="text-sm font-medium" :class="[
          apiStatus === 'online' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        ]">
          API {{ apiStatus === 'online' ? 'Online' : 'Offline' }}
        </span>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          - http://localhost:3001
        </span>
      </div>
    </div>

    

    <!-- Endpoints -->
    <div class="grid gap-6">
      <!-- Projetos -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              GET /projetos
            </h2>
            <button
              @click="fetchProjects"
              :disabled="loading.projetos"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <CommandLineIcon v-if="!loading.projetos" class="w-4 h-4 mr-2" />
              <div v-else class="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {{ loading.projetos ? 'Carregando...' : 'Executar' }}
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Lista todos os projetos disponíveis
          </p>
        </div>
                 <div v-if="data.projetos" class="p-6">
           <!-- Lista completa com destaque -->
           <div class="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
             <div v-if="Array.isArray(data.projetos)">
               <div class="mb-2 flex items-center justify-between">
                 <span class="text-xs text-gray-500 dark:text-gray-400">
                   {{ sortedProjects.length }} projeto{{ sortedProjects.length !== 1 ? 's' : '' }} encontrado{{ sortedProjects.length !== 1 ? 's' : '' }}
                   <span v-if="projetosStore.lastCreatedProjetoId" class="text-yellow-600 dark:text-yellow-400">
                     (último criado em destaque)
                   </span>
                 </span>
                 <button 
                   v-if="projetosStore.lastCreatedProjetoId"
                   @click="clearHighlight"
                   class="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
                 >
                   limpar destaque
                 </button>
               </div>
               <div v-for="(projeto, index) in sortedProjects" :key="projeto.id" class="mb-4 last:mb-0">
                 <div :class="[
                   'p-3 rounded-md border transition-all duration-300',
                   isHighlightedProject(projeto.id) 
                     ? 'bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-300 dark:border-green-700 shadow-md ring-2 ring-green-200 dark:ring-green-800' 
                     : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-sm'
                 ]">
                   <div v-if="isHighlightedProject(projeto.id)" class="flex items-center justify-between mb-3">
                     <span class="text-xs font-medium text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-full flex items-center">
                       🎉 Projeto recém-criado
                     </span>
                     <span class="text-xs text-green-600 dark:text-green-400 animate-pulse">
                       NOVO
                     </span>
                   </div>
                   <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ JSON.stringify(projeto, null, 2) }}</pre>
                 </div>
               </div>
             </div>
             <div v-else>
               <pre class="text-sm text-gray-800 dark:text-gray-200">{{ JSON.stringify(data.projetos, null, 2) }}</pre>
             </div>
           </div>
         </div>
      </div>

      <!-- Usuários -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              GET /usuarios
            </h2>
            <button
              @click="fetchUsers"
              :disabled="loading.usuarios"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <CommandLineIcon v-if="!loading.usuarios" class="w-4 h-4 mr-2" />
              <div v-else class="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {{ loading.usuarios ? 'Carregando...' : 'Executar' }}
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Lista todos os usuários cadastrados
          </p>
        </div>
        <div v-if="data.usuarios" class="p-6">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
            <pre class="text-sm text-gray-800 dark:text-gray-200">{{ JSON.stringify(data.usuarios, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- Categorias -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              GET /categorias
            </h2>
            <button
              @click="fetchCategories"
              :disabled="loading.categorias"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <CommandLineIcon v-if="!loading.categorias" class="w-4 h-4 mr-2" />
              <div v-else class="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {{ loading.categorias ? 'Carregando...' : 'Executar' }}
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Lista todas as categorias disponíveis
          </p>
        </div>
        <div v-if="data.categorias" class="p-6">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
            <pre class="text-sm text-gray-800 dark:text-gray-200">{{ JSON.stringify(data.categorias, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- Tipos -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              GET /tipos
            </h2>
            <button
              @click="fetchTypes"
              :disabled="loading.tipos"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <CommandLineIcon v-if="!loading.tipos" class="w-4 h-4 mr-2" />
              <div v-else class="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {{ loading.tipos ? 'Carregando...' : 'Executar' }}
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Lista todos os tipos de projeto disponíveis
          </p>
        </div>
        <div v-if="data.tipos" class="p-6">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
            <pre class="text-sm text-gray-800 dark:text-gray-200">{{ JSON.stringify(data.tipos, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Teste Individual -->
    <div class="mt-8 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Teste Endpoint Personalizado
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Digite um endpoint para testar (ex: /projetos/1, /categorias?_limit=5)
        </p>
      </div>
      <div class="p-6">
        <div class="flex space-x-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Endpoint
            </label>
            <div class="flex">
              <span class="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm rounded-l-md">
                GET http://localhost:3001
              </span>
              <input
                v-model="customEndpoint"
                type="text"
                class="flex-1 border border-gray-300 dark:border-gray-600 rounded-r-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="/projetos"
              />
            </div>
          </div>
          <div class="flex items-end">
            <button
              @click="fetchCustomEndpoint"
              :disabled="loading.custom || !customEndpoint"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              <CommandLineIcon v-if="!loading.custom" class="w-4 h-4 mr-2" />
              <div v-else class="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {{ loading.custom ? 'Executando...' : 'Executar' }}
            </button>
          </div>
        </div>
        
        <div v-if="data.custom" class="mt-4">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
            <pre class="text-sm text-gray-800 dark:text-gray-200">{{ JSON.stringify(data.custom, null, 2) }}</pre>
          </div>
        </div>

        <div v-if="error.custom" class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p class="text-sm text-red-600 dark:text-red-400">
            {{ error.custom }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CommandLineIcon } from '@heroicons/vue/24/outline'

// Meta da página
definePageMeta({
  layout: 'default'
})

// Store
const projetosStore = useProjetosStore()

// Estados reativos
const apiStatus = ref<'online' | 'offline'>('offline')
const customEndpoint = ref('/projetos')

const loading = reactive({
  projetos: false,
  usuarios: false,
  categorias: false,
  tipos: false,
  custom: false
})

const data = reactive({
  projetos: null as any,
  usuarios: null as any,
  categorias: null as any,
  tipos: null as any,
  custom: null as any
})

const error = reactive({
  custom: null as string | null
})

// Configuração da API
const API_BASE_URL = 'http://localhost:3001'

// Função para verificar status da API
const checkApiStatus = async () => {
  try {
    await $fetch(`${API_BASE_URL}/projetos?_limit=1`)
    apiStatus.value = 'online'
  } catch {
    apiStatus.value = 'offline'
  }
}

// Funções para buscar dados
const fetchProjects = async () => {
  loading.projetos = true
  try {
    data.projetos = await $fetch(`${API_BASE_URL}/projetos`)
  } catch (err) {
    console.error('Erro ao buscar projetos:', err)
    data.projetos = { erro: 'Falha ao carregar projetos' }
  }
  loading.projetos = false
}

const fetchUsers = async () => {
  loading.usuarios = true
  try {
    data.usuarios = await $fetch(`${API_BASE_URL}/usuarios`)
  } catch (err) {
    console.error('Erro ao buscar usuários:', err)
    data.usuarios = { erro: 'Falha ao carregar usuários' }
  }
  loading.usuarios = false
}

const fetchCategories = async () => {
  loading.categorias = true
  try {
    data.categorias = await $fetch(`${API_BASE_URL}/categorias`)
  } catch (err) {
    console.error('Erro ao buscar categorias:', err)
    data.categorias = { erro: 'Falha ao carregar categorias' }
  }
  loading.categorias = false
}

const fetchTypes = async () => {
  loading.tipos = true
  try {
    data.tipos = await $fetch(`${API_BASE_URL}/tipos`)
  } catch (err) {
    console.error('Erro ao buscar tipos:', err)
    data.tipos = { erro: 'Falha ao carregar tipos' }
  }
  loading.tipos = false
}

const fetchCustomEndpoint = async () => {
  if (!customEndpoint.value) return
  
  loading.custom = true
  error.custom = null
  data.custom = null
  
  try {
    const endpoint = customEndpoint.value.startsWith('/') 
      ? customEndpoint.value 
      : `/${customEndpoint.value}`
    
    data.custom = await $fetch(`${API_BASE_URL}${endpoint}`)
  } catch (err: any) {
    console.error('Erro ao buscar endpoint customizado:', err)
    error.custom = `Erro: ${err.message || 'Falha na requisição'}`
  }
  loading.custom = false
}

// Computed para projeto destacado
const lastCreatedProject = computed(() => {
  if (!projetosStore.lastCreatedProjetoId || !Array.isArray(data.projetos)) {
    return null
  }
  return data.projetos.find((p: any) => p.id.toString() === projetosStore.lastCreatedProjetoId)
})

// Computed para reordenar projetos com o destacado primeiro
const sortedProjects = computed(() => {
  if (!Array.isArray(data.projetos) || !projetosStore.lastCreatedProjetoId) {
    return data.projetos
  }
  
  const projects = [...data.projetos]
  const highlightedIndex = projects.findIndex(p => p.id.toString() === projetosStore.lastCreatedProjetoId)
  
  if (highlightedIndex > 0) {
    const highlighted = projects.splice(highlightedIndex, 1)[0]
    projects.unshift(highlighted)
  }
  
  return projects
})

// Função para verificar se um projeto deve ser destacado
const isHighlightedProject = (projectId: string | number): boolean => {
  return projetosStore.lastCreatedProjetoId === projectId.toString()
}

// Função para limpar o destaque
const clearHighlight = () => {
  projetosStore.clearLastCreatedHighlight()
}

// Verificar status ao montar o componente
onMounted(() => {
  checkApiStatus()
})
</script> 