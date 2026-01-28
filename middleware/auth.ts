/**
 * Authentication Middleware
 * 认证中间件 - 保护需要登录的路由
 */

export default defineNuxtRouteMiddleware((to, from) => {
  // 仅在客户端运行
  if (process.server) return
  
  // 检查是否已登录（实际应用中应该检查真实的认证状态）
  const isAuthenticated = useState('isAuthenticated', () => false)
  
  // 需要认证的路由
  const protectedRoutes = [
    '/account',
    '/checkout',
    '/admin'
  ]
  
  // 检查当前路由是否需要认证
  const requiresAuth = protectedRoutes.some(route => 
    to.path.startsWith(route)
  )
  
  if (requiresAuth && !isAuthenticated.value) {
    // 保存原始目标路由
    const redirectTo = to.fullPath
    
    // 重定向到登录页
    return navigateTo({
      path: '/login',
      query: { redirect: redirectTo }
    })
  }
})
