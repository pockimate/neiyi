<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div 
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-50 md:hidden"
      @click="close"
    ></div>
  </Transition>

  <!-- Drawer -->
  <Transition name="slide-up">
    <div 
      v-if="isOpen"
      class="fixed bottom-0 left-0 right-0 bg-white z-50 md:hidden max-h-[85vh] flex flex-col"
      style="border-radius: 20px 20px 0 0;"
    >
      <!-- Handle -->
      <div class="flex justify-center pt-3 pb-2">
        <div class="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 class="text-lg font-semibold text-primary uppercase tracking-wide">Filters</h2>
        <button 
          @click="close"
          class="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Content -->
      <div class="flex-1 overflow-y-auto px-6 py-4">
        <slot></slot>
      </div>
      
      <!-- Footer Actions -->
      <div class="px-6 py-4 border-t border-border bg-white">
        <div class="flex gap-3">
          <BaseButton 
            variant="secondary"
            size="md"
            @click="clearFilters"
            class="flex-1"
          >
            Clear All
          </BaseButton>
          <BaseButton 
            variant="primary"
            size="md"
            @click="applyFilters"
            class="flex-1"
          >
            Apply Filters
          </BaseButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  apply: []
  clear: []
}>()

const close = () => {
  emit('close')
}

const applyFilters = () => {
  emit('apply')
  close()
}

const clearFilters = () => {
  emit('clear')
}

// Prevent body scroll when drawer is open
watch(() => props.isOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
