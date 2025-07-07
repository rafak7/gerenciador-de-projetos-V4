<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar 
      :open="sidebarOpen" 
      @close="closeSidebar"
    />

    <!-- Overlay para mobile -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
      @click="closeSidebar"
    />

    <!-- Main Layout -->
    <div class="lg:ml-64">
      <!-- Header -->
      <Header @toggle-sidebar="toggleSidebar" />

      <!-- Main Content -->
      <main class="px-6 py-6">
        <NuxtPage />
      </main>
    </div>

    <!-- Notifications -->
    <NotificationContainer />

    <!-- Loading Overlay -->
    <LoadingOverlay v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
// Stores
const uiStore = useUIStore()
const { sidebarOpen, isLoading } = storeToRefs(uiStore)
const { toggleSidebar, closeSidebar } = uiStore

// SEO
useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script> 