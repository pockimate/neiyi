<template>
  <div class="min-h-screen bg-white">
    <TheNavbar />
    
    <!-- Hero Section - 全屏单图 -->
    <section class="relative h-screen flex items-center justify-center pt-20">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=1920&h=1080&fit=crop" 
          alt="Hero"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-7xl font-light mb-6 tracking-wider">
          EMBRACE YOUR SENSUALITY
        </h1>
        <p class="text-lg md:text-xl font-light mb-8 tracking-wide">
          Discover luxury lingerie designed for confidence
        </p>
        <button class="bg-white text-black px-12 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 border border-white">
          Shop Now
        </button>
      </div>
    </section>
    
    <!-- Category Navigation -->
    <section class="py-16 px-4 border-b border-border">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.name"
            :to="category.link"
            class="group text-center p-8 border border-border hover:border-primary transition-all duration-300"
          >
            <h3 class="text-sm font-semibold uppercase tracking-wider mb-2 group-hover:text-primary transition-colors">
              {{ category.name }}
            </h3>
            <p class="text-xs text-textMuted">{{ category.count }} items</p>
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Featured Products -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-light uppercase tracking-wider mb-4">
            New Arrivals
          </h2>
          <p class="text-sm text-textMuted uppercase tracking-wide">
            Discover our latest collection
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink to="/products" class="btn-primary inline-block">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Brand Statement -->
    <section class="py-20 px-4 bg-backgroundLight">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-light uppercase tracking-wider mb-6">
          Crafted with Passion
        </h2>
        <p class="text-base leading-relaxed text-textSecondary mb-8">
          We believe every woman deserves to feel beautiful, confident, and empowered. 
          Our journey began with a simple mission: to create luxury lingerie that celebrates 
          femininity in all its forms.
        </p>
        <NuxtLink to="/about" class="btn-secondary inline-block">
          Our Story
        </NuxtLink>
      </div>
    </section>
    
    <!-- Bestsellers -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-light uppercase tracking-wider mb-4">
            Bestsellers
          </h2>
          <p class="text-sm text-textMuted uppercase tracking-wide">
            Customer favorites
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard 
            v-for="product in bestsellers" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="py-20 px-4 border-t border-border">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl md:text-3xl font-light uppercase tracking-wider mb-4">
          Join Our Newsletter
        </h2>
        <p class="text-sm text-textMuted mb-8 uppercase tracking-wide">
          Be the first to know about new arrivals and exclusive offers
        </p>
        <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="flex-1 px-6 py-4 border border-border focus:border-primary focus:outline-none text-sm"
          />
          <button 
            type="submit" 
            class="btn-primary whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products } = useProducts()
const featuredProducts = products.slice(0, 8)
const bestsellers = products.slice(8, 16)

const categories = [
  { name: 'Bras & Sets', link: '/products?category=bras', count: 124 },
  { name: 'Bodysuits', link: '/products?category=bodysuits', count: 89 },
  { name: 'Chemises', link: '/products?category=chemises', count: 67 },
  { name: 'Corsets', link: '/products?category=corsets', count: 45 }
]
</script>

<style scoped>
/* Hero文字动画 */
h1, p, button {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
