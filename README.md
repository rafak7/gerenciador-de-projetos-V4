# 🚀 Gerenciador de Projetos

Sistema completo de gerenciamento de projetos desenvolvido com **Vue 3**, **Nuxt 3** e **Pinia**, demonstrando as melhores práticas de desenvolvimento frontend moderno.

## 📋 Características

### ✨ Funcionalidades Principais
- ✅ **CRUD Completo** - Criar, listar, visualizar, editar e excluir projetos
- 🔍 **Busca e Filtros** - Filtrar por categoria, tipo e busca textual
- 📄 **Paginação** - Navegação eficiente entre páginas de projetos
- 🔐 **Autenticação** - Sistema de login com proteção de rotas
- 🌙 **Dark Mode** - Alternância entre tema claro e escuro
- 📱 **Responsivo** - Interface adaptada para desktop, tablet e mobile
- 🔔 **Notificações** - Feedback visual para ações do usuário
- ⚡ **Loading States** - Estados de carregamento em todas as operações

### 🛠 Stack Tecnológica

**Frontend:**
- **Vue 3** - Framework reativo com Composition API
- **Nuxt 3** - Framework full-stack com SSR
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Pinia** - Gerenciamento de estado moderno
- **TailwindCSS** - Framework CSS utility-first
- **HeadlessUI** - Componentes acessíveis
- **Heroicons** - Ícones otimizados

**Backend (Fake API):**
- **JSON Server** - API REST simulada
- **Concurrently** - Execução paralela de comandos

**Ferramentas:**
- **Vite** - Build tool ultra-rápido
- **ESLint** - Linting de código
- **PostCSS** - Processamento de CSS

## 🏗 Arquitetura

### 📁 Estrutura de Diretórios

```
gerenciador-projetos/
├── assets/css/           # Estilos globais e TailwindCSS
├── components/           # Componentes reutilizáveis
│   ├── Header.vue       # Cabeçalho com navegação
│   ├── Sidebar.vue      # Menu lateral
│   ├── NotificationContainer.vue
│   └── LoadingOverlay.vue
├── layouts/             # Layouts da aplicação
│   ├── default.vue      # Layout principal
│   └── auth.vue         # Layout de autenticação
├── middleware/          # Middlewares de rota
│   ├── auth.ts         # Proteção de rotas autenticadas
│   └── guest.ts        # Redirecionamento de usuários logados
├── pages/              # Páginas da aplicação
│   ├── index.vue       # Página inicial (redirecionamento)
│   ├── login.vue       # Página de login
│   └── projetos/       # Páginas de projetos
│       ├── index.vue   # Listagem de projetos
│       ├── novo.vue    # Criação de projeto
│       └── [id].vue    # Detalhes do projeto
├── stores/             # Gerenciamento de estado (Pinia)
│   ├── auth.ts         # Estado de autenticação
│   ├── projetos.ts     # Estado dos projetos
│   └── ui.ts           # Estado da interface
├── types/              # Definições TypeScript
│   └── index.ts        # Interfaces e tipos
├── db.json             # Banco de dados fake (JSON Server)
├── nuxt.config.ts      # Configuração do Nuxt
└── package.json        # Dependências e scripts
```

### 🎯 Padrões Arquiteturais

**Separation of Concerns:**
- **Stores (Pinia)** - Lógica de negócio e estado
- **Components** - Apresentação e interação
- **Pages** - Roteamento e layout
- **Types** - Contratos e interfaces

**State Management:**
- **Auth Store** - Gerencia autenticação e usuário
- **Projetos Store** - CRUD e listagem de projetos
- **UI Store** - Estados da interface (sidebar, dark mode, notificações)

**Routing & Protection:**
- **Middleware de Auth** - Protege rotas privadas
- **Middleware Guest** - Redireciona usuários logados
- **Roteamento dinâmico** - Páginas de detalhes e edição

## 🚀 Instalação e Execução

### 📋 Pré-requisitos
- **Node.js** 18+ 
- **npm** ou **yarn**

### 1️⃣ Instalação

```bash
# Clonar o repositório (ou extrair o projeto)
cd gerenciador-projetos

# Instalar dependências
npm install
```

### 2️⃣ Execução

**Opção 1: Execução completa (Recomendado)**
```bash
# Inicia frontend + API fake simultaneamente
npm run dev:full
```

**Opção 2: Execução separada**
```bash
# Terminal 1 - API Fake
npm run dev:api

# Terminal 2 - Frontend
npm run dev
```

### 3️⃣ Acessar a Aplicação

- **Frontend:** http://localhost:3000
- **API Fake:** http://localhost:3001

### 🔑 Credenciais de Teste

```
Administrador:
Email: admin@gerenciador.com
Senha: admin123

Usuário:
Email: user@gerenciador.com  
Senha: user123
```

## 📊 API Endpoints

A API fake (JSON Server) disponibiliza os seguintes endpoints:

```
GET    /projetos          # Listar projetos
GET    /projetos/:id      # Obter projeto específico
POST   /projetos          # Criar projeto
PUT    /projetos/:id      # Atualizar projeto
DELETE /projetos/:id      # Excluir projeto

GET    /usuarios          # Listar usuários
GET    /categorias        # Listar categorias
GET    /tipos             # Listar tipos
```

**Parâmetros de Query (Listagem):**
- `_page` - Página atual
- `_limit` - Itens por página
- `_sort` - Campo para ordenação
- `_order` - Direção (asc/desc)
- `q` - Busca textual
- `categoria` - Filtro por categoria
- `tipo` - Filtro por tipo

## 🎨 Interface e UX

### 🌙 Dark Mode
- Alternância automática baseada na preferência do sistema
- Persistência da preferência do usuário
- Transições suaves entre temas

### 📱 Responsividade
- **Mobile First** - Design otimizado para dispositivos móveis
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Menu lateral** - Collapse automático em telas pequenas

### ♿ Acessibilidade
- **Atributos ARIA** - Labels e roles apropriados
- **Navegação por teclado** - Todos os elementos interativos
- **Contraste** - Cores que atendem WCAG 2.1
- **Semântica HTML** - Estrutura apropriada

### 🔔 Sistema de Notificações
- **Tipos:** success, error, warning, info
- **Auto-dismiss** - Remoção automática configurável
- **Ações manuais** - Botão de fechar
- **Animações** - Entrada e saída suaves

## 🧪 Scripts Disponíveis

```bash
npm run dev         # Desenvolvimento (frontend apenas)
npm run dev:api     # API fake (JSON Server)
npm run dev:full    # Frontend + API simultâneos
npm run build       # Build de produção
npm run generate    # Geração estática
npm run preview     # Preview da build
```

## 🎯 Decisões Técnicas

### Por que Nuxt 3?
- **SSR/SSG** - Melhor SEO e performance inicial
- **Auto-imports** - Menor boilerplate
- **File-based routing** - Convenção sobre configuração
- **Built-in optimizations** - Code splitting automático

### Por que Pinia?
- **Composition API** - Consistência com Vue 3
- **TypeScript** - Suporte nativo e robusto
- **Devtools** - Debugging facilitado
- **Modularidade** - Stores independentes

### Por que TailwindCSS?
- **Utility-first** - Desenvolvimento rápido
- **Customização** - Design system flexível
- **Tree-shaking** - CSS otimizado
- **Dark mode** - Suporte nativo
