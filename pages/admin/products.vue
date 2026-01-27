<template>
  <AdminLayout page-title="Products" page-subtitle="Manage your product catalog">
    <!-- Actions Bar -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-64 pl-10 pr-4 py-2 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white placeholder-slate-400"
          />
          <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        
        <select 
          v-model="filterCategory"
          class="w-48 px-4 py-2 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="Bras & Sets">Bras & Sets</option>
          <option value="Bodysuits">Bodysuits</option>
          <option value="Chemises">Chemises</option>
          <option value="Corsets">Corsets</option>
        </select>
      </div>
      
      <button 
        @click="showAddModal = true"
        class="px-6 py-2 bg-primary hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Product
      </button>
    </div>
    
    <!-- Products Table -->
    <div class="glass-card-dark rounded-xl border border-gray-200 overflow-hidden">
      <table class="w-full">
        <thead class="bg-white/5 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Product</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Category</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Stock</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
            <th class="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-pink-200/20">
          <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-white/5 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-50 rounded-lg flex-shrink-0"></div>
                <div>
                  <p class="font-semibold text-white">{{ product.name }}</p>
                  <p class="text-sm text-slate-400">{{ product.description.substring(0, 30) }}...</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-slate-300">{{ product.category }}</td>
            <td class="px-6 py-4">
              <p class="font-semibold text-primary">${{ product.price.toFixed(2) }}</p>
              <p v-if="product.originalPrice" class="text-sm text-slate-400 line-through">${{ product.originalPrice.toFixed(2) }}</p>
            </td>
            <td class="px-6 py-4">
              <span :class="product.stock > 10 ? 'text-green-400' : 'text-yellow-400'">
                {{ product.stock }} units
              </span>
            </td>
            <td class="px-6 py-4">
              <span :class="`px-3 py-1 rounded-full text-xs font-semibold ${product.badge ? 'bg-primary/20 text-primary' : 'bg-gray-500/20 text-gray-400'}`">
                {{ product.badge || 'Regular' }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-end gap-2">
                <button 
                  @click="editProduct(product)"
                  class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Edit"
                >
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="deleteProduct(product.id)"
                  class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Delete"
                >
                  <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="glass-card-dark rounded-2xl p-8 border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-white">{{ editingProduct ? 'Edit Product' : 'Add New Product' }}</h3>
          <button @click="closeModal" class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2 text-white">Product Name</label>
            <input 
              v-model="productForm.name"
              type="text" 
              required
              class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white">Description</label>
            <textarea 
              v-model="productForm.description"
              rows="3"
              required
              class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white resize-none"
            ></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 text-white">Price</label>
              <input 
                v-model.number="productForm.price"
                type="number" 
                step="0.01"
                required
                class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2 text-white">Original Price (Optional)</label>
              <input 
                v-model.number="productForm.originalPrice"
                type="number" 
                step="0.01"
                class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 text-white">Category</label>
              <select 
                v-model="productForm.category"
                required
                class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white cursor-pointer"
              >
                <option value="Bras & Sets">Bras & Sets</option>
                <option value="Bodysuits">Bodysuits</option>
                <option value="Chemises">Chemises</option>
                <option value="Corsets">Corsets</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2 text-white">Stock</label>
              <input 
                v-model.number="productForm.stock"
                type="number" 
                required
                class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white">Badge (Optional)</label>
            <select 
              v-model="productForm.badge"
              class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white cursor-pointer"
            >
              <option value="">None</option>
              <option value="New">New</option>
              <option value="Sale">Sale</option>
              <option value="Bestseller">Bestseller</option>
            </select>
          </div>
          
          <div class="flex gap-4 pt-4">
            <button 
              type="submit"
              class="flex-1 px-6 py-3 bg-primary hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
            >
              {{ editingProduct ? 'Update Product' : 'Add Product' }}
            </button>
            <button 
              type="button"
              @click="closeModal"
              class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products } = useProducts()

const searchQuery = ref('')
const filterCategory = ref('')
const showAddModal = ref(false)
const editingProduct = ref<any>(null)

const productForm = reactive({
  name: '',
  description: '',
  price: 0,
  originalPrice: 0,
  category: 'Bras & Sets',
  stock: 0,
  badge: ''
})

const filteredProducts = computed(() => {
  let filtered = products.map(p => ({ ...p, stock: Math.floor(Math.random() * 50) + 10 }))
  
  if (searchQuery.value) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (filterCategory.value) {
    filtered = filtered.filter(p => p.category === filterCategory.value)
  }
  
  return filtered
})

const editProduct = (product: any) => {
  editingProduct.value = product
  Object.assign(productForm, product)
  showAddModal.value = true
}

const deleteProduct = (id: number) => {
  if (confirm('Are you sure you want to delete this product?')) {
    alert('Product deleted! (Demo only)')
  }
}

const saveProduct = () => {
  if (editingProduct.value) {
    alert('Product updated! (Demo only)')
  } else {
    alert('Product added! (Demo only)')
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingProduct.value = null
  Object.assign(productForm, {
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: 'Bras & Sets',
    stock: 0,
    badge: ''
  })
}
</script>
