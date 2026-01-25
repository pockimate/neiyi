<template>
  <div>
    <TheNavbar />
    
    <section class="pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-display text-4xl md:text-5xl font-bold text-primary mb-8">Shopping Cart</h1>
        
        <div v-if="cartStore.items.length === 0" class="glass-card rounded-2xl p-12 border border-pink-200 text-center">
          <svg class="w-24 h-24 text-primary/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <h3 class="font-display text-2xl font-semibold mb-2 text-textPrimary">Your cart is empty</h3>
          <p class="text-slate-600 mb-6">Add some beautiful items to get started</p>
          <NuxtLink to="/products" class="inline-block bg-cta hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 cursor-pointer">
            Shop Now
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-4">
            <div v-for="(item, index) in cartStore.items" :key="index" class="glass-card rounded-2xl p-6 border border-pink-200">
              <div class="flex gap-6">
                <div class="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-50 rounded-lg flex-shrink-0"></div>
                <div class="flex-1">
                  <h3 class="font-display text-xl font-semibold mb-1 text-textPrimary">{{ item.name }}</h3>
                  <p class="text-sm text-slate-600 mb-2">Size: {{ item.size }} | Color: {{ item.color }}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <button @click="cartStore.updateQuantity(index, -1)" class="w-8 h-8 border border-pink-300 rounded-lg hover:bg-pink-50 transition-colors duration-200 cursor-pointer">-</button>
                      <span class="font-semibold">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(index, 1)" class="w-8 h-8 border border-pink-300 rounded-lg hover:bg-pink-50 transition-colors duration-200 cursor-pointer">+</button>
                    </div>
                    <div class="text-right">
                      <p class="font-display text-2xl font-bold text-primary">${{ (item.price * item.quantity).toFixed(2) }}</p>
                      <button @click="cartStore.removeItem(index)" class="text-sm text-red-500 hover:text-red-700 cursor-pointer">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="glass-card rounded-2xl p-6 border border-pink-200 sticky top-24">
              <h2 class="font-display text-2xl font-semibold mb-6 text-textPrimary">Order Summary</h2>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${{ cartStore.subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span class="text-green-600">Free</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>${{ cartStore.tax.toFixed(2) }}</span>
                </div>
                <div class="border-t border-pink-200 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span class="text-primary">${{ cartStore.total.toFixed(2) }}</span>
                </div>
              </div>
              
              <NuxtLink to="/checkout" class="block w-full bg-cta hover:bg-yellow-600 text-white py-4 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl mb-3">
                Proceed to Checkout
              </NuxtLink>
              
              <NuxtLink to="/products" class="block w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer">
                Continue Shopping
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadCart()
})
</script>
