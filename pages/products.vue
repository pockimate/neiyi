<template>
  <div class="min-h-screen bg-white">
    <TheNavbar />
    
    <div class="pt-24 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- 页面标题 -->
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-light uppercase tracking-wider mb-4">
            All Products
          </h1>
          <p class="text-sm text-textMuted">
            {{ filteredProducts.length }} items
          </p>
        </div>
        
        <!-- 筛选和排序 -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-8 border-b border-border">
          <!-- 筛选器 -->
          <div class="flex flex-wrap gap-3">
            <button 
              @click="currentFilter = 'all'"
              :class="[
                'px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300',
                currentFilter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'border border-border hover:border-primary'
              ]"
            >
              All
            </button>
            <button 
              @click="currentFilter = 'new'"
              :class="[
                'px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300',
                currentFilter === 'new' 
                  ? 'bg-primary text-white' 
                  : 'border border-border hover:border-primary'
              ]"
            >
              New In
            </button>
            <button 
              @click="currentFilter = 'sale'"
              :class="[
                'px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300',
                currentFilter === 'sale' 
                  ? 'bg-primary text-white' 
                  : 'border border-border hover:border-primary'
              ]"
            >
              Sale
            </button>
            <button 
              @click="currentFilter = 'bestseller'"
              :class="[
                'px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300',
                currentFilter === 'bestseller' 
                  ? 'bg-primary text-white' 
                  : 'border border-border hover:border-primary'
              ]"
            >
              Bestsellers
            </button>
          </div>
          
          <!-- 排序 -->
          <select 
            v-model="sortBy"
            class="px-4 py-2 border border-border text-xs uppercase tracking-wider focus:border-primary focus:outline-none"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
        
        <!-- 产品网格 -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard 
            v-for="product in sortedProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <!-- 空状态 -->
        <div v-if="filteredProducts.length === 0" class="text-center py-20">
          <p class="text-textMuted text-sm uppercase tracking-wide">
            No products found
          </p>
        </div>
        
        <!-- 加载更多 -->
        <div v-if="hasMore" class="text-center mt-12">
          <button @click="loadMore" class="btn-secondary">
            Load More
          </button>
        </div>
      </div>
    </div>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products } = useProducts()
const currentFilter = ref('all')
const sortBy = ref('default')
const displayCount = ref(20)

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
</script>
