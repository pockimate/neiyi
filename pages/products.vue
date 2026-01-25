<template>
  <div>
    <TheNavbar />
    
    <!-- Hero Section -->
    <section class="pt-32 pb-12 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-display text-5xl md:text-6xl font-bold text-primary mb-4">Our Collection</h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">Discover luxury lingerie designed to celebrate your beauty</p>
        
        <!-- Test Link -->
        <div class="mt-4">
          <a href="/products/detail?id=1" class="text-blue-600 underline">Test Link: Go to Product 1</a>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <p class="text-slate-600">Showing <span class="font-semibold">{{ products.length }}</span> products</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products } = useProducts()
</script>
