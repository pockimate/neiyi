<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div 
      v-if="isOpen"
      class="fixed inset-0 bg-black/30 z-40"
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
      <div class="flex items-center justify-between p-6 border-b border-border">
        <h2 class="text-lg font-light text-primary uppercase tracking-wider">Shopping Cart</h2>
        <button 
          @click="close"
          class="p-2 hover:bg-backgroundLight transition-colors duration-200 cursor-pointer"
          aria-label="Close cart"
        >
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Empty State -->
        <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center h-full text-center">
          <svg class="w-16 h-16 text-border mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <h3 class="text-base font-light mb-3 text-primary uppercase tracking-wide">Your cart is empty</h3>
          <p class="text-xs text-textMuted mb-6">Add some items to get started</p>
          <button 
            @click="close"
            class="btn-primary"
          >
            Continue Shopping
          </button>
        </div>

        <!-- Cart Items List -->
        <div v-else class="space-y-6">
          <div 
            v-for="(item, index) in cartStore.items" 
            :key="index"
            class="border border-border p-4"
          >
            <div class="flex gap-4">
              <!-- Product Image -->
              <div class="w-20 h-20 bg-backgroundLight flex-shrink-0 overflow-hidden">
                <img 
                  v-if="item.image"
                  :src="item.image" 
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold mb-1 text-primary uppercase tracking-wide truncate">{{ item.name }}</h3>
                <p class="text-xs text-textMuted mb-3 uppercase">
                  Size: {{ item.size }} | Color: {{ item.color }}
                </p>
                
                <!-- Quantity Controls -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <button 
                      @click="cartStore.updateQuantity(index, -1)"
                      class="w-7 h-7 border border-border hover:bg-backgroundLight transition-colors duration-200 cursor-pointer flex items-center justify-center text-xs"
                    >
                      <span>-</span>
                    </button>
                    <span class="text-xs font-semibold w-6 text-center">{{ item.quantity }}</span>
                    <button 
                      @click="cartStore.updateQuantity(index, 1)"
                      class="w-7 h-7 border border-border hover:bg-backgroundLight transition-colors duration-200 cursor-pointer flex items-center justify-center text-xs"
                    >
                      <span>+</span>
                    </button>
                  </div>
                  
                  <div class="text-right">
                    <p class="text-sm font-semibold text-primary">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Remove Button -->
              <button 
                @click="cartStore.removeItem(index)"
                class="self-start p-1 hover:bg-backgroundLight transition-colors duration-200 cursor-pointer"
                aria-label="Remove item"
              >
                <svg class="w-4 h-4 text-textMuted hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.items.length > 0" class="border-t border-border p-6 space-y-6">
        <!-- Subtotal -->
        <div class="space-y-3">
          <div class="flex justify-between text-sm text-textMuted">
            <span>Subtotal</span>
            <span>${{ cartStore.subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm text-textMuted">
            <span>Tax</span>
            <span>${{ cartStore.tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-semibold text-base pt-3 border-t border-border">
            <span>Total</span>
            <span class="text-primary">${{ cartStore.total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <NuxtLink 
            to="/checkout"
            @click="close"
            class="btn-primary block w-full text-center"
          >
            Checkout
          </NuxtLink>
          <NuxtLink 
            to="/cart"
            @click="close"
            class="btn-secondary block w-full text-center"
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
