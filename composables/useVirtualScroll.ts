/**
 * Virtual Scrolling Composable
 * 虚拟滚动 - 只渲染可见区域的商品，大幅提升大列表性能
 */

export interface VirtualScrollOptions {
  itemHeight: number
  buffer?: number
  containerHeight?: number
}

export const useVirtualScroll = <T>(
  items: Ref<T[]>,
  options: VirtualScrollOptions
) => {
  const { itemHeight, buffer = 3, containerHeight = 800 } = options
  
  const scrollTop = ref(0)
  const containerRef = ref<HTMLElement | null>(null)
  
  // 计算可见范围
  const visibleRange = computed(() => {
    const start = Math.floor(scrollTop.value / itemHeight)
    const visibleCount = Math.ceil(containerHeight / itemHeight)
    const end = start + visibleCount
    
    return {
      start: Math.max(0, start - buffer),
      end: Math.min(items.value.length, end + buffer)
    }
  })
  
  // 可见的商品
  const visibleItems = computed(() => {
    const { start, end } = visibleRange.value
    return items.value.slice(start, end).map((item, index) => ({
      item,
      index: start + index,
      top: (start + index) * itemHeight
    }))
  })
  
  // 总高度
  const totalHeight = computed(() => items.value.length * itemHeight)
  
  // 滚动处理（带节流）
  let scrollTimeout: NodeJS.Timeout
  const handleScroll = (event: Event) => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      const target = event.target as HTMLElement
      scrollTop.value = target.scrollTop
    }, 16) // ~60fps
  }
  
  // 滚动到指定索引
  const scrollToIndex = (index: number) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = index * itemHeight
    }
  }
  
  return {
    containerRef,
    visibleItems,
    totalHeight,
    handleScroll,
    scrollToIndex,
    visibleRange
  }
}
