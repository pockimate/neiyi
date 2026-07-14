<template>
  <!-- 顶部通知栏（暗色霓虹）- 用 Transition 包裹，关闭时平滑收起 -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out overflow-hidden"
    leave-active-class="transition-all duration-300 ease-in overflow-hidden"
    enter-from-class="max-h-0 opacity-0"
    enter-to-class="max-h-16 opacity-100"
    leave-from-class="max-h-16 opacity-100"
    leave-to-class="max-h-0 opacity-0"
  >
    <div v-show="showTopBar" class="bg-gradient-to-r from-plum-700 via-accent-700 to-plum-700 text-white text-center py-2 px-4 text-xs uppercase tracking-widest relative z-50">
      <p class="max-w-7xl mx-auto font-medium">
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
  </Transition>
  
  <nav
    :class="[
      'fixed left-0 right-0 z-50 transition-all duration-300',
      showTopBar ? 'top-8' : 'top-0',
      isTransparent
        ? 'bg-transparent'
        : 'bg-primary-900/95 backdrop-blur-2xl border-b border-accent-500/20 shadow-2xl shadow-accent-500/5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 py-5">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink 
          to="/" 
          :class="[
            'text-2xl font-display font-bold tracking-widest cursor-pointer transition-all duration-300',
            isTransparent ? 'text-cream-200' : 'gradient-text'
          ]"
        >
          <span class="italic">L</span>UNA<span class="neon-text">·</span>SENSUAL
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
                isTransparent ? 'text-cream-200' : 'text-cream-200 hover:text-accent-500'
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
              isTransparent ? 'text-cream-200' : 'text-cream-200 hover:text-accent-500'
            ]"
          >
            New In
          </NuxtLink>
          <NuxtLink 
            to="/products?filter=bestsellers" 
            :class="[
              'nav-link transition-colors duration-300',
              isTransparent ? 'text-cream-200' : 'text-cream-200 hover:text-accent-500'
            ]"
          >
            Bestsellers
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            :class="[
              'nav-link transition-colors duration-300',
              isTransparent ? 'text-cream-200' : 'text-cream-200 hover:text-accent-500'
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
              isTransparent ? 'text-cream-200' : 'text-cream-200 hover:text-accent-500'
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
              isTransparent ? 'text-cream-200' : 'text-cream-200 hover:text-accent-500'
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
              isTransparent ? 'text-cream-200' : 'text-cream-200 hover:text-accent-500'
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
              data-cart-icon
              class="relative p-2 hover:opacity-60 transition-opacity cursor-pointer block" 
              aria-label="Shopping cart"
            >
              <svg 
                :class="[
                  'w-5 h-5',
                  isTransparent ? 'text-cream-200' : 'text-cream-200 hover:text-accent-500'
                ]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span 
                v-if="cartStore.cartCount > 0"
                data-cart-count
                :class="[
                  'cart-badge absolute -top-1 -right-1 bg-primary-900/60 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold',
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
              isTransparent ? 'text-cream-200' : 'text-cream-200 hover:text-accent-500'
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
              class="w-full px-4 py-3 pl-12 border-2 border-accent-500/30 transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(201,168,130,0.1)] focus:outline-none text-sm"
              @keyup.enter="handleSearch"
              @input="handleSearchInput"
            />
            <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-cream-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            
            <!-- Search Suggestions -->
            <div 
              v-if="searchSuggestions.length > 0 && searchQuery.length > 0"
              class="absolute top-full left-0 right-0 mt-2 bg-primary-900/80 border border-border shadow-lg max-h-96 overflow-y-auto z-50"
            >
              <NuxtLink
                v-for="product in searchSuggestions"
                :key="product.id"
                :to="`/product-detail?id=${product.id}`"
                @click="closeSearch"
                class="flex items-center gap-4 p-3 hover:bg-primary-900/50 transition-colors cursor-pointer border-b border-border"
              >
                <img :src="product.image" :alt="product.name" class="w-16 h-16 object-cover" />
                <div class="flex-1">
                  <p class="text-sm font-semibold text-cream-200">{{ product.name }}</p>
                  <p class="text-xs text-cream-300">{{ product.category }}</p>
                </div>
                <p class="text-sm font-semibold text-accent">${{ (product.price ?? 0).toFixed(2) }}</p>
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
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-border bg-primary-900/80">
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
        class="absolute right-6 top-20 w-64 bg-primary-900/80 border border-border shadow-lg z-50"
      >
        <div class="p-4 border-b border-border">
          <p class="font-semibold text-sm">{{ userName }}</p>
          <p class="text-xs text-cream-300">{{ userEmail }}</p>
        </div>
        
        <div class="py-2">
          <NuxtLink to="/account/profile" @click="closeUserMenu" class="block px-4 py-2 text-sm hover:bg-primary-900/50 transition-colors">
            My Profile
          </NuxtLink>
          <NuxtLink to="/account/orders" @click="closeUserMenu" class="block px-4 py-2 text-sm hover:bg-primary-900/50 transition-colors">
            My Orders
          </NuxtLink>
          <NuxtLink to="/account/wishlist" @click="closeUserMenu" class="block px-4 py-2 text-sm hover:bg-primary-900/50 transition-colors">
            Wishlist
          </NuxtLink>
        </div>
        
        <div class="border-t border-border py-2">
          <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm hover:bg-primary-900/50 transition-colors">
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
        class="absolute left-0 right-0 top-full bg-primary-900/80 border-b border-border shadow-lg z-40"
      >
        <div class="max-w-7xl mx-auto px-6 py-8">
          <div class="grid grid-cols-4 gap-8">
            <!-- Categories -->
            <div v-for="category in categories" :key="category.name">
              <h3 class="text-sm font-semibold text-cream-100 uppercase tracking-wide mb-4">{{ category.name }}</h3>
              <ul class="space-y-2">
                <li v-for="item in category.items" :key="item">
                  <NuxtLink 
                    :to="`/products?category=${encodeURIComponent(item)}`"
                    @click="closeMegaMenu"
                    class="text-sm text-cream-300 hover:text-accent transition-colors"
                  >
                    {{ item }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            
            <!-- Featured Products -->
            <div class="col-span-1">
              <h3 class="text-sm font-semibold text-cream-100 uppercase tracking-wide mb-4">Featured</h3>
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
                  <p class="text-xs font-semibold text-cream-100 group-hover:text-accent transition-colors">{{ product.name }}</p>
                  <p class="text-xs text-accent">${{ (product.price ?? 0).toFixed(2) }}</p>
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
        class="absolute right-6 top-full mt-2 w-80 bg-primary-900/80 border border-border shadow-lg z-40"
      >
        <div class="p-4 border-b border-border">
          <h3 class="text-sm font-semibold text-cream-100 uppercase tracking-wide">Shopping Cart ({{ cartStore.cartCount }})</h3>
        </div>
        
        <div class="max-h-64 overflow-y-auto">
          <div
            v-for="(item, index) in cartStore.items.slice(0, 3)"
            :key="index"
            class="flex gap-3 p-4 border-b border-border"
          >
            <img v-if="item.image" :src="item.image" :alt="item.name" class="w-16 h-16 object-cover" />
            <div class="flex-1">
              <p class="text-xs font-semibold text-cream-200">{{ item.name }}</p>
              <p class="text-xs text-cream-300">{{ item.size }} | {{ item.color }}</p>
              <p class="text-xs text-cream-300">Qty: {{ item.quantity ?? 1 }}</p>
            </div>
            <p class="text-xs font-semibold text-accent">${{ ((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2) }}</p>
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
            class="block w-full py-2 bg-primary-900/60 hover:bg-accent text-white text-center text-xs uppercase tracking-wide font-semibold transition-colors"
          >
            View Cart
          </NuxtLink>
        </div>
      </div>
    </Transition>
    
    <!-- 购物车侧边栏由 app.vue 统一渲染，避免重复挂载 -->
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
const isBadgeAnimating = ref(false)
const isAuthenticated = useState('isAuthenticated', () => false)

// 与 app.vue 共享的购物车侧边栏状态（统一为 useState）
const isCartOpen = useState('cartSidebarOpen', () => false)

// Top Bar
const showTopBar = ref(true)
const topBarMessage = computed(() => {
  if (cartStore.subtotal > 0 && cartStore.subtotal < 75) {
    return `Add $${(75 - cartStore.subtotal).toFixed(2)} more for complimentary shipping`
  }
  return 'New Arrivals · Complimentary shipping on orders over $75'
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

// 监听滚动（rAF 节流优化 — 与 useThrottledScroll 行为一致）
let __scrollTicking = false
let __scrollHandler: (() => void) | null = null
onMounted(() => {
  __scrollHandler = () => {
    if (__scrollTicking) return
    __scrollTicking = true
    requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 50
      __scrollTicking = false
    })
  }
  window.addEventListener('scroll', __scrollHandler, { passive: true })
  __scrollHandler()
})
onUnmounted(() => {
  if (__scrollHandler) {
    window.removeEventListener('scroll', __scrollHandler)
    __scrollHandler = null
  }
})

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
  if (import.meta.client) {
    localStorage.removeItem('user')
    localStorage.removeItem('rememberMe')
    isAuthenticated.value = false
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
  if (import.meta.client) {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        isLoggedIn.value = true
        isAuthenticated.value = true
        userName.value = userData.name || userData.email.split('@')[0]
        userEmail.value = userData.email
      } catch (e) {
        console.error('Failed to parse user data')
      }
    } else {
      isLoggedIn.value = false
      isAuthenticated.value = false
    }
  }
}

onMounted(() => {
  cartStore.loadCart()
  checkAuth()
})

onUnmounted(() => {
  // 滚动监听由 useThrottledScroll 自动清理
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
