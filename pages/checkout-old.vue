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
        <!-- Progress Steps -->
        <div class="mb-8 md:mb-12">
          <div class="flex items-center justify-center gap-2 md:gap-4">
            <div class="flex items-center">
              <div class="w-6 h-6 md:w-8 md:h-8 bg-primary text-white flex items-center justify-center text-xs font-semibold">1</div>
              <span class="ml-1 md:ml-2 text-xs uppercase tracking-wide text-primary hidden sm:inline">Cart</span>
            </div>
            <div class="w-8 md:w-12 h-px bg-primary"></div>
            <div class="flex items-center">
              <div class="w-6 h-6 md:w-8 md:h-8 bg-primary text-white flex items-center justify-center text-xs font-semibold">2</div>
              <span class="ml-1 md:ml-2 text-xs uppercase tracking-wide text-primary hidden sm:inline">Checkout</span>
            </div>
            <div class="w-8 md:w-12 h-px bg-border"></div>
            <div class="flex items-center">
              <div class="w-6 h-6 md:w-8 md:h-8 bg-border text-textMuted flex items-center justify-center text-xs font-semibold">3</div>
              <span class="ml-1 md:ml-2 text-xs uppercase tracking-wide text-textMuted hidden sm:inline">Complete</span>
            </div>
          </div>
        </div>
        
        <h1 class="text-2xl md:text-3xl font-light text-primary mb-8 md:mb-12 text-center uppercase tracking-wider">Checkout</h1>
        
        <div v-if="cartStore.items.length === 0" class="text-center py-20">
          <h3 class="text-xl font-light mb-4 text-primary uppercase tracking-wide">Your cart is empty</h3>
          <p class="text-sm text-textMuted mb-8">Add some items before checking out</p>
          <BaseButton 
            tag="NuxtLink"
            to="/products" 
            variant="primary"
            size="md"
          >
            Continue Shopping
          </BaseButton>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Checkout Form -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Contact Information -->
            <div class="border border-border p-8">
              <h2 class="text-xl font-light mb-8 text-primary uppercase tracking-wider">Contact Information</h2>
              <div class="space-y-6">
                <div>
                  <label class="block text-xs font-semibold mb-3 text-primary uppercase tracking-wide">Email *</label>
                  <input 
                    v-model="form.email"
                    type="email"
                    ref="emailInput"
                    :class="[
                      'w-full px-4 py-3 border focus:outline-none transition-colors text-sm',
                      errors.email ? 'border-accent' : 'border-border focus:border-primary'
                    ]"
                    placeholder="your@email.com"
                    @blur="validateField('email')"
                  />
                  <p v-if="errors.email" class="text-xs text-accent mt-2">{{ errors.email }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold mb-3 text-primary uppercase tracking-wide">Phone *</label>
                  <input 
                    v-model="form.phone"
                    type="tel"
                    ref="phoneInput"
                    :class="[
                      'w-full px-4 py-3 border focus:outline-none transition-colors text-sm',
                      errors.phone ? 'border-accent' : 'border-border focus:border-primary'
                    ]"
                    placeholder="+1 (555) 000-0000"
                    @blur="validateField('phone')"
                  />
                  <p v-if="errors.phone" class="text-xs text-accent mt-2">{{ errors.phone }}</p>
                </div>
              </div>
            </div>
            
            <!-- Shipping Address -->
            <div class="border border-border p-8">
              <h2 class="text-xl font-light mb-8 text-primary uppercase tracking-wider">Shipping Address</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">First Name *</label>
                    <input 
                      v-model="form.firstName"
                      type="text"
                      ref="firstNameInput"
                      :class="[
                        'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                        errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                      ]"
                      @blur="validateField('firstName')"
                    />
                    <p v-if="errors.firstName" class="text-sm text-red-500 mt-1">{{ errors.firstName }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">Last Name *</label>
                    <input 
                      v-model="form.lastName"
                      type="text"
                      ref="lastNameInput"
                      :class="[
                        'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                        errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                      ]"
                      @blur="validateField('lastName')"
                    />
                    <p v-if="errors.lastName" class="text-sm text-red-500 mt-1">{{ errors.lastName }}</p>
                  </div>
                </div>
                
                <!-- Country - 移到显眼位置 -->
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Country *</label>
                  <select 
                    v-model="form.country"
                    ref="countryInput"
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors cursor-pointer',
                      errors.country ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                    ]"
                    @blur="validateField('country')"
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                  <p v-if="errors.country" class="text-sm text-red-500 mt-1">{{ errors.country }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Address *</label>
                  <input 
                    v-model="form.address"
                    type="text"
                    ref="addressInput"
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                      errors.address ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                    ]"
                    placeholder="Street address"
                    @blur="validateField('address')"
                  />
                  <p v-if="errors.address" class="text-sm text-red-500 mt-1">{{ errors.address }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2 text-slate-700">Apartment, suite, etc. (optional)</label>
                  <input 
                    v-model="form.apartment"
                    type="text" 
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">City *</label>
                    <input 
                      v-model="form.city"
                      type="text"
                      ref="cityInput"
                      :class="[
                        'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                        errors.city ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                      ]"
                      @blur="validateField('city')"
                    />
                    <p v-if="errors.city" class="text-sm text-red-500 mt-1">{{ errors.city }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">State *</label>
                    <input 
                      v-model="form.state"
                      type="text"
                      ref="stateInput"
                      :class="[
                        'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                        errors.state ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                      ]"
                      @blur="validateField('state')"
                    />
                    <p v-if="errors.state" class="text-sm text-red-500 mt-1">{{ errors.state }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">ZIP Code *</label>
                    <input 
                      v-model="form.zipCode"
                      type="text"
                      ref="zipCodeInput"
                      :class="[
                        'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                        errors.zipCode ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                      ]"
                      @blur="validateField('zipCode')"
                    />
                    <p v-if="errors.zipCode" class="text-sm text-red-500 mt-1">{{ errors.zipCode }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Payment Method -->
            <div class="glass-card rounded-2xl p-6 border border-gray-200">
              <h2 class="font-display text-2xl font-semibold mb-6 text-textPrimary">Payment Method</h2>
              <div class="space-y-4">
                <div class="flex gap-4">
                  <button
                    v-for="method in paymentMethods"
                    :key="method.id"
                    @click="form.paymentMethod = method.id"
                    :class="[
                      'flex-1 p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer',
                      form.paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary'
                    ]"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <component :is="method.icon" class="w-6 h-6" />
                      <span class="font-semibold">{{ method.name }}</span>
                    </div>
                  </button>
                </div>
                
                <!-- Credit Card Form -->
                <div v-if="form.paymentMethod === 'card'" class="space-y-4 pt-4">
                  <div>
                    <label class="block text-sm font-medium mb-2 text-slate-700">Card Number *</label>
                    <input 
                      v-model="form.cardNumber"
                      type="text" 
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="1234 5678 9012 3456"
                      maxlength="19"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-2 text-slate-700">Expiry Date *</label>
                      <input 
                        v-model="form.cardExpiry"
                        type="text" 
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="MM/YY"
                        maxlength="5"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2 text-slate-700">CVV *</label>
                      <input 
                        v-model="form.cardCvv"
                        type="text" 
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="123"
                        maxlength="4"
                      />
                    </div>
                  </div>
                </div>
                
                <!-- PayPal Info -->
                <div v-if="form.paymentMethod === 'paypal'" class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p class="text-sm text-blue-800">You will be redirected to PayPal to complete your purchase.</p>
                </div>
              </div>
            </div>
            
            <!-- Order Notes -->
            <div class="glass-card rounded-2xl p-6 border border-gray-200">
              <h2 class="font-display text-2xl font-semibold mb-4 text-textPrimary">Order Notes (Optional)</h2>
              <textarea
                v-model="form.notes"
                rows="4"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none"
                placeholder="Any special instructions for your order?"
              ></textarea>
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="glass-card rounded-2xl p-4 md:p-6 border border-gray-200 lg:sticky lg:top-24">
              <h2 class="font-display text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-textPrimary">Order Summary</h2>
              
              <!-- Cart Items -->
              <div class="space-y-4 mb-6 max-h-64 overflow-y-auto">
                <div v-for="(item, index) in cartStore.items" :key="index" class="flex gap-3">
                  <div class="w-16 h-16 rounded-lg flex-shrink-0 relative" style="background: linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%);">
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover rounded-lg" />
                    <span class="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                      {{ item.quantity }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm text-textPrimary truncate">{{ item.name }}</p>
                    <p class="text-xs text-slate-600">{{ item.size }} �?{{ item.color }}</p>
                    <p class="text-sm font-bold text-primary">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-4 space-y-3 mb-6">
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
                <div class="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span class="text-primary">${{ cartStore.total.toFixed(2) }}</span>
                </div>
              </div>
              
              <button 
                @click="handleSubmit"
                :disabled="isSubmitting"
                :style="{
                  width: '100%',
                  padding: '16px 32px',
                  borderRadius: '9999px',
                  fontWeight: '600',
                  fontSize: '16px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  border: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  background: isSubmitting ? '#9CA3AF' : 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
                  marginBottom: '12px',
                  opacity: isSubmitting ? 0.7 : 1
                }"
              >
                <span v-if="!isSubmitting">Place Order</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              </button>
              
              <NuxtLink 
                to="/cart" 
                style="
                  display: block;
                  width: 100%;
                  text-align: center;
                  background: transparent;
                  color: #2C2C2C;
                  font-weight: 600;
                  padding: 16px 32px;
                  font-size: 16px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  border: 2px solid #2C2C2C;
                  border-radius: 9999px;
                  transition: all 0.3s ease;
                  cursor: pointer;
                  text-decoration: none;
                "
              >
                Back to Cart
              </NuxtLink>
              
              <!-- Security Badges -->
              <div class="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-4">
                <svg class="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <div class="text-xs text-slate-600">
                  <p class="font-semibold">Secure Checkout</p>
                  <p>SSL Encrypted</p>
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
const router = useRouter()

// Form data
const form = reactive({
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  paymentMethod: 'card',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  notes: ''
})

// Validation errors
const errors = reactive<Record<string, string>>({})

// Payment methods
const paymentMethods = [
  { 
    id: 'card', 
    name: 'Credit Card',
    icon: 'svg'
  },
  { 
    id: 'paypal', 
    name: 'PayPal',
    icon: 'svg'
  }
]

const isSubmitting = ref(false)

// Validation rules
const validateField = (field: string) => {
  errors[field] = ''
  
  switch (field) {
    case 'email':
      if (!form.email) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email'
      }
      break
    case 'phone':
      if (!form.phone) {
        errors.phone = 'Phone is required'
      }
      break
    case 'firstName':
      if (!form.firstName) {
        errors.firstName = 'First name is required'
      }
      break
    case 'lastName':
      if (!form.lastName) {
        errors.lastName = 'Last name is required'
      }
      break
    case 'address':
      if (!form.address) {
        errors.address = 'Address is required'
      }
      break
    case 'city':
      if (!form.city) {
        errors.city = 'City is required'
      }
      break
    case 'state':
      if (!form.state) {
        errors.state = 'State is required'
      }
      break
    case 'zipCode':
      if (!form.zipCode) {
        errors.zipCode = 'ZIP code is required'
      }
      break
    case 'country':
      if (!form.country) {
        errors.country = 'Country is required'
      }
      break
  }
}

const validateForm = () => {
  const requiredFields = ['email', 'phone', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country']
  
  requiredFields.forEach(field => validateField(field))
  
  return Object.keys(errors).every(key => !errors[key])
}

const handleSubmit = async () => {
  if (!validateForm()) {
    // 找到第一个错误字段并滚动到它
    const firstErrorField = Object.keys(errors).find(key => errors[key])
    if (firstErrorField) {
      // 滚动到错误字段
      scrollToError(firstErrorField)
      
      // 显示友好的错误提示
      const fieldNames: Record<string, string> = {
        email: 'Email',
        phone: 'Phone',
        firstName: 'First Name',
        lastName: 'Last Name',
        country: 'Country',
        address: 'Address',
        city: 'City',
        state: 'State',
        zipCode: 'ZIP Code'
      }
      
      alert(`Please fill in the required field: ${fieldNames[firstErrorField] || firstErrorField}`)
    }
    return
  }
  
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Create order data
  const orderData = {
    ...form,
    items: cartStore.items,
    subtotal: cartStore.subtotal,
    tax: cartStore.tax,
    total: cartStore.total,
    orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toISOString()
  }
  
  // Save order to localStorage (in real app, send to backend)
  localStorage.setItem('lastOrder', JSON.stringify(orderData))
  
  // Clear cart
  cartStore.clearCart()
  
  // Redirect to success page
  router.push('/order-success')
}

// 滚动到错误字段的函数
const scrollToError = (fieldName: string) => {
  // 字段名到ref的映射
  const fieldRefs: Record<string, any> = {
    email: 'emailInput',
    phone: 'phoneInput',
    firstName: 'firstNameInput',
    lastName: 'lastNameInput',
    country: 'countryInput',
    address: 'addressInput',
    city: 'cityInput',
    state: 'stateInput',
    zipCode: 'zipCodeInput'
  }
  
  const refName = fieldRefs[fieldName]
  if (refName) {
    // 使用nextTick确保DOM已更新
    nextTick(() => {
      const element = document.querySelector(`[ref="${refName}"]`) || 
                     document.querySelector(`input[type="text"]`) ||
                     document.querySelector('select')
      
      if (element) {
        // 滚动到元素，留出一些顶部空间
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        })
        
        // 聚焦到字段
        setTimeout(() => {
          (element as HTMLElement).focus()
        }, 500)
      }
    })
  }
}

onMounted(() => {
  cartStore.loadCart()
})
</script>
