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
          <NuxtLink to="/about" class="text-sm font-medium hover:text-primary transition-colors duration-200 cursor-pointer">
            About
          </NuxtLink>
          <NuxtLink to="/contact" class="text-sm font-medium hover:text-primary transition-colors duration-200 cursor-pointer">
            Contact
          </NuxtLink>
        </div>
        
        <div class="flex items-center space-x-4">
          <button 
            @click="toggleSearch"
            class="p-2 hover:bg-pink-100 rounded-lg transition-colors duration-200 cursor-pointer" 
            aria-label="Search"
          >
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
      
      <!-- Search Bar -->
      <Transition name="slide-down">
        <div v-if="isSearchOpen" class="mt-4 pt-4 border-t border-pink-200">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-3 pl-12 bg-white border-2 border-pink-200 rounded-xl focus:border-primary focus:outline-none"
              @keyup.enter="handleSearch"
            />
            <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Search Results -->
          <div v-if="searchResults.length > 0 && searchQuery" class="mt-3 max-h-96 overflow-y-auto">
            <NuxtLink
              v-for="product in searchResults"
              :key="product.id"
              :to="`/product-detail?id=${product.id}`"
              @click="closeSearch"
              class="flex items-center gap-4 p-3 hover:bg-pink-50 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <img :src="product.image" :alt="product.name" class="w-16 h-16 object-cover rounded-lg" />
              <div class="flex-1">
                <p class="font-semibold text-textPrimary">{{ product.name }}</p>
                <p class="text-sm text-slate-600">{{ product.category }}</p>
              </div>
              <p class="font-bold text-primary">${{ product.price.toFixed(2) }}</p>
            </NuxtLink>
          </div>
          
          <div v-else-if="searchQuery && searchResults.length === 0" class="mt-3 text-center py-8 text-slate-500">
            No products found for "{{ searchQuery }}"
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useProducts } from '~/composables/useProducts'

const cartStore = useCartStore()
const { products } = useProducts()

const isSearchOpen = ref(false)
const searchQuery = ref('')

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) {
    searchQuery.value = ''
  }
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}

const clearSearch = () => {
  searchQuery.value = ''
}

const searchResults = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  ).slice(0, 5) // Limit to 5 results
})

const handleSearch = () => {
  if (searchQuery.value && searchResults.value.length > 0) {
    navigateTo(`/product-detail?id=${searchResults.value[0].id}`)
    closeSearch()
  }
}

onMounted(() => {
  cartStore.loadCart()
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
