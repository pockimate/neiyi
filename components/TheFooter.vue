<template>
  <footer class="bg-white border-t border-border">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- 品牌信息 -->
        <div>
          <h3 class="text-lg font-semibold uppercase tracking-wider mb-4">
            Intimate Elegance
          </h3>
          <p class="text-sm text-textMuted leading-relaxed">
            Luxury lingerie designed to make you feel confident, beautiful, and empowered.
          </p>
        </div>
        
        <!-- Shop -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider mb-4">
            Shop
          </h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/products" class="text-sm text-textMuted hover:text-primary transition-colors">
                All Products
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?filter=new" class="text-sm text-textMuted hover:text-primary transition-colors">
                New Arrivals
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?filter=bestsellers" class="text-sm text-textMuted hover:text-primary transition-colors">
                Bestsellers
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?filter=sale" class="text-sm text-textMuted hover:text-primary transition-colors">
                Sale
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Customer Service -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider mb-4">
            Customer Service
          </h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/contact" class="text-sm text-textMuted hover:text-primary transition-colors">
                Contact Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shipping" class="text-sm text-textMuted hover:text-primary transition-colors">
                Shipping Info
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/returns" class="text-sm text-textMuted hover:text-primary transition-colors">
                Returns
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/size-guide" class="text-sm text-textMuted hover:text-primary transition-colors">
                Size Guide
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- About -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider mb-4">
            About
          </h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/about" class="text-sm text-textMuted hover:text-primary transition-colors">
                Our Story
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="text-sm text-textMuted hover:text-primary transition-colors">
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="text-sm text-textMuted hover:text-primary transition-colors">
                Terms of Service
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 社交媒体 -->
      <div class="flex justify-center gap-6 mb-8 pb-8 border-b border-border">
        <a href="#" class="text-primary hover:opacity-60 transition-opacity" aria-label="Instagram">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="#" class="text-primary hover:opacity-60 transition-opacity" aria-label="Facebook">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="#" class="text-primary hover:opacity-60 transition-opacity" aria-label="Pinterest">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
      
      <!-- 版权信息 -->
      <div class="text-center">
        <p class="text-xs text-textMuted uppercase tracking-wide">
          © 2026 Intimate Elegance. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
