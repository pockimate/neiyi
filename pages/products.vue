<template>
  <div>
    <TheNavbar />
    
    <!-- Hero Section -->
    <section class="pt-32 pb-12 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-display text-5xl md:text-6xl font-bold text-primary mb-4">Our Collection</h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">Discover luxury lingerie designed to celebrate your beauty</p>
      </div>
    </section>

    <!-- Filters and Sort -->
    <section class="py-6 px-4 border-b border-pink-200">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <!-- Category Filter -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-6 py-2 rounded-full font-semibold transition-all duration-200 cursor-pointer',
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white border-2 border-pink-200 text-slate-600 hover:border-primary'
              ]"
            >
              {{ category }}
            </button>
          </div>
          
          <!-- Sort Dropdown -->
          <div class="flex items-center gap-3">
            <label class="text-slate-600 font-semibold">Sort by:</label>
            <select
              v-model="sortBy"
              class="px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <p class="text-slate-600">
            Showing <span class="font-semibold">{{ filteredProducts.length }}</span> 
            {{ selectedCategory === 'All' ? 'products' : `in ${selectedCategory}` }}
          </p>
        </div>
        
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div v-else class="text-center py-20">
          <svg class="w-24 h-24 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
          <h3 class="font-display text-2xl font-semibold text-slate-600 mb-2">No products found</h3>
          <p class="text-slate-500">Try selecting a different category</p>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products } = useProducts()

// Filters
const selectedCategory = ref('All')
const sortBy = ref('featured')

// Get unique categories
const categories = computed(() => {
  const cats = ['All', ...new Set(products.map(p => p.category))]
  return cats
})

// Filter and sort products
const filteredProducts = computed(() => {
  let filtered = products
  
  // Filter by category
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }
  
  // Sort
  let sorted = [...filtered]
  switch (sortBy.value) {
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      // Featured - keep original order
      break
  }
  
  return sorted
})
</script>
