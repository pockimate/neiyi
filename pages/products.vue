<template>
  <div class="min-h-screen bg-white pb-20 md:pb-0">
    <TheNavbar />
    
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Products' }]" />
    
    <div class="section" style="padding-top: var(--space-lg);">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <!-- 页面标题 -->
        <div class="text-center" style="margin-bottom: var(--space-xl);">
          <h1 class="text-3xl md:text-4xl font-light uppercase tracking-wider mb-4">
            All Products
          </h1>
          <p class="text-sm text-textMuted">
            {{ filteredProducts.length }} items
          </p>
        </div>
        
        <!-- Tablet/Desktop Layout with Sidebar -->
        <div class="hidden md:flex gap-8">
          <!-- Sidebar Filters - Tablet & Desktop -->
          <aside class="w-64 flex-shrink-0 sticky top-24 self-start">
            <div class="bg-white border border-border p-6 space-y-6">
              <!-- Category Filter -->
              <div>
                <h3 class="text-sm font-semibold text-primary uppercase tracking-wider mb-4 pb-2 border-b border-border">
                  Categories
                </h3>
                <div class="space-y-2">
                  <button
                    v-for="filter in filterOptions"
                    :key="filter.value"
                    @click="currentFilter = filter.value"
                    :class="[
                      'w-full text-left px-4 py-3 text-sm transition-all duration-200 touch-target',
                      currentFilter === filter.value 
                        ? 'bg-primary text-white font-semibold' 
                        : 'bg-secondary-100 text-primary hover:bg-secondary-200'
                    ]"
                  >
                    {{ filter.label }}
                  </button>
                </div>
              </div>
              
              <!-- Sort Options -->
              <div>
                <h3 class="text-sm font-semibold text-primary uppercase tracking-wider mb-4 pb-2 border-b border-border">
                  Sort By
                </h3>
                <div class="space-y-2">
                  <button
                    v-for="sort in sortOptions"
                    :key="sort.value"
                    @click="sortBy = sort.value"
                    :class="[
                      'w-full text-left px-4 py-3 text-sm transition-all duration-200 touch-target',
                      sortBy === sort.value 
                        ? 'bg-primary text-white font-semibold' 
                        : 'bg-secondary-100 text-primary hover:bg-secondary-200'
                    ]"
                  >
                    {{ sort.label }}
                  </button>
                </div>
              </div>
              
              <!-- Clear Filters -->
              <button
                v-if="currentFilter !== 'all' || sortBy !== 'default'"
                @click="clearAllFilters"
                class="w-full px-4 py-3 text-sm font-semibold text-error-600 border border-error-600 hover:bg-error-50 transition-colors touch-target"
              >
                Clear All Filters
              </button>
            </div>
          </aside>
          
          <!-- Products Grid -->
          <div class="flex-1">
            <!-- Active Filters Display -->
            <div v-if="currentFilter !== 'all' || sortBy !== 'default'" class="mb-6 flex flex-wrap items-center gap-2">
              <span class="text-sm text-textMuted">Active filters:</span>
              <span v-if="currentFilter !== 'all'" class="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-xs rounded-full">
                {{ filterOptions.find(f => f.value === currentFilter)?.label }}
                <button @click="currentFilter = 'all'" class="hover:opacity-70">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </span>
              <span v-if="sortBy !== 'default'" class="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-xs rounded-full">
                {{ sortOptions.find(s => s.value === sortBy)?.label }}
                <button @click="sortBy = 'default'" class="hover:opacity-70">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </span>
            </div>
            
            <!-- Products Grid - 3 columns for tablet, 4 for desktop -->
            <div v-if="isLoading" class="grid grid-cols-3 xl:grid-cols-4 gap-6">
              <ProductCardSkeleton v-for="n in 12" :key="n" />
            </div>
            
            <div v-else-if="sortedProducts.length > 0" class="grid grid-cols-3 xl:grid-cols-4 gap-6">
              <ProductCard 
                v-for="(product, index) in sortedProducts" 
                :key="product.id" 
                :product="product"
                :card-delay="(index % 12) + 1"
              />
            </div>
            
            <!-- Empty State -->
            <div v-else class="text-center py-20">
              <svg class="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
              <p class="text-textMuted text-sm uppercase tracking-wide mb-4">
                No products found
              </p>
              <button
                @click="clearAllFilters"
                class="px-6 py-2 bg-primary text-white text-sm uppercase tracking-wide hover:bg-primary-900 transition-colors"
              >
                Clear Filters
              </button>
            </div>
            
            <!-- Load More -->
            <div v-if="hasMore" class="text-center mt-12">
              <BaseButton
                @click="loadMore"
                variant="secondary"
                size="lg"
                class="touch-target"
              >
                Load More Products
              </BaseButton>
            </div>
          </div>
        </div>
        
        <!-- Mobile Layout -->
        <div class="md:hidden">
          <!-- Mobile Filter Bar -->
          <div class="flex items-center justify-between pb-4 border-b border-border mb-6">
            <button 
              @click="isFilterDrawerOpen = true"
              class="flex items-center gap-2 px-4 py-3 border border-border text-xs uppercase tracking-wider touch-target"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
              Filter
              <span v-if="currentFilter !== 'all'" class="w-2 h-2 bg-accent rounded-full"></span>
            </button>
            
            <select 
              v-model="sortBy"
              class="px-4 py-3 border border-border text-xs uppercase tracking-wider focus:border-primary focus:outline-none touch-target"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
          
          <!-- Mobile Products Grid - 2 columns -->
          <div v-if="isLoading" class="grid grid-cols-2 gap-4">
            <ProductCardSkeleton v-for="n in 8" :key="n" />
          </div>
          
          <div v-else-if="sortedProducts.length > 0" class="grid grid-cols-2 gap-4">
            <ProductCard 
              v-for="(product, index) in sortedProducts" 
              :key="product.id" 
              :product="product"
              :card-delay="(index % 8) + 1"
            />
          </div>
          
          <!-- Mobile Empty State -->
          <div v-else class="text-center py-20">
            <p class="text-textMuted text-sm uppercase tracking-wide mb-4">
              No products found
            </p>
            <button
              @click="clearAllFilters"
              class="px-6 py-3 bg-primary text-white text-sm uppercase tracking-wide touch-target"
            >
              Clear Filters
            </button>
          </div>
          
          <!-- Mobile Load More -->
          <div v-if="hasMore" class="text-center mt-8">
            <BaseButton
              @click="loadMore"
              variant="secondary"
              size="md"
              block
              class="touch-target"
            >
              Load More
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile Filter Drawer -->
    <MobileFilterDrawer 
      :is-open="isFilterDrawerOpen"
      @close="isFilterDrawerOpen = false"
      @apply="applyMobileFilters"
      @clear="clearMobileFilters"
    >
      <div class="space-y-6">
        <!-- Category Filter -->
        <div>
          <h3 class="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Category</h3>
          <div class="space-y-2">
            <button
              v-for="filter in filterOptions"
              :key="filter.value"
              @click="tempFilter = filter.value"
              :class="[
                'w-full text-left px-4 py-3 border transition-colors',
                tempFilter === filter.value 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-primary border-border'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
        
        <!-- Sort Options -->
        <div>
          <h3 class="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Sort By</h3>
          <div class="space-y-2">
            <button
              v-for="sort in sortOptions"
              :key="sort.value"
              @click="tempSort = sort.value"
              :class="[
                'w-full text-left px-4 py-3 border transition-colors',
                tempSort === sort.value 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-primary border-border'
              ]"
            >
              {{ sort.label }}
            </button>
          </div>
        </div>
      </div>
    </MobileFilterDrawer>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products } = useProducts()
const route = useRoute()
const router = useRouter()

const currentFilter = ref('all')
const sortBy = ref('default')
const displayCount = ref(20)
const isLoading = ref(true)
const isFilterDrawerOpen = ref(false)

// Temporary filter/sort values for mobile drawer
const tempFilter = ref('all')
const tempSort = ref('default')

// Filter and sort options for mobile
const filterOptions = [
  { label: 'All Products', value: 'all' },
  { label: 'New In', value: 'new' },
  { label: 'Sale', value: 'sale' },
  { label: 'Bestsellers', value: 'bestseller' }
]

const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Name: A to Z', value: 'name' }
]

// 从URL参数初始化筛选器
const initializeFromURL = () => {
  const filterParam = route.query.filter as string
  const sortParam = route.query.sort as string
  
  if (filterParam) {
    // 映射URL参数到筛选器值
    const filterMap: Record<string, string> = {
      'new': 'new',
      'sale': 'sale',
      'bestsellers': 'bestseller',
      'bestseller': 'bestseller'
    }
    currentFilter.value = filterMap[filterParam] || 'all'
  }
  
  if (sortParam) {
    sortBy.value = sortParam
  }
}

// 监听URL参数变化
watch(() => route.query, (newQuery) => {
  const filterParam = newQuery.filter as string
  
  if (filterParam) {
    const filterMap: Record<string, string> = {
      'new': 'new',
      'sale': 'sale',
      'bestsellers': 'bestseller',
      'bestseller': 'bestseller'
    }
    currentFilter.value = filterMap[filterParam] || 'all'
  } else {
    currentFilter.value = 'all'
  }
  
  if (newQuery.sort) {
    sortBy.value = newQuery.sort as string
  }
}, { immediate: true })

// 监听筛选器变化，更新URL
watch(currentFilter, (newFilter) => {
  const query: Record<string, string> = {}
  
  if (newFilter !== 'all') {
    // 映射筛选器值到URL参数
    const urlMap: Record<string, string> = {
      'new': 'new',
      'sale': 'sale',
      'bestseller': 'bestsellers'
    }
    query.filter = urlMap[newFilter] || newFilter
  }
  
  if (sortBy.value !== 'default') {
    query.sort = sortBy.value
  }
  
  router.push({ query })
})

// 监听排序变化，更新URL
watch(sortBy, (newSort) => {
  const query: Record<string, string> = {}
  
  if (currentFilter.value !== 'all') {
    const urlMap: Record<string, string> = {
      'new': 'new',
      'sale': 'sale',
      'bestseller': 'bestsellers'
    }
    query.filter = urlMap[currentFilter.value] || currentFilter.value
  }
  
  if (newSort !== 'default') {
    query.sort = newSort
  }
  
  router.push({ query })
})

// 模拟加载延迟
onMounted(() => {
  initializeFromURL()
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})

const filteredProducts = computed(() => {
  let filtered = [...products]
  
  if (currentFilter.value === 'new') {
    filtered = filtered.filter(p => p.badge === 'New')
  } else if (currentFilter.value === 'sale') {
    filtered = filtered.filter(p => p.badge === 'Sale')
  } else if (currentFilter.value === 'bestseller') {
    filtered = filtered.filter(p => p.badge === 'Bestseller')
  }
  
  return filtered
})

const sortedProducts = computed(() => {
  let sorted = [...filteredProducts.value]
  
  if (sortBy.value === 'price-low') {
    sorted.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    sorted.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
  
  return sorted.slice(0, displayCount.value)
})

const hasMore = computed(() => {
  return displayCount.value < filteredProducts.value.length
})

const loadMore = () => {
  displayCount.value += 20
}

// Clear all filters
const clearAllFilters = () => {
  currentFilter.value = 'all'
  sortBy.value = 'default'
}

// Mobile filter drawer functions
const applyMobileFilters = () => {
  currentFilter.value = tempFilter.value
  sortBy.value = tempSort.value
}

const clearMobileFilters = () => {
  tempFilter.value = 'all'
  tempSort.value = 'default'
  currentFilter.value = 'all'
  sortBy.value = 'default'
}

// Sync temp values when drawer opens
watch(isFilterDrawerOpen, (isOpen) => {
  if (isOpen) {
    tempFilter.value = currentFilter.value
    tempSort.value = sortBy.value
  }
})
</script>
