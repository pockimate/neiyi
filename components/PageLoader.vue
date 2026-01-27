<template>
  <Transition name="fade">
    <div v-if="isLoading" class="page-loader">
      <div class="loader-content">
        <LoadingSpinner size="lg" />
        <p v-if="message" class="loader-message">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean
  message?: string
}

defineProps<Props>()
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-content {
  text-align: center;
}

.loader-message {
  margin-top: 1rem;
  color: #2C2C2C;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
