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
          
          <!-- User Menu -->
          <div class="relative">
            <button
              v-if="!isLoggedIn"
              @click="navigateTo('/login')"
              class="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-pink-700 text-white rounded-full font-semibold transition-colors duration-200 cursor-pointer min-h-[48px]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span class="hidden sm:inline">Sign In</span>
            </button>
            
            <button
              v-else
              @click="toggleUserMenu"
              class="flex items-center gap-2 p-2 hover:bg-pink-100 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                {{ userInitial }}
              </div>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <!-- User Dropdown Menu -->
            <Transition name="fade">
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-2 w-64 glass-card rounded-2xl border border-pink-200 shadow-xl overflow-hidden z-50"
              >
                <div class="p-4 border-b border-pink-200">
                  <p class="font-semibold text-textPrimary">{{ userName }}</p>
                  <p class="text-sm text-slate-600">{{ userEmail }}</p>
                </div>
                
                <div class="py-2">
                  <NuxtLink
                    to="/account/profile"
                    @click="closeUserMenu"
                    class="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition-colors cursor-pointer"
                  >
                    <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span class="text-sm font-medium">My Profile</span>
                  </NuxtLink>
                  
                  <NuxtLink
                    to="/account/orders"
                    @click="closeUserMenu"
                    class="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition-colors cursor-pointer"
                  >
                    <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    <span class="text-sm font-medium">My Orders</span>
                  </NuxtLink>
                  
                  <NuxtLink
                    to="/account/wishlist"
                    @click="closeUserMenu"
                    class="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition-colors cursor-pointer"
                  >
                    <svg class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm font-medium">Wishlist</span>
                  </NuxtLink>
                  
                  <NuxtLink
                    to="/account/settings"
                    @click="closeUserMenu"
                    class="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition-colors cursor-pointer"
                  >
                    <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span class="text-sm font-medium">Settings</span>
                  </NuxtLink>
                </div>
                
                <div class="border-t border-pink-200 py-2">
                  <button
                    @click="handleLogout"
                    class="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition-colors cursor-pointer w-full text-left"
                  >
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    <span class="text-sm font-medium text-red-600">Sign Out</span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
          
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
const isUserMenuOpen = ref(false)
const isLoggedIn = ref(false)
const userName = ref('')
const userEmail = ref('')

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

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

const handleLogout = () => {
  if (process.client) {
    localStorage.removeItem('user')
    localStorage.removeItem('rememberMe')
  }
  isLoggedIn.value = false
  isUserMenuOpen.value = false
  navigateTo('/')
}

const userInitial = computed(() => {
  return userName.value ? userName.value.charAt(0).toUpperCase() : 'U'
})

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

// Check if user is logged in
const checkAuth = () => {
  if (process.client) {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        isLoggedIn.value = true
        userName.value = userData.name || userData.email.split('@')[0]
        userEmail.value = userData.email
      } catch (e) {
        console.error('Failed to parse user data')
      }
    }
  }
}

// Close user menu when clicking outside
if (process.client) {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      isUserMenuOpen.value = false
    }
  })
}

onMounted(() => {
  cartStore.loadCart()
  checkAuth()
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
