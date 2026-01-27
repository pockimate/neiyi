<template>
  <div class="product-card group relative">
    <!-- 玫瑰金渐变遮罩 -->
    <div class="product-card-overlay"></div>
    
    <NuxtLink :to="`/product-detail?id=${product.id}`" class="block">
      <!-- 图片区域 -->
      <div class="product-image-wrapper relative aspect-[3/4] overflow-hidden bg-backgroundLight">
        <!-- 主图片 -->
        <img 
          :src="product.image" 
          :alt="product.name"
          class="product-image product-image-main w-full h-full object-cover"
          loading="lazy"
        />
        
        <!-- 第二张图片 (hover显示) -->
        <img 
          v-if="product.hoverImage"
          :src="product.hoverImage" 
          :alt="`${product.name} - alternate view`"
          class="product-image product-image-hover w-full h-full object-cover absolute inset-0"
          loading="lazy"
        />
        
        <!-- 徽章 -->
        <div 
          v-if="product.badge" 
          :class="getBadgeClass(product.badge)"
          class="absolute top-3 left-3 z-10"
        >
          {{ product.badge }}
        </div>
        
        <!-- 库存状态 -->
        <div 
          v-if="product.stock !== undefined"
          class="absolute top-3 right-3 z-10"
        >
          <span 
            v-if="product.stock === 0"
            class="px-3 py-1 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wide"
          >
            Sold Out
          </span>
          <span 
            v-else-if="product.stock <= 5"
            class="px-3 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-wide"
          >
            Only {{ product.stock }} left
          </span>
        </div>
        
        <!-- Hover遮罩层 -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-400"></div>
        
        <!-- Hover显示按钮组 -->
        <div class="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400">
          <button 
            @click.prevent="handleAddToCart"
            class="btn-add-to-cart"
            :disabled="product.stock === 0"
          >
            {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
          <button 
            @click.prevent="handleQuickView"
            class="btn-quick-view"
            title="Quick View"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>
        </div>
        
        <!-- 心愿单按钮 -->
        <button 
          @click.prevent="toggleWishlist"
          class="wishlist-btn absolute top-3 right-3 z-20 p-2 bg-white/90 hover:bg-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          :class="{ 'text-red-500': isInWishlist, 'text-gray-400': !isInWishlist }"
          title="Add to Wishlist"
        >
          <svg class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      
      <!-- 产品信息 -->
      <div class="text-center" style="padding: var(--space-md);">
        <h3 class="text-sm font-normal text-primary line-clamp-2 leading-relaxed group-hover:text-accent transition-colors duration-300" style="margin-bottom: var(--space-sm);">
          {{ product.name }}
        </h3>
        
        <div class="flex items-center justify-center" style="gap: var(--space-xs);">
          <p v-if="product.originalPrice" class="text-xs text-textMuted line-through">
            ${{ product.originalPrice.toFixed(2) }}
          </p>
          <p class="text-sm font-semibold text-accent">
            ${{ product.price.toFixed(2) }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import type { Product } from '~/composables/useProducts'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const isInWishlist = ref(false)

const handleAddToCart = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  
  if (props.product.stock === 0) return
  
  cartStore.addToCart({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    size: 'M',
    color: 'Default',
    quantity: 1,
    image: props.product.image
  })
  
  const isCartOpen = useState('cartSidebarOpen')
  isCartOpen.value = true
}

const handleQuickView = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  
  // TODO: 实现快速查看弹窗
  console.log('Quick view:', props.product.name)
  alert(`Quick View: ${props.product.name}\n\nThis feature will show a modal with product details.`)
}

const toggleWishlist = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  
  isInWishlist.value = !isInWishlist.value
  
  // TODO: 保存到wishlist store或localStorage
  if (isInWishlist.value) {
    console.log('Added to wishlist:', props.product.name)
  } else {
    console.log('Removed from wishlist:', props.product.name)
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
</script>

<style scoped>
/* 产品卡片容器 */
.product-card {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: #D4AF37;
}

/* 玫瑰金渐变遮罩 */
.product-card-overlay {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

.product-card:hover .product-card-overlay {
  opacity: 1;
}

/* 图片容器 */
.product-image-wrapper {
  position: relative;
  z-index: 2;
}

/* 图片放大效果 */
.product-image {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

/* 主图片和hover图片切换 */
.product-image-main {
  opacity: 1;
  transition: opacity 0.5s ease;
}

.product-image-hover {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.product-card:hover .product-image-main {
  opacity: 0;
}

.product-card:hover .product-image-hover {
  opacity: 1;
}

/* Add to Cart 按钮 */
.btn-add-to-cart {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  color: #FFFFFF;
  padding: 12px 24px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  transform: translateY(10px);
}

.btn-add-to-cart:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
  opacity: 0.6;
}

.product-card:hover .btn-add-to-cart {
  transform: translateY(0);
}

.btn-add-to-cart:hover:not(:disabled) {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  box-shadow: 0 6px 16px rgba(212, 175, 55, 0.5);
  transform: translateY(-2px);
}

/* Quick View 按钮 */
.btn-quick-view {
  background: #FFFFFF;
  color: #2C2C2C;
  padding: 12px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  transform: translateY(10px);
}

.product-card:hover .btn-quick-view {
  transform: translateY(0);
}

.btn-quick-view:hover {
  background: #F5F5F5;
  transform: translateY(-2px);
}

/* 心愿单按钮 */
.wishlist-btn {
  transition: all 0.3s ease;
}

.wishlist-btn:hover {
  transform: scale(1.1);
}

/* 文字截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
