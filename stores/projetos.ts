import { defineStore } from 'pinia'
import type { Projeto, NovoProjetoInput, FilterOptions, ProjetosPaginados, PaginationMeta } from '~/types'

export const useProjetosStore = defineStore('projetos', () => {
  const projetos = ref<Projeto[]>([])
  const currentProjeto = ref<Projeto | null>(null)
  const lastCreatedProjetoId = ref<string | null>(null)
  const loading = ref({
    list: false,
    single: false,
    create: false,
    update: false,
    delete: false
  })
  const error = ref<string | null>(null)
  const pagination = ref<PaginationMeta>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  })
  const filters = ref<FilterOptions>({
    page: 1,
    limit: 12,
    sortBy: 'nome',
    sortOrder: 'asc'
  })

  const config = useRuntimeConfig()

  const fetchProjetos = async (options?: FilterOptions) => {
    loading.value.list = true
    error.value = null

    try {
      if (options) {
        filters.value = { ...filters.value, ...options }
      }

      const queryParams: Record<string, string> = {
        _sort: filters.value.sortBy || 'nome',
        _order: filters.value.sortOrder || 'asc'
      }

      if (filters.value.search) {
        queryParams.q = filters.value.search
      }
      if (filters.value.categoria) {
        queryParams.categoria = filters.value.categoria
      }
      if (filters.value.tipo) {
        queryParams.tipo = filters.value.tipo
      }

      const allFilteredProjects = await $fetch<Projeto[]>(`${config.public.apiBase}/projetos`, {
        query: queryParams
      })

      const currentPage = filters.value.page || 1
      const itemsPerPage = filters.value.limit || 12
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      projetos.value = allFilteredProjects.slice(startIndex, endIndex)

      const totalPages = Math.ceil(allFilteredProjects.length / itemsPerPage)
      const validCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1
      
      if (validCurrentPage !== currentPage) {
        filters.value.page = validCurrentPage
        const newStartIndex = (validCurrentPage - 1) * itemsPerPage
        const newEndIndex = newStartIndex + itemsPerPage
        projetos.value = allFilteredProjects.slice(newStartIndex, newEndIndex)
      }
      
      pagination.value = {
        currentPage: validCurrentPage,
        totalPages: totalPages,
        totalItems: allFilteredProjects.length,
        itemsPerPage: itemsPerPage
      }
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar projetos'
    } finally {
      loading.value.list = false
    }
  }

  const fetchProjetoById = async (id: number) => {
    loading.value.single = true
    error.value = null

    try {
      const projeto = await $fetch<Projeto>(`${config.public.apiBase}/projetos/${id}`)
      currentProjeto.value = projeto
      return projeto
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar projeto'
      return null
    } finally {
      loading.value.single = false
    }
  }

  const createProjeto = async (data: NovoProjetoInput): Promise<Projeto | null> => {
    loading.value.create = true
    error.value = null

    try {
      const allProjetos = await $fetch<Projeto[]>(`${config.public.apiBase}/projetos`)
      
      let maxId = 0
      allProjetos.forEach(projeto => {
        const id = parseInt(projeto.id.toString())
        if (!isNaN(id) && id > maxId) {
          maxId = id
        }
      })
      
      const nextId = (maxId + 1).toString()
      
      const projetoComId = { ...data, id: nextId }

      const newProjeto = await $fetch<Projeto>(`${config.public.apiBase}/projetos`, {
        method: 'POST',
        body: projetoComId
      })

      projetos.value.unshift(newProjeto)
      
      lastCreatedProjetoId.value = newProjeto.id.toString()
      
      return newProjeto
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar projeto'
      return null
    } finally {
      loading.value.create = false
    }
  }

  const updateProjeto = async (id: number, data: Partial<Projeto>): Promise<Projeto | null> => {
    loading.value.update = true
    error.value = null

    try {
      const requestBody = { ...data, id: id.toString() }

      const updatedProjeto = await $fetch<Projeto>(`${config.public.apiBase}/projetos/${id}`, {
        method: 'PUT',
        body: requestBody
      })

      const index = projetos.value.findIndex(p => p.id.toString() === id.toString())
      if (index !== -1) {
        projetos.value[index] = updatedProjeto
      }

      if (currentProjeto.value?.id.toString() === id.toString()) {
        currentProjeto.value = updatedProjeto
      }

      return updatedProjeto
    } catch (err: any) {
      error.value = err.message || 'Erro ao atualizar projeto'
      return null
    } finally {
      loading.value.update = false
    }
  }

  const deleteProjeto = async (id: number): Promise<boolean> => {
    loading.value.delete = true
    error.value = null

    try {
      await $fetch(`${config.public.apiBase}/projetos/${id}`, {
        method: 'DELETE'
      })

      projetos.value = projetos.value.filter(p => p.id.toString() !== id.toString())
      
      if (currentProjeto.value?.id.toString() === id.toString()) {
        currentProjeto.value = null
      }

      return true
    } catch (err: any) {
      error.value = err.message || 'Erro ao excluir projeto'
      return false
    } finally {
      loading.value.delete = false
    }
  }

  const setFilters = (newFilters: FilterOptions) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearError = () => {
    error.value = null
  }

  const resetCurrentProjeto = () => {
    currentProjeto.value = null
  }

  const clearLastCreatedHighlight = () => {
    lastCreatedProjetoId.value = null
  }

  const isLoading = computed(() => Object.values(loading.value).some(l => l))
  const totalProjetos = computed(() => pagination.value.totalItems)
  const hasNextPage = computed(() => {
    return pagination.value.totalPages > 0 && pagination.value.currentPage < pagination.value.totalPages
  })
  const hasPrevPage = computed(() => {
    return pagination.value.totalPages > 0 && pagination.value.currentPage > 1
  })

  return {
    projetos: readonly(projetos),
    currentProjeto: readonly(currentProjeto),
    lastCreatedProjetoId: readonly(lastCreatedProjetoId),
    loading: readonly(loading),
    error: readonly(error),
    pagination: readonly(pagination),
    filters: readonly(filters),
    
    fetchProjetos,
    fetchProjetoById,
    createProjeto,
    updateProjeto,
    deleteProjeto,
    setFilters,
    clearError,
    resetCurrentProjeto,
    clearLastCreatedHighlight,
    
    isLoading,
    totalProjetos,
    hasNextPage,
    hasPrevPage
  }
}) 