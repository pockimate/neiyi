<template>
  <nav class="breadcrumb max-w-7xl mx-auto px-6 pt-24" aria-label="Breadcrumb">
    <!-- Desktop: Full breadcrumb -->
    <div class="hidden md:flex items-center flex-wrap gap-2">
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
    </div>
    
    <!-- Mobile: Collapsed breadcrumb (only show back + current) -->
    <div class="flex md:hidden items-center gap-2">
      <button 
        v-if="items.length > 0 && items[items.length - 1].to"
        @click="goBack"
        class="flex items-center gap-1 text-textSecondary hover:text-accent transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="text-sm">Back</span>
      </button>
      <span v-if="items.length > 0" class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current text-sm">{{ items[items.length - 1]?.label }}</span>
    </div>
    
    <!-- Structured Data for SEO -->
    <script type="application/ld+json" v-html="structuredData"></script>
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

const props = defineProps<Props>()
const router = useRouter()

const goBack = () => {
  router.back()
}

// Generate structured data for SEO
const structuredData = computed(() => {
  const baseUrl = 'https://neiyi.vercel.app' // Replace with your actual domain
  
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl
    }
  ]
  
  props.items.forEach((item, index) => {
    if (item.to) {
      itemListElement.push({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: `${baseUrl}${item.to}`
      })
    } else {
      itemListElement.push({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label
      })
    }
  })
  
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  })
})
</script>

<style scoped>
.breadcrumb-link {
  @apply text-textSecondary hover:text-accent transition-colors duration-300 text-sm;
}

.breadcrumb-current {
  @apply text-primary font-medium text-sm;
}

.breadcrumb-separator {
  @apply text-textMuted text-sm;
}
</style>
