<template>
  <footer class="bg-white border-t border-border">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- 品牌信息 -->
        <div>
          <h3 class="text-lg font-semibold uppercase tracking-wider mb-4">
            Intimate Elegance
          </h3>
          <p class="text-sm text-textMuted leading-relaxed mb-6">
            Luxury lingerie designed to make you feel confident, beautiful, and empowered.
          </p>
          
          <!-- 语言/货币切换器 -->
          <div class="space-y-3">
            <div class="relative">
              <button 
                @click="toggleLanguageDropdown"
                class="w-full flex items-center justify-between px-3 py-2 border border-border text-sm hover:border-accent transition-colors"
              >
                <span class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                  </svg>
                  {{ selectedLanguage }}
                </span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <Transition name="fade">
                <div v-if="isLanguageDropdownOpen" class="absolute bottom-full left-0 right-0 mb-2 bg-white border border-border shadow-lg z-10">
                  <button
                    v-for="lang in languages"
                    :key="lang.code"
                    @click="selectLanguage(lang)"
                    class="w-full px-3 py-2 text-sm text-left hover:bg-backgroundLight transition-colors"
                    :class="{ 'bg-backgroundLight': selectedLanguage === lang.name }"
                  >
                    {{ lang.name }}
                  </button>
                </div>
              </Transition>
            </div>
            
            <div class="relative">
              <button 
                @click="toggleCurrencyDropdown"
                class="w-full flex items-center justify-between px-3 py-2 border border-border text-sm hover:border-accent transition-colors"
              >
                <span class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ selectedCurrency }}
                </span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <Transition name="fade">
                <div v-if="isCurrencyDropdownOpen" class="absolute bottom-full left-0 right-0 mb-2 bg-white border border-border shadow-lg z-10">
                  <button
                    v-for="curr in currencies"
                    :key="curr.code"
                    @click="selectCurrency(curr)"
                    class="w-full px-3 py-2 text-sm text-left hover:bg-backgroundLight transition-colors"
                    :class="{ 'bg-backgroundLight': selectedCurrency === curr.name }"
                  >
                    {{ curr.name }}
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
        
        <!-- Shop - Mobile Accordion -->
        <div>
          <button
            @click="toggleSection('shop')"
            class="md:hidden w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider mb-4"
          >
            Shop
            <svg 
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': openSections.shop }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <h4 class="hidden md:block text-sm font-semibold uppercase tracking-wider mb-4">
            Shop
          </h4>
          <ul 
            class="space-y-2 overflow-hidden transition-all duration-300"
            :class="openSections.shop || !isMobile ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
          >
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
        
        <!-- Customer Service - Mobile Accordion -->
        <div>
          <button
            @click="toggleSection('service')"
            class="md:hidden w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider mb-4"
          >
            Customer Service
            <svg 
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': openSections.service }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <h4 class="hidden md:block text-sm font-semibold uppercase tracking-wider mb-4">
            Customer Service
          </h4>
          <ul 
            class="space-y-2 overflow-hidden transition-all duration-300"
            :class="openSections.service || !isMobile ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
          >
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
        
        <!-- About - Mobile Accordion -->
        <div>
          <button
            @click="toggleSection('about')"
            class="md:hidden w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider mb-4"
          >
            About
            <svg 
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': openSections.about }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <h4 class="hidden md:block text-sm font-semibold uppercase tracking-wider mb-4">
            About
          </h4>
          <ul 
            class="space-y-2 overflow-hidden transition-all duration-300"
            :class="openSections.about || !isMobile ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
          >
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
      
      <!-- 支付方式 & 信任徽章 -->
      <div class="mb-8 pb-8 border-b border-border">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 支付方式 -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider mb-4 text-center md:text-left">
              We Accept
            </h4>
            <div class="flex flex-wrap justify-center md:justify-start items-center gap-3">
              <!-- Visa -->
              <div class="w-12 h-8 bg-white border border-border rounded flex items-center justify-center p-1">
                <svg viewBox="0 0 48 32" class="w-full h-full">
                  <rect fill="#00579F" width="48" height="32"/>
                  <path fill="#FFF" d="M19.8 21.3l1.9-11.6h3l-1.9 11.6h-3zm13.7-11.3c-.6-.2-1.5-.5-2.6-.5-2.9 0-4.9 1.5-4.9 3.6 0 1.6 1.4 2.4 2.5 2.9 1.1.5 1.5.9 1.5 1.3 0 .7-.8 1-1.6 1-1.1 0-1.6-.2-2.5-.5l-.3-.2-.4 2.3c.7.3 2 .6 3.3.6 3.1 0 5.1-1.5 5.1-3.8 0-1.2-.7-2.2-2.4-2.9-1-.5-1.6-.8-1.6-1.3 0-.4.5-.9 1.5-.9.9 0 1.5.2 2 .4l.2.1.4-2.1zm6.1 7.5c.2-.6 1.2-3.2 1.2-3.2l.2-.5.1.6s.4 1.7.5 2.1h-2zm3.8-7.8h-2.3c-.7 0-1.3.2-1.6.9l-4.5 10.7h3.1l.6-1.7h3.8c.1.4.4 1.7.4 1.7h2.7l-2.2-11.6zm-23.5 0l-3 7.9-.3-1.6c-.5-1.8-2.2-3.7-4.1-4.7l2.7 9.9h3.1l4.7-11.5h-3.1z"/>
                  <path fill="#FAA61A" d="M10.5 9.7H5.6L5.5 10c3.7.9 6.1 3.1 7.1 5.8l-1-4.9c-.2-.7-.7-.9-1.4-.9z"/>
                </svg>
              </div>
              
              <!-- Mastercard -->
              <div class="w-12 h-8 bg-white border border-border rounded flex items-center justify-center p-1">
                <svg viewBox="0 0 48 32" class="w-full h-full">
                  <rect fill="#000" width="48" height="32" rx="4"/>
                  <circle fill="#EB001B" cx="18" cy="16" r="10"/>
                  <circle fill="#F79E1B" cx="30" cy="16" r="10"/>
                  <path fill="#FF5F00" d="M24 8.7c-2.4 1.8-4 4.7-4 8s1.6 6.2 4 8c2.4-1.8 4-4.7 4-8s-1.6-6.2-4-8z"/>
                </svg>
              </div>
              
              <!-- PayPal -->
              <div class="w-12 h-8 bg-white border border-border rounded flex items-center justify-center p-1">
                <svg viewBox="0 0 48 32" class="w-full h-full">
                  <rect fill="#FFF" width="48" height="32"/>
                  <path fill="#003087" d="M18.5 8h-4.2c-.3 0-.5.2-.6.5l-1.7 10.8c0 .2.1.4.3.4h2c.3 0 .5-.2.6-.5l.5-2.9c0-.3.3-.5.6-.5h1.3c2.7 0 4.3-1.3 4.7-3.9.2-1.1 0-2-.5-2.6-.6-.7-1.6-1-3-1zm.5 3.8c-.2 1.5-1.3 1.5-2.4 1.5h-.6l.4-2.6c0-.2.2-.3.3-.3h.3c.8 0 1.5 0 1.9.4.2.3.3.6.1 1z"/>
                  <path fill="#009CDE" d="M29.5 11.7h-2c-.2 0-.3.1-.3.3l-.1.5-.1-.2c-.4-.6-1.2-.8-2-.8-1.9 0-3.5 1.4-3.8 3.4-.2 1 .1 2 .6 2.6.5.6 1.2.8 2.1.8 1.5 0 2.3-.9 2.3-.9l-.1.5c0 .2.1.4.3.4h1.8c.3 0 .5-.2.6-.5l1-6.7c0-.2-.1-.4-.3-.4zm-2.8 3.8c-.2 1-.9 1.6-1.9 1.6-.5 0-.9-.2-1.1-.5-.2-.3-.3-.7-.2-1.2.2-.9.9-1.6 1.9-1.6.5 0 .9.2 1.1.5.2.3.3.8.2 1.2z"/>
                  <path fill="#003087" d="M35.5 11.7h-2c-.2 0-.4.1-.5.3l-2.9 4.2-1.2-4c-.1-.3-.3-.5-.6-.5h-2c-.2 0-.4.2-.3.5l2.3 6.8-2.2 3c-.1.2 0 .5.2.5h2c.2 0 .4-.1.5-.3l7-10.1c.2-.2 0-.5-.3-.5z"/>
                </svg>
              </div>
              
              <!-- American Express -->
              <div class="w-12 h-8 bg-white border border-border rounded flex items-center justify-center p-1">
                <svg viewBox="0 0 48 32" class="w-full h-full">
                  <rect fill="#006FCF" width="48" height="32"/>
                  <path fill="#FFF" d="M10 12h3.5l.8 2 .8-2h3.5v6.5l2.5-6.5h3l2.5 6.5v-6.5h3v10h-4.5l-2-5-2 5H16v-7.5l-2.5 7.5H10l-3-10h3.5l1.5 5 1.5-5z"/>
                </svg>
              </div>
              
              <!-- Apple Pay -->
              <div class="w-12 h-8 bg-white border border-border rounded flex items-center justify-center p-1">
                <svg viewBox="0 0 48 32" class="w-full h-full">
                  <rect fill="#000" width="48" height="32"/>
                  <path fill="#FFF" d="M16.5 11c.5-.6.8-1.5.7-2.4-.7 0-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.2.8.1 1.7-.4 2.2-1zm.7 1.1c-1.2-.1-2.2.7-2.8.7-.6 0-1.5-.6-2.5-.6-1.3 0-2.5.7-3.1 1.9-1.3 2.3-.3 5.7 1 7.6.6.9 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6 1.2 0 1.5.6 2.5.6 1 0 1.7-1 2.3-2 .7-1 1-2 1-2.1 0 0-2-.8-2-3 0-1.9 1.5-2.8 1.6-2.8-.9-1.3-2.3-1.5-2.8-1.6z"/>
                </svg>
              </div>
              
              <!-- Google Pay -->
              <div class="w-12 h-8 bg-white border border-border rounded flex items-center justify-center p-1">
                <svg viewBox="0 0 48 32" class="w-full h-full">
                  <rect fill="#FFF" width="48" height="32"/>
                  <path fill="#5F6368" d="M22 12v8h-2v-8h2zm-4 0c-.8 0-1.5.3-2 .8l-.1-1h-2v8h2v-4.5c0-1.2.5-2 1.5-2 .9 0 1.5.6 1.5 1.8V20h2v-5c0-2-1.1-3-2.9-3zm8 0c-2.2 0-3.5 1.5-3.5 4s1.3 4 3.5 4c1.2 0 2.2-.5 2.8-1.3l-1.3-1c-.3.5-.9.8-1.5.8-1 0-1.7-.6-1.8-1.5h5v-.5c0-2.5-1.3-4.5-3.2-4.5zm-1.2 3.5c.1-.8.7-1.5 1.2-1.5.6 0 1.1.7 1.2 1.5h-2.4z"/>
                  <path fill="#4285F4" d="M35 12c-.8 0-1.5.3-2 .8l-.1-1h-2v11h2v-4c.5.5 1.2.8 2 .8 1.8 0 3-1.5 3-4s-1.2-4-3-4zm-.3 6c-1 0-1.7-.8-1.7-2s.7-2 1.7-2 1.7.8 1.7 2-.7 2-1.7 2z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- 信任徽章 -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider mb-4 text-center md:text-left">
              Trust & Security
            </h4>
            <div class="flex flex-wrap justify-center md:justify-start items-center gap-4">
              <!-- SSL Secure -->
              <div class="flex items-center gap-2 px-3 py-2 bg-backgroundLight border border-border rounded">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs font-semibold">SSL Secure</span>
              </div>
              
              <!-- 30-Day Returns -->
              <div class="flex items-center gap-2 px-3 py-2 bg-backgroundLight border border-border rounded">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                </svg>
                <span class="text-xs font-semibold">30-Day Returns</span>
              </div>
              
              <!-- Money Back Guarantee -->
              <div class="flex items-center gap-2 px-3 py-2 bg-backgroundLight border border-border rounded">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold whitespace-nowrap">Money Back</span>
              </div>
            </div>
          </div>
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
    
    <!-- 实时客服入口 (Floating Chat Button) -->
    <button
      @click="openLiveChat"
      class="fixed bottom-6 right-6 w-14 h-14 bg-accent hover:bg-primary text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
      aria-label="Live Chat"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
      <span class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
    </button>
  </footer>
</template>

<script setup lang="ts">
const isMobile = ref(false)
const openSections = ref({
  shop: false,
  service: false,
  about: false
})

// Language & Currency
const isLanguageDropdownOpen = ref(false)
const isCurrencyDropdownOpen = ref(false)
const selectedLanguage = ref('English (US)')
const selectedCurrency = ref('USD ($)')

const languages = [
  { code: 'en', name: 'English (US)' },
  { code: 'zh', name: '中文 (简体)' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' }
]

const currencies = [
  { code: 'USD', name: 'USD ($)' },
  { code: 'EUR', name: 'EUR (€)' },
  { code: 'GBP', name: 'GBP (£)' },
  { code: 'CNY', name: 'CNY (¥)' },
  { code: 'JPY', name: 'JPY (¥)' }
]

const toggleSection = (section: 'shop' | 'service' | 'about') => {
  openSections.value[section] = !openSections.value[section]
}

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
  isCurrencyDropdownOpen.value = false
}

const toggleCurrencyDropdown = () => {
  isCurrencyDropdownOpen.value = !isCurrencyDropdownOpen.value
  isLanguageDropdownOpen.value = false
}

const selectLanguage = (lang: typeof languages[0]) => {
  selectedLanguage.value = lang.name
  isLanguageDropdownOpen.value = false
  // TODO: Implement language change logic
  console.log('Language changed to:', lang.code)
}

const selectCurrency = (curr: typeof currencies[0]) => {
  selectedCurrency.value = curr.name
  isCurrencyDropdownOpen.value = false
  // TODO: Implement currency change logic
  console.log('Currency changed to:', curr.code)
}

const openLiveChat = () => {
  // TODO: Integrate with live chat service (e.g., Intercom, Zendesk, Tawk.to)
  console.log('Opening live chat...')
  alert('Live chat feature coming soon! For now, please contact us at support@intimateelegance.com')
}

const checkMobile = () => {
  if (process.client) {
    isMobile.value = window.innerWidth < 768
  }
}

onMounted(() => {
  checkMobile()
  if (process.client) {
    window.addEventListener('resize', checkMobile)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', checkMobile)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
