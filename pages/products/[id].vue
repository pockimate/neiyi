<template>
  <div>
    <TheNavbar />
    
    <section v-if="product" class="pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Product Image -->
          <div :class="`glass-card rounded-3xl overflow-hidden border border-pink-200 bg-gradient-to-br ${product.gradient} aspect-square flex items-center justify-center`">
            <div class="text-center p-12">
              <svg class="w-48 h-48 text-primary/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              <p class="text-slate-400">Product Image</p>
            </div>
          </div>
          
          <!-- Product Info -->
          <div>
            <div v-if="product.badge" :class="`inline-block ${badgeColor} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`">
              {{ product.badge }}
            </div>
            
            <h1 class="font-display text-4xl md:text-5xl font-bold text-primary mb-4">{{ product.name }}</h1>
            <p class="text-lg text-slate-600 mb-6 leading-relaxed">{{ product.description }}</p>
            
            <div class="mb-8">
              <div v-if="product.originalPrice" class="flex items-baseline gap-3">
                <span class="font-display text-5xl font-bold text-primary">${{ product.price.toFixed(2) }}</span>
                <span class="text-2xl text-slate-400 line-through">${{ product.originalPrice.toFixed(2) }}</span>
                <span class="bg-cta text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save {{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
                </span>
              </div>
              <span v-else class="font-display text-5xl font-bold text-primary">${{ product.price.toFixed(2) }}</span>
            </div>
            
            <!-- Size Selection -->
            <div class="mb-6">
              <label class="block font-semibold mb-3 text-textPrimary">Size</label>
              <div class="flex gap-3">
                <button 
                  v-for="size in sizes" 
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-200 cursor-pointer min-h-touch',
                    selectedSize === size 
                      ? 'border-primary bg-primary text-white' 
                      : 'border-pink-200 hover:border-primary'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>
            
            <!-- Color Selection -->
            <div class="mb-8">
              <label class="block font-semibold mb-3 text-textPrimary">Color</label>
              <div class="flex gap-3">
                <button 
                  v-for="color in colors" 
                  :key="color.name"
                  @click="selectedColor = color.name"
                  :class="[
                    'w-12 h-12 rounded-full border-4 transition-all duration-200 cursor-pointer',
                    selectedColor === color.name 
                      ? 'border-primary scale-110' 
                      : 'border-transparent hover:border-pink-200'
                  ]"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                />
              </div>
            </div>
            
            <!-- Quantity -->
            <div class="mb-8">
              <label class="block font-semibold mb-3 text-textPrimary">Quantity</label>
              <div class="flex items-center gap-4">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-12 h-12 border-2 border-pink-300 rounded-lg hover:bg-pink-50 transition-colors duration-200 cursor-pointer text-xl font-semibold"
                >
                  -
                </button>
                <span class="text-2xl font-semibold w-12 text-center">{{ quantity }}</span>
                <button 
                  @click="quantity++"
                  class="w-12 h-12 border-2 border-pink-300 rounded-lg hover:bg-pink-50 transition-colors duration-200 cursor-pointer text-xl font-semibold"
                >
                  +
                </button>
              </div>
            </div>
            
            <!-- Add to Cart Button -->
            <button 
              @click="handleAddToCart"
              class="w-full bg-cta hover:bg-yellow-600 text-white py-5 rounded-full text-lg font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl mb-4 min-h-touch"
            >
              Add to Cart - ${{ (product.price * quantity).toFixed(2) }}
            </button>
            
            <NuxtLink 
              to="/products"
              class="block w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-5 rounded-full text-lg font-semibold text-center transition-all duration-200 cursor-pointer"
            >
              Continue Shopping
            </NuxtLink>
            
            <!-- Product Details -->
            <div class="mt-8 glass-card rounded-2xl p-6 border border-pink-200">
              <h3 class="font-display text-xl font-semibold mb-4 text-textPrimary">Product Details</h3>
              <ul class="space-y-2 text-slate-600">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Premium quality materials
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Hand wash recommended
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Free shipping on orders over $100
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  30-day return policy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section v-else class="pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-display text-4xl font-bold text-primary mb-4">Product Not Found</h1>
        <NuxtLink to="/products" class="inline-block bg-cta hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 cursor-pointer">
          Back to Products
        </NuxtLink>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const { getProductById } = useProducts()

const productId = computed(() => parseInt(route.params.id as string))
const product = computed(() => getProductById(productId.value))

const selectedSize = ref('M')
const selectedColor = ref('Black')
const quantity = ref(1)

const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = [
  { name: 'Black', hex: '#1F2937' },
  { name: 'White', hex: '#F9FAFB' },
  { name: 'Pink', hex: '#F9A8D4' },
  { name: 'Red', hex: '#DC2626' }
]

const badgeColor = computed(() => {
  if (product.value?.badge === 'Sale') return 'bg-cta'
  if (product.value?.badge === 'Bestseller') return 'bg-primary'
  return 'bg-cta'
})

const handleAddToCart = () => {
  if (!product.value) return
  
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value
  })
  
  alert(`Added ${quantity.value} item(s) to cart!`)
  quantity.value = 1
}

onMounted(() => {
  cartStore.loadCart()
})
</script>
