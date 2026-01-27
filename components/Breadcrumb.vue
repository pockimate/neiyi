<template>
  <nav class="breadcrumb max-w-7xl mx-auto px-6 pt-24">
    <NuxtLink to="/" class="breadcrumb-link">Home</NuxtLink>
    <span class="breadcrumb-separator">/</span>
    
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink 
        v-if="item.to" 
        :to="item.to" 
        class="breadcrumb-link"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="breadcrumb-current">{{ item.label }}</span>
      
      <span 
        v-if="index < items.length - 1" 
        class="breadcrumb-separator"
      >
        /
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>

<style scoped>
.breadcrumb-link {
  @apply text-textSecondary hover:text-accent transition-colors duration-300;
}
</style>
