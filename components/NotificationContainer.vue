<template>
  <div 
    v-if="notifications.length > 0"
    class="notifications-container"
    aria-live="assertive"
  >
    <TransitionGroup
      name="notification"
      tag="div"
      class="notifications-list"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification-card', notification.type]"
      >
        <div class="notification-content">
          <component 
            :is="getIcon(notification.type)" 
            :class="['notification-icon', notification.type]" 
          />
          <div class="notification-text">
            <p class="notification-title">
              {{ notification.title }}
            </p>
            <p v-if="notification.message" class="notification-message">
              {{ notification.message }}
            </p>
          </div>
          <button
            @click="removeNotification(notification.id)"
            class="notification-close"
            aria-label="Fechar notificação"
          >
            <XMarkIcon />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Store
const uiStore = useUIStore()
const { notifications } = storeToRefs(uiStore)
const { removeNotification } = uiStore

// Methods
const getIcon = (type: string) => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon
  }
  return icons[type as keyof typeof icons] || InformationCircleIcon
}
</script>

 