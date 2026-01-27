<template>
  <div class="product-card group relative">
    <!-- 玫瑰金渐变遮罩 -->
    <div class="product-card-overlay"></div>
    
    <NuxtLink :to="`/product-detail?id=${product.id}`" class="block">
      <!-- 图片区域 -->
      <div class="product-image-wrapper relative aspect-[3/4] overflow-hidden bg-backgroundLight">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="product-image w-full h-full object-cover"
          loading="lazy"
        />
        
        <!-- 徽章 -->
        <div 
          v-if="product.badge" 
          :class="getBadgeClass(product.badge)"
          class="absolute top-12 left-12 z-10"
        >
          {{ product.badge }}
        </div>
        
        <!-- Hover遮罩层 -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-400"></div>
        
        <!-- Hover显示按钮 -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
          <button 
            @click.prevent="handleAddToCart"
            class="btn-add-to-cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <!-- 产品信息 -->
      <div class="p-4 text-center">
        <h3 class="text-sm font-normal text-primary mb-2 line-clamp-2 leading-relaxed group-hover:text-accent transition-colors duration-300">
          {{ product.name }}
        </h3>
        
        <div class="flex items-center justify-center gap-2">
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

const handleAddToCart = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  
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

/* 徽章 - 移除旧样式，使用全局统一样式 */

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

.product-card:hover .btn-add-to-cart {
  transform: translateY(0);
}

.btn-add-to-cart:hover {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
  box-shadow: 0 6px 16px rgba(212, 175, 55, 0.5);
  transform: translateY(-2px);
}

/* 文字截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
