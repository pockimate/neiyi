<template>
  <NuxtLink :to="`/products/${product.id}`" class="glass-card rounded-2xl overflow-hidden border border-pink-200 hover-lift cursor-pointer group block">
    <div :class="`relative overflow-hidden bg-gradient-to-br ${product.gradient} aspect-[3/4]`">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center p-8">
          <svg class="w-24 h-24 text-primary/20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <p class="text-sm text-slate-400">Product Image</p>
        </div>
      </div>
      <div v-if="product.badge" :class="`absolute top-4 right-4 ${badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`">
        {{ product.badge }}
      </div>
    </div>
    <div class="p-6">
      <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">{{ product.name }}</h3>
      <p class="text-slate-600 text-small mb-4 leading-relaxed">{{ product.description }}</p>
      <div class="flex items-center justify-between">
        <div v-if="product.originalPrice">
          <span class="font-display text-2xl font-bold text-primary">${{ product.price.toFixed(2) }}</span>
          <span class="text-slate-400 line-through ml-2">${{ product.originalPrice.toFixed(2) }}</span>
        </div>
        <span v-else class="font-display text-2xl font-bold text-primary">${{ product.price.toFixed(2) }}</span>
        <button 
          @click="handleAddToCart"
          class="bg-primary hover:bg-pink-700 text-white px-6 py-3 rounded-full text-small font-semibold transition-colors duration-200 cursor-pointer min-h-touch"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </NuxtLink>
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
    quantity: 1
  })
  
  // Show notification
  alert('Product added to cart!')
}
</script>
