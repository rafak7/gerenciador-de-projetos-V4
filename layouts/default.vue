<template>
  <div :class="['app-container', sidebarCollapsed ? 'sidebar-closed' : 'sidebar-open']">
    <!-- Sidebar -->
    <Sidebar 
      :open="sidebarOpen" 
      :collapsed="sidebarCollapsed"
      @close="closeSidebar"
      @toggle-collapse="toggleSidebarCollapse"
    />

    <!-- Overlay para mobile -->
    <div 
      v-if="sidebarOpen" 
      class="sidebar-overlay"
      @click="closeSidebar"
    />

    <!-- Main Layout -->
    <div class="main-content">
      <!-- Header -->
      <div class="content-header">
        <Header @toggle-sidebar="toggleSidebar" />
      </div>

      <!-- Main Content -->
      <main class="content-body">
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
const { sidebarOpen, sidebarCollapsed, isLoading } = storeToRefs(uiStore)
const { toggleSidebar, closeSidebar, toggleSidebarCollapse } = uiStore

// SEO
useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script> 