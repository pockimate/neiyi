<template>
  <AdminLayout page-title="Orders" page-subtitle="Manage customer orders">
    <!-- Filters -->
    <div class="flex items-center gap-4 mb-6">
      <select 
        v-model="filterStatus"
        class="w-48 px-4 py-2 bg-slate-800 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-primary text-white cursor-pointer"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search orders..."
        class="flex-1 max-w-md px-4 py-2 bg-slate-800 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-primary text-white placeholder-slate-400"
      />
    </div>
    
    <!-- Orders Table -->
    <div class="glass-card-dark rounded-xl border border-pink-200 overflow-hidden">
      <table class="w-full">
        <thead class="bg-white/5 border-b border-pink-200">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Order ID</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Customer</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Items</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Total</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
            <th class="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-pink-200/20">
          <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-white/5 transition-colors">
            <td class="px-6 py-4">
              <p class="font-semibold text-white">#{{ order.id }}</p>
            </td>
            <td class="px-6 py-4">
              <p class="text-white">{{ order.customer }}</p>
              <p class="text-sm text-slate-400">{{ order.email }}</p>
            </td>
            <td class="px-6 py-4 text-slate-300">{{ order.date }}</td>
            <td class="px-6 py-4 text-slate-300">{{ order.items }} items</td>
            <td class="px-6 py-4">
              <p class="font-bold text-primary">${{ order.total.toFixed(2) }}</p>
            </td>
            <td class="px-6 py-4">
              <select 
                v-model="order.status"
                @change="updateOrderStatus(order)"
                :class="`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${getStatusColor(order.status)}`"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-end gap-2">
                <button 
                  @click="viewOrder(order)"
                  class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="View Details"
                >
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Order Details Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="glass-card-dark rounded-2xl p-8 border border-pink-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-white">Order #{{ selectedOrder.id }}</h3>
          <button @click="selectedOrder = null" class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-slate-400 mb-1">Customer</p>
              <p class="text-white font-semibold">{{ selectedOrder.customer }}</p>
              <p class="text-sm text-slate-300">{{ selectedOrder.email }}</p>
            </div>
            <div>
              <p class="text-sm text-slate-400 mb-1">Order Date</p>
              <p class="text-white font-semibold">{{ selectedOrder.date }}</p>
            </div>
          </div>
          
          <div>
            <p class="text-sm text-slate-400 mb-2">Shipping Address</p>
            <div class="p-4 bg-white/5 rounded-lg">
              <p class="text-white">{{ selectedOrder.address }}</p>
            </div>
          </div>
          
          <div>
            <p class="text-sm text-slate-400 mb-2">Order Items</p>
            <div class="space-y-2">
              <div v-for="i in selectedOrder.items" :key="i" class="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-50 rounded-lg"></div>
                  <div>
                    <p class="text-white font-semibold">Product {{ i }}</p>
                    <p class="text-sm text-slate-400">Size: M • Color: Black</p>
                  </div>
                </div>
                <p class="text-primary font-bold">$89.99</p>
              </div>
            </div>
          </div>
          
          <div class="border-t border-pink-200 pt-4">
            <div class="flex justify-between text-white mb-2">
              <span>Subtotal</span>
              <span>${{ (selectedOrder.total * 0.9).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-white mb-2">
              <span>Tax</span>
              <span>${{ (selectedOrder.total * 0.1).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-xl font-bold text-primary pt-2 border-t border-pink-200">
              <span>Total</span>
              <span>${{ selectedOrder.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
const filterStatus = ref('')
const searchQuery = ref('')
const selectedOrder = ref<any>(null)

const orders = ref([
  { id: 'ORD001', customer: 'Sarah Johnson', email: 'sarah@example.com', date: '2026-01-26', items: 2, total: 219.98, status: 'Completed', address: '123 Main St, New York, NY 10001' },
  { id: 'ORD002', customer: 'Emily Davis', email: 'emily@example.com', date: '2026-01-25', items: 1, total: 89.99, status: 'Processing', address: '456 Oak Ave, Los Angeles, CA 90001' },
  { id: 'ORD003', customer: 'Jessica Brown', email: 'jessica@example.com', date: '2026-01-25', items: 3, total: 269.97, status: 'Shipped', address: '789 Pine Rd, Chicago, IL 60601' },
  { id: 'ORD004', customer: 'Amanda Wilson', email: 'amanda@example.com', date: '2026-01-24', items: 1, total: 79.99, status: 'Pending', address: '321 Elm St, Houston, TX 77001' },
  { id: 'ORD005', customer: 'Michelle Lee', email: 'michelle@example.com', date: '2026-01-24', items: 2, total: 179.98, status: 'Completed', address: '654 Maple Dr, Phoenix, AZ 85001' }
])

const filteredOrders = computed(() => {
  let filtered = orders.value
  
  if (filterStatus.value) {
    filtered = filtered.filter(o => o.status === filterStatus.value)
  }
  
  if (searchQuery.value) {
    filtered = filtered.filter(o => 
      o.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  return filtered
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Completed': 'bg-green-500/20 text-green-300 border-green-500',
    'Processing': 'bg-blue-500/20 text-blue-300 border-blue-500',
    'Shipped': 'bg-purple-500/20 text-purple-300 border-purple-500',
    'Pending': 'bg-yellow-500/20 text-yellow-300 border-yellow-500',
    'Cancelled': 'bg-red-500/20 text-red-300 border-red-500'
  }
  return colors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500'
}

const updateOrderStatus = (order: any) => {
  alert(`Order #${order.id} status updated to ${order.status}`)
}

const viewOrder = (order: any) => {
  selectedOrder.value = order
}
</script>
