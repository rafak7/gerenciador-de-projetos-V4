# 🚀 Gerenciador de Projetos

Sistema completo de gerenciamento de projetos construído com **Vue 3**, **Nuxt 3** e **Pinia**. Este repositório demonstra as melhores práticas de desenvolvimento frontend moderno, incluindo tipagem estática com **TypeScript**, gerenciamento de estado global, rotas protegidas e uma API fake para testes locais.

## 🗂️ Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Arquitetura](#arquitetura)
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Execução](#execução)
- [Scripts Disponíveis](#scripts-disponíveis)
- [API Fake](#api-fake)
- [Padrões de Código & Estilo](#padrões-de-código--estilo)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Visão Geral

O **Gerenciador de Projetos** permite criar, listar, pesquisar, atualizar e excluir projetos de forma simples e eficiente. A aplicação foi concebida para ser totalmente responsiva, acessível e fácil de estender, servindo como estudo e ponto de partida para projetos em Nuxt.

## Funcionalidades

- ✅ **CRUD Completo** – criar, ler, atualizar e excluir projetos
- 🔍 **Busca & Filtros** – pesquisa textual e filtros por categoria/tipo
- 📄 **Paginação** – navegação entre páginas de resultados
- 🔐 **Autenticação** – rotas protegidas e login com persistência
- 🌙 **Tema Escuro** – alternância de tema com persistência em `localStorage`
- 🔔 **Notificações** – feedback visual de sucesso/erro
- ⚡ **Loading Overlay** – estados de carregamento globais
- ♿ **Acessibilidade** – navegação por teclado, ARIA labels e alto contraste

## Stack Tecnológica

### Frontend

- **Vue 3** – Composition API e Ecossistema
- **Nuxt 3** – SSR/SSG, roteamento baseado em arquivos e otimizações de build
- **TypeScript** – segurança de tipos em toda a base de código
- **Pinia** – gerenciamento de estado reativo e tipado
- **Sass (SCSS)** – estilização modular por partials e mixins
- **Headless UI** & **Heroicons** – componentes acessíveis e ícones

### Ferramentas & Utilitários

- **Vite** – bundler ultra-rápido utilizado internamente pelo Nuxt
- **ESLint** – linting de código com regras para Vue & TypeScript
- **JSON Server** – API REST simulada para desenvolvimento
- **Concurrently** – execução paralela de scripts (frontend + API)

## Estrutura de Pastas

```text
gerenciador-de-projetos-V4/
├── assets/
│   └── scss/
│       ├── base/          # Variáveis, reset, mixins, utilidades
│       ├── components/    # Estilos de componentes reutilizáveis
│       └── pages/         # Estilos específicos de páginas
├── components/            # Componentes Vue isolados
│   ├── Header.vue
│   ├── Sidebar.vue
│   ├── NotificationContainer.vue
│   └── LoadingOverlay.vue
├── layouts/               # Layouts da aplicação (default, auth)
├── middleware/            # Proteção e redirecionamento de rotas
├── pages/                 # Roteamento baseado em arquivos
│   ├── index.vue          # Redireciona para /projetos
│   ├── login.vue          # Página de autenticação
│   └── projetos/
│       ├── index.vue      # Listagem de projetos
│       ├── novo.vue       # Criação de projeto
│       └── [id]/
│           ├── index.vue  # Detalhes do projeto
│           └── editar.vue # Edição de projeto
├── stores/                # Pinia Stores (auth, projetos, ui)
├── types/                 # Tipos e interfaces globais
├── db.json                # Banco de dados fake (JSON Server)
├── nuxt.config.ts         # Configurações do Nuxt
└── package.json           # Dependências e scripts
```

## Arquitetura

- **Separation of Concerns** – componentes (UI), stores (lógica/estado), páginas (roteamento) e estilos (SCSS)
- **State-driven UI** – componentes reagem ao estado global (Pinia)
- **Composição Reutilizável** – funções utilitárias e mixins SCSS seguem convenções de nomenclatura humanizada
- **Rotas Protegidas** – `middleware/auth.ts` redireciona usuários não autenticados

## Ambiente de Desenvolvimento

### Pré-requisitos

- **Node.js 18+**
- **npm** (ou **yarn/pnpm** caso prefira)

### Instalação

```bash
# clone o repositório
$ git clone https://github.com/rafak7/gerenciador-de-projetos-V4.git
$ cd gerenciador-de-projetos-V4

# instale as dependências
$ npm install
```

### Execução

#### Opção 1 – Frontend + API (recomendado)

```bash
# inicia o Nuxt e o JSON Server simultaneamente
$ npm run dev:full
```

#### Opção 2 – Processos separados

```bash
# terminal 1 – API fake na porta 3001
$ npm run dev:api

# terminal 2 – aplicação Nuxt na porta 3000
$ npm run dev
```

Acesse em `http://localhost:3000`.

## Scripts Disponíveis

```bash
npm run dev         # Modo desenvolvimento (Nuxt)
npm run dev:api     # Inicia JSON Server
npm run dev:full    # Executa ambos em paralelo
npm run build       # Compila para produção
npm run generate    # Geração de site estático
npm run preview     # Preview da build em produção
```

## API Fake

A API expõe os endpoints abaixo (porta **3001**):

```http
GET    /projetos          # Lista projetos
GET    /projetos/:id      # Detalhe de projeto
POST   /projetos          # Cria projeto
PUT    /projetos/:id      # Atualiza projeto
DELETE /projetos/:id      # Remove projeto
```

Filtros de listagem: `_page`, `_limit`, `_sort`, `_order`, `q`, `categoria`, `tipo`.

## Padrões de Código & Estilo

### SCSS Modular

- **Partial files** divididos em `base/`, `components/` e `pages/`
- **Mixins & Variáveis** centralizados em `assets/scss/base/`
- Convenção de nomenclatura **BEM** adaptada para nomes humanizados (ex.: `.botao--primario`)

### Linters & Formatação

- **ESLint** com presets para Vue 3 + TypeScript
- **EditorConfig** recomendado para consistência de indentação

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit suas mudanças: `git commit -m "feat: minha nova feature"`
4. Push para o branch: `git push origin feature/sua-feature`
5. Abra um Pull Request 😄

## Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para mais informações.
