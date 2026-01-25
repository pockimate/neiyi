<template>
  <div class="glass-card rounded-2xl overflow-hidden border border-pink-200 hover-lift group">
    <NuxtLink :to="`/products/${product.id}`" class="block">
      <div class="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-pink-50 to-purple-50">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div v-if="product.badge" :class="`absolute top-4 right-4 ${badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`">
          {{ product.badge }}
        </div>
      </div>
      <div class="p-6">
        <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">{{ product.name }}</h3>
        <p class="text-slate-600 text-small leading-relaxed">{{ product.description }}</p>
      </div>
    </NuxtLink>
    <div class="px-6 pb-6 flex items-center justify-between gap-4">
      <div v-if="product.originalPrice" class="flex-shrink-0">
        <div class="font-display text-2xl font-bold text-primary">${{ product.price.toFixed(2) }}</div>
        <div class="text-slate-400 line-through text-sm">${{ product.originalPrice.toFixed(2) }}</div>
      </div>
      <div v-else class="font-display text-2xl font-bold text-primary flex-shrink-0">${{ product.price.toFixed(2) }}</div>
      <button 
        @click="handleAddToCart"
        class="bg-primary hover:bg-pink-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap"
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

const badgeColor = computed(() => {
  if (props.product.badge === 'Sale') return 'bg-cta'
  if (props.product.badge === 'Bestseller') return 'bg-primary'
  return 'bg-cta'
})

const handleAddToCart = () => {
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
