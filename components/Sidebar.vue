<template>
  <div>
    <!-- Desktop Sidebar -->
    <div class="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:z-30">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <!-- Navigation -->
          <div class="flex-1 flex flex-col overflow-y-auto">
            <nav class="pt-6 flex-1 px-3 pb-4 space-y-1">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  item.current
                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-200'
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                  'group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-200'
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-blue-500 dark:text-blue-200'
                      : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                    'mr-3 h-5 w-5 transition-colors duration-200'
                  ]"
                />
                {{ item.name }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <div v-if="open" class="lg:hidden">
      <div class="fixed inset-0 z-50 flex">
        <div class="flex-shrink-0 w-64 bg-white dark:bg-gray-800">
          <div class="flex flex-col h-full">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                Projetos Manager
              </h2>
              <button
                @click="$emit('close')"
                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Navigation -->
            <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                @click="$emit('close')"
                :class="[
                  item.current
                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-200'
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                  'group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-200'
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-blue-500 dark:text-blue-200'
                      : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                    'mr-3 h-5 w-5 transition-colors duration-200'
                  ]"
                />
                {{ item.name }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FolderIcon,
  PlusIcon,
  HomeIcon
} from '@heroicons/vue/24/outline'

// Props
defineProps<{
  open: boolean
}>()

// Emits
defineEmits<{
  close: []
}>()

// Navigation items
const route = useRoute()

const navigation = computed(() => [
  {
    name: 'Dashboard',
    href: '/projetos',
    icon: HomeIcon,
    current: route.path === '/projetos'
  },
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
  }
])
</script> 