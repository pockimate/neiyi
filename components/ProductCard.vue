<template>
  <div class="product-card group">
    <NuxtLink :to="`/product-detail?id=${product.id}`" class="block">
      <!-- 图片区域 -->
      <div class="relative aspect-[3/4] overflow-hidden bg-white">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        <!-- 徽章 -->
        <div v-if="product.badge" class="absolute top-3 left-3 badge-new">
          {{ product.badge }}
        </div>
        
        <!-- Hover遮罩层 -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
        
        <!-- Hover显示按钮 -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            @click.prevent="handleAddToCart"
            class="bg-white text-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 border border-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <!-- 产品信息 -->
      <div class="p-4 text-center">
        <h3 class="text-sm font-normal text-primary mb-2 line-clamp-2 leading-relaxed">
          {{ product.name }}
        </h3>
        
        <div class="flex items-center justify-center gap-2">
          <p v-if="product.originalPrice" class="text-xs text-textMuted line-through">
            ${{ product.originalPrice.toFixed(2) }}
          </p>
          <p class="text-sm font-semibold text-primary">
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
</script>

<style scoped>
.product-card {
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.badge-new {
  background: #000000;
  color: #FFFFFF;
  padding: 4px 10px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
