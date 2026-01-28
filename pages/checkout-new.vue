<template>
  <div class="bg-white min-h-screen pb-20 md:pb-0">
    <TheNavbar />
    
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Shopping Cart', to: '/cart' },
      { label: 'Checkout' }
    ]" />
    
    <section class="pt-4 pb-20 px-4 md:px-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-light text-primary mb-8 text-center uppercase tracking-wider">Checkout</h1>
        
        <div v-if="cartStore.items.length === 0" class="text-center py-20">
          <h3 class="text-xl font-light mb-4 text-primary uppercase tracking-wide">Your cart is empty</h3>
          <p class="text-sm text-textMuted mb-8">Add some items before checking out</p>
          <BaseButton variant="primary" size="md" @click="navigateTo('/products')">
            Continue Shopping
          </BaseButton>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Forms -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Express Checkout -->
            <div class="border-2 border-accent/30 bg-accent-50 p-6 rounded-lg">
              <h2 class="text-lg font-semibold mb-4 text-primary uppercase tracking-wide">Express Checkout</h2>
              <p class="text-sm text-textMuted mb-4">Skip the form and pay instantly with:</p>
              
              <div class="grid grid-cols-2 gap-4">
                <!-- PayPal Express -->
                <button
                  @click="handlePayPalExpress"
                  class="flex items-center justify-center gap-2 px-6 py-4 bg-[#0070BA] hover:bg-[#005EA6] text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 01-.793.68H8.25c-.384 0-.69-.31-.64-.687l.007-.04.63-3.993.04-.22a.805.805 0 01.794-.68h.5c3.238 0 5.774-1.314 6.514-5.12.256-1.313.192-2.447-.3-3.327z"/>
                    <path d="M18.768 6.232c-.176-.088-.36-.169-.55-.243a6.696 6.696 0 00-1.314-.308 15.893 15.893 0 00-2.358-.177H9.538a.805.805 0 00-.794.68L7.17 15.812l-.028.15a.805.805 0 00.794.68h2.818l.708-4.487-.022.14a.805.805 0 01.794-.68h1.657c3.238 0 5.774-1.314 6.514-5.12.08-.412.122-.808.13-1.19-.384-.21-.8-.382-1.238-.513z"/>
                  </svg>
                  PayPal
                </button>
                
                <!-- Google Pay -->
                <button
                  @click="handleGooglePay"
                  class="flex items-center justify-center gap-2 px-6 py-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  Google Pay
                </button>
              </div>
              
              <div class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-4 bg-accent-50 text-textMuted uppercase tracking-wide">Or pay with card</span>
                </div>
              </div>
            </div>
            
            <!-- Contact Information -->
            <div class="border border-border p-6 rounded-lg">
              <h2 class="text-lg font-semibold mb-4 text-primary uppercase tracking-wide">Contact Information</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Email *</label>
                  <input 
                    v-model="form.email"
                    type="email"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Phone *</label>
                  <input 
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>
            
            <!-- Shipping Address -->
            <div class="border border-border p-6 rounded-lg">
              <h2 class="text-lg font-semibold mb-4 text-primary uppercase tracking-wide">Shipping Address</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">First Name *</label>
                    <input 
                      v-model="form.firstName"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Last Name *</label>
                    <input 
                      v-model="form.lastName"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2">Country *</label>
                  <select 
                    v-model="form.country"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2">Address *</label>
                  <input 
                    v-model="form.address"
                    type="text"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="Street address"
                  />
                </div>
                
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">City *</label>
                    <input 
                      v-model="form.city"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">State *</label>
                    <input 
                      v-model="form.state"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">ZIP *</label>
                    <input 
                      v-model="form.zipCode"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Payment Method -->
            <div class="border border-border p-6 rounded-lg">
              <h2 class="text-lg font-semibold mb-4 text-primary uppercase tracking-wide">Payment Method</h2>
              
              <!-- Payment Tabs -->
              <div class="flex gap-2 mb-6">
                <button
                  @click="form.paymentMethod = 'card'"
                  :class="[
                    'flex-1 py-3 px-4 rounded-lg font-semibold transition-all cursor-pointer',
                    form.paymentMethod === 'card'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  ]"
                >
                  💳 Credit Card
                </button>
                <button
                  @click="form.paymentMethod = 'paypal'"
                  :class="[
                    'flex-1 py-3 px-4 rounded-lg font-semibold transition-all cursor-pointer',
                    form.paymentMethod === 'paypal'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  ]"
                >
                  PayPal
                </button>
              </div>
              
              <!-- Credit Card Form -->
              <div v-if="form.paymentMethod === 'card'" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Card Number *</label>
                  <input 
                    v-model="form.cardNumber"
                    type="text" 
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    @input="formatCardNumber"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Cardholder Name *</label>
                  <input 
                    v-model="form.cardName"
                    type="text" 
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Expiry Date *</label>
                    <input 
                      v-model="form.cardExpiry"
                      type="text" 
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="MM/YY"
                      maxlength="5"
                      @input="formatExpiry"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">CVV *</label>
                    <input 
                      v-model="form.cardCvv"
                      type="text" 
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="123"
                      maxlength="4"
                    />
                  </div>
                </div>
                
                <!-- Accepted Cards -->
                <div class="flex items-center gap-3 pt-2">
                  <span class="text-xs text-textMuted">We accept:</span>
                  <div class="flex gap-2">
                    <div class="w-10 h-7 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                    <div class="w-10 h-7 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">MC</div>
                    <div class="w-10 h-7 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">AMEX</div>
                  </div>
                </div>
              </div>
              
              <!-- PayPal Info -->
              <div v-if="form.paymentMethod === 'paypal'" class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <p class="text-sm font-semibold text-blue-900 mb-1">Pay with PayPal</p>
                    <p class="text-sm text-blue-800">After clicking "Place Order", you'll be redirected to PayPal to complete your purchase securely.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Order Summary -->
          <div class="lg:col-span-1">
            <div class="border border-border p-6 rounded-lg lg:sticky lg:top-24">
              <h2 class="text-xl font-semibold mb-6 text-primary uppercase tracking-wide">Order Summary</h2>
              
              <!-- Cart Items -->
              <div class="space-y-4 mb-6 max-h-64 overflow-y-auto">
                <div v-for="(item, index) in cartStore.items" :key="index" class="flex gap-3">
                  <div class="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                    <span class="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                      {{ item.quantity }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm truncate">{{ item.name }}</p>
                    <p class="text-xs text-textMuted">{{ item.size }} · {{ item.color }}</p>
                    <p class="text-sm font-bold text-primary mt-1">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Totals -->
              <div class="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-textMuted">Subtotal</span>
                  <span class="font-semibold">${{ cartStore.subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-textMuted">Shipping</span>
                  <span class="font-semibold text-success-600">Free</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-textMuted">Tax</span>
                  <span class="font-semibold">${{ cartStore.tax.toFixed(2) }}</span>
                </div>
                <div class="border-t border-gray-200 pt-3 flex justify-between text-lg">
                  <span class="font-bold">Total</span>
                  <span class="font-bold text-primary">${{ cartStore.total.toFixed(2) }}</span>
                </div>
              </div>
              
              <!-- Place Order Button -->
              <BaseButton 
                variant="primary"
                size="lg"
                block
                @click="handleSubmit"
                :disabled="isSubmitting"
                style="margin-bottom: 12px;"
              >
                <span v-if="!isSubmitting">Place Order</span>
                <span v-else>Processing...</span>
              </BaseButton>
              
              <BaseButton 
                variant="secondary"
                size="md"
                block
                @click="navigateTo('/cart')"
              >
                Back to Cart
              </BaseButton>
              
              <!-- Security Badge -->
              <div class="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-3">
                <svg class="w-6 h-6 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <div class="text-xs text-textMuted">
                  <p class="font-semibold">Secure Checkout</p>
                  <p>256-bit SSL Encrypted</p>
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

const form = reactive({
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  paymentMethod: 'card',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: ''
})

const isSubmitting = ref(false)

// Format card number with spaces
const formatCardNumber = (e: Event) => {
  const input = e.target as HTMLInputElement
  let value = input.value.replace(/\s/g, '')
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
  form.cardNumber = formattedValue
}

// Format expiry date
const formatExpiry = (e: Event) => {
  const input = e.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4)
  }
  form.cardExpiry = value
}

// Handle PayPal Express
const handlePayPalExpress = () => {
  alert('PayPal Express Checkout will be implemented with PayPal SDK')
  // TODO: Implement PayPal SDK integration
}

// Handle Google Pay
const handleGooglePay = () => {
  alert('Google Pay will be implemented with Google Pay API')
  // TODO: Implement Google Pay API integration
}

// Handle form submission
const handleSubmit = async () => {
  // Basic validation
  if (!form.email || !form.phone || !form.firstName || !form.lastName || 
      !form.address || !form.city || !form.state || !form.zipCode || !form.country) {
    alert('Please fill in all required fields')
    return
  }
  
  if (form.paymentMethod === 'card') {
    if (!form.cardNumber || !form.cardName || !form.cardExpiry || !form.cardCvv) {
      alert('Please fill in all card details')
      return
    }
  }
  
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Create order
  const orderData = {
    ...form,
    items: cartStore.items,
    subtotal: cartStore.subtotal,
    tax: cartStore.tax,
    total: cartStore.total,
    orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toISOString()
  }
  
  localStorage.setItem('lastOrder', JSON.stringify(orderData))
  cartStore.clearCart()
  
  navigateTo('/order-success')
}

onMounted(() => {
  cartStore.loadCart()
})
</script>
