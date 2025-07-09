<template>
  <div :class="['app-container', sidebarCollapsed ? 'sidebar-closed' : 'sidebar-open']">
    
    <Sidebar 
      :open="sidebarOpen" 
      :collapsed="sidebarCollapsed"
      @close="closeSidebar"
      @toggle-collapse="toggleSidebarCollapse"
    />

    
    <div 
      v-if="sidebarOpen" 
      class="sidebar-overlay"
      @click="closeSidebar"
    />

    
    <div class="main-content">
      
      <div class="content-header">
        <Header @toggle-sidebar="toggleSidebar" />
      </div>

      
      <main class="content-body">
        <NuxtPage />
      </main>
    </div>

    
    <NotificationContainer />

    
    <LoadingOverlay v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
const uiStore = useUIStore()
const { sidebarOpen, sidebarCollapsed, isLoading } = storeToRefs(uiStore)
const { toggleSidebar, closeSidebar, toggleSidebarCollapse } = uiStore

useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script> 