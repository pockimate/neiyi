<template>
  <nav class="mobile-bottom-nav md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-bottom">
    <div class="flex items-center justify-around h-16">
      <!-- Home -->
      <NuxtLink 
        to="/" 
        class="nav-item"
        :class="{ 'active': isActive('/') }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span class="text-xs mt-1">Home</span>
      </NuxtLink>
      
      <!-- Shop -->
      <NuxtLink 
        to="/products" 
        class="nav-item"
        :class="{ 'active': isActive('/products') }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <span class="text-xs mt-1">Shop</span>
      </NuxtLink>
      
      <!-- Search -->
      <NuxtLink 
        to="/search" 
        class="nav-item"
        :class="{ 'active': isActive('/search') }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span class="text-xs mt-1">Search</span>
      </NuxtLink>
      
      <!-- Cart -->
      <NuxtLink 
        to="/cart" 
        data-cart-icon
        class="nav-item relative"
        :class="{ 'active': isActive('/cart') }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <span 
          v-if="cartStore.cartCount > 0"
          data-cart-count
          class="absolute -top-1 -right-1 bg-accent-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold"
        >
          {{ cartStore.cartCount }}
        </span>
        <span class="text-xs mt-1">Cart</span>
      </NuxtLink>
      
      <!-- Account -->
      <NuxtLink 
        to="/account/profile" 
        class="nav-item"
        :class="{ 'active': isActive('/account') }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <span class="text-xs mt-1">Account</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

onMounted(() => {
  cartStore.loadCart()
})
</script>

<style scoped>
.mobile-bottom-nav {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8A8A8A;
  transition: color 0.2s ease;
  padding: 0.5rem;
  min-width: 60px;
}

.nav-item.active {
  color: #C9A882;
}

.nav-item:active {
  transform: scale(0.95);
}

/* Safe area for devices with notch */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
