/**
 * Performance Monitoring Composable
 * 性能监控 - 追踪页面性能指标
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  LCP?: number  // Largest Contentful Paint
  FID?: number  // First Input Delay
  CLS?: number  // Cumulative Layout Shift
  FCP?: number  // First Contentful Paint
  TTFB?: number // Time to First Byte
  
  // Custom metrics
  pageLoadTime?: number
  domContentLoaded?: number
  resourcesLoaded?: number
}

export const usePerformance = () => {
  const metrics = ref<PerformanceMetrics>({})
  
  // 测量页面加载时间
  const measurePageLoad = () => {
    if (!process.client || !window.performance) return
    
    const perfData = window.performance.timing
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
    const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart
    const resourcesLoaded = perfData.loadEventEnd - perfData.domContentLoadedEventEnd
    
    metrics.value = {
      ...metrics.value,
      pageLoadTime,
      domContentLoaded,
      resourcesLoaded
    }
  }
  
  // 测量 Core Web Vitals
  const measureWebVitals = () => {
    if (!process.client) return
    
    // LCP - Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          metrics.value.LCP = lastEntry.renderTime || lastEntry.loadTime
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        
        // FID - First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            metrics.value.FID = entry.processingStart - entry.startTime
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        
        // CLS - Cumulative Layout Shift
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
              metrics.value.CLS = clsValue
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (error) {
        console.warn('Performance Observer not fully supported:', error)
      }
    }
  }
  
  // 测量资源加载时间
  const measureResourceTiming = () => {
    if (!process.client || !window.performance) return
    
    const resources = window.performance.getEntriesByType('resource')
    const resourceMetrics = resources.map((resource: any) => ({
      name: resource.name,
      duration: resource.duration,
      size: resource.transferSize,
      type: resource.initiatorType
    }))
    
    return resourceMetrics
  }
  
  // 记录自定义性能标记
  const mark = (name: string) => {
    if (!process.client || !window.performance) return
    window.performance.mark(name)
  }
  
  // 测量两个标记之间的时间
  const measure = (name: string, startMark: string, endMark: string) => {
    if (!process.client || !window.performance) return
    
    try {
      window.performance.measure(name, startMark, endMark)
      const measure = window.performance.getEntriesByName(name)[0]
      return measure.duration
    } catch (error) {
      console.warn('Performance measure failed:', error)
      return 0
    }
  }
  
  // 清除性能数据
  const clearMarks = () => {
    if (!process.client || !window.performance) return
    window.performance.clearMarks()
    window.performance.clearMeasures()
  }
  
  // 获取性能报告
  const getReport = () => {
    return {
      ...metrics.value,
      resources: measureResourceTiming(),
      timestamp: Date.now()
    }
  }
  
  // 发送性能数据到分析服务（可选）
  const sendToAnalytics = (data: any) => {
    if (!process.client) return
    
    // 使用 sendBeacon 确保数据发送
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
      navigator.sendBeacon('/api/analytics', blob)
    }
  }
  
  // 自动初始化
  onMounted(() => {
    // 等待页面完全加载
    if (document.readyState === 'complete') {
      measurePageLoad()
      measureWebVitals()
    } else {
      window.addEventListener('load', () => {
        measurePageLoad()
        measureWebVitals()
      })
    }
  })
  
  return {
    metrics,
    mark,
    measure,
    clearMarks,
    getReport,
    sendToAnalytics,
    measureResourceTiming
  }
}

/**
 * 性能优化建议
 */
export const usePerformanceOptimization = () => {
  // 预加载关键资源
  const preloadResource = (href: string, as: string) => {
    if (!process.client) return
    
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    document.head.appendChild(link)
  }
  
  // 预连接到外部域名
  const preconnect = (href: string) => {
    if (!process.client) return
    
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    document.head.appendChild(link)
  }
  
  // DNS 预解析
  const dnsPrefetch = (href: string) => {
    if (!process.client) return
    
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = href
    document.head.appendChild(link)
  }
  
  // 延迟加载图片
  const lazyLoadImages = () => {
    if (!process.client || !('IntersectionObserver' in window)) return
    
    const images = document.querySelectorAll('img[data-src]')
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      })
    })
    
    images.forEach((img) => imageObserver.observe(img))
  }
  
  return {
    preloadResource,
    preconnect,
    dnsPrefetch,
    lazyLoadImages
  }
}
