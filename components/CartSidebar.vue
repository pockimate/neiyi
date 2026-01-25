<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div 
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      @click="close"
    ></div>
  </Transition>

  <!-- Sidebar -->
  <Transition name="slide">
    <div 
      v-if="isOpen"
      class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-pink-200">
        <h2 class="font-display text-2xl font-bold text-primary">Shopping Cart</h2>
        <button 
          @click="close"
          class="p-2 hover:bg-pink-50 rounded-lg transition-colors duration-200 cursor-pointer"
          aria-label="Close cart"
        >
          <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Empty State -->
        <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center h-full text-center">
          <svg class="w-24 h-24 text-primary/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">Your cart is empty</h3>
          <p class="text-slate-600 mb-6">Add some beautiful items to get started</p>
          <button 
            @click="close"
            class="bg-cta hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

        <!-- Cart Items List -->
        <div v-else class="space-y-4">
          <div 
            v-for="(item, index) in cartStore.items" 
            :key="index"
            class="glass-card rounded-xl p-4 border border-pink-200"
          >
            <div class="flex gap-4">
              <!-- Product Image -->
              <div class="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-50 rounded-lg flex-shrink-0 overflow-hidden">
                <img 
                  v-if="item.image"
                  :src="item.image" 
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <h3 class="font-display text-base font-semibold mb-1 text-textPrimary truncate">{{ item.name }}</h3>
                <p class="text-xs text-slate-600 mb-2">
                  Size: {{ item.size }} | Color: {{ item.color }}
                </p>
                
                <!-- Quantity Controls -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="cartStore.updateQuantity(index, -1)"
                      class="w-7 h-7 border border-pink-300 rounded-lg hover:bg-pink-50 transition-colors duration-200 cursor-pointer flex items-center justify-center"
                    >
                      <span class="text-sm">-</span>
                    </button>
                    <span class="text-sm font-semibold w-8 text-center">{{ item.quantity }}</span>
                    <button 
                      @click="cartStore.updateQuantity(index, 1)"
                      class="w-7 h-7 border border-pink-300 rounded-lg hover:bg-pink-50 transition-colors duration-200 cursor-pointer flex items-center justify-center"
                    >
                      <span class="text-sm">+</span>
                    </button>
                  </div>
                  
                  <div class="text-right">
                    <p class="font-display text-lg font-bold text-primary">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Remove Button -->
              <button 
                @click="cartStore.removeItem(index)"
                class="self-start p-1 hover:bg-red-50 rounded transition-colors duration-200 cursor-pointer"
                aria-label="Remove item"
              >
                <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.items.length > 0" class="border-t border-pink-200 p-6 space-y-4">
        <!-- Subtotal -->
        <div class="space-y-2">
          <div class="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>${{ cartStore.subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>Tax</span>
            <span>${{ cartStore.tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-semibold text-lg pt-2 border-t border-pink-200">
            <span>Total</span>
            <span class="text-primary">${{ cartStore.total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2">
          <NuxtLink 
            to="/checkout"
            @click="close"
            class="block w-full bg-cta hover:bg-yellow-600 text-white py-4 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
          >
            Checkout
          </NuxtLink>
          <NuxtLink 
            to="/cart"
            @click="close"
            class="block w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer"
          >
            View Cart
          </NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const close = () => {
  emit('close')
}

// Prevent body scroll when sidebar is open
watch(() => props.isOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onMounted(() => {
  cartStore.loadCart()
})

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
