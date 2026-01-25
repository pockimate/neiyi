<template>
  <nav class="fixed top-4 left-4 right-4 z-50 glass-card-dark rounded-2xl border border-pink-200 shadow-lg">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-2 cursor-pointer">
          <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <span class="font-display text-2xl font-semibold text-primary">Intimate Elegance</span>
        </NuxtLink>
        
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/products" class="text-sm font-medium hover:text-primary transition-colors duration-200 cursor-pointer">
            Shop
          </NuxtLink>
          <NuxtLink to="/#featured" class="text-sm font-medium hover:text-primary transition-colors duration-200 cursor-pointer">
            Featured
          </NuxtLink>
          <NuxtLink to="/#about" class="text-sm font-medium hover:text-primary transition-colors duration-200 cursor-pointer">
            About
          </NuxtLink>
          <NuxtLink to="/#contact" class="text-sm font-medium hover:text-primary transition-colors duration-200 cursor-pointer">
            Contact
          </NuxtLink>
        </div>
        
        <div class="flex items-center space-x-4">
          <button class="p-2 hover:bg-pink-100 rounded-lg transition-colors duration-200 cursor-pointer" aria-label="Search">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
          <NuxtLink to="/cart" class="p-2 hover:bg-pink-100 rounded-lg transition-colors duration-200 cursor-pointer relative" aria-label="Shopping cart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span v-if="cartStore.cartCount > 0" class="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {{ cartStore.cartCount }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadCart()
})
</script>
