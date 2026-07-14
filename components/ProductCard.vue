<template>
  <div 
    class="product-card group relative"
    v-scroll-reveal="{ delay: cardDelay, once: true }"
  >
    <!-- 玫瑰金渐变遮罩 -->
    <div class="product-card-overlay"></div>
    
    <NuxtLink :to="`/product-detail?id=${product.id}`" class="block">
      <!-- 图片区域 -->
      <div 
        ref="productImageRef"
        class="product-image-wrapper relative aspect-[3/4] overflow-hidden bg-primary-900"
      >
        <!-- 主图片 -->
        <OptimizedImage
          :src="product.image"
          :alt="product.name"
          aspect-ratio="3/4"
          object-fit="cover"
          image-class="product-image product-image-main"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        <!-- 第二张图片 (hover显示) -->
        <div v-if="product.hoverImage" class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <OptimizedImage
            :src="product.hoverImage"
            :alt="`${product.name} - alternate view`"
            aspect-ratio="3/4"
            object-fit="cover"
            image-class="product-image product-image-hover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        
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
            class="px-3 py-1 bg-primary-900 text-white text-xs font-semibold uppercase tracking-wide"
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
            v-ripple
            @click.prevent="handleAddToCart"
            class="btn-add-to-cart"
            :disabled="product.stock === 0"
          >
            {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
          <button 
            v-ripple
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
          class="wishlist-btn absolute top-3 right-3 z-20 p-2 bg-primary-900/80 hover:bg-accent-500 backdrop-blur-md rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 pulse-heart"
          :class="{ 'text-accent-500': isInWishlist, 'text-cream-200': !isInWishlist }"
          title="Add to Wishlist"
        >
          <svg class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      
      <!-- 产品信息 -->
      <div class="text-center" style="padding: var(--space-md);">
        <h3 class="text-sm font-medium text-cream-200 line-clamp-2 leading-relaxed group-hover:text-accent-500 transition-colors duration-300" style="margin-bottom: var(--space-sm);">
          {{ product.name }}
        </h3>
        
        <div class="flex items-center justify-center" style="gap: var(--space-xs);">
          <p v-if="product.originalPrice" class="text-xs text-cream-300 line-through">
            ${{ (product.originalPrice ?? 0).toFixed(2) }}
          </p>
          <p class="text-sm font-semibold text-accent">
            ${{ (product.price ?? 0).toFixed(2) }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useFlyingCart } from '~/composables/useFlyingCart'
import type { Product } from '~/composables/useProducts'

const props = defineProps<{
  product: Product
  cardDelay?: number
}>()

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { flyToCart } = useFlyingCart()
const isInWishlist = computed(() => wishlistStore.has(props.product.id))
const productImageRef = ref<HTMLElement | null>(null)

const handleAddToCart = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  
  if (props.product.stock === 0) return
  
  // 添加到购物车
  cartStore.addToCart({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    size: 'M',
    color: 'Default',
    quantity: 1,
    image: props.product.image
  })
  
  // 触发飞入动画
  if (productImageRef.value) {
    flyToCart(productImageRef.value, props.product.image)
  }
  
  // 打开购物车侧边栏
  setTimeout(() => {
    const isCartOpen = useState('cartSidebarOpen', () => false)
    isCartOpen.value = true
  }, 400)
}

const handleQuickView = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  // 暂时跳转到详情页（快速查看暂未实现，避免使用 alert）
  navigateTo(`/product-detail?id=${props.product.id}`)
}

const toggleWishlist = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()

  // 通过 store 统一管理，自动同步 localStorage + 广播事件
  const added = wishlistStore.toggle(props.product.id)

  // 添加心跳动画
  const button = event.currentTarget as HTMLElement
  button.classList.add('heartbeat')
  setTimeout(() => {
    button.classList.remove('heartbeat')
  }, 1000)

  // 显示Toast通知
  showWishlistToast(added)
}

// Toast通知函数
const showWishlistToast = (added: boolean) => {
  const toast = document.createElement('div')
  toast.className = 'wishlist-toast'
  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <svg class="w-5 h-5 ${added ? 'text-red-500' : 'text-cream-300'}" fill="${added ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
      <span class="text-sm font-medium">
        ${added ? 'Added to wishlist' : 'Removed from wishlist'}
      </span>
    </div>
  `

  document.body.appendChild(toast)

  // 触发动画
  setTimeout(() => toast.classList.add('show'), 10)

  // 3秒后移除
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}

// 加载时从 store 恢复 wishlist 状态
onMounted(() => {
  wishlistStore.loadFromStorage()
})

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
  background: linear-gradient(135deg, rgba(23, 23, 23, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%);
  border: 1px solid rgba(255, 27, 107, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(12px);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(255, 27, 107, 0.3),
              0 0 30px rgba(255, 27, 107, 0.15);
  border-color: rgba(255, 27, 107, 0.6);
}

/* 玫瑰金渐变遮罩 */
.product-card-overlay {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 27, 107, 0.15) 100%);
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
  background: linear-gradient(135deg, #FF1B6B 0%, #E6005C 100%);
  color: #FFFFFF;
  padding: 12px 24px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(255, 27, 107, 0.5);
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
  background: linear-gradient(135deg, #FF3D8B 0%, #FF1B6B 100%);
  box-shadow: 0 8px 24px rgba(255, 27, 107, 0.7),
              0 0 20px rgba(255, 27, 107, 0.4);
  transform: translateY(-2px);
}

/* Quick View 按钮 */
.btn-quick-view {
  background: rgba(10, 10, 10, 0.85);
  color: #F5E6D3;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 27, 107, 0.3);
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
  background: rgba(255, 27, 107, 0.2);
  border-color: rgba(255, 27, 107, 0.6);
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

/* Toast通知样式 */
:deep(.wishlist-toast) {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(10, 10, 10, 0.95) 100%);
  color: #F5E6D3;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(255, 27, 107, 0.3);
  border: 1px solid rgba(255, 27, 107, 0.3);
  backdrop-filter: blur(20px);
  z-index: 9999;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.wishlist-toast.show) {
  transform: translateY(0);
  opacity: 1;
}

/* 心跳动画 */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(1.1); }
  75% { transform: scale(1.2); }
}

.heartbeat {
  animation: heartbeat 0.6s ease-in-out;
}
</style>
