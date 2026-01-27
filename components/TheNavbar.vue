<template>
  <!-- 顶部通知栏 -->
  <div v-if="showTopBar" class="bg-primary text-white text-center py-2 px-4 text-xs uppercase tracking-wide relative z-50">
    <p class="max-w-7xl mx-auto">
      {{ topBarMessage }}
    </p>
    <button 
      @click="closeTopBar"
      class="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
      aria-label="Close notification"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
  
  <nav 
    :class="[
      'fixed left-0 right-0 z-50 transition-all duration-300',
      showTopBar ? 'top-8' : 'top-0',
      isTransparent ? 'bg-transparent' : 'bg-white border-b border-border shadow-sm'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 py-5">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink 
          to="/" 
          :class="[
            'text-xl font-semibold tracking-wider cursor-pointer transition-colors duration-300',
            isTransparent ? 'text-white' : 'text-primary'
          ]"
        >
          INTIMATE ELEGANCE
        </NuxtLink>
        
        <!-- 主导航 - 桌面端 -->
        <div class="hidden md:flex items-center gap-8">
          <!-- Shop All with Mega Menu -->
          <div 
            class="relative"
            @mouseenter="openMegaMenu('shop')"
            @mouseleave="closeMegaMenu"
          >
            <NuxtLink 
              to="/products" 
              :class="[
                'nav-link transition-colors duration-300 flex items-center gap-1',
                isTransparent ? 'text-white' : 'text-primary'
              ]"
            >
              Shop All
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </NuxtLink>
          </div>
          
          <NuxtLink 
            to="/products?filter=new" 
            :class="[
              'nav-link transition-colors duration-300',
              isTransparent ? 'text-white' : 'text-primary'
            ]"
          >
            New In
          </NuxtLink>
          <NuxtLink 
            to="/products?filter=bestsellers" 
            :class="[
              'nav-link transition-colors duration-300',
              isTransparent ? 'text-white' : 'text-primary'
            ]"
          >
            Bestsellers
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            :class="[
              'nav-link transition-colors duration-300',
              isTransparent ? 'text-white' : 'text-primary'
            ]"
          >
            About
          </NuxtLink>
        </div>
        
        <!-- 右侧图标 -->
        <div class="flex items-center gap-5">
          <!-- 搜索 -->
          <button 
            @click="toggleSearch"
            :class="[
              'icon-btn p-2 hover:opacity-60 transition-all duration-300 cursor-pointer',
              isTransparent ? 'text-white' : 'text-primary'
            ]"
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
            :class="[
              'icon-btn p-2 hover:opacity-60 transition-all duration-300 cursor-pointer',
              isTransparent ? 'text-white' : 'text-primary'
            ]"
            aria-label="Account"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </NuxtLink>
          
          <button
            v-else
            @click="toggleUserMenu"
            :class="[
              'icon-btn p-2 hover:opacity-60 transition-all duration-300 cursor-pointer',
              isTransparent ? 'text-white' : 'text-primary'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </button>
          
          <!-- 购物车 with Mini Cart Preview -->
          <div 
            class="relative"
            @mouseenter="openMiniCart"
            @mouseleave="closeMiniCart"
          >
            <NuxtLink 
              to="/cart" 
              class="relative p-2 hover:opacity-60 transition-opacity cursor-pointer block" 
              aria-label="Shopping cart"
            >
              <svg 
                :class="[
                  'w-5 h-5',
                  isTransparent ? 'text-white' : 'text-primary'
                ]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span 
                v-if="cartStore.cartCount > 0" 
                :class="[
                  'cart-badge absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold',
                  { 'updated': isBadgeAnimating }
                ]"
              >
                {{ cartStore.cartCount }}
              </span>
            </NuxtLink>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <button 
            @click="toggleMobileMenu"
            :class="[
              'md:hidden p-2 hover:opacity-60 transition-opacity cursor-pointer',
              isTransparent ? 'text-white' : 'text-primary'
            ]"
            aria-label="Menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 搜索栏 with Auto-suggestions -->
      <Transition name="slide-down">
        <div v-if="isSearchOpen" class="mt-4 pt-4 border-t border-border">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-3 pl-12 border-2 border-gray-300 transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(201,168,130,0.1)] focus:outline-none text-sm"
              @keyup.enter="handleSearch"
              @input="handleSearchInput"
            />
            <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            
            <!-- Search Suggestions -->
            <div 
              v-if="searchSuggestions.length > 0 && searchQuery.length > 0"
              class="absolute top-full left-0 right-0 mt-2 bg-white border border-border shadow-lg max-h-96 overflow-y-auto z-50"
            >
              <NuxtLink
                v-for="product in searchSuggestions"
                :key="product.id"
                :to="`/product-detail?id=${product.id}`"
                @click="closeSearch"
                class="flex items-center gap-4 p-3 hover:bg-backgroundLight transition-colors cursor-pointer border-b border-border"
              >
                <img :src="product.image" :alt="product.name" class="w-16 h-16 object-cover" />
                <div class="flex-1">
                  <p class="text-sm font-semibold text-primary">{{ product.name }}</p>
                  <p class="text-xs text-textMuted">{{ product.category }}</p>
                </div>
                <p class="text-sm font-semibold text-accent">${{ product.price.toFixed(2) }}</p>
              </NuxtLink>
              
              <!-- View All Results Link -->
              <NuxtLink
                :to="`/search?q=${encodeURIComponent(searchQuery)}`"
                @click="closeSearch"
                class="block p-3 text-center text-sm font-medium text-accent hover:bg-accent-50 transition-colors border-t border-border"
              >
                View all results for "{{ searchQuery }}"
              </NuxtLink>
            </div>
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
    
    <!-- Mega Menu -->
    <Transition name="fade">
      <div
        v-if="isMegaMenuOpen && activeMegaMenu === 'shop'"
        @mouseenter="openMegaMenu('shop')"
        @mouseleave="closeMegaMenu"
        class="absolute left-0 right-0 top-full bg-white border-b border-border shadow-lg z-40"
      >
        <div class="max-w-7xl mx-auto px-6 py-8">
          <div class="grid grid-cols-4 gap-8">
            <!-- Categories -->
            <div v-for="category in categories" :key="category.name">
              <h3 class="text-sm font-semibold text-primary uppercase tracking-wide mb-4">{{ category.name }}</h3>
              <ul class="space-y-2">
                <li v-for="item in category.items" :key="item">
                  <NuxtLink 
                    :to="`/products?category=${encodeURIComponent(item)}`"
                    @click="closeMegaMenu"
                    class="text-sm text-textMuted hover:text-accent transition-colors"
                  >
                    {{ item }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            
            <!-- Featured Products -->
            <div class="col-span-1">
              <h3 class="text-sm font-semibold text-primary uppercase tracking-wide mb-4">Featured</h3>
              <div class="space-y-4">
                <NuxtLink
                  v-for="product in featuredProducts.slice(0, 2)"
                  :key="product.id"
                  :to="`/product-detail?id=${product.id}`"
                  @click="closeMegaMenu"
                  class="block group"
                >
                  <div class="relative overflow-hidden mb-2">
                    <img :src="product.image" :alt="product.name" class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span v-if="product.badge" class="absolute top-2 left-2 px-2 py-1 bg-accent text-white text-xs font-semibold uppercase">
                      {{ product.badge }}
                    </span>
                  </div>
                  <p class="text-xs font-semibold text-primary group-hover:text-accent transition-colors">{{ product.name }}</p>
                  <p class="text-xs text-accent">${{ product.price.toFixed(2) }}</p>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    
    <!-- Mini Cart Preview -->
    <Transition name="fade">
      <div
        v-if="isMiniCartOpen && cartStore.cartCount > 0"
        @mouseenter="openMiniCart"
        @mouseleave="closeMiniCart"
        class="absolute right-6 top-full mt-2 w-80 bg-white border border-border shadow-lg z-40"
      >
        <div class="p-4 border-b border-border">
          <h3 class="text-sm font-semibold text-primary uppercase tracking-wide">Shopping Cart ({{ cartStore.cartCount }})</h3>
        </div>
        
        <div class="max-h-64 overflow-y-auto">
          <div
            v-for="(item, index) in cartStore.items.slice(0, 3)"
            :key="index"
            class="flex gap-3 p-4 border-b border-border"
          >
            <img v-if="item.image" :src="item.image" :alt="item.name" class="w-16 h-16 object-cover" />
            <div class="flex-1">
              <p class="text-xs font-semibold text-primary">{{ item.name }}</p>
              <p class="text-xs text-textMuted">{{ item.size }} | {{ item.color }}</p>
              <p class="text-xs text-textMuted">Qty: {{ item.quantity }}</p>
            </div>
            <p class="text-xs font-semibold text-accent">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
        
        <div class="p-4 border-t border-border">
          <div class="flex justify-between mb-3">
            <span class="text-sm font-semibold">Subtotal:</span>
            <span class="text-sm font-semibold text-accent">${{ cartStore.subtotal.toFixed(2) }}</span>
          </div>
          <NuxtLink 
            to="/cart"
            @click="closeMiniCart"
            class="block w-full py-2 bg-primary hover:bg-accent text-white text-center text-xs uppercase tracking-wide font-semibold transition-colors"
          >
            View Cart
          </NuxtLink>
        </div>
      </div>
    </Transition>
    
    <!-- 购物车侧边栏 -->
    <CartSidebar :isOpen="isCartOpen" @close="isCartOpen = false" />
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useProducts } from '~/composables/useProducts'

const cartStore = useCartStore()
const { products } = useProducts()
const route = useRoute()

// 检查是否在首页
const isHomePage = computed(() => route.path === '/')

// 滚动状态
const isScrolled = ref(false)

// 导航栏是否应该透明（只在首页且未滚动时透明）
const isTransparent = computed(() => isHomePage.value && !isScrolled.value)

const isSearchOpen = ref(false)
const searchQuery = ref('')
const isUserMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isLoggedIn = ref(false)
const userName = ref('')
const userEmail = ref('')
const isCartOpen = ref(false)
const isBadgeAnimating = ref(false)

// Top Bar
const showTopBar = ref(true)
const topBarMessage = computed(() => {
  if (cartStore.subtotal > 0 && cartStore.subtotal < 100) {
    return `Add $${(100 - cartStore.subtotal).toFixed(2)} more for FREE SHIPPING! 🚚`
  }
  return '✨ NEW ARRIVALS: Shop the latest collection | FREE SHIPPING on orders over $100'
})

// Mega Menu
const isMegaMenuOpen = ref(false)
const activeMegaMenu = ref('')
const categories = [
  {
    name: 'Bras & Sets',
    items: ['Lace Bras', 'Silk Sets', 'Velvet Bralettes', 'Push-up Bras', 'Wireless Bras']
  },
  {
    name: 'Bodysuits',
    items: ['Satin Bodysuits', 'Mesh Teddies', 'Lace Bodysuits', 'Sheer Bodysuits']
  },
  {
    name: 'Chemises',
    items: ['Lace Chemises', 'Satin Chemises', 'Robe Sets', 'Babydolls']
  },
  {
    name: 'Corsets',
    items: ['Velvet Corsets', 'Structured Corsets', 'Corset Sets', 'Waist Cinchers']
  }
]

const featuredProducts = computed(() => {
  return products.filter(p => p.badge === 'New' || p.badge === 'Bestseller').slice(0, 2)
})

// Mini Cart
const isMiniCartOpen = ref(false)

// Search Suggestions
const searchSuggestions = ref<typeof products>([])
let searchTimeout: NodeJS.Timeout

// 监听购物车数量变化，触发动画
watch(() => cartStore.cartCount, (newCount, oldCount) => {
  if (newCount > oldCount) {
    isBadgeAnimating.value = true
    setTimeout(() => {
      isBadgeAnimating.value = false
    }, 400)
  }
})

// 监听滚动
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const closeTopBar = () => {
  showTopBar.value = false
}

const openMegaMenu = (menu: string) => {
  activeMegaMenu.value = menu
  isMegaMenuOpen.value = true
}

const closeMegaMenu = () => {
  isMegaMenuOpen.value = false
  activeMegaMenu.value = ''
}

const openMiniCart = () => {
  isMiniCartOpen.value = true
}

const closeMiniCart = () => {
  isMiniCartOpen.value = false
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) {
    searchQuery.value = ''
    searchSuggestions.value = []
  }
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
  searchSuggestions.value = []
}

const handleSearchInput = () => {
  clearTimeout(searchTimeout)
  
  if (searchQuery.value.length < 2) {
    searchSuggestions.value = []
    return
  }
  
  searchTimeout = setTimeout(() => {
    const query = searchQuery.value.toLowerCase()
    searchSuggestions.value = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    ).slice(0, 5)
  }, 300)
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

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
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
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
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
  
  // 添加滚动监听
  if (process.client) {
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  // 移除滚动监听
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
  }
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

/* 购物车徽章弹跳动画 */
@keyframes bounce {
  0%, 100% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.2); 
  }
}

.cart-badge.updated {
  animation: bounce 0.4s ease;
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
