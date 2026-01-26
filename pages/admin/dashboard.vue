<template>
  <AdminLayout page-title="Dashboard" page-subtitle="Welcome back! Here's what's happening">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="glass-card-dark rounded-xl p-6 border border-pink-200">
        <div class="flex items-center justify-between mb-4">
          <div :class="`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`">
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>
          <span :class="`text-sm font-semibold ${stat.changeColor}`">
            {{ stat.change }}
          </span>
        </div>
        <h3 class="text-3xl font-bold text-white mb-1">{{ stat.value }}</h3>
        <p class="text-sm text-slate-400">{{ stat.label }}</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Recent Orders -->
      <div class="glass-card-dark rounded-xl p-6 border border-pink-200">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">Recent Orders</h3>
          <NuxtLink to="/admin/orders" class="text-sm text-primary hover:underline cursor-pointer">
            View All
          </NuxtLink>
        </div>
        
        <div class="space-y-4">
          <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p class="font-semibold text-white">#{{ order.id }}</p>
              <p class="text-sm text-slate-400">{{ order.customer }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-primary">${{ order.total.toFixed(2) }}</p>
              <span :class="`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`">
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Top Products -->
      <div class="glass-card-dark rounded-xl p-6 border border-pink-200">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">Top Products</h3>
          <NuxtLink to="/admin/products" class="text-sm text-primary hover:underline cursor-pointer">
            View All
          </NuxtLink>
        </div>
        
        <div class="space-y-4">
          <div v-for="product in topProducts" :key="product.id" class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-50 rounded-lg flex-shrink-0"></div>
            <div class="flex-1">
              <p class="font-semibold text-white text-sm">{{ product.name }}</p>
              <p class="text-xs text-slate-400">{{ product.sales }} sales</p>
            </div>
            <p class="font-bold text-primary">${{ product.revenue.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sales Chart -->
    <div class="glass-card-dark rounded-xl p-6 border border-pink-200">
      <h3 class="text-xl font-bold text-white mb-6">Sales Overview</h3>
      <div class="h-64 flex items-end justify-between gap-2">
        <div v-for="(value, index) in salesData" :key="index" class="flex-1 flex flex-col items-center gap-2">
          <div 
            class="w-full bg-gradient-to-t from-primary to-pink-400 rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
            :style="{ height: `${(value / Math.max(...salesData)) * 100}%` }"
          ></div>
          <span class="text-xs text-slate-400">{{ months[index] }}</span>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
const stats = [
  {
    label: 'Total Revenue',
    value: '$12,426',
    change: '+12.5%',
    changeColor: 'text-green-400',
    color: 'bg-green-500',
    icon: 'svg'
  },
  {
    label: 'Total Orders',
    value: '156',
    change: '+8.2%',
    changeColor: 'text-green-400',
    color: 'bg-blue-500',
    icon: 'svg'
  },
  {
    label: 'Total Products',
    value: '12',
    change: '+2',
    changeColor: 'text-blue-400',
    color: 'bg-purple-500',
    icon: 'svg'
  },
  {
    label: 'Total Customers',
    value: '89',
    change: '+15.3%',
    changeColor: 'text-green-400',
    color: 'bg-pink-500',
    icon: 'svg'
  }
]

const recentOrders = [
  { id: 'ORD001', customer: 'Sarah Johnson', total: 129.99, status: 'Completed' },
  { id: 'ORD002', customer: 'Emily Davis', total: 89.99, status: 'Processing' },
  { id: 'ORD003', customer: 'Jessica Brown', total: 159.99, status: 'Shipped' },
  { id: 'ORD004', customer: 'Amanda Wilson', total: 79.99, status: 'Pending' }
]

const topProducts = [
  { id: 1, name: 'Silk Lace Set', sales: 45, revenue: 4049.55 },
  { id: 2, name: 'Satin Bodysuit', sales: 38, revenue: 4939.62 },
  { id: 3, name: 'Velvet Corset', sales: 32, revenue: 4799.68 },
  { id: 4, name: 'Lace Chemise', sales: 28, revenue: 1679.72 }
]

const salesData = [2400, 3200, 2800, 4100, 3600, 4800, 5200, 4600, 5800, 6200, 5400, 6800]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Completed': 'bg-green-500/20 text-green-300',
    'Processing': 'bg-blue-500/20 text-blue-300',
    'Shipped': 'bg-purple-500/20 text-purple-300',
    'Pending': 'bg-yellow-500/20 text-yellow-300'
  }
  return colors[status] || 'bg-gray-500/20 text-gray-300'
}
</script>
