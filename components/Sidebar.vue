<template>
  <div>
    <div :class="['main-sidebar', { collapsed: collapsed }]">
      <div class="sidebar-container">
        <div class="sidebar-header">
          <button @click="toggleCollapse" class="collapse-btn">
            <svg :class="['collapse-icon', { rotated: collapsed }]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <nav class="sidebar-nav">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="['nav-item', { active: item.current }]"
            :title="collapsed ? item.name : ''"
          >
            <component :is="item.icon" class="nav-icon" />
            <span v-if="!collapsed" class="nav-text">{{ item.name }}</span>
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div v-if="open" class="mobile-sidebar">
      <div class="sidebar-overlay" @click="$emit('close')"></div>
      <div class="mobile-sidebar-content">
        <div class="mobile-header">
          <h2 class="logo-title">Projetos Manager</h2>
          <button @click="$emit('close')" class="close-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav class="mobile-nav">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            @click="$emit('close')"
            :class="['nav-item', { active: item.current }]"
          >
            <component :is="item.icon" class="nav-icon" />
            <span class="nav-text">{{ item.name }}</span>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FolderIcon,
  PlusIcon,
  HomeIcon,
  CommandLineIcon
} from '@heroicons/vue/24/outline'

defineProps<{
  open: boolean
  collapsed?: boolean
}>()

const emit = defineEmits<{
  close: []
  'toggle-collapse': []
}>()

const toggleCollapse = () => {
  emit('toggle-collapse')
}

const route = useRoute()

const navigation = computed(() => [
  {
    name: 'Todos os Projetos',
    href: '/projetos',
    icon: FolderIcon,
    current: route.path === '/projetos'
  },
  {
    name: 'Novo Projeto',
    href: '/projetos/novo',
    icon: PlusIcon,
    current: route.path === '/projetos/novo'
  },
  {
    name: 'Servidor API',
    href: '/api-explorer',
    icon: CommandLineIcon,
    current: route.path === '/api-explorer'
  }
])
</script> 