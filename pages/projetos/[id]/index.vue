<template>
  <div v-if="loading.single" class="loading-state">
    <div class="spinner"></div>
  </div>

  <div v-else-if="error" class="error-state">
    <div class="error-content">
      <h3>Erro ao carregar projeto</h3>
      <p>{{ error }}</p>
      <div class="pagination">
        <button @click="loadProjeto" class="create-btn">
          Tentar novamente
        </button>
        <NuxtLink to="/projetos" class="page-btn">
          Voltar para projetos
        </NuxtLink>
      </div>
    </div>
  </div>

  <div v-else-if="currentProjeto" class="projeto-detalhes">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <NuxtLink to="/projetos" class="breadcrumb-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-4 4m4-4l-4-4" />
        </svg>
        Todos os Projetos
      </NuxtLink>
      <span class="breadcrumb-separator">></span>
      <span class="breadcrumb-current">{{ currentProjeto.nome }}</span>
    </nav>

    <!-- Hero Header -->
    <div class="projeto-hero">
      <div class="hero-background">
        <div class="hero-gradient"></div>
      </div>
      <div class="hero-content">
        <div class="hero-info">
          <div class="project-badge">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-4 4m4-4l-4-4" />
            </svg>
            Projeto #{{ currentProjeto.id }}
          </div>
          <h1 class="hero-title">{{ currentProjeto.nome }}</h1>
          <div class="project-meta">
            <div class="meta-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span class="tag categoria-tag">{{ currentProjeto.categoria }}</span>
            </div>
            <div class="meta-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span class="tag tipo-tag">{{ currentProjeto.tipo }}</span>
            </div>
            <div class="meta-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span class="price-display">{{ formatCurrency(currentProjeto.preco) }}</span>
            </div>
          </div>
        </div>
        <div class="hero-actions">
          <NuxtLink
            :to="`/projetos/${currentProjeto.id}/editar`"
            class="hero-btn primary"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </NuxtLink>
          <button
            @click="confirmDelete"
            class="hero-btn danger"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Excluir
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="stats-grid">
      <div class="stat-card revenue">
        <div class="stat-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ formatCurrency(currentProjeto.preco) }}</div>
          <div class="stat-label">Valor Total</div>
        </div>
      </div>

      <div class="stat-card category">
        <div class="stat-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ currentProjeto.categoria }}</div>
          <div class="stat-label">Categoria</div>
        </div>
      </div>

      <div class="stat-card type">
        <div class="stat-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ currentProjeto.tipo }}</div>
          <div class="stat-label">Tipo de Desenvolvimento</div>
        </div>
      </div>

      <div class="stat-card timeline">
        <div class="stat-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ getProjectStatus() }}</div>
          <div class="stat-label">Status</div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="projeto-layout">
      <!-- Left Column -->
      <div class="projeto-main">
        <!-- Description Card -->
        <div class="detail-card description-card">
          <div class="card-header">
            <div class="card-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descrição do Projeto
            </div>
          </div>
          <div class="card-content">
            <p class="description-text">{{ currentProjeto.descricao }}</p>
          </div>
        </div>

        <!-- Project Details Card -->
        <div class="detail-card specs-card">
          <div class="card-header">
            <div class="card-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Especificações Técnicas
            </div>
          </div>
          <div class="card-content">
            <div class="specs-grid">
              <div class="spec-item">
                <div class="spec-label">ID do Projeto</div>
                <div class="spec-value">#{{ currentProjeto.id }}</div>
              </div>
              <div class="spec-item">
                <div class="spec-label">Complexidade</div>
                <div class="spec-value">{{ getComplexity() }}</div>
              </div>
              <div class="spec-item">
                <div class="spec-label">Estimativa de Tempo</div>
                <div class="spec-value">{{ getEstimatedTime() }}</div>
              </div>
              <div class="spec-item">
                <div class="spec-label">Faixa de Investimento</div>
                <div class="spec-value">{{ getPriceRange() }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="projeto-sidebar">
        <!-- Quick Actions -->
        <div class="detail-card actions-card">
          <div class="card-header">
            <div class="card-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Ações Rápidas
            </div>
          </div>
          <div class="card-content">
            <div class="action-list">
              <NuxtLink
                :to="`/projetos/${currentProjeto.id}/editar`"
                class="action-item edit"
              >
                <div class="action-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div class="action-text">
                  <div class="action-title">Editar Projeto</div>
                  <div class="action-subtitle">Modificar informações</div>
                </div>
              </NuxtLink>
              
              <button
                @click="duplicateProjeto"
                class="action-item duplicate"
              >
                <div class="action-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="action-text">
                  <div class="action-title">Duplicar Projeto</div>
                  <div class="action-subtitle">Criar uma cópia</div>
                </div>
              </button>
              
              <button
                @click="exportProject"
                class="action-item export"
              >
                <div class="action-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="action-text">
                  <div class="action-title">Exportar Dados</div>
                  <div class="action-subtitle">Download em PDF</div>
                </div>
              </button>
              
              <NuxtLink
                to="/projetos"
                class="action-item back"
              >
                <div class="action-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
                <div class="action-text">
                  <div class="action-title">Voltar para Lista</div>
                  <div class="action-subtitle">Ver todos os projetos</div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Project Timeline -->
        <div class="detail-card timeline-card">
          <div class="card-header">
            <div class="card-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Timeline do Projeto
            </div>
          </div>
          <div class="card-content">
            <div class="timeline">
              <div class="timeline-item completed">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-title">Projeto Criado</div>
                  <div class="timeline-date">{{ formatDate(getCreationDate()) }}</div>
                </div>
              </div>
              <div class="timeline-item current">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-title">Em Desenvolvimento</div>
                  <div class="timeline-date">Atual</div>
                </div>
              </div>
              <div class="timeline-item pending">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-title">Entrega Prevista</div>
                  <div class="timeline-date">{{ formatDate(getDeliveryDate()) }}</div>
                </div>
              </div>
            </div>
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

const getProjectStatus = () => {
  // Simulação de status baseado no ID do projeto
  const statuses = ['Planejamento', 'Em Desenvolvimento', 'Em Revisão', 'Concluído']
  return statuses[parseInt(currentProjeto.value?.id?.toString() || '0') % statuses.length]
}

const getComplexity = () => {
  if (!currentProjeto.value) return 'Baixa'
  const preco = currentProjeto.value.preco
  
  if (preco < 15000) return 'Baixa'
  if (preco < 40000) return 'Média'
  if (preco < 70000) return 'Alta'
  return 'Muito Alta'
}

const getEstimatedTime = () => {
  if (!currentProjeto.value) return '1-2 meses'
  
  const complexity = getComplexity()
  const timeMap = {
    'Baixa': '1-2 meses',
    'Média': '2-4 meses',
    'Alta': '4-6 meses',
    'Muito Alta': '6-12 meses'
  }
  
  return timeMap[complexity as keyof typeof timeMap] || '1-2 meses'
}

const getPriceRange = () => {
  if (!currentProjeto.value) return 'Básico'
  const preco = currentProjeto.value.preco
  
  if (preco < 15000) return 'Básico'
  if (preco < 40000) return 'Intermediário'
  if (preco < 70000) return 'Avançado'
  return 'Premium'
}

const exportProject = () => {
  if (!currentProjeto.value) return
  
  const projectData = {
    id: currentProjeto.value.id,
    nome: currentProjeto.value.nome,
    descricao: currentProjeto.value.descricao,
    preco: currentProjeto.value.preco,
    categoria: currentProjeto.value.categoria,
    tipo: currentProjeto.value.tipo,
    status: getProjectStatus(),
    complexidade: getComplexity(),
    tempoEstimado: getEstimatedTime(),
    faixaInvestimento: getPriceRange()
  }
  
  const dataStr = JSON.stringify(projectData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `projeto-${currentProjeto.value.id}-dados.json`
  link.click()
  
  URL.revokeObjectURL(url)
  showSuccess('Exportação concluída', 'Os dados do projeto foram baixados com sucesso')
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const getCreationDate = () => {
  // Simular data de criação baseada no ID (para demonstração)
  const baseDate = new Date('2024-01-01')
  const daysToAdd = parseInt(currentProjeto.value?.id?.toString() || '0') * 7
  return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
}

const getDeliveryDate = () => {
  const creationDate = getCreationDate()
  const complexity = getComplexity()
  
  const monthsToAdd = {
    'Baixa': 2,
    'Média': 4,
    'Alta': 6,
    'Muito Alta': 12
  }[complexity] || 2
  
  return new Date(creationDate.getFullYear(), creationDate.getMonth() + monthsToAdd, creationDate.getDate())
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