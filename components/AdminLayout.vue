<template>
  <div class="min-h-screen" style="background: linear-gradient(180deg, #0A0908 0%, #1C1917 100%);">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-full w-64 glass-card-dark border-r border-pink-200 z-40">
      <div class="p-6">
        <!-- Logo -->
        <NuxtLink to="/admin/dashboard" class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="font-display text-lg font-bold text-white">Admin Panel</h1>
            <p class="text-xs text-slate-400">Intimate Elegance</p>
          </div>
        </NuxtLink>
        
        <!-- Navigation -->
        <nav class="space-y-2">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer',
              isActive(item.path)
                ? 'bg-primary text-white'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </div>
      
      <!-- User Info -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-pink-200">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span class="text-white font-semibold">A</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-white">Admin User</p>
            <p class="text-xs text-slate-400">admin@demo.com</p>
          </div>
        </div>
        <button 
          @click="handleLogout"
          class="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
    
    <!-- Main Content -->
    <div class="ml-64">
      <!-- Top Bar -->
      <header class="sticky top-0 z-30 glass-card-dark border-b border-pink-200 px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">{{ pageTitle }}</h2>
            <p class="text-sm text-slate-400">{{ pageSubtitle }}</p>
          </div>
          
          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button class="relative p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
              <svg class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <!-- View Store -->
            <NuxtLink 
              to="/"
              class="px-4 py-2 bg-primary hover:bg-pink-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              View Store
            </NuxtLink>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const props = defineProps<{
  pageTitle: string
  pageSubtitle?: string
}>()

const menuItems = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
    icon: 'svg'
  },
  {
    path: '/admin/products',
    label: 'Products',
    icon: 'svg'
  },
  {
    path: '/admin/orders',
    label: 'Orders',
    icon: 'svg'
  },
  {
    path: '/admin/coupons',
    label: 'Coupons',
    icon: 'svg'
  }
]

const isActive = (path: string) => {
  return route.path === path
}

const handleLogout = () => {
  if (process.client) {
    localStorage.removeItem('adminAuth')
  }
  router.push('/admin/login')
}

// Check auth on mount
onMounted(() => {
  if (process.client) {
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/admin/login')
    }
  }
})
</script>
