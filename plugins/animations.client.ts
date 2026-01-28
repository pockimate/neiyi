/**
 * Animation Directives Plugin
 * 全局注册动画指令
 */

import { vScrollReveal } from '~/composables/useScrollReveal'
import { vRipple } from '~/composables/useRipple'

export default defineNuxtPlugin((nuxtApp) => {
  // 注册滚动显示指令
  nuxtApp.vueApp.directive('scroll-reveal', vScrollReveal)
  
  // 注册涟漪效果指令
  nuxtApp.vueApp.directive('ripple', vRipple)
})
