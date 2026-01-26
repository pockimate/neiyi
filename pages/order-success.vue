<template>
  <div>
    <TheNavbar />
    
    <section class="pt-32 pb-20 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Success Animation -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h1 class="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Order Confirmed!</h1>
          <p class="text-lg text-slate-600 mb-2">Thank you for your purchase</p>
          <p class="text-slate-600">
            Order #<span class="font-semibold text-primary">{{ order?.orderNumber }}</span>
          </p>
        </div>
        
        <div v-if="order" class="space-y-6">
          <!-- Order Details -->
          <div class="glass-card rounded-2xl p-8 border border-pink-200">
            <h2 class="font-display text-2xl font-semibold mb-6 text-textPrimary">Order Details</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 class="font-semibold text-slate-700 mb-2">Shipping Address</h3>
                <p class="text-slate-600">{{ order.firstName }} {{ order.lastName }}</p>
                <p class="text-slate-600">{{ order.address }}</p>
                <p v-if="order.apartment" class="text-slate-600">{{ order.apartment }}</p>
                <p class="text-slate-600">{{ order.city }}, {{ order.state }} {{ order.zipCode }}</p>
                <p class="text-slate-600">{{ order.country }}</p>
              </div>
              
              <div>
                <h3 class="font-semibold text-slate-700 mb-2">Contact Information</h3>
                <p class="text-slate-600">{{ order.email }}</p>
                <p class="text-slate-600">{{ order.phone }}</p>
                
                <h3 class="font-semibold text-slate-700 mt-4 mb-2">Payment Method</h3>
                <p class="text-slate-600 capitalize">{{ order.paymentMethod === 'card' ? 'Credit Card' : 'PayPal' }}</p>
              </div>
            </div>
            
            <!-- Order Items -->
            <div class="border-t border-pink-200 pt-6">
              <h3 class="font-semibold text-slate-700 mb-4">Order Items</h3>
              <div class="space-y-4">
                <div v-for="(item, index) in order.items" :key="index" class="flex gap-4">
                  <div class="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-50 rounded-lg flex-shrink-0">
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-textPrimary">{{ item.name }}</p>
                    <p class="text-sm text-slate-600">Size: {{ item.size }} • Color: {{ item.color }}</p>
                    <p class="text-sm text-slate-600">Quantity: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-primary">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Order Summary -->
            <div class="border-t border-pink-200 mt-6 pt-6">
              <div class="space-y-2 max-w-sm ml-auto">
                <div class="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${{ order.subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span class="text-green-600">Free</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>${{ order.tax.toFixed(2) }}</span>
                </div>
                <div class="border-t border-pink-200 pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span class="text-primary">${{ order.total.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- What's Next -->
          <div class="glass-card rounded-2xl p-8 border border-pink-200">
            <h2 class="font-display text-2xl font-semibold mb-6 text-textPrimary">What's Next?</h2>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 class="font-semibold text-textPrimary mb-1">Order Confirmation Email</h3>
                  <p class="text-slate-600">You'll receive a confirmation email at {{ order.email }} with your order details.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 class="font-semibold text-textPrimary mb-1">Processing</h3>
                  <p class="text-slate-600">We'll start processing your order right away. This usually takes 1-2 business days.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 class="font-semibold text-textPrimary mb-1">Shipping</h3>
                  <p class="text-slate-600">Your order will be shipped within 24 hours. You'll receive a tracking number via email.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 class="font-semibold text-textPrimary mb-1">Delivery</h3>
                  <p class="text-slate-600">Estimated delivery: 3-5 business days. Free shipping on all orders!</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/products" class="inline-block bg-cta hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl">
              Continue Shopping
            </NuxtLink>
            <NuxtLink to="/" class="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold text-center transition-all duration-200 cursor-pointer">
              Back to Home
            </NuxtLink>
          </div>
        </div>
        
        <div v-else class="glass-card rounded-2xl p-12 border border-pink-200 text-center">
          <h3 class="font-display text-2xl font-semibold mb-2 text-textPrimary">No Order Found</h3>
          <p class="text-slate-600 mb-6">We couldn't find your order details.</p>
          <NuxtLink to="/products" class="inline-block bg-cta hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 cursor-pointer">
            Shop Now
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const order = ref<any>(null)

onMounted(() => {
  // Load order from localStorage
  const orderData = localStorage.getItem('lastOrder')
  if (orderData) {
    order.value = JSON.parse(orderData)
  }
})
</script>
