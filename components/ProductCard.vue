<template>
  <NuxtLink :to="`/products/${product.id}`" class="glass-card rounded-2xl overflow-hidden border border-pink-200 hover-lift cursor-pointer group block">
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
