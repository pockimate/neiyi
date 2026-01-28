<template>
  <div 
    ref="containerRef"
    class="virtual-scroll-container"
    :style="{ height: `${containerHeight}px`, overflow: 'auto' }"
    @scroll="handleScroll"
  >
    <!-- 占位容器 - 保持滚动条正确 -->
    <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
      <!-- 只渲染可见的商品 -->
      <div
        v-for="{ item, index, top } in visibleItems"
        :key="item.id"
        :style="{ 
          position: 'absolute',
          top: `${top}px`,
          left: 0,
          right: 0
        }"
      >
        <ProductCard 
          :product="item" 
          :card-delay="(index % 12) + 1"
        />
      </div>
    </div>
    
    <!-- 加载更多指示器 -->
    <div 
      v-if="hasMore"
      ref="loadMoreRef"
      class="text-center py-8"
    >
      <LoadingSpinner v-if="isLoadingMore" />
      <p v-else class="text-sm text-textMuted">Scroll for more...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualScroll } from '~/composables/useVirtualScroll'
import { useInfiniteScroll } from '~/composables/useIntersectionObserver'
import type { Product } from '~/composables/useProducts'

interface Props {
  products: Product[]
  itemHeight?: number
  containerHeight?: number
  hasMore?: boolean
  onLoadMore?: () => void | Promise<void>
}

const props = withDefaults(defineProps<Props>(), {
  itemHeight: 400,
  containerHeight: 800,
  hasMore: false
})

// 虚拟滚动
const productsRef = toRef(props, 'products')
const {
  containerRef,
  visibleItems,
  totalHeight,
  handleScroll
} = useVirtualScroll(productsRef, {
  itemHeight: props.itemHeight,
  buffer: 3,
  containerHeight: props.containerHeight
})

// 无限滚动
const { target: loadMoreRef, isLoading: isLoadingMore } = useInfiniteScroll(
  async () => {
    if (props.onLoadMore) {
      await props.onLoadMore()
    }
  },
  {
    distance: 300,
    disabled: computed(() => !props.hasMore)
  }
)
</script>

<style scoped>
.virtual-scroll-container {
  -webkit-overflow-scrolling: touch;
}

.virtual-scroll-container::-webkit-scrollbar {
  width: 8px;
}

.virtual-scroll-container::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.virtual-scroll-container::-webkit-scrollbar-thumb {
  background: #c9a882;
  border-radius: 4px;
}

.virtual-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #b8956f;
}
</style>
