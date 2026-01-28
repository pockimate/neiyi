/**
 * Service Worker Plugin
 * 注册 Service Worker 实现离线缓存
 */

export default defineNuxtPlugin(() => {
  if (!process.client) return
  
  // 检查浏览器支持
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })
        
        console.log('✅ Service Worker registered:', registration.scope)
        
        // 监听更新
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // 新版本可用
                console.log('🔄 New version available! Please refresh.')
                
                // 可以在这里显示更新提示
                if (confirm('New version available! Reload to update?')) {
                  window.location.reload()
                }
              }
            })
          }
        })
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error)
      }
    })
  }
})
