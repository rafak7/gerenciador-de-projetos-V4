<template>
  <div class="projetos-page">
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

    <div v-else-if="currentProjeto" class="filters-card">
      <div class="form-header">
        <h1>Editar Projeto</h1>
        <p>Atualize as informações do projeto</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="filter-group">
          <label for="nome">Nome do Projeto *</label>
          <input
            id="nome"
            v-model="form.nome"
            type="text"
            required
            :class="{ 'error': errors.nome }"
            placeholder="Nome do projeto"
          />
          <p v-if="errors.nome" class="error-message">{{ errors.nome }}</p>
        </div>

        <div class="filter-group">
          <label for="descricao">Descrição *</label>
          <textarea
            id="descricao"
            v-model="form.descricao"
            rows="4"
            required
            :class="{ 'error': errors.descricao }"
            placeholder="Descreva o projeto detalhadamente"
          />
          <p v-if="errors.descricao" class="error-message">{{ errors.descricao }}</p>
        </div>

        <div class="filters-grid">
          <div class="filter-group">
            <label for="preco">Preço (R$) *</label>
            <input
              id="preco"
              v-model.number="form.preco"
              type="number"
              step="0.01"
              min="0"
              required
              :class="{ 'error': errors.preco }"
              placeholder="0.00"
            />
            <p v-if="errors.preco" class="error-message">{{ errors.preco }}</p>
          </div>

          <div class="filter-group">
            <label for="categoria">Categoria *</label>
            <select
              id="categoria"
              v-model="form.categoria"
              required
              :class="{ 'error': errors.categoria }"
            >
              <option value="">Selecione uma categoria</option>
              <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                {{ categoria }}
              </option>
            </select>
            <p v-if="errors.categoria" class="error-message">{{ errors.categoria }}</p>
          </div>
        </div>

        <div class="filter-group">
          <label for="tipo">Tipo *</label>
          <select
            id="tipo"
            v-model="form.tipo"
            required
            :class="{ 'error': errors.tipo }"
          >
            <option value="">Selecione um tipo</option>
            <option v-for="tipo in tipos" :key="tipo" :value="tipo">
              {{ tipo }}
            </option>
          </select>
          <p v-if="errors.tipo" class="error-message">{{ errors.tipo }}</p>
        </div>

        <div class="pagination">
          <button
            type="submit"
            :disabled="loading.update"
            class="create-btn"
          >
            <div v-if="loading.update" class="spinner"></div>
            {{ loading.update ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
          <NuxtLink :to="`/projetos/${projetoId}`" class="page-btn">
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