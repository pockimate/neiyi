<template>
  <div>
    <TheNavbar />
    
    <section class="pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-display text-4xl md:text-5xl font-bold text-primary mb-8">Checkout</h1>
        
        <div v-if="cartStore.items.length === 0" class="glass-card rounded-2xl p-12 border border-pink-200 text-center">
          <h3 class="font-display text-2xl font-semibold mb-2 text-textPrimary">Your cart is empty</h3>
          <p class="text-slate-600 mb-6">Add some items before checking out</p>
          <NuxtLink to="/products" class="inline-block bg-cta hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 cursor-pointer">
            Shop Now
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Checkout Form -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Contact Information -->
            <div class="glass-card rounded-2xl p-6 border border-pink-200">
              <h2 class="font-display text-2xl font-semibold mb-6 text-textPrimary">Contact Information</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Email</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Phone</label>
                  <input 
                    v-model="form.phone"
                    type="tel" 
                    class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>
            
            <!-- Shipping Address -->
            <div class="glass-card rounded-2xl p-6 border border-pink-200">
              <h2 class="font-display text-2xl font-semibold mb-6 text-textPrimary">Shipping Address</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">First Name</label>
                    <input 
                      v-model="form.firstName"
                      type="text" 
                      class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">Last Name</label>
                    <input 
                      v-model="form.lastName"
                      type="text" 
                      class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Address</label>
                  <input 
                    v-model="form.address"
                    type="text" 
                    class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Street address"
                  />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">City</label>
                    <input 
                      v-model="form.city"
                      type="text" 
                      class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">State</label>
                    <input 
                      v-model="form.state"
                      type="text" 
                      class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">ZIP Code</label>
                    <input 
                      v-model="form.zipCode"
                      type="text" 
                      class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Payment Method -->
            <div class="glass-card rounded-2xl p-6 border border-pink-200">
              <h2 class="font-display text-2xl font-semibold mb-6 text-textPrimary">Payment Method</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Card Number</label>
                  <input 
                    v-model="form.cardNumber"
                    type="text" 
                    class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">Expiry Date</label>
                    <input 
                      v-model="form.expiryDate"
                      type="text" 
                      class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">CVV</label>
                    <input 
                      v-model="form.cvv"
                      type="text" 
                      class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="glass-card rounded-2xl p-6 border border-pink-200 sticky top-24">
              <h2 class="font-display text-2xl font-semibold mb-6 text-textPrimary">Order Summary</h2>
              
              <div class="space-y-4 mb-6">
                <div v-for="(item, index) in cartStore.items" :key="index" class="flex justify-between text-sm">
                  <span class="text-slate-600">{{ item.name }} ({{ item.quantity }}x)</span>
                  <span class="font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
              
              <div class="border-t border-pink-200 pt-4 space-y-3 mb-6">
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
              
              <button 
                @click="handlePlaceOrder"
                class="w-full bg-cta hover:bg-yellow-600 text-white py-4 rounded-full font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl mb-3 min-h-touch"
              >
                Place Order
              </button>
              
              <NuxtLink to="/cart" class="block w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer">
                Back to Cart
              </NuxtLink>
              
              <div class="mt-6 flex items-center justify-center gap-4 text-slate-400">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </div>
              <p class="text-xs text-center text-slate-400 mt-2">Secure payment processing</p>
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

const form = reactive({
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

const handlePlaceOrder = () => {
  // Validate form
  if (!form.email || !form.firstName || !form.lastName || !form.address) {
    alert('Please fill in all required fields')
    return
  }
  
  // In a real app, this would process the payment
  alert('Order placed successfully! Thank you for your purchase.')
  
  // Clear cart
  cartStore.clearCart()
  
  // Redirect to home
  navigateTo('/')
}

onMounted(() => {
  cartStore.loadCart()
})
</script>
