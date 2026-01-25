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
    items: [] as CartItem[]
  }),

  getters: {
    cartCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    
    subtotal: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    
    tax: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      return subtotal * 0.1
    },
    
    total(): number {
      return this.subtotal + this.tax
    }
  },

  actions: {
    addToCart(product: CartItem) {
      const existingIndex = this.items.findIndex(
        item => item.id === product.id && 
                item.size === product.size && 
                item.color === product.color
      )

      if (existingIndex > -1) {
        this.items[existingIndex].quantity += product.quantity
      } else {
        this.items.push({ ...product })
      }

      // Persist to localStorage
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    updateQuantity(index: number, change: number) {
      this.items[index].quantity += change
      if (this.items[index].quantity <= 0) {
        this.items.splice(index, 1)
      }
      
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    removeItem(index: number) {
      this.items.splice(index, 1)
      
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    clearCart() {
      this.items = []
      
      if (process.client) {
        localStorage.removeItem('cart')
      }
    },

    loadCart() {
      if (process.client) {
        const saved = localStorage.getItem('cart')
        if (saved) {
          this.items = JSON.parse(saved)
        }
      }
    }
  }
})
