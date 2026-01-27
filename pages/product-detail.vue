<template>
  <div class="bg-white min-h-screen">
    <TheNavbar />
    
    <section v-if="product" class="pt-24 pb-20">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Breadcrumb -->
        <Breadcrumb :items="[
          { label: 'Products', to: '/products' },
          { label: product.name }
        ]" />
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Left: Product Images -->
          <div>
            <!-- Main Image - 正方形 with Zoom -->
            <div 
              class="mb-4 aspect-square bg-backgroundLight border border-border overflow-hidden group relative cursor-zoom-in"
              @mouseenter="showZoom = true"
              @mouseleave="showZoom = false"
              @mousemove="handleMouseMove"
              @click="openLightbox"
            >
              <img 
                ref="mainImageRef"
                :src="currentImage" 
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-500"
                :class="{ 'scale-150': showZoom }"
                :style="zoomStyle"
              />
              
              <!-- 全屏查看图标 -->
              <div class="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                </svg>
              </div>
              
              <!-- Zoom 提示 -->
              <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Hover to zoom • Click for fullscreen
              </div>
            </div>
            
            <!-- Thumbnail Gallery - 正方形缩略图 -->
            <div class="grid grid-cols-4 gap-3">
              <button
                v-for="(image, index) in productImages"
                :key="index"
                @click="selectImage(index)"
                :class="[
                  'aspect-square border-2 transition-all duration-300 overflow-hidden cursor-pointer group relative',
                  currentImageIndex === index 
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
                  v-if="currentImageIndex === index"
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
                <label class="text-sm font-semibold text-primary uppercase tracking-wider">
                  Size: {{ selectedSize }}
                </label>
                <NuxtLink to="/size-guide" class="text-xs text-textMuted hover:text-primary transition-colors underline">
                  Size Guide
                </NuxtLink>
              </div>
              <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="size in sizesWithStock"
                  :key="size.name"
                  @click="selectSize(size.name)"
                  :disabled="size.stock === 0"
                  :class="[
                    'size-selector py-3 text-sm font-semibold border transition-all duration-200 relative',
                    selectedSize === size.name 
                      ? 'bg-primary text-white border-primary' 
                      : size.stock === 0
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-primary border-border hover:border-primary cursor-pointer'
                  ]"
                  :title="size.stock === 0 ? 'Out of stock' : `${size.stock} in stock`"
                >
                  {{ size.name }}
                  <!-- 售罄标记 -->
                  <span 
                    v-if="size.stock === 0"
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <span class="w-full h-px bg-gray-400 rotate-[-20deg]"></span>
                  </span>
                  <!-- 低库存提示 -->
                  <span 
                    v-if="size.stock > 0 && size.stock <= 3 && selectedSize === size.name"
                    class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                  ></span>
                </button>
              </div>
              <!-- 库存提示 -->
              <p 
                v-if="selectedSizeStock && selectedSizeStock <= 5"
                class="text-xs mt-2"
                :class="selectedSizeStock <= 3 ? 'text-red-600' : 'text-orange-600'"
              >
                {{ selectedSizeStock <= 3 ? '⚠️' : '⏰' }} Only {{ selectedSizeStock }} left in stock!
              </p>
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
                  @click="selectColor(color)"
                  :class="[
                    'color-selector w-12 h-12 rounded-full border-2 transition-all duration-200 cursor-pointer relative group',
                    selectedColor === color.name 
                      ? 'border-primary scale-110 shadow-lg' 
                      : 'border-gray-300 hover:border-primary hover:scale-105'
                  ]"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                >
                  <!-- 选中标记 -->
                  <span 
                    v-if="selectedColor === color.name"
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <svg class="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                  
                  <!-- Hover 提示 -->
                  <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {{ color.name }}
                  </span>
                </button>
              </div>
            </div>
            
            <!-- Quantity -->
            <div class="mb-8">
              <div class="flex items-center justify-between mb-3">
                <label class="text-sm font-semibold text-primary uppercase tracking-wider">Quantity</label>
                <span class="text-xs text-textMuted">Max: {{ maxQuantity }}</span>
              </div>
              <div class="flex items-center gap-3">
                <button 
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  :class="[
                    'quantity-btn w-12 h-12 border transition-colors flex items-center justify-center',
                    quantity <= 1 
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                      : 'border-border hover:border-primary cursor-pointer'
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <input 
                  v-model.number="quantity" 
                  type="number" 
                  min="1"
                  :max="maxQuantity"
                  @input="validateQuantity"
                  class="w-20 h-12 text-center border border-border focus:border-primary focus:outline-none"
                />
                <button 
                  @click="increaseQuantity"
                  :disabled="quantity >= maxQuantity"
                  :class="[
                    'quantity-btn w-12 h-12 border transition-colors flex items-center justify-center',
                    quantity >= maxQuantity 
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                      : 'border-border hover:border-primary cursor-pointer'
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
              
              <!-- 批量购买优惠提示 -->
              <div class="mt-3 space-y-2">
                <div 
                  v-if="quantity >= 3 && quantity < 5"
                  class="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded flex items-center gap-2"
                >
                  <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  <span>Buy 5+ items and get 10% off!</span>
                </div>
                <div 
                  v-if="quantity >= 5"
                  class="text-xs bg-green-50 text-green-700 px-3 py-2 rounded flex items-center gap-2"
                >
                  <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>🎉 10% bulk discount applied!</span>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="space-y-3 mb-8">
              <BaseButton 
                @click="handleAddToCart"
                variant="primary"
                size="md"
                block
              >
                Add to Cart
              </BaseButton>
              <BaseButton 
                @click="handleBuyNow"
                variant="accent"
                size="md"
                block
              >
                Buy Now
              </BaseButton>
              <BaseButton 
                @click="toggleWishlist"
                variant="secondary"
                size="md"
                block
                :class="{ 'active': isWishlistAnimating }"
              >
                <svg class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                {{ isInWishlist ? 'In Wishlist' : 'Add to Wishlist' }}
              </BaseButton>
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
    
    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div 
        v-if="isLightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        @click="closeLightbox"
      >
        <!-- Close Button -->
        <button
          @click="closeLightbox"
          class="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <!-- Image Counter -->
        <div class="absolute top-6 left-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {{ currentImageIndex + 1 }} / {{ productImages.length }}
        </div>
        
        <!-- Main Image -->
        <div class="relative max-w-5xl max-h-[80vh] mx-auto" @click.stop>
          <img 
            :src="currentImage" 
            :alt="product?.name"
            class="max-w-full max-h-[80vh] object-contain"
          />
        </div>
        
        <!-- Navigation Arrows -->
        <button
          v-if="currentImageIndex > 0"
          @click.stop="previousImage"
          class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <button
          v-if="currentImageIndex < productImages.length - 1"
          @click.stop="nextImage"
          class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        
        <!-- Thumbnail Strip -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-3 rounded-lg">
          <button
            v-for="(image, index) in productImages"
            :key="index"
            @click.stop="selectImage(index)"
            :class="[
              'w-16 h-16 border-2 transition-all overflow-hidden',
              currentImageIndex === index ? 'border-white' : 'border-white/30 hover:border-white/60'
            ]"
          >
            <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </Teleport>
    
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
const productImages = computed(() => {
  const colorData = selectedColorData.value
  if (colorData && colorData.images) {
    return colorData.images
  }
  // 默认图片
  return [
    product.value?.image,
    product.value?.image,
    product.value?.image,
    product.value?.image
  ]
})

const currentImageIndex = ref(0)
const currentImage = computed(() => productImages.value[currentImageIndex.value])
const selectedSize = ref('M')
const selectedColor = ref('Black')
const quantity = ref(1)
const isInWishlist = ref(false)
const isWishlistAnimating = ref(false)
const activeTab = ref('Description')

// Image zoom functionality
const showZoom = ref(false)
const zoomStyle = ref({})
const mainImageRef = ref<HTMLImageElement | null>(null)

// Lightbox functionality
const isLightboxOpen = ref(false)

// Size stock data (模拟数据，实际应从后端获取)
const sizesWithStock = ref([
  { name: 'XS', stock: 5 },
  { name: 'S', stock: 8 },
  { name: 'M', stock: 12 },
  { name: 'L', stock: 3 },
  { name: 'XL', stock: 0 }
])

// Color data with images
const colors = [
  { 
    name: 'Black', 
    hex: '#000000',
    images: [
      product.value?.image,
      product.value?.image,
      product.value?.image,
      product.value?.image
    ]
  },
  { 
    name: 'White', 
    hex: '#FFFFFF',
    images: [
      product.value?.image,
      product.value?.image,
      product.value?.image,
      product.value?.image
    ]
  },
  { 
    name: 'Nude', 
    hex: '#E8C4A0',
    images: [
      product.value?.image,
      product.value?.image,
      product.value?.image,
      product.value?.image
    ]
  },
  { 
    name: 'Red', 
    hex: '#DC2626',
    images: [
      product.value?.image,
      product.value?.image,
      product.value?.image,
      product.value?.image
    ]
  }
]

const tabs = ['Description', 'Details', 'Shipping']

// Computed properties
const selectedSizeStock = computed(() => {
  const size = sizesWithStock.value.find(s => s.name === selectedSize.value)
  return size?.stock || 0
})

const maxQuantity = computed(() => {
  return Math.min(selectedSizeStock.value, 10) // 最多购买10件
})

const selectedColorData = computed(() => {
  return colors.find(c => c.name === selectedColor.value)
})

const handleMouseMove = (event: MouseEvent) => {
  if (!showZoom.value) return
  
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  
  zoomStyle.value = {
    transformOrigin: `${x}% ${y}%`
  }
}

const selectImage = (index: number) => {
  currentImageIndex.value = index
}

const selectSize = (size: string) => {
  const sizeData = sizesWithStock.value.find(s => s.name === size)
  if (sizeData && sizeData.stock > 0) {
    selectedSize.value = size
    // 如果当前数量超过新尺码的库存，调整数量
    if (quantity.value > sizeData.stock) {
      quantity.value = sizeData.stock
    }
  }
}

const selectColor = (color: typeof colors[0]) => {
  selectedColor.value = color.name
  // 切换颜色时更新图片
  if (color.images && color.images.length > 0) {
    currentImageIndex.value = 0 // 重置到第一张图片
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  if (quantity.value < maxQuantity.value) {
    quantity.value++
  }
}

const validateQuantity = () => {
  if (quantity.value < 1) {
    quantity.value = 1
  } else if (quantity.value > maxQuantity.value) {
    quantity.value = maxQuantity.value
  }
}

const openLightbox = () => {
  isLightboxOpen.value = true
  // Prevent body scroll
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  // Restore body scroll
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentImageIndex.value < productImages.value.length - 1) {
    currentImageIndex.value++
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

// Keyboard navigation for lightbox
const handleKeydown = (event: KeyboardEvent) => {
  if (!isLightboxOpen.value) return
  
  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  } else if (event.key === 'ArrowLeft') {
    previousImage()
  }
}

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
  
  // 触发心形动画（仅在添加到愿望清单时）
  if (isInWishlist.value) {
    isWishlistAnimating.value = true
    setTimeout(() => {
      isWishlistAnimating.value = false
    }, 600)
  }
}

// 根据badge类型返回对应的class
const getBadgeClass = (badge: string) => {
  const badgeLower = badge.toLowerCase()
  if (badgeLower.includes('new')) return 'tag-new'
  if (badgeLower.includes('bestseller') || badgeLower.includes('best')) return 'tag-bestseller'
  if (badgeLower.includes('sale') || badgeLower.includes('off')) return 'tag-sale'
  return 'tag-new' // 默认
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  // Ensure body scroll is restored
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Zoom cursor */
.cursor-zoom-in {
  cursor: zoom-in;
}

/* 愿望清单心形动画 */
.wishlist-btn {
  position: relative;
}

.wishlist-btn.active::after {
  content: '♥';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: #C9A882;
  animation: heart-pop 0.6s ease;
  pointer-events: none;
}

@keyframes heart-pop {
  0% { 
    transform: translate(-50%, -50%) scale(0); 
    opacity: 1; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.5); 
    opacity: 0.8; 
  }
  100% { 
    transform: translate(-50%, -50%) scale(0); 
    opacity: 0; 
  }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Lightbox animations */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
