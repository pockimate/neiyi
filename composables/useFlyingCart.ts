/**
 * Flying Cart Animation Composable
 * 商品飞入购物车动画
 */

export const useFlyingCart = () => {
  const flyToCart = (productElement: HTMLElement, productImage: string) => {
    if (!process.client) return

    // 获取产品元素和购物车图标的位置
    const productRect = productElement.getBoundingClientRect()
    
    // 查找购物车图标（可能在导航栏或移动端底部导航）
    const cartIcon = document.querySelector('[data-cart-icon]') || 
                     document.querySelector('.cart-icon') ||
                     document.querySelector('a[href="/cart"]')
    
    if (!cartIcon) {
      console.warn('Cart icon not found for flying animation')
      return
    }

    const cartRect = cartIcon.getBoundingClientRect()
    
    // 创建飞行的产品图片
    const flyingProduct = document.createElement('div')
    flyingProduct.className = 'flying-product'
    flyingProduct.style.cssText = `
      position: fixed;
      left: ${productRect.left}px;
      top: ${productRect.top}px;
      width: ${Math.min(productRect.width, 100)}px;
      height: ${Math.min(productRect.height, 100)}px;
      background-image: url(${productImage});
      background-size: cover;
      background-position: center;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      pointer-events: none;
      z-index: 9999;
    `

    // 添加到容器
    const container = document.getElementById('flying-cart-container')
    if (container) {
      container.appendChild(flyingProduct)
    } else {
      document.body.appendChild(flyingProduct)
    }

    // 计算目标位置
    const deltaX = cartRect.left + cartRect.width / 2 - productRect.left - productRect.width / 2
    const deltaY = cartRect.top + cartRect.height / 2 - productRect.top - productRect.height / 2

    // 使用 Web Animations API 创建动画
    const animation = flyingProduct.animate([
      {
        transform: 'translate(0, 0) scale(1) rotate(0deg)',
        opacity: 1
      },
      {
        transform: `translate(${deltaX * 0.5}px, ${deltaY * 0.5}px) scale(0.8) rotate(10deg)`,
        opacity: 0.8,
        offset: 0.5
      },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0.3) rotate(20deg)`,
        opacity: 0
      }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    })

    // 动画结束后清理
    animation.onfinish = () => {
      flyingProduct.remove()
      
      // 触发购物车图标弹跳动画
      if (cartIcon) {
        cartIcon.classList.add('cart-bounce')
        setTimeout(() => {
          cartIcon.classList.remove('cart-bounce')
        }, 500)
      }
      
      // 触发购物车数量弹出动画
      const cartCount = document.querySelector('[data-cart-count]')
      if (cartCount) {
        cartCount.classList.add('cart-count-pop')
        setTimeout(() => {
          cartCount.classList.remove('cart-count-pop')
        }, 400)
      }
    }
  }

  return {
    flyToCart
  }
}
