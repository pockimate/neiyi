/**
 * Intersection Observer Composable
 * 交叉观察器 - 实现懒加载和无限滚动
 */

export interface IntersectionObserverOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

/**
 * 基础 Intersection Observer
 */
export const useIntersectionObserver = (
  target: Ref<Element | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverOptions
) => {
  let observer: IntersectionObserver | null = null
  
  const observe = () => {
    if (!target.value || !process.client) return
    
    observer = new IntersectionObserver(callback, options)
    observer.observe(target.value)
  }
  
  const unobserve = () => {
    if (observer && target.value) {
      observer.unobserve(target.value)
    }
  }
  
  const disconnect = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }
  
  onMounted(() => {
    observe()
  })
  
  onUnmounted(() => {
    disconnect()
  })
  
  return {
    observe,
    unobserve,
    disconnect
  }
}

/**
 * 无限滚动
 */
export const useInfiniteScroll = (
  loadMore: () => void | Promise<void>,
  options?: {
    distance?: number
    disabled?: Ref<boolean>
  }
) => {
  const { distance = 300, disabled = ref(false) } = options || {}
  
  const target = ref<HTMLElement | null>(null)
  const isLoading = ref(false)
  
  const handleIntersection: IntersectionObserverCallback = async (entries) => {
    const entry = entries[0]
    
    if (entry.isIntersecting && !isLoading.value && !disabled.value) {
      isLoading.value = true
      try {
        await loadMore()
      } finally {
        isLoading.value = false
      }
    }
  }
  
  useIntersectionObserver(target, handleIntersection, {
    rootMargin: `${distance}px`
  })
  
  return {
    target,
    isLoading
  }
}

/**
 * 元素可见性检测
 */
export const useElementVisibility = (
  target: Ref<Element | null>,
  options?: IntersectionObserverOptions
) => {
  const isVisible = ref(false)
  
  const handleIntersection: IntersectionObserverCallback = (entries) => {
    const entry = entries[0]
    isVisible.value = entry.isIntersecting
  }
  
  useIntersectionObserver(target, handleIntersection, options)
  
  return {
    isVisible
  }
}
