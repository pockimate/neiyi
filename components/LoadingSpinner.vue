<template>
  <div class="loading-spinner" :class="sizeClass">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClass = computed(() => {
  return `size-${props.size}`
})
</script>

<style scoped>
.loading-spinner {
  display: inline-block;
}

.spinner {
  border: 2px solid rgba(201, 168, 130, 0.2);
  border-top-color: #C9A882;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.size-sm .spinner {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.size-md .spinner {
  width: 24px;
  height: 24px;
  border-width: 3px;
}

.size-lg .spinner {
  width: 40px;
  height: 40px;
  border-width: 4px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
