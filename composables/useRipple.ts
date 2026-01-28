/**
 * Ripple Effect Composable
 * 按钮涟漪效果
 */

export const useRipple = () => {
  const createRipple = (event: MouseEvent, element: HTMLElement) => {
    // 确保元素有相对定位
    const position = window.getComputedStyle(element).position
    if (position !== 'relative' && position !== 'absolute') {
      element.style.position = 'relative'
    }
    
    // 确保元素有overflow hidden
    element.style.overflow = 'hidden'

    // 创建涟漪元素
    const ripple = document.createElement('span')
    ripple.classList.add('ripple')

    // 计算涟漪位置和大小
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    // 添加到元素
    element.appendChild(ripple)

    // 动画结束后移除
    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  return {
    createRipple
  }
}

/**
 * Ripple Directive
 * 使用方式: v-ripple
 */
export const vRipple = {
  // SSR 支持 - 返回空对象避免SSR错误
  getSSRProps() {
    return {}
  },
  
  mounted(el: HTMLElement, binding: any) {
    // 只在客户端执行
    if (!process.client) return
    // 添加ripple容器类
    el.classList.add('ripple-container')
    
    const handleClick = (event: MouseEvent) => {
      // 如果按钮被禁用，不显示涟漪
      if (el.hasAttribute('disabled') || el.classList.contains('disabled')) {
        return
      }

      const { createRipple } = useRipple()
      
      // 自定义颜色
      if (binding.value?.color) {
        const ripple = el.querySelector('.ripple')
        if (ripple) {
          ;(ripple as HTMLElement).style.background = binding.value.color
        }
      }
      
      createRipple(event, el)
      
      // 不阻止事件传播，让点击事件继续传递到父元素（如 NuxtLink）
      // 这样涟漪效果和导航都能正常工作
    }

    el.addEventListener('click', handleClick)
    
    // 保存处理函数以便清理
    ;(el as any)._rippleHandler = handleClick
  },
  
  unmounted(el: HTMLElement) {
    const handler = (el as any)._rippleHandler
    if (handler) {
      el.removeEventListener('click', handler)
      delete (el as any)._rippleHandler
    }
  }
}
