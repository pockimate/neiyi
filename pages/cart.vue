<template>
  <div class="bg-white min-h-screen">
    <TheNavbar />
    
    <section class="pt-32 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-light text-primary mb-12 text-center uppercase tracking-wider">Shopping Cart</h1>
        
        <div v-if="cartStore.items.length === 0" class="text-center py-20">
          <svg class="w-20 h-20 text-border mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <h3 class="text-xl font-light mb-4 text-primary uppercase tracking-wide">Your cart is empty</h3>
          <p class="text-sm text-textMuted mb-8">Add some items to get started</p>
          <NuxtLink to="/products" class="btn-primary inline-block">
            Continue Shopping
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-6">
            <div v-for="(item, index) in cartStore.items" :key="index" class="border border-border p-6">
              <div class="flex gap-6">
                <div class="w-32 h-32 bg-backgroundLight flex-shrink-0 overflow-hidden">
                  <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <h3 class="text-base font-semibold mb-2 text-primary uppercase tracking-wide">{{ item.name }}</h3>
                  <p class="text-xs text-textMuted mb-4 uppercase">Size: {{ item.size }} | Color: {{ item.color }}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <button @click="cartStore.updateQuantity(index, -1)" class="w-8 h-8 border border-border hover:bg-backgroundLight transition-colors duration-200 cursor-pointer text-sm">-</button>
                      <span class="font-semibold text-sm w-8 text-center">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(index, 1)" class="w-8 h-8 border border-border hover:bg-backgroundLight transition-colors duration-200 cursor-pointer text-sm">+</button>
                    </div>
                    <div class="text-right">
                      <p class="text-lg font-semibold text-primary mb-2">${{ (item.price * item.quantity).toFixed(2) }}</p>
                      <button @click="cartStore.removeItem(index)" class="text-xs text-textMuted hover:text-primary cursor-pointer uppercase tracking-wide">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="border border-border p-8 sticky top-32">
              <h2 class="text-xl font-light mb-8 text-primary uppercase tracking-wider">Order Summary</h2>
              
              <!-- Coupon Code -->
              <div class="mb-8">
                <label class="block text-xs font-semibold mb-3 text-primary uppercase tracking-wide">Promo Code</label>
                <div class="flex gap-2">
                  <input
                    v-model="couponCode"
                    type="text"
                    placeholder="Enter code"
                    class="flex-1 px-4 py-3 border border-border focus:border-primary focus:outline-none text-sm"
                    :disabled="appliedCoupon !== null"
                  />
                  <button
                    v-if="!appliedCoupon"
                    @click="applyCoupon"
                    class="px-6 py-3 bg-primary hover:bg-white hover:text-primary border border-primary text-white text-xs uppercase tracking-wide font-semibold transition-all duration-200 cursor-pointer"
                  >
                    Apply
                  </button>
                  <button
                    v-else
                    @click="removeCoupon"
                    class="px-6 py-3 bg-accent hover:opacity-80 text-white text-xs uppercase tracking-wide font-semibold transition-all duration-200 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <p v-if="couponError" class="text-xs text-accent mt-2">{{ couponError }}</p>
                <p v-if="appliedCoupon" class="text-xs text-primary mt-2">
                  ✓ {{ appliedCoupon.code }} applied - {{ appliedCoupon.discount }}% off
                </p>
              </div>
              
              <div class="space-y-4 mb-8">
                <div class="flex justify-between text-sm text-textMuted">
                  <span>Subtotal</span>
                  <span>${{ cartStore.subtotal.toFixed(2) }}</span>
                </div>
                <div v-if="appliedCoupon" class="flex justify-between text-sm text-primary">
                  <span>Discount ({{ appliedCoupon.discount }}%)</span>
                  <span>-${{ discountAmount.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm text-textMuted">
                  <span>Shipping</span>
                  <span v-if="cartStore.subtotal >= 100" class="text-primary">Free</span>
                  <span v-else>${{ shippingCost.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm text-textMuted">
                  <span>Tax (10%)</span>
                  <span>${{ taxAmount.toFixed(2) }}</span>
                </div>
                <div class="border-t border-border pt-4 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span class="text-primary">${{ finalTotal.toFixed(2) }}</span>
                </div>
              </div>
              
              <!-- Free Shipping Progress -->
              <div v-if="cartStore.subtotal < 100" class="mb-8 p-4 bg-backgroundLight border border-border">
                <p class="text-xs text-textSecondary mb-3">
                  Add <span class="font-bold">${{ (100 - cartStore.subtotal).toFixed(2) }}</span> more for free shipping
                </p>
                <div class="w-full h-1 bg-border overflow-hidden">
                  <div 
                    class="h-full bg-primary transition-all duration-300"
                    :style="{ width: `${(cartStore.subtotal / 100) * 100}%` }"
                  ></div>
                </div>
              </div>
              
              <NuxtLink to="/checkout" class="btn-primary block w-full text-center mb-3">
                Proceed to Checkout
              </NuxtLink>
              
              <NuxtLink to="/products" class="btn-secondary block w-full text-center">
                Continue Shopping
              </NuxtLink>
              
              <!-- Trust Badges -->
              <div class="mt-8 pt-8 border-t border-border space-y-3">
                <div class="flex items-center gap-3 text-xs text-textMuted uppercase tracking-wide">
                  <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-textMuted uppercase tracking-wide">
                  <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>30-day returns</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-textMuted uppercase tracking-wide">
                  <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
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
