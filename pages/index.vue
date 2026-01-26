<template>
  <div class="bg-white min-h-screen">
    <TheNavbar />
    
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center bg-white pt-20">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=1920&h=1080&fit=crop" 
          alt="Hero"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-7xl font-light mb-6 tracking-wider">
          INTIMATE ELEGANCE
        </h1>
        <p class="text-lg md:text-xl font-light mb-8 tracking-wide">
          Discover Luxury Lingerie
        </p>
        <NuxtLink to="/products" class="btn-primary inline-block">
          Shop Collection
        </NuxtLink>
      </div>
    </section>
    
    <!-- Featured Products -->
    <section class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-light text-primary mb-4 tracking-wider">FEATURED COLLECTION</h2>
          <p class="text-sm text-textMuted">Explore our carefully curated selections</p>
        </div>
        
        <div class="grid-products">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink to="/products" class="btn-secondary inline-block">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Categories -->
    <section class="py-20 px-6 bg-backgroundLight">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-light text-primary mb-4 tracking-wider">SHOP BY CATEGORY</h2>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.name"
            :to="category.link"
            class="group"
          >
            <div class="aspect-square bg-white border border-border overflow-hidden mb-3">
              <img 
                :src="category.image" 
                :alt="category.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 class="text-sm font-semibold text-center text-primary uppercase tracking-wider">
              {{ category.name }}
            </h3>
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-light text-primary mb-6 tracking-wider">OUR STORY</h2>
        <p class="text-textSecondary leading-relaxed mb-6">
          We believe every woman deserves to feel beautiful, confident, and empowered. Our journey began with a simple mission: to create luxury lingerie that celebrates femininity in all its forms.
        </p>
        <p class="text-textSecondary leading-relaxed mb-8">
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
