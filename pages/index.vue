<template>
  <div class="bg-white min-h-screen">
    <TheNavbar />
    
    <!-- Hero Section - 全屏从顶部开始 -->
    <section class="relative h-screen flex items-center justify-center bg-black">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=1920&h=1080&fit=crop" 
          alt="Hero"
          class="w-full h-full object-cover opacity-60"
        />
      </div>
      
      <div class="relative z-10 text-center text-white px-6">
        <h1 class="text-6xl md:text-8xl font-light mb-8 tracking-widest uppercase">
          INTIMATE ELEGANCE
        </h1>
        <p class="text-base md:text-lg font-light mb-12 tracking-widest uppercase">
          Luxury Lingerie Collection
        </p>
        <NuxtLink to="/products" class="btn-primary inline-block">
          Explore Collection
        </NuxtLink>
      </div>
    </section>
    
    <!-- Featured Products -->
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-light text-primary mb-4 tracking-widest uppercase">Featured Collection</h2>
          <div class="w-16 h-px bg-primary mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div class="text-center mt-16">
          <NuxtLink to="/products" class="btn-secondary inline-block">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Categories -->
    <section class="py-24 px-6 bg-backgroundLight">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-light text-primary mb-4 tracking-widest uppercase">Shop by Category</h2>
          <div class="w-16 h-px bg-primary mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.name"
            :to="category.link"
            class="group"
          >
            <div class="aspect-square bg-white border border-border overflow-hidden mb-4">
              <img 
                :src="category.image" 
                :alt="category.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <h3 class="text-xs font-semibold text-center text-primary uppercase tracking-widest">
              {{ category.name }}
            </h3>
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="py-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl font-light text-primary mb-8 tracking-widest uppercase">Our Story</h2>
        <div class="w-16 h-px bg-primary mx-auto mb-12"></div>
        <p class="text-textSecondary leading-loose mb-8 text-base">
          We believe every woman deserves to feel beautiful, confident, and empowered. Our journey began with a simple mission: to create luxury lingerie that celebrates femininity in all its forms.
        </p>
        <p class="text-textSecondary leading-loose mb-12 text-base">
          Each piece in our collection is thoughtfully designed and crafted with premium materials, ensuring both comfort and elegance.
        </p>
        <NuxtLink to="/about" class="btn-secondary inline-block">
          Learn More
        </NuxtLink>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products } = useProducts()
const featuredProducts = products.slice(0, 8)

const categories = [
  {
    name: 'Bras & Sets',
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop',
    link: '/products?category=bras'
  },
  {
    name: 'Bodysuits',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop',
    link: '/products?category=bodysuits'
  },
  {
    name: 'Chemises',
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop',
    link: '/products?category=chemises'
  },
  {
    name: 'Corsets',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop',
    link: '/products?category=corsets'
  }
]
</script>
