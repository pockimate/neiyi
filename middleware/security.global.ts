/**
 * Global Security Middleware
 * 全局安全中间件 - 应用于所有路由
 */

export default defineNuxtRouteMiddleware((to, from) => {
  // 只在客户端运行
  if (process.server) return
  
  // 确保在浏览器环境中
  if (!process.client) return
  
  // 1. 防止点击劫持
  if (typeof window !== 'undefined' && window.self !== window.top) {
    // 页面被嵌入 iframe，可能是点击劫持攻击
    console.warn('Potential clickjacking detected')
    try {
      window.top!.location = window.self.location
    } catch (e) {
      // 跨域限制，无法访问 top.location
    }
  }
  
  // 2. 清理 URL 参数（防止 XSS）
  if (to.query) {
    const cleanQuery: Record<string, any> = {}
    let needsRedirect = false
    
    for (const [key, value] of Object.entries(to.query)) {
      if (typeof value === 'string') {
        // 检测潜在的 XSS 攻击
        const dangerous = /<script|javascript:|onerror=|onload=/i
        if (dangerous.test(value)) {
          console.warn('Potential XSS detected in URL parameter:', key)
          needsRedirect = true
          continue
        }
        cleanQuery[key] = value
      } else {
        cleanQuery[key] = value
      }
    }
    
    // 如果检测到危险参数，重定向到清理后的 URL
    if (needsRedirect) {
      return navigateTo({
        path: to.path,
        query: cleanQuery
      })
    }
  }
})
