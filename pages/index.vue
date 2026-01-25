<template>
  <div>
    <TheNavbar />
    
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-4">
      <div class="absolute inset-0 liquid-gradient opacity-20"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div class="glass-card rounded-3xl p-8 md:p-16 border border-pink-200 shadow-2xl">
          <p class="font-script text-3xl md:text-4xl text-primary mb-4 opacity-90">Where elegance meets desire</p>
          <h1 class="font-display text-h1 md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            Embrace Your<br/>Sensuality
          </h1>
          <p class="text-body md:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of luxury lingerie designed to make you feel confident, beautiful, and empowered.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/products" class="bg-cta hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl min-h-touch flex items-center justify-center">
              Shop Collection
            </NuxtLink>
            <a href="#featured" class="glass-card border border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer min-h-touch flex items-center justify-center">
              View Lookbook
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="featured" class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display text-h2 md:text-5xl font-bold text-primary mb-4">Why Choose Us</h2>
          <p class="text-slate-600 text-body max-w-2xl mx-auto leading-relaxed">Experience the perfect blend of luxury, comfort, and confidence</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="glass-card rounded-2xl p-8 border border-pink-200 hover-lift cursor-pointer">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
            </div>
            <h3 class="font-display text-h3 font-semibold mb-3 text-textPrimary">Premium Quality</h3>
            <p class="text-slate-600 text-body leading-loose">Handcrafted with the finest fabrics and materials for unmatched comfort and durability.</p>
          </div>
          
          <div class="glass-card rounded-2xl p-8 border border-pink-200 hover-lift cursor-pointer">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 class="font-display text-h3 font-semibold mb-3 text-textPrimary">Discreet Shipping</h3>
            <p class="text-slate-600 text-body leading-loose">Your privacy matters. All orders arrive in unmarked, secure packaging with fast delivery.</p>
          </div>
          
          <div class="glass-card rounded-2xl p-8 border border-pink-200 hover-lift cursor-pointer">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 class="font-display text-h3 font-semibold mb-3 text-textPrimary">Perfect Fit</h3>
            <p class="text-slate-600 text-body leading-loose">Comprehensive size guide and expert fitting advice to ensure your complete satisfaction.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 px-4 bg-white/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display text-h2 md:text-5xl font-bold text-primary mb-4">Featured Collections</h2>
          <p class="text-slate-600 text-body max-w-2xl mx-auto leading-relaxed">Explore our carefully curated selections for every occasion</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink to="/products" class="inline-block bg-cta hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl min-h-touch">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products } = useProducts()
const featuredProducts = products.slice(0, 6)
</script>
