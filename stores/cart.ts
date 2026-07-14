import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image?: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isLoading: false
  }),

  getters: {
    // 使用缓存的计算属性避免重复计算，防御 NaN
    cartCount: (state) => {
      const count = state.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
      return Number.isFinite(count) ? count : 0
    },

    subtotal: (state) => {
      const total = state.items.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0)
      return Number.isFinite(total) ? total : 0
    },
    
    tax(): number {
      return this.subtotal * 0.1
    },
    
    total(): number {
      return this.subtotal + this.tax
    },
    
    // 按商品ID分组（优化查找性能）
    itemsById: (state) => {
      const map = new Map<string, CartItem>()
      state.items.forEach(item => {
        const key = `${item.id}-${item.size}-${item.color}`
        map.set(key, item)
      })
      return map
    }
  },

  actions: {
    addToCart(product: CartItem) {
      // 确保数量和价格有效
      const safeProduct = {
        ...product,
        quantity: Number(product.quantity) || 1,
        price: Number(product.price) || 0
      }
      // 使用 Map 优化查找性能
      const key = `${safeProduct.id}-${safeProduct.size}-${safeProduct.color}`
      const existing = this.itemsById.get(key)

      if (existing) {
        // 直接修改现有项，避免数组操作
        existing.quantity += safeProduct.quantity
      } else {
        // 使用 Object.freeze 防止意外修改（可选）
        this.items.push({ ...safeProduct })
      }

      this.persistCart()
    },

    updateQuantity(index: number, change: number) {
      const item = this.items[index]
      if (!item) return
      
      item.quantity += change
      
      if (item.quantity <= 0) {
        this.items.splice(index, 1)
      }
      
      this.persistCart()
    },

    removeItem(index: number) {
      this.items.splice(index, 1)
      this.persistCart()
    },

    updateItemSize(index: number, size: string) {
      const item = this.items[index]
      if (item) {
        item.size = size
        this.persistCart()
      }
    },

    updateItemColor(index: number, color: string) {
      const item = this.items[index]
      if (item) {
        item.color = color
        this.persistCart()
      }
    },

    clearCart() {
      this.items = []
      this.persistCart()
    },

    // 批量操作 - 减少 localStorage 写入次数
    batchUpdate(updates: Array<{ index: number; quantity: number }>) {
      updates.forEach(({ index, quantity }) => {
        if (this.items[index]) {
          this.items[index].quantity = quantity
        }
      })
      
      // 移除数量为0的商品
      this.items = this.items.filter(item => item.quantity > 0)
      
      this.persistCart()
    },

    // 持久化到 localStorage（防抖）
    persistCart() {
      if (!import.meta.client) return
      
      // 使用 requestIdleCallback 在空闲时保存
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          localStorage.setItem('cart', JSON.stringify(this.items))
        })
      } else {
        // 降级方案
        setTimeout(() => {
          localStorage.setItem('cart', JSON.stringify(this.items))
        }, 0)
      }
    },

    // 从 localStorage 加载
    async loadCart() {
      if (!import.meta.client) return

      this.isLoading = true

      try {
        const saved = localStorage.getItem('cart')
        if (saved) {
          const parsed = JSON.parse(saved)
          // 验证数据完整性：确保每个 item 的 quantity 和 price 是有效数字
          this.items = Array.isArray(parsed)
            ? parsed.map((item: any) => ({
                ...item,
                quantity: Number(item.quantity) || 1,
                price: Number(item.price) || 0
              })).filter((item: any) => item.id && item.name)
            : []
        }
      } catch (error) {
        console.error('Failed to load cart:', error)
        this.items = []
      } finally {
        this.isLoading = false
      }
    }
  }
})
