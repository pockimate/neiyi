/**
 * Animation Directives Plugin (Server)
 * 服务端注册空指令以避免SSR错误
 */

export default defineNuxtPlugin((nuxtApp) => {
  // 在服务端注册空指令（只需要getSSRProps）
  nuxtApp.vueApp.directive('scroll-reveal', {
    getSSRProps() {
      return {}
    }
  })
  
  nuxtApp.vueApp.directive('ripple', {
    getSSRProps() {
      return {}
    }
  })
})
