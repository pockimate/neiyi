/**
 * Debounce & Throttle Composables
 * 防抖和节流 - 优化高频事件处理
 */

/**
 * 防抖 - 延迟执行，只执行最后一次
 * 适用场景：搜索输入、窗口resize
 */
export const useDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
) => {
  let timeout: NodeJS.Timeout | null = null
  
  const debouncedFn = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
  
  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }
  
  // 清理
  onUnmounted(() => {
    cancel()
  })
  
  return {
    debouncedFn,
    cancel
  }
}

/**
 * 节流 - 固定时间间隔执行
 * 适用场景：滚动事件、鼠标移动
 */
export const useThrottle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 100
) => {
  let lastCall = 0
  let timeout: NodeJS.Timeout | null = null
  
  const throttledFn = (...args: Parameters<T>) => {
    const now = Date.now()
    
    if (now - lastCall >= delay) {
      lastCall = now
      fn(...args)
    } else {
      // 确保最后一次调用也会执行
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        lastCall = Date.now()
        fn(...args)
      }, delay - (now - lastCall))
    }
  }
  
  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }
  
  // 清理
  onUnmounted(() => {
    cancel()
  })
  
  return {
    throttledFn,
    cancel
  }
}

/**
 * Debounced Ref - 防抖的响应式值
 */
export const useDebouncedRef = <T>(
  initialValue: T,
  delay: number = 300
) => {
  const value = ref<T>(initialValue)
  const debouncedValue = ref<T>(initialValue)
  
  let timeout: NodeJS.Timeout | null = null
  
  watch(value, (newValue) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })
  
  onUnmounted(() => {
    if (timeout) clearTimeout(timeout)
  })
  
  return {
    value,
    debouncedValue
  }
}
