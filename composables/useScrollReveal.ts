/**
 * Scroll Reveal Composable
 * 滚动触发动画 - 当元素进入视口时触发动画
 */

export const useScrollReveal = () => {
  const observedElements = ref<Set<Element>>(new Set())
  let observer: IntersectionObserver | null = null

  const initScrollReveal = () => {
    if (process.client && !observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              // 可选：一次性动画后停止观察
              // observer?.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.1, // 元素10%可见时触发
          rootMargin: '0px 0px -50px 0px' // 提前50px触发
        }
      )
    }
  }

  const observeElement = (element: Element) => {
    if (observer && element && !observedElements.value.has(element)) {
      observer.observe(element)
      observedElements.value.add(element)
    }
  }

  const unobserveElement = (element: Element) => {
    if (observer && element) {
      observer.unobserve(element)
      observedElements.value.delete(element)
    }
  }

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
      observedElements.value.clear()
    }
  }

  onMounted(() => {
    initScrollReveal()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    observeElement,
    unobserveElement,
    cleanup
  }
}

/**
 * Scroll Reveal Directive
 * 使用方式: v-scroll-reveal
 */
export const vScrollReveal = {
  // SSR 支持 - 返回空对象避免SSR错误
  getSSRProps() {
    return {}
  },
  
  mounted(el: HTMLElement, binding: any) {
    // 只在客户端执行
    if (!process.client) return
    // 添加基础类
    el.classList.add('scroll-reveal')
    
    // 添加延迟类（如果指定）
    if (binding.value?.delay) {
      el.classList.add(`scroll-reveal-delay-${binding.value.delay}`)
    }
    
    // 添加方向类（如果指定）
    if (binding.value?.direction) {
      el.classList.add(`scroll-reveal-${binding.value.direction}`)
    }

    // 创建观察器
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            // 一次性动画
            if (binding.value?.once !== false) {
              observer.unobserve(entry.target)
            }
          } else if (binding.value?.once === false) {
            // 如果设置了重复动画，离开视口时移除revealed类
            entry.target.classList.remove('revealed')
          }
        })
      },
      {
        threshold: binding.value?.threshold || 0.1,
        rootMargin: binding.value?.rootMargin || '0px 0px -50px 0px'
      }
    )

    observer.observe(el)
    
    // 保存observer到元素上，以便后续清理
    ;(el as any)._scrollRevealObserver = observer
  },
  
  unmounted(el: HTMLElement) {
    const observer = (el as any)._scrollRevealObserver
    if (observer) {
      observer.disconnect()
      delete (el as any)._scrollRevealObserver
    }
  }
}
