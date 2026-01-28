/**
 * Admin Middleware
 * 管理员中间件 - 保护管理员路由
 */

export default defineNuxtRouteMiddleware((to, from) => {
  // 仅在客户端运行
  if (process.server) return
  
  // 检查是否是管理员（实际应用中应该检查真实的角色）
  const isAdmin = useState('isAdmin', () => false)
  const isAuthenticated = useState('isAuthenticated', () => false)
  
  // 如果访问管理员路由
  if (to.path.startsWith('/admin')) {
    // 未登录，重定向到管理员登录页
    if (!isAuthenticated.value) {
      return navigateTo('/admin/login')
    }
    
    // 已登录但不是管理员，重定向到首页
    if (!isAdmin.value) {
      return navigateTo('/')
    }
  }
})
