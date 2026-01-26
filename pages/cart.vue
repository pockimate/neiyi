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
              
              <!-- Coupon Code -->
              <div class="mb-6">
                <label class="block text-sm font-semibold mb-2 text-textPrimary">Promo Code</label>
                <div class="flex gap-2">
                  <input
                    v-model="couponCode"
                    type="text"
                    placeholder="Enter code"
                    class="flex-1 px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-primary focus:outline-none"
                    :disabled="appliedCoupon !== null"
                  />
                  <button
                    v-if="!appliedCoupon"
                    @click="applyCoupon"
                    class="px-6 py-2 bg-primary hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
                  >
                    Apply
                  </button>
                  <button
                    v-else
                    @click="removeCoupon"
                    class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <p v-if="couponError" class="text-sm text-red-500 mt-1">{{ couponError }}</p>
                <p v-if="appliedCoupon" class="text-sm text-green-600 mt-1">
                  ✓ {{ appliedCoupon.code }} applied - {{ appliedCoupon.discount }}% off
                </p>
              </div>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${{ cartStore.subtotal.toFixed(2) }}</span>
                </div>
                <div v-if="appliedCoupon" class="flex justify-between text-green-600">
                  <span>Discount ({{ appliedCoupon.discount }}%)</span>
                  <span>-${{ discountAmount.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span v-if="cartStore.subtotal >= 100" class="text-green-600">Free</span>
                  <span v-else>${{ shippingCost.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Tax (10%)</span>
                  <span>${{ taxAmount.toFixed(2) }}</span>
                </div>
                <div class="border-t border-pink-200 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span class="text-primary">${{ finalTotal.toFixed(2) }}</span>
                </div>
              </div>
              
              <!-- Free Shipping Progress -->
              <div v-if="cartStore.subtotal < 100" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p class="text-sm text-yellow-800 mb-2">
                  Add <span class="font-bold">${{ (100 - cartStore.subtotal).toFixed(2) }}</span> more for free shipping!
                </p>
                <div class="w-full h-2 bg-yellow-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-yellow-500 transition-all duration-300"
                    :style="{ width: `${(cartStore.subtotal / 100) * 100}%` }"
                  ></div>
                </div>
              </div>
              
              <NuxtLink to="/checkout" class="block w-full bg-cta hover:bg-yellow-600 text-white py-4 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl mb-3">
                Proceed to Checkout
              </NuxtLink>
              
              <NuxtLink to="/products" class="block w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer">
                Continue Shopping
              </NuxtLink>
              
              <!-- Trust Badges -->
              <div class="mt-6 pt-6 border-t border-pink-200 space-y-3">
                <div class="flex items-center gap-3 text-sm text-slate-600">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-slate-600">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>30-day returns</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-slate-600">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Free shipping over $100</span>
                </div>
              </div>
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

// Coupon functionality
const couponCode = ref('')
const appliedCoupon = ref<{ code: string; discount: number } | null>(null)
const couponError = ref('')

// Available coupons (in real app, this would come from backend)
const availableCoupons = [
  { code: 'SAVE10', discount: 10 },
  { code: 'SAVE20', discount: 20 },
  { code: 'WELCOME15', discount: 15 }
]

const applyCoupon = () => {
  const coupon = availableCoupons.find(c => c.code.toUpperCase() === couponCode.value.toUpperCase())
  
  if (coupon) {
    appliedCoupon.value = coupon
    couponError.value = ''
  } else {
    couponError.value = 'Invalid coupon code'
  }
}

const removeCoupon = () => {
  appliedCoupon.value = null
  couponCode.value = ''
  couponError.value = ''
}

// Calculations
const discountAmount = computed(() => {
  if (!appliedCoupon.value) return 0
  return cartStore.subtotal * (appliedCoupon.value.discount / 100)
})

const shippingCost = computed(() => {
  return cartStore.subtotal >= 100 ? 0 : 9.99
})

const subtotalAfterDiscount = computed(() => {
  return cartStore.subtotal - discountAmount.value
})

const taxAmount = computed(() => {
  return subtotalAfterDiscount.value * 0.1
})

const finalTotal = computed(() => {
  return subtotalAfterDiscount.value + shippingCost.value + taxAmount.value
})

onMounted(() => {
  cartStore.loadCart()
})
</script>
