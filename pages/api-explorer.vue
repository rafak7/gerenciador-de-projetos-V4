<template>
  <div class="api-explorer">
    <!-- Header -->
    <div class="page-header">
      <h1>Servidor API - Explorer</h1>
      <p>Visualize e teste os endpoints GET disponíveis no servidor JSON (localhost:3001)</p>
    </div>

    <!-- Status da API -->
    <div class="api-status">
      <div class="status-indicator">
        <div :class="[
          'status-dot',
          apiStatus === 'online' ? 'online' : 'offline'
        ]"></div>
        <span :class="[
          'status-text',
          apiStatus === 'online' ? 'online' : 'offline'
        ]">
          API {{ apiStatus === 'online' ? 'Online' : 'Offline' }}
        </span>
        <span class="status-url">- http://localhost:3001</span>
      </div>
    </div>

    

    <!-- Endpoints -->
    <div class="endpoints-grid">
      <!-- Projetos -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <div class="header-row">
            <h2>GET /projetos</h2>
            <button
              @click="fetchProjects"
              :disabled="loading.projetos"
              class="execute-btn"
            >
              <CommandLineIcon v-if="!loading.projetos" class="btn-icon" />
              <div v-else class="btn-icon spinner"></div>
              {{ loading.projetos ? 'Carregando...' : 'Executar' }}
            </button>
          </div>
          <p class="endpoint-description">Lista todos os projetos disponíveis</p>
        </div>
        <div v-if="data.projetos" class="endpoint-content">
          <!-- Lista completa com destaque -->
          <div class="response-container">
            <div v-if="Array.isArray(data.projetos)">
              <div class="response-meta">
                <span class="item-count">
                  {{ sortedProjects.length }} projeto{{ sortedProjects.length !== 1 ? 's' : '' }} encontrado{{ sortedProjects.length !== 1 ? 's' : '' }}
                  <span v-if="projetosStore.lastCreatedProjetoId" class="highlight-text">
                    (último criado em destaque)
                  </span>
                </span>
                <button 
                  v-if="projetosStore.lastCreatedProjetoId"
                  @click="clearHighlight"
                  class="clear-highlight"
                >
                  limpar destaque
                </button>
              </div>
              <div v-for="(projeto, index) in sortedProjects" :key="projeto.id" class="project-item">
                <div :class="[
                  'project-wrapper',
                  isHighlightedProject(projeto.id) ? 'highlighted' : ''
                ]">
                  <div v-if="isHighlightedProject(projeto.id)" class="highlight-badge">
                    <span class="badge">
                      🎉 Projeto recém-criado
                    </span>
                    <span class="new-indicator">
                      NOVO
                    </span>
                  </div>
                  <pre class="project-data">{{ JSON.stringify(projeto, null, 2) }}</pre>
                </div>
              </div>
            </div>
            <div v-else>
              <pre class="json-response">{{ JSON.stringify(data.projetos, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Usuários -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <div class="header-row">
            <h2>GET /usuarios</h2>
            <button
              @click="fetchUsers"
              :disabled="loading.usuarios"
              class="execute-btn"
            >
              <CommandLineIcon v-if="!loading.usuarios" class="btn-icon" />
              <div v-else class="btn-icon spinner"></div>
              {{ loading.usuarios ? 'Carregando...' : 'Executar' }}
            </button>
          </div>
          <p class="endpoint-description">Lista todos os usuários cadastrados</p>
        </div>
        <div v-if="data.usuarios" class="endpoint-content">
          <div class="response-container">
            <pre class="json-response">{{ JSON.stringify(data.usuarios, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- Categorias -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <div class="header-row">
            <h2>GET /categorias</h2>
            <button
              @click="fetchCategories"
              :disabled="loading.categorias"
              class="execute-btn"
            >
              <CommandLineIcon v-if="!loading.categorias" class="btn-icon" />
              <div v-else class="btn-icon spinner"></div>
              {{ loading.categorias ? 'Carregando...' : 'Executar' }}
            </button>
          </div>
          <p class="endpoint-description">Lista todas as categorias disponíveis</p>
        </div>
        <div v-if="data.categorias" class="endpoint-content">
          <div class="response-container">
            <pre class="json-response">{{ JSON.stringify(data.categorias, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- Tipos -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <div class="header-row">
            <h2>GET /tipos</h2>
            <button
              @click="fetchTypes"
              :disabled="loading.tipos"
              class="execute-btn"
            >
              <CommandLineIcon v-if="!loading.tipos" class="btn-icon" />
              <div v-else class="btn-icon spinner"></div>
              {{ loading.tipos ? 'Carregando...' : 'Executar' }}
            </button>
          </div>
          <p class="endpoint-description">Lista todos os tipos de projeto disponíveis</p>
        </div>
        <div v-if="data.tipos" class="endpoint-content">
          <div class="response-container">
            <pre class="json-response">{{ JSON.stringify(data.tipos, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Teste Individual -->
    <div class="custom-test">
      <div class="test-header">
        <h2>Teste Endpoint Personalizado</h2>
        <p>Digite um endpoint para testar (ex: /projetos/1, /categorias?_limit=5)</p>
      </div>
      <div class="test-content">
        <div class="test-form">
          <div class="endpoint-input">
            <label>Endpoint</label>
            <div class="input-group">
              <span class="input-prefix">GET http://localhost:3001</span>
              <input
                v-model="customEndpoint"
                type="text"
                class="endpoint-field"
                placeholder="/projetos"
              />
            </div>
          </div>
          <button
            @click="fetchCustomEndpoint"
            :disabled="loading.custom || !customEndpoint"
            class="test-button"
          >
            <CommandLineIcon v-if="!loading.custom" class="btn-icon" />
            <div v-else class="btn-icon spinner"></div>
            {{ loading.custom ? 'Executando...' : 'Executar' }}
          </button>
        </div>
        
        <div v-if="data.custom" class="test-response">
          <pre class="json-response">{{ JSON.stringify(data.custom, null, 2) }}</pre>
        </div>

        <div v-if="error.custom" class="error-state">
          <div class="error-content">
            <p>{{ error.custom }}</p>
          </div>
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