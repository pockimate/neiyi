<template>
  <div class="bg-white min-h-screen">
    <TheNavbar />
    
    <section v-if="product" class="pt-24 pb-20">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Breadcrumb -->
        <nav class="mb-8 flex items-center gap-2 text-sm text-textMuted">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/products" class="hover:text-primary transition-colors">Products</NuxtLink>
          <span>/</span>
          <span class="text-primary">{{ product.name }}</span>
        </nav>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Left: Product Images -->
          <div>
            <!-- Main Image - 正方形 -->
            <div class="mb-4 aspect-square bg-backgroundLight border border-border overflow-hidden group relative">
              <img 
                :src="currentImage" 
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <!-- 放大镜图标 -->
              <div class="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
              </div>
            </div>
            
            <!-- Thumbnail Gallery - 正方形缩略图 -->
            <div class="grid grid-cols-4 gap-3">
              <button
                v-for="(image, index) in productImages"
                :key="index"
                @click="currentImage = image"
                :class="[
                  'aspect-square border-2 transition-all duration-300 overflow-hidden cursor-pointer group relative',
                  currentImage === image 
                    ? 'border-accent shadow-md' 
                    : 'border-border hover:border-accent hover:shadow-sm'
                ]"
              >
                <img 
                  :src="image" 
                  :alt="`${product.name} view ${index + 1}`"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <!-- 选中指示器 -->
                <div 
                  v-if="currentImage === image"
                  class="absolute inset-0 bg-accent/10 pointer-events-none"
                ></div>
              </button>
            </div>
          </div>
          
          <!-- Right: Product Info -->
          <div>
            <!-- Badge -->
            <div 
              v-if="product.badge" 
              :class="getBadgeClass(product.badge)"
              class="inline-block mb-4"
            >
              {{ product.badge }}
            </div>
            
            <!-- Product Name -->
            <h1 class="text-3xl font-normal text-primary mb-4 leading-tight">
              {{ product.name }}
            </h1>
            
            <!-- Description -->
            <p class="text-sm text-textSecondary mb-6 leading-relaxed">
              {{ product.description }}
            </p>
            
            <!-- Rating -->
            <div class="flex items-center gap-3 mb-6 pb-6 border-b border-border">
              <div class="flex text-accent">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span class="text-sm text-textMuted">4.8 (128 reviews)</span>
            </div>
            
            <!-- Price -->
            <div class="mb-8">
              <div class="flex items-baseline gap-3">
                <span class="text-3xl font-semibold text-primary">${{ product.price.toFixed(2) }}</span>
                <span v-if="product.originalPrice" class="text-lg text-textMuted line-through">${{ product.originalPrice.toFixed(2) }}</span>
              </div>
              <p class="text-sm text-success mt-2">✓ In Stock - Ships within 24 hours</p>
            </div>
            
            <!-- Size Selection -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <label class="text-sm font-semibold text-primary uppercase tracking-wider">Size</label>
                <NuxtLink to="/size-guide" class="text-xs text-textMuted hover:text-primary transition-colors underline">
                  Size Guide
                </NuxtLink>
              </div>
              <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="size in sizes"
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'py-3 text-sm font-semibold border transition-all duration-200 cursor-pointer',
                    selectedSize === size 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-primary border-border hover:border-primary'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>
            
            <!-- Color Selection -->
            <div class="mb-8">
              <label class="block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Color: {{ selectedColor }}
              </label>
              <div class="flex gap-3">
                <button
                  v-for="color in colors"
                  :key="color.name"
                  @click="selectedColor = color.name"
                  :class="[
                    'w-10 h-10 rounded-full border-2 transition-all duration-200 cursor-pointer',
                    selectedColor === color.name ? 'border-primary scale-110' : 'border-border hover:border-primary'
                  ]"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                ></button>
              </div>
            </div>
            
            <!-- Quantity -->
            <div class="mb-8">
              <label class="block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Quantity</label>
              <div class="flex items-center gap-3">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-12 h-12 border border-border hover:border-primary transition-colors cursor-pointer flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <input 
                  v-model.number="quantity" 
                  type="number" 
                  min="1"
                  class="w-20 h-12 text-center border border-border focus:border-primary focus:outline-none"
                />
                <button 
                  @click="quantity++"
                  class="w-12 h-12 border border-border hover:border-primary transition-colors cursor-pointer flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="space-y-3 mb-8">
              <button 
                @click="handleAddToCart"
                class="w-full btn-primary h-14 text-sm"
              >
                Add to Cart
              </button>
              <button 
                @click="handleBuyNow"
                class="w-full btn-accent h-14 text-sm"
              >
                Buy Now
              </button>
              <button 
                @click="toggleWishlist"
                class="w-full btn-secondary h-14 text-sm flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                {{ isInWishlist ? 'In Wishlist' : 'Add to Wishlist' }}
              </button>
            </div>
            
            <!-- Product Features -->
            <div class="border-t border-border pt-6 space-y-3">
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-textSecondary">Premium Quality Materials</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-textSecondary">Free Shipping on Orders Over $50</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-textSecondary">30-Day Easy Returns</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-textSecondary">Discreet Packaging</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Product Details Tabs -->
        <div class="mt-20 border-t border-border">
          <div class="flex gap-8 border-b border-border">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              :class="[
                'py-4 text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer',
                activeTab === tab 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-textMuted hover:text-primary'
              ]"
            >
              {{ tab }}
            </button>
          </div>
          
          <div class="py-8">
            <!-- Description Tab -->
            <div v-if="activeTab === 'Description'" class="prose max-w-none">
              <p class="text-textSecondary leading-relaxed">
                {{ product.description }}
              </p>
              <p class="text-textSecondary leading-relaxed mt-4">
                Experience luxury and comfort with our premium lingerie collection. Each piece is carefully crafted with the finest materials to ensure both style and comfort.
              </p>
            </div>
            
            <!-- Details Tab -->
            <div v-if="activeTab === 'Details'" class="space-y-3">
              <div class="flex py-3 border-b border-border">
                <span class="w-1/3 text-sm font-semibold text-primary">Material</span>
                <span class="w-2/3 text-sm text-textSecondary">90% Polyamide, 10% Elastane</span>
              </div>
              <div class="flex py-3 border-b border-border">
                <span class="w-1/3 text-sm font-semibold text-primary">Care</span>
                <span class="w-2/3 text-sm text-textSecondary">Hand wash cold, lay flat to dry</span>
              </div>
              <div class="flex py-3 border-b border-border">
                <span class="w-1/3 text-sm font-semibold text-primary">Origin</span>
                <span class="w-2/3 text-sm text-textSecondary">Made in Europe</span>
              </div>
            </div>
            
            <!-- Shipping Tab -->
            <div v-if="activeTab === 'Shipping'" class="space-y-4">
              <p class="text-textSecondary text-sm leading-relaxed">
                Free standard shipping on orders over $50. Express shipping available at checkout.
              </p>
              <p class="text-textSecondary text-sm leading-relaxed">
                Orders are processed within 1-2 business days and typically arrive within 3-5 business days.
              </p>
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
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const cartStore = useCartStore()
const { products } = useProducts()

const productId = computed(() => parseInt(route.query.id as string))
const product = computed(() => products.find(p => p.id === productId.value))

// Product images (using same image for demo, replace with actual images)
const productImages = computed(() => [
  product.value?.image,
  product.value?.image,
  product.value?.image,
  product.value?.image
])

const currentImage = ref(product.value?.image)
const selectedSize = ref('M')
const selectedColor = ref('Black')
const quantity = ref(1)
const isInWishlist = ref(false)
const activeTab = ref('Description')

const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Pink', hex: '#F472B6' },
  { name: 'Red', hex: '#EF4444' }
]
const tabs = ['Description', 'Details', 'Shipping']

const handleAddToCart = () => {
  if (!product.value) return
  
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
    image: product.value.image
  })
  
  const isCartOpen = useState('cartSidebarOpen')
  isCartOpen.value = true
}

const handleBuyNow = () => {
  handleAddToCart()
  navigateTo('/checkout')
}

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value
}

// 根据badge类型返回对应的class
const getBadgeClass = (badge: string) => {
  const badgeLower = badge.toLowerCase()
  if (badgeLower.includes('new')) return 'tag-new'
  if (badgeLower.includes('bestseller') || badgeLower.includes('best')) return 'tag-bestseller'
  if (badgeLower.includes('sale') || badgeLower.includes('off')) return 'tag-sale'
  return 'tag-new' // 默认
}

// Initialize current image
watch(() => product.value, (newProduct) => {
  if (newProduct) {
    currentImage.value = newProduct.image
  }
}, { immediate: true })
</script>
}, { immediate: true })
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
