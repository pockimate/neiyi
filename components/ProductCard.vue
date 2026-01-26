<template>
  <div class="glass-card rounded-2xl overflow-hidden border border-pink-200 product-card-hover relative">
    <a 
      :href="`/product-detail?id=${product.id}`" 
      class="block cursor-pointer"
    >
      <div class="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-pink-50 to-purple-50">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-full object-contain transition-all duration-700 hover:scale-110 image-fade-in"
          :class="{ 'loaded': imageLoaded }"
          loading="lazy"
          style="object-position: center center;"
          @load="imageLoaded = true"
        />
        <!-- 骨架屏 -->
        <div v-if="!imageLoaded" class="absolute inset-0 skeleton"></div>
        
        <div v-if="product.badge" :class="`absolute top-4 right-4 ${badgeClass} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform transition-transform duration-300 hover:scale-110`">
          {{ product.badge }}
        </div>
      </div>
      <div class="p-6">
        <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">{{ product.name }}</h3>
        <p class="text-slate-600 text-base leading-relaxed">{{ product.description }}</p>
      </div>
    </a>
    <div class="px-6 pb-6 flex items-center justify-between gap-4" style="position: relative; z-index: 2;">
      <div v-if="product.originalPrice" class="flex-shrink-0">
        <div class="font-display text-2xl font-bold text-primary">${{ product.price.toFixed(2) }}</div>
        <div class="text-slate-400 line-through text-sm">${{ product.originalPrice.toFixed(2) }}</div>
      </div>
      <div v-else class="font-display text-2xl font-bold text-primary flex-shrink-0">${{ product.price.toFixed(2) }}</div>
      <button 
        @click.stop="handleAddToCart"
        class="btn-accent glow-accent whitespace-nowrap min-w-[120px]"
        style="position: relative; z-index: 3; pointer-events: auto;"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import type { Product } from '~/composables/useProducts'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const imageLoaded = ref(false)

const badgeClass = computed(() => {
  if (props.product.badge === 'Sale') return 'badge-sale'
  if (props.product.badge === 'Bestseller') return 'badge-new'
  if (props.product.badge === 'New') return 'badge-new'
  return 'badge-sale'
})

const handleAddToCart = (event: Event) => {
  event.stopPropagation() // Prevent click from bubbling to parent
  event.preventDefault() // Prevent navigation
  
  cartStore.addToCart({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    size: 'M',
    color: 'Default',
    quantity: 1,
    image: props.product.image
  })
  
  // Open cart sidebar
  const isCartOpen = useState('cartSidebarOpen')
  isCartOpen.value = true
}
</script>
