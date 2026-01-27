<template>
  <AdminLayout page-title="Coupons" page-subtitle="Manage discount codes">
    <!-- Actions Bar -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <select 
          v-model="filterStatus"
          class="w-48 px-4 py-2 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>
      
      <button 
        @click="showAddModal = true"
        class="px-6 py-2 bg-primary hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Coupon
      </button>
    </div>
    
    <!-- Coupons Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="coupon in filteredCoupons" :key="coupon.code" class="glass-card-dark rounded-xl p-6 border border-gray-200">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-2xl font-bold text-white mb-1">{{ coupon.code }}</h3>
            <p class="text-sm text-slate-400">{{ coupon.description }}</p>
          </div>
          <span :class="`px-3 py-1 rounded-full text-xs font-semibold ${coupon.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`">
            {{ coupon.status }}
          </span>
        </div>
        
        <div class="space-y-3 mb-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-400">Discount</span>
            <span class="text-lg font-bold text-primary">{{ coupon.discount }}%</span>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-400">Used</span>
            <span class="text-white font-semibold">{{ coupon.used }} / {{ coupon.limit || '∞' }}</span>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-400">Expires</span>
            <span class="text-white">{{ coupon.expires }}</span>
          </div>
        </div>
        
        <div class="flex gap-2">
          <button 
            @click="editCoupon(coupon)"
            class="flex-1 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button 
            @click="deleteCoupon(coupon.code)"
            class="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    
    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="glass-card-dark rounded-2xl p-8 border border-gray-200 max-w-md w-full">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-white">{{ editingCoupon ? 'Edit Coupon' : 'Add New Coupon' }}</h3>
          <button @click="closeModal" class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveCoupon" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2 text-white">Coupon Code</label>
            <input 
              v-model="couponForm.code"
              type="text" 
              required
              :disabled="!!editingCoupon"
              class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white uppercase"
              placeholder="SAVE20"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white">Description</label>
            <input 
              v-model="couponForm.description"
              type="text" 
              required
              class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white"
              placeholder="20% off all products"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white">Discount (%)</label>
            <input 
              v-model.number="couponForm.discount"
              type="number" 
              min="1"
              max="100"
              required
              class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white">Usage Limit (Optional)</label>
            <input 
              v-model.number="couponForm.limit"
              type="number" 
              min="1"
              class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white"
              placeholder="Leave empty for unlimited"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white">Expiry Date</label>
            <input 
              v-model="couponForm.expires"
              type="date" 
              required
              class="w-full px-4 py-3 bg-slate-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-white"
            />
          </div>
          
          <div class="flex gap-4 pt-4">
            <button 
              type="submit"
              class="flex-1 px-6 py-3 bg-primary hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
            >
              {{ editingCoupon ? 'Update Coupon' : 'Add Coupon' }}
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
const filterStatus = ref('')
const showAddModal = ref(false)
const editingCoupon = ref<any>(null)

const coupons = ref([
  { code: 'SAVE10', description: '10% off all products', discount: 10, used: 45, limit: 100, expires: '2026-12-31', status: 'active' },
  { code: 'SAVE20', description: '20% off all products', discount: 20, used: 23, limit: 50, expires: '2026-12-31', status: 'active' },
  { code: 'WELCOME15', description: 'Welcome discount for new customers', discount: 15, used: 67, limit: null, expires: '2026-12-31', status: 'active' },
  { code: 'SUMMER25', description: 'Summer sale discount', discount: 25, used: 120, limit: 100, expires: '2026-08-31', status: 'expired' }
])

const couponForm = reactive({
  code: '',
  description: '',
  discount: 10,
  limit: null as number | null,
  expires: ''
})

const filteredCoupons = computed(() => {
  if (!filterStatus.value) return coupons.value
  return coupons.value.filter(c => c.status === filterStatus.value)
})

const editCoupon = (coupon: any) => {
  editingCoupon.value = coupon
  Object.assign(couponForm, coupon)
  showAddModal.value = true
}

const deleteCoupon = (code: string) => {
  if (confirm(`Are you sure you want to delete coupon ${code}?`)) {
    alert('Coupon deleted! (Demo only)')
  }
}

const saveCoupon = () => {
  if (editingCoupon.value) {
    alert('Coupon updated! (Demo only)')
  } else {
    alert('Coupon added! (Demo only)')
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingCoupon.value = null
  Object.assign(couponForm, {
    code: '',
    description: '',
    discount: 10,
    limit: null,
    expires: ''
  })
}
</script>
