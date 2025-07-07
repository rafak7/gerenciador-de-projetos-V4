# 🚀 Teste Rápido - Gerenciador de Projetos

## ⚡ Início Imediato

```bash
# No diretório gerenciador-projetos
npm run dev:full
```

Isso iniciará:
- **Frontend**: http://localhost:3000
- **API Fake**: http://localhost:3001

## 🔑 Login Imediato

**Credenciais pré-preenchidas:**
- Email: `admin@gerenciador.com`
- Senha: `admin123`

## ✅ Checklist de Testes

### 1. Autenticação
- [ ] ✅ Página de login carrega
- [ ] ✅ Login com credenciais funciona
- [ ] ✅ Redirecionamento para /projetos
- [ ] ✅ Proteção de rotas funcionando

### 2. Listagem de Projetos
- [ ] ✅ 8 projetos de exemplo carregam
- [ ] ✅ Filtros por categoria funcionam
- [ ] ✅ Filtros por tipo funcionam
- [ ] ✅ Busca textual funciona
- [ ] ✅ Paginação funciona

### 3. CRUD de Projetos
- [ ] ✅ Criar novo projeto
- [ ] ✅ Visualizar detalhes
- [ ] ✅ Editar projeto existente
- [ ] ✅ Excluir projeto
- [ ] ✅ Duplicar projeto

### 4. Interface e UX
- [ ] ✅ Dark mode toggle
- [ ] ✅ Menu lateral responsivo
- [ ] ✅ Notificações aparecem
- [ ] ✅ Loading states
- [ ] ✅ Responsividade mobile

### 5. Navegação
- [ ] ✅ Sidebar funciona
- [ ] ✅ Breadcrumbs corretos
- [ ] ✅ Botões de voltar
- [ ] ✅ Links internos

## 🛠 Resolução de Problemas

### API não responde?
```bash
# Terminal separado para API
cd gerenciador-projetos
npx json-server --watch db.json --port 3001
```

### Frontend não carrega?
```bash
# Terminal separado para frontend
cd gerenciador-projetos
npm run dev
```

### Limpar cache?
```bash
rm -rf .nuxt node_modules/.cache
npm install
npm run dev:full
```

## 📊 Dados de Teste

**8 Projetos incluídos:**
1. Sistema de E-commerce - R$ 25.000
2. App Mobile Delivery - R$ 35.000  
3. Dashboard Analytics - R$ 18.000
4. Sistema de CRM - R$ 42.000
5. Plataforma de Ensino - R$ 30.000
6. App de Finanças - R$ 22.000
7. Sistema Hospitalar - R$ 80.000
8. Plataforma de Streaming - R$ 65.000

**Categorias:** E-commerce, Delivery, Analytics, CRM, Educação, Finanças, Saúde, Mídia

**Tipos:** Web Development, Mobile Development, Desktop Development, API Development

## 🎯 Fluxos de Teste Sugeridos

### Fluxo 1: Usuário Completo
1. Login → Visualizar lista → Criar projeto → Editar → Excluir

### Fluxo 2: Filtros e Busca  
1. Login → Filtrar por categoria → Buscar texto → Ordenar

### Fluxo 3: Responsividade
1. Redimensionar tela → Testar menu mobile → Dark mode

### Fluxo 4: Estados de Erro
1. Desligar API → Ver tratamento de erro → Religar API

## 📱 Teste em Dispositivos

**Desktop:** ✅ Chrome, Firefox, Safari
**Mobile:** ✅ Redimensionar browser ou usar DevTools  
**Tablet:** ✅ Teste intermediário

---

**💡 Dica:** Use as DevTools do browser para simular dispositivos móveis e testar a responsividade! 