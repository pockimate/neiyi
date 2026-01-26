<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
    <div class="max-w-7xl mx-auto px-6 py-5">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-xl font-semibold text-primary tracking-wider cursor-pointer">
          INTIMATE ELEGANCE
        </NuxtLink>
        
        <!-- 主导航 - 桌面端 -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink to="/products" class="nav-link">Shop All</NuxtLink>
          <NuxtLink to="/products?filter=new" class="nav-link">New In</NuxtLink>
          <NuxtLink to="/products?filter=bestsellers" class="nav-link">Bestsellers</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        </div>
        
        <!-- 右侧图标 -->
        <div class="flex items-center gap-5">
          <!-- 搜索 -->
          <button 
            @click="toggleSearch"
            class="p-2 hover:opacity-60 transition-opacity cursor-pointer" 
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
          
          <!-- 用户 -->
          <NuxtLink 
            v-if="!isLoggedIn"
            to="/login" 
            class="p-2 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Account"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </NuxtLink>
          
          <button
            v-else
            @click="toggleUserMenu"
            class="p-2 hover:opacity-60 transition-opacity cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </button>
          
          <!-- 购物车 -->
          <NuxtLink 
            to="/cart" 
            class="relative p-2 hover:opacity-60 transition-opacity cursor-pointer" 
            aria-label="Shopping cart"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span 
              v-if="cartStore.cartCount > 0" 
              class="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold"
            >
              {{ cartStore.cartCount }}
            </span>
          </NuxtLink>
          
          <!-- 移动端菜单按钮 -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 搜索栏 -->
      <Transition name="slide-down">
        <div v-if="isSearchOpen" class="mt-4 pt-4 border-t border-border">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-3 border border-border focus:border-primary focus:outline-none text-sm"
              @keyup.enter="handleSearch"
            />
            <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </Transition>
    </div>
    
    <!-- 移动端菜单 -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-border bg-white">
        <div class="px-6 py-4 space-y-4">
          <NuxtLink to="/products" class="block nav-link" @click="closeMobileMenu">Shop All</NuxtLink>
          <NuxtLink to="/products?filter=new" class="block nav-link" @click="closeMobileMenu">New In</NuxtLink>
          <NuxtLink to="/products?filter=bestsellers" class="block nav-link" @click="closeMobileMenu">Bestsellers</NuxtLink>
          <NuxtLink to="/about" class="block nav-link" @click="closeMobileMenu">About</NuxtLink>
        </div>
      </div>
    </Transition>
    
    <!-- 用户下拉菜单 -->
    <Transition name="fade">
      <div
        v-if="isUserMenuOpen"
        class="absolute right-6 top-20 w-64 bg-white border border-border shadow-lg z-50"
      >
        <div class="p-4 border-b border-border">
          <p class="font-semibold text-sm">{{ userName }}</p>
          <p class="text-xs text-textMuted">{{ userEmail }}</p>
        </div>
        
        <div class="py-2">
          <NuxtLink to="/account/profile" @click="closeUserMenu" class="block px-4 py-2 text-sm hover:bg-backgroundLight transition-colors">
            My Profile
          </NuxtLink>
          <NuxtLink to="/account/orders" @click="closeUserMenu" class="block px-4 py-2 text-sm hover:bg-backgroundLight transition-colors">
            My Orders
          </NuxtLink>
          <NuxtLink to="/account/wishlist" @click="closeUserMenu" class="block px-4 py-2 text-sm hover:bg-backgroundLight transition-colors">
            Wishlist
          </NuxtLink>
        </div>
        
        <div class="border-t border-border py-2">
          <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm hover:bg-backgroundLight transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </Transition>
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
const isMobileMenuOpen = ref(false)
const isLoggedIn = ref(false)
const userName = ref('')
const userEmail = ref('')

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) {
    searchQuery.value = ''
  }
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
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

const handleSearch = () => {
  if (searchQuery.value) {
    navigateTo(`/products?search=${searchQuery.value}`)
    isSearchOpen.value = false
  }
}

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

onMounted(() => {
  cartStore.loadCart()
  checkAuth()
})
</script>

<style scoped>
.nav-link {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #666666;
}

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
}

.fade-leave-to {
  opacity: 0;
}
</style>
