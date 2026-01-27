<template>
  <div class="bg-white min-h-screen">
    <TheNavbar />
    
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Search Results' }]" />
    
    <section class="pt-4 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Search Header -->
        <div class="mb-12">
          <h1 class="text-3xl font-light text-primary mb-4 text-center uppercase tracking-wider">
            Search Results
          </h1>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto mb-8">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="w-full px-6 py-4 pl-14 border-2 border-gray-300 transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(201,168,130,0.1)] focus:outline-none text-base"
                @keyup.enter="performSearch"
                @input="debouncedSearch"
              />
              <svg class="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-textMuted hover:text-primary transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Search Info -->
          <div v-if="searchQuery" class="text-center mb-6">
            <p class="text-sm text-textMuted">
              <span v-if="isSearching">Searching...</span>
              <span v-else-if="searchResults.length > 0">
                Found <span class="font-bold text-primary">{{ searchResults.length }}</span> results for 
                <span class="font-bold text-primary">"{{ searchQuery }}"</span>
              </span>
              <span v-else>
                No results found for <span class="font-bold text-primary">"{{ searchQuery }}"</span>
              </span>
            </p>
          </div>
        </div>
        
        <!-- Search History & Popular Searches -->
        <div v-if="!searchQuery && !isSearching" class="max-w-4xl mx-auto mb-12">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Search History -->
            <div v-if="searchHistory.length > 0">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-primary uppercase tracking-wide">Recent Searches</h2>
                <button
                  @click="clearHistory"
                  class="text-xs text-textMuted hover:text-error-600 transition-colors uppercase tracking-wide"
                >
                  Clear All
                </button>
              </div>
              <div class="space-y-2">
                <button
                  v-for="(term, index) in searchHistory"
                  :key="index"
                  @click="searchFromHistory(term)"
                  class="flex items-center justify-between w-full p-3 bg-secondary-100 hover:bg-secondary-200 transition-colors group"
                >
                  <div class="flex items-center gap-3">
                    <svg class="w-4 h-4 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-sm text-primary">{{ term }}</span>
                  </div>
                  <button
                    @click.stop="removeFromHistory(index)"
                    class="opacity-0 group-hover:opacity-100 transition-opacity text-textMuted hover:text-error-600"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </button>
              </div>
            </div>
            
            <!-- Popular Searches -->
            <div>
              <h2 class="text-lg font-semibold text-primary uppercase tracking-wide mb-4">Popular Searches</h2>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="term in popularSearches"
                  :key="term"
                  @click="searchFromPopular(term)"
                  class="px-4 py-2 bg-accent-50 hover:bg-accent-100 text-accent-700 text-sm font-medium transition-colors border border-accent-200"
                >
                  {{ term }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search Results -->
        <div v-if="searchQuery && !isSearching">
          <!-- No Results -->
          <div v-if="searchResults.length === 0" class="text-center py-20">
            <svg class="w-20 h-20 text-border mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <h3 class="text-xl font-light mb-4 text-primary uppercase tracking-wide">No Results Found</h3>
            <p class="text-sm text-textMuted mb-8">Try different keywords or browse our collections</p>
            <BaseButton 
              tag="NuxtLink"
              to="/products" 
              variant="primary"
              size="md"
            >
              Browse All Products
            </BaseButton>
          </div>
          
          <!-- Results Grid -->
          <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard 
              v-for="product in searchResults" 
              :key="product.id" 
              :product="product"
            />
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="isSearching" class="text-center py-20">
          <LoadingSpinner />
          <p class="text-sm text-textMuted mt-4">Searching...</p>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const router = useRouter()
const { products } = useProducts()

// Search state
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const isSearching = ref(false)

// Search history (stored in localStorage)
const searchHistory = ref<string[]>([])
const MAX_HISTORY = 10

// Popular searches
const popularSearches = [
  'Lace Bra',
  'Silk Lingerie',
  'Black Set',
  'Bridal',
  'Plus Size',
  'Wireless Bra',
  'Thong',
  'Bodysuit'
]

// Load search history from localStorage
onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('searchHistory')
    if (saved) {
      searchHistory.value = JSON.parse(saved)
    }
  }
  
  // Check if there's a query parameter
  const query = route.query.q as string
  if (query) {
    searchQuery.value = query
    performSearch()
  }
})

// Save search history to localStorage
const saveHistory = () => {
  if (process.client) {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
  }
}

// Add to search history
const addToHistory = (term: string) => {
  if (!term.trim()) return
  
  // Remove if already exists
  const index = searchHistory.value.indexOf(term)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }
  
  // Add to beginning
  searchHistory.value.unshift(term)
  
  // Keep only MAX_HISTORY items
  if (searchHistory.value.length > MAX_HISTORY) {
    searchHistory.value = searchHistory.value.slice(0, MAX_HISTORY)
  }
  
  saveHistory()
}

// Remove from history
const removeFromHistory = (index: number) => {
  searchHistory.value.splice(index, 1)
  saveHistory()
}

// Clear all history
const clearHistory = () => {
  searchHistory.value = []
  saveHistory()
}

// Search from history
const searchFromHistory = (term: string) => {
  searchQuery.value = term
  performSearch()
}

// Search from popular
const searchFromPopular = (term: string) => {
  searchQuery.value = term
  performSearch()
  addToHistory(term)
}

// Perform search
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }
  
  isSearching.value = true
  
  // Add to history
  addToHistory(searchQuery.value)
  
  // Update URL
  router.push({ query: { q: searchQuery.value } })
  
  // Simulate API delay
  setTimeout(() => {
    const query = searchQuery.value.toLowerCase()
    
    // Search in products
    searchResults.value = products.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      )
    })
    
    isSearching.value = false
  }, 300)
}

// Debounced search
let searchTimeout: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (searchQuery.value.length >= 2) {
      performSearch()
    }
  }, 500)
}

// Clear search
const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  router.push({ query: {} })
}
</script>
