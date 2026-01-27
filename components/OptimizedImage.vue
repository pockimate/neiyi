<template>
  <div 
    ref="imageContainer"
    :class="[
      'optimized-image-container',
      { 'is-loaded': isLoaded, 'is-loading': isLoading }
    ]"
    :style="containerStyle"
  >
    <!-- Blur placeholder -->
    <div 
      v-if="!isLoaded && blurDataUrl"
      class="blur-placeholder"
      :style="{ backgroundImage: `url(${blurDataUrl})` }"
    ></div>
    
    <!-- Loading skeleton -->
    <div 
      v-if="!isLoaded && !blurDataUrl"
      class="loading-skeleton"
    ></div>
    
    <!-- Actual image -->
    <img
      v-show="isLoaded"
      ref="imageElement"
      :src="currentSrc"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :class="imageClass"
      @load="handleLoad"
      @error="handleError"
    />
    
    <!-- Error state -->
    <div v-if="hasError" class="error-state">
      <svg class="w-12 h-12 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      <p class="text-xs text-textMuted mt-2">Image not available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  aspectRatio?: string
  sizes?: string
  eager?: boolean
  blurDataUrl?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  imageClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: '1/1',
  sizes: '100vw',
  eager: false,
  objectFit: 'cover',
  imageClass: ''
})

const imageContainer = ref<HTMLElement | null>(null)
const imageElement = ref<HTMLImageElement | null>(null)
const isLoaded = ref(false)
const isLoading = ref(false)
const hasError = ref(false)
const currentSrc = ref('')

// Container style for aspect ratio
const containerStyle = computed(() => ({
  aspectRatio: props.aspectRatio,
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#F5F5F5'
}))

// Generate srcset for responsive images
const srcset = computed(() => {
  if (!props.src) return ''
  
  // If using a CDN, generate multiple sizes
  // For now, return the original src
  // In production, you would generate URLs like:
  // return `${props.src}?w=400 400w, ${props.src}?w=800 800w, ${props.src}?w=1200 1200w`
  return ''
})

// Intersection Observer for lazy loading
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (props.eager) {
    // Load immediately
    loadImage()
  } else {
    // Setup intersection observer for lazy loading
    setupObserver()
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

const setupObserver = () => {
  if (!process.client || !imageContainer.value) return
  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoaded.value && !isLoading.value) {
          loadImage()
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '50px', // Start loading 50px before entering viewport
      threshold: 0.01
    }
  )
  
  observer.observe(imageContainer.value)
}

const loadImage = () => {
  if (!props.src) {
    hasError.value = true
    return
  }
  
  isLoading.value = true
  currentSrc.value = props.src
}

const handleLoad = () => {
  isLoaded.value = true
  isLoading.value = false
  hasError.value = false
}

const handleError = () => {
  isLoaded.value = false
  isLoading.value = false
  hasError.value = true
}
</script>

<style scoped>
.optimized-image-container {
  display: block;
  width: 100%;
}

.optimized-image-container img {
  width: 100%;
  height: 100%;
  object-fit: v-bind(objectFit);
  transition: opacity 0.3s ease-in-out;
}

.blur-placeholder {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
  transition: opacity 0.3s ease-in-out;
}

.is-loaded .blur-placeholder {
  opacity: 0;
}

.loading-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    #F0F0F0 0%,
    #E0E0E0 50%,
    #F0F0F0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.error-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FAFAFA;
}

.is-loaded img {
  opacity: 1;
}

.is-loading img {
  opacity: 0;
}
</style>
