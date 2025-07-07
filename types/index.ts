export interface Projeto {
  id: string | number
  nome: string
  descricao: string
  preco: number
  tipo: string
  categoria: string
}

export interface NovoProjetoInput {
  nome: string
  descricao: string
  preco: number
  tipo: string
  categoria: string
}

export interface EditarProjetoInput {
  nome: string
  descricao: string
  preco: number
  tipo: string
  categoria: string
}

export interface Usuario {
  id: number
  email: string
  nome: string
  token: string
}

export interface LoginInput {
  email: string
  senha: string
}

export interface LoginResponse {
  usuario: Usuario
  token: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface ProjetosPaginados {
  projetos: Projeto[]
  pagination: PaginationMeta
}

export interface FilterOptions {
  categoria?: string
  tipo?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: 'nome' | 'preco' | 'categoria' | 'tipo'
  sortOrder?: 'asc' | 'desc'
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface ApiError {
  message: string
  statusCode: number
  details?: any
}

export interface LoadingState {
  projetos: boolean
  login: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
}

export interface UIState {
  sidebarOpen: boolean
  darkMode: boolean
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

export interface FormValidationError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: FormValidationError[]
  isValid: boolean
  isDirty: boolean
}

// Utility types
export type ProjetoFormData = Omit<Projeto, 'id'>
export type PartialProjeto = Partial<Projeto> & { id: string | number }

// API endpoints types
export interface ApiEndpoints {
  projetos: string
  usuarios: string
  categorias: string
  tipos: string
  login: string
} 