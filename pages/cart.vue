<template>
  <div class="bg-white min-h-screen">
    <TheNavbar />
    
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Shopping Cart' }]" />
    
    <section class="pt-4 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-light text-primary mb-12 text-center uppercase tracking-wider">Shopping Cart</h1>
        
        <div v-if="cartStore.items.length === 0" class="text-center py-20">
          <svg class="w-20 h-20 text-border mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <h3 class="text-xl font-light mb-4 text-primary uppercase tracking-wide">Your cart is empty</h3>
          <p class="text-sm text-textMuted mb-8">Add some items to get started</p>
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
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-6">
            <div v-for="(item, index) in cartStore.items" :key="index" class="border border-border p-6 hover:shadow-md transition-shadow">
              <div class="flex gap-6">
                <NuxtLink :to="`/product-detail?id=${item.id}`" class="w-32 h-32 bg-backgroundLight flex-shrink-0 overflow-hidden">
                  <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover hover:scale-105 transition-transform" />
                </NuxtLink>
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-2">
                    <NuxtLink :to="`/product-detail?id=${item.id}`" class="hover:text-accent transition-colors">
                      <h3 class="text-base font-semibold text-primary uppercase tracking-wide">{{ item.name }}</h3>
                    </NuxtLink>
                    <button @click="cartStore.removeItem(index)" class="text-textMuted hover:text-red-600 transition-colors" title="Remove">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  
                  <!-- Size & Color Selectors -->
                  <div class="flex gap-4 mb-3">
                    <div>
                      <label class="text-xs text-textMuted uppercase">Size:</label>
                      <select 
                        v-model="item.size"
                        @change="updateItemSize(index, $event)"
                        class="ml-2 px-2 py-1 border border-border text-xs focus:border-primary focus:outline-none cursor-pointer"
                      >
                        <option v-for="size in availableSizes" :key="size" :value="size">{{ size }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="text-xs text-textMuted uppercase">Color:</label>
                      <select 
                        v-model="item.color"
                        @change="updateItemColor(index, $event)"
                        class="ml-2 px-2 py-1 border border-border text-xs focus:border-primary focus:outline-none cursor-pointer"
                      >
                        <option v-for="color in availableColors" :key="color" :value="color">{{ color }}</option>
                      </select>
                    </div>
                  </div>
                  
                  <!-- Stock Status -->
                  <div v-if="getItemStock(item) <= 5 && getItemStock(item) > 0" class="flex items-center gap-2 mb-3 px-3 py-2 bg-warning-50 border border-warning-200 rounded">
                    <svg class="w-4 h-4 text-warning-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-xs text-warning-700 font-medium">Only {{ getItemStock(item) }} left in stock</span>
                  </div>
                  <div v-else-if="getItemStock(item) === 0" class="flex items-center gap-2 mb-3 px-3 py-2 bg-error-50 border border-error-200 rounded">
                    <svg class="w-4 h-4 text-error-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-xs text-error-700 font-medium">Out of stock</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <!-- Quantity -->
                    <div class="flex items-center space-x-4">
                      <button 
                        @click="cartStore.updateQuantity(index, -1)" 
                        :disabled="item.quantity <= 1"
                        :class="[
                          'w-8 h-8 border transition-colors duration-200 text-sm',
                          item.quantity <= 1 
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                            : 'border-border hover:bg-backgroundLight cursor-pointer'
                        ]"
                      >
                        -
                      </button>
                      <span class="font-semibold text-sm w-8 text-center">{{ item.quantity }}</span>
                      <button 
                        @click="cartStore.updateQuantity(index, 1)" 
                        :disabled="item.quantity >= getItemStock(item)"
                        :class="[
                          'w-8 h-8 border transition-colors duration-200 text-sm',
                          item.quantity >= getItemStock(item)
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                            : 'border-border hover:bg-backgroundLight cursor-pointer'
                        ]"
                      >
                        +
                      </button>
                    </div>
                    
                    <!-- Price -->
                    <div class="text-right">
                      <p class="text-lg font-semibold text-primary">${{ (item.price * item.quantity).toFixed(2) }}</p>
                      <p v-if="item.originalPrice" class="text-xs text-textMuted line-through">${{ (item.originalPrice * item.quantity).toFixed(2) }}</p>
                    </div>
                  </div>
                  
                  <!-- Actions -->
                  <div class="flex gap-4 mt-4 pt-4 border-t border-border">
                    <button 
                      @click="moveToWishlist(index)"
                      class="text-xs text-textMuted hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                      Move to Wishlist
                    </button>
                    <button 
                      @click="saveForLater(index)"
                      class="text-xs text-textMuted hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                      </svg>
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Saved for Later Section -->
            <div v-if="savedItems.length > 0" class="mt-12">
              <h2 class="text-xl font-light text-primary mb-6 uppercase tracking-wider">Saved for Later</h2>
              <div class="space-y-4">
                <div v-for="(item, index) in savedItems" :key="index" class="border border-border p-4 bg-gray-50">
                  <div class="flex gap-4">
                    <div class="w-20 h-20 bg-white flex-shrink-0 overflow-hidden">
                      <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1">
                      <h4 class="text-sm font-semibold text-primary mb-1">{{ item.name }}</h4>
                      <p class="text-xs text-textMuted mb-2">Size: {{ item.size }} | Color: {{ item.color }}</p>
                      <div class="flex gap-3">
                        <button 
                          @click="moveBackToCart(index)"
                          class="text-xs text-primary hover:underline"
                        >
                          Move to Cart
                        </button>
                        <button 
                          @click="removeSavedItem(index)"
                          class="text-xs text-textMuted hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p class="text-sm font-semibold text-primary">${{ item.price.toFixed(2) }}</p>
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
                    class="flex-1 px-4 py-3 border-2 border-gray-300 transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(201,168,130,0.1)] focus:outline-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                <!-- Coupon Feedback -->
                <div v-if="couponError" class="flex items-center gap-2 mt-3 p-3 bg-error-50 border border-error-200 rounded">
                  <svg class="w-4 h-4 text-error-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-xs text-error-700 font-medium">{{ couponError }}</span>
                </div>
                
                <div v-if="appliedCoupon" class="flex items-center gap-2 mt-3 p-3 bg-success-50 border border-success-200 rounded">
                  <svg class="w-4 h-4 text-success-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-xs text-success-700 font-medium">{{ appliedCoupon.code }} applied - {{ appliedCoupon.discount }}% off</span>
                </div>
                
                <!-- Available Coupons -->
                <div v-if="!appliedCoupon" class="mt-4">
                  <button 
                    @click="showAvailableCoupons = !showAvailableCoupons"
                    class="text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                    {{ showAvailableCoupons ? 'Hide' : 'View' }} available coupons
                  </button>
                  
                  <div v-if="showAvailableCoupons" class="mt-3 space-y-2">
                    <div 
                      v-for="coupon in availableCoupons" 
                      :key="coupon.code"
                      class="p-3 bg-backgroundLight border border-border rounded hover:border-accent transition-colors cursor-pointer"
                      @click="selectCoupon(coupon)"
                    >
                      <div class="flex justify-between items-start mb-1">
                        <span class="text-xs font-bold text-primary">{{ coupon.code }}</span>
                        <span class="text-xs text-accent font-semibold">{{ coupon.discount }}% OFF</span>
                      </div>
                      <p class="text-xs text-textMuted">{{ coupon.description }}</p>
                      <p v-if="coupon.minPurchase > 0" class="text-xs text-textSecondary mt-1">
                        Min. purchase: ${{ coupon.minPurchase }}
                      </p>
                    </div>
                  </div>
                </div>
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
              <div v-if="cartStore.subtotal < 100" class="mb-8 p-4 bg-info-50 border border-info-200 rounded">
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-4 h-4 text-info-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p class="text-xs text-info-700 font-medium">
                    Add <span class="font-bold">${{ (100 - cartStore.subtotal).toFixed(2) }}</span> more for free shipping
                  </p>
                </div>
                <div class="w-full h-2 bg-info-100 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-info-500 transition-all duration-300 rounded-full"
                    :style="{ width: `${(cartStore.subtotal / 100) * 100}%` }"
                  ></div>
                </div>
              </div>
              
              <!-- Rewards & Delivery Info -->
              <div class="mb-8 space-y-3 p-4 bg-accent-50 border border-accent-200 rounded">
                <div class="flex items-center gap-2 text-xs">
                  <svg class="w-4 h-4 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-accent-700 font-medium">
                    Earn <span class="font-bold text-accent-800">{{ earnedPoints }} points</span> with this order
                  </span>
                </div>
                <div class="flex items-center gap-2 text-xs">
                  <svg class="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                  </svg>
                  <span class="text-accent-700 font-medium">
                    Estimated delivery: <span class="font-bold text-accent-800">{{ estimatedDelivery }}</span>
                  </span>
                </div>
              </div>
              
              <BaseButton 
                tag="NuxtLink"
                to="/checkout" 
                variant="primary"
                size="md"
                block
                style="margin-bottom: 12px;"
              >
                Proceed to Checkout
              </BaseButton>
              
              <BaseButton 
                tag="NuxtLink"
                to="/products" 
                variant="secondary"
                size="md"
                block
              >
                Continue Shopping
              </BaseButton>
              
              <!-- Trust Badges -->
              <div class="mt-8 pt-8 border-t border-border space-y-3">
                <div class="flex items-center gap-3 text-xs text-success-700 uppercase tracking-wide font-medium">
                  <svg class="w-4 h-4 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-info-700 uppercase tracking-wide font-medium">
                  <svg class="w-4 h-4 text-info-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>30-day returns</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-accent-700 uppercase tracking-wide font-medium">
                  <svg class="w-4 h-4 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Free shipping over $100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Recommended Products -->
        <div v-if="cartStore.items.length > 0" class="mt-20">
          <h2 class="text-2xl font-light text-primary mb-8 text-center uppercase tracking-wider">Don't Forget These</h2>
          <p class="text-sm text-textMuted text-center mb-12">Complete your look with these complementary items</p>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ProductCard 
              v-for="product in recommendedProducts" 
              :key="product.id" 
              :product="product"
            />
          </div>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useProducts } from '~/composables/useProducts'

const cartStore = useCartStore()
const { products } = useProducts()

// Saved for later items
const savedItems = ref<any[]>([])

// Available sizes and colors
const availableSizes = ['XS', 'S', 'M', 'L', 'XL']
const availableColors = ['Black', 'White', 'Nude', 'Red']

// Coupon functionality
const couponCode = ref('')
const appliedCoupon = ref<{ code: string; discount: number; description: string } | null>(null)
const couponError = ref('')
const showAvailableCoupons = ref(false)

// Available coupons (in real app, this would come from backend)
const availableCoupons = [
  { code: 'SAVE10', discount: 10, description: '10% off your order', minPurchase: 0 },
  { code: 'SAVE20', discount: 20, description: '20% off orders over $100', minPurchase: 100 },
  { code: 'WELCOME15', discount: 15, description: '15% off for new customers', minPurchase: 0 }
]

// Recommended products
const recommendedProducts = computed(() => products.slice(0, 4))

// Stock simulation (in real app, this would come from backend)
const getItemStock = (item: any) => {
  // Simulate stock based on item id
  const stockMap: Record<number, number> = {
    1: 10,
    2: 3,
    3: 0,
    4: 15,
    5: 2
  }
  return stockMap[item.id] || 10
}

const updateItemSize = (index: number, event: Event) => {
  const target = event.target as HTMLSelectElement
  cartStore.items[index].size = target.value
  cartStore.saveCart()
}

const updateItemColor = (index: number, event: Event) => {
  const target = event.target as HTMLSelectElement
  cartStore.items[index].color = target.value
  cartStore.saveCart()
}

const moveToWishlist = (index: number) => {
  const item = cartStore.items[index]
  // TODO: Add to wishlist store
  console.log('Move to wishlist:', item.name)
  cartStore.removeItem(index)
  alert(`${item.name} moved to wishlist!`)
}

const saveForLater = (index: number) => {
  const item = cartStore.items[index]
  savedItems.value.push({ ...item })
  cartStore.removeItem(index)
}

const moveBackToCart = (index: number) => {
  const item = savedItems.value[index]
  cartStore.addToCart(item)
  savedItems.value.splice(index, 1)
}

const removeSavedItem = (index: number) => {
  savedItems.value.splice(index, 1)
}

const applyCoupon = () => {
  const coupon = availableCoupons.find(c => c.code.toUpperCase() === couponCode.value.toUpperCase())
  
  if (!coupon) {
    couponError.value = 'Invalid coupon code'
    return
  }
  
  if (coupon.minPurchase > 0 && cartStore.subtotal < coupon.minPurchase) {
    couponError.value = `Minimum purchase of $${coupon.minPurchase} required`
    return
  }
  
  appliedCoupon.value = {
    code: coupon.code,
    discount: coupon.discount,
    description: coupon.description
  }
  couponError.value = ''
  showAvailableCoupons.value = false
}

const removeCoupon = () => {
  appliedCoupon.value = null
  couponCode.value = ''
  couponError.value = ''
}

const selectCoupon = (coupon: typeof availableCoupons[0]) => {
  if (coupon.minPurchase > 0 && cartStore.subtotal < coupon.minPurchase) {
    couponError.value = `Minimum purchase of $${coupon.minPurchase} required`
    return
  }
  couponCode.value = coupon.code
  applyCoupon()
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

// Rewards points (1 point per dollar)
const earnedPoints = computed(() => {
  return Math.floor(finalTotal.value)
})

// Estimated delivery
const estimatedDelivery = computed(() => {
  const today = new Date()
  const deliveryDate = new Date(today)
  deliveryDate.setDate(today.getDate() + (shippingCost.value === 0 ? 3 : 5))
  return deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})

onMounted(() => {
  cartStore.loadCart()
  // Load saved items from localStorage
  const saved = localStorage.getItem('savedForLater')
  if (saved) {
    savedItems.value = JSON.parse(saved)
  }
})

// Watch saved items and persist to localStorage
watch(savedItems, (newValue) => {
  localStorage.setItem('savedForLater', JSON.stringify(newValue))
}, { deep: true })
</script>
