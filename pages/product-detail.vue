<template>
  <div>
    <TheNavbar />
    
    <section v-if="product" class="pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Breadcrumb -->
        <nav class="mb-6 flex items-center gap-2 text-sm text-slate-600">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/products" class="hover:text-primary transition-colors">Products</NuxtLink>
          <span>/</span>
          <span class="text-primary">{{ product.name }}</span>
        </nav>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Product Images Gallery -->
          <div>
            <!-- Main Image -->
            <div 
              @click="showImageModal = true"
              class="glass-card rounded-3xl overflow-hidden border border-pink-200 aspect-square mb-4 cursor-zoom-in relative group"
            >
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <svg class="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
                </svg>
              </div>
              
              <!-- 360 View Badge -->
              <div class="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                360° View
              </div>
            </div>
            
            <!-- Video Preview -->
            <div class="glass-card rounded-2xl overflow-hidden border border-pink-200 mb-4 relative group cursor-pointer" @click="showVideoModal = true">
              <div class="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <div class="text-center">
                  <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform">
                    <svg class="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                  </div>
                  <p class="text-sm font-semibold text-slate-700">Watch Product Video</p>
                  <p class="text-xs text-slate-500 mt-1">See it in action</p>
                </div>
              </div>
            </div>
            
            <!-- Trust Badges -->
            <div class="grid grid-cols-3 gap-3">
              <div class="glass-card rounded-lg p-3 border border-pink-200 text-center">
                <svg class="w-6 h-6 mx-auto mb-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <p class="text-xs text-slate-600 font-semibold">Authentic</p>
              </div>
              <div class="glass-card rounded-lg p-3 border border-pink-200 text-center">
                <svg class="w-6 h-6 mx-auto mb-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                </svg>
                <p class="text-xs text-slate-600 font-semibold">Fast Ship</p>
              </div>
              <div class="glass-card rounded-lg p-3 border border-pink-200 text-center">
                <svg class="w-6 h-6 mx-auto mb-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"/>
                </svg>
                <p class="text-xs text-slate-600 font-semibold">Premium</p>
              </div>
            </div>
          </div>
          
          <!-- Product Info -->
          <div>
            <!-- Badge and Actions -->
            <div class="flex items-center justify-between mb-4">
              <div v-if="product.badge" :class="`inline-block ${badgeColor} text-white px-4 py-2 rounded-full text-sm font-semibold`">
                {{ product.badge }}
              </div>
              <div class="flex gap-2">
                <button 
                  @click="toggleWishlist"
                  :class="[
                    'p-3 rounded-full border-2 transition-all duration-200 cursor-pointer',
                    isInWishlist ? 'bg-primary border-primary text-white' : 'border-pink-200 hover:border-primary'
                  ]"
                  title="Add to wishlist"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                  </svg>
                </button>
                <button 
                  @click="toggleCompare"
                  :class="[
                    'p-3 rounded-full border-2 transition-all duration-200 cursor-pointer',
                    isInCompare ? 'bg-primary border-primary text-white' : 'border-pink-200 hover:border-primary'
                  ]"
                  title="Add to compare"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </button>
                <button 
                  @click="shareProduct"
                  class="p-3 rounded-full border-2 border-pink-200 hover:border-primary transition-all duration-200 cursor-pointer"
                  title="Share product"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <h1 class="font-display text-4xl md:text-5xl font-bold text-primary mb-4">{{ product.name }}</h1>
            <p class="text-lg text-slate-600 mb-6 leading-relaxed">{{ product.description }}</p>
            
            <!-- Rating -->
            <div class="flex items-center gap-3 mb-6">
              <div class="flex items-center">
                <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= 4 ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span class="text-slate-600">4.0 (128 reviews)</span>
              <button @click="activeTab = 'reviews'" class="text-primary hover:underline text-sm cursor-pointer">
                Write a review
              </button>
            </div>
            
            <!-- Price and Stock -->
            <div class="mb-8">
              <div v-if="product.originalPrice" class="flex items-baseline gap-3 mb-3">
                <span class="font-display text-5xl font-bold text-primary">${{ product.price.toFixed(2) }}</span>
                <span class="text-2xl text-slate-400 line-through">${{ product.originalPrice.toFixed(2) }}</span>
                <span class="bg-cta text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save {{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
                </span>
              </div>
              <span v-else class="font-display text-5xl font-bold text-primary">${{ product.price.toFixed(2) }}</span>
              
              <div class="flex items-center gap-4 mt-3">
                <span class="inline-flex items-center gap-2 text-green-600 font-semibold">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  In Stock ({{ stockLevel }} left)
                </span>
                <span class="text-slate-600">• Ships within 24 hours</span>
              </div>
              
              <!-- Low Stock Warning -->
              <div v-if="stockLevel <= 5" class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                <svg class="w-5 h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <p class="text-sm text-yellow-800 font-semibold">Only {{ stockLevel }} left in stock - order soon!</p>
              </div>
            </div>
            
            <!-- Size Selection -->
            <div class="mb-6">
              <label class="block font-semibold mb-3 text-textPrimary">Size</label>
              <div class="flex gap-3">
                <button 
                  v-for="size in sizes" 
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-200 cursor-pointer min-h-touch',
                    selectedSize === size 
                      ? 'border-primary bg-primary text-white' 
                      : 'border-pink-200 hover:border-primary'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
              <NuxtLink to="/size-guide" class="inline-block mt-2 text-sm text-primary hover:underline">
                Size Guide →
              </NuxtLink>
            </div>
            
            <!-- Color Selection -->
            <div class="mb-8">
              <label class="block font-semibold mb-3 text-textPrimary">Color: {{ selectedColor }}</label>
              <div class="flex gap-3">
                <button 
                  v-for="color in colors" 
                  :key="color.name"
                  @click="selectedColor = color.name"
                  :class="[
                    'w-12 h-12 rounded-full border-4 transition-all duration-200 cursor-pointer',
                    selectedColor === color.name 
                      ? 'border-primary scale-110' 
                      : 'border-transparent hover:border-pink-200'
                  ]"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                />
              </div>
            </div>
            
            <!-- Quantity -->
            <div class="mb-8">
              <label class="block font-semibold mb-3 text-textPrimary">Quantity</label>
              <div class="flex items-center gap-4">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-12 h-12 border-2 border-pink-300 rounded-lg hover:bg-pink-50 transition-colors duration-200 cursor-pointer text-xl font-semibold"
                >
                  -
                </button>
                <span class="text-2xl font-semibold w-12 text-center">{{ quantity }}</span>
                <button 
                  @click="quantity++"
                  class="w-12 h-12 border-2 border-pink-300 rounded-lg hover:bg-pink-50 transition-colors duration-200 cursor-pointer text-xl font-semibold"
                >
                  +
                </button>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="space-y-3">
              <button 
                @click="handleAddToCart"
                class="w-full bg-cta hover:bg-yellow-600 text-white py-5 rounded-full text-lg font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl min-h-touch"
              >
                Add to Cart - ${{ (product.price * quantity).toFixed(2) }}
              </button>
              
              <button 
                @click="handleBuyNow"
                class="w-full bg-primary hover:bg-pink-700 text-white py-5 rounded-full text-lg font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl min-h-touch"
              >
                Buy Now - Fast Checkout
              </button>
              
              <NuxtLink 
                to="/products"
                class="block w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 rounded-full text-base font-semibold text-center transition-all duration-200 cursor-pointer"
              >
                Continue Shopping
              </NuxtLink>
            </div>
            
            <!-- Coupon Hint -->
            <div class="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-pink-50 border border-yellow-200 rounded-xl">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"/>
                </svg>
                <span class="font-semibold text-slate-800">Save More!</span>
              </div>
              <p class="text-sm text-slate-600">Use code <span class="font-bold text-primary">SAVE20</span> for 20% off your order</p>
            </div>
            
            <!-- Shipping Info -->
            <div class="mt-6 space-y-4">
              <!-- Shipping Calculator -->
              <div class="glass-card rounded-2xl p-4 border border-pink-200">
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span class="font-semibold text-textPrimary">Check Delivery Time</span>
                </div>
                <div class="flex gap-2">
                  <input 
                    v-model="zipCode"
                    type="text"
                    placeholder="Enter ZIP code"
                    class="flex-1 px-4 py-2 bg-white border border-pink-200 rounded-lg focus:outline-none focus:border-primary text-slate-800"
                    maxlength="10"
                  />
                  <button 
                    @click="calculateShipping"
                    class="px-6 py-2 bg-primary hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Check
                  </button>
                </div>
                <div v-if="shippingEstimate" class="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p class="text-sm text-green-800">
                    <span class="font-semibold">Estimated delivery:</span> {{ shippingEstimate }}
                  </p>
                </div>
              </div>
              
              <!-- Free Shipping & Returns -->
              <div class="glass-card rounded-2xl p-4 border border-pink-200">
                <div class="flex items-start gap-3 mb-3">
                  <svg class="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                  </svg>
                  <div>
                    <p class="font-semibold text-textPrimary">Free Shipping</p>
                    <p class="text-sm text-slate-600">On orders over $100</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  <div>
                    <p class="font-semibold text-textPrimary">Easy Returns</p>
                    <p class="text-sm text-slate-600">30-day return policy</p>
                  </div>
                </div>
              </div>
              
              <!-- Stock Notification -->
              <div v-if="stockLevel <= 3" class="glass-card rounded-2xl p-4 border border-pink-200">
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                  </svg>
                  <span class="font-semibold text-textPrimary">Notify Me</span>
                </div>
                <p class="text-sm text-slate-600 mb-3">Get notified when this item is back in stock</p>
                <div class="flex gap-2">
                  <input 
                    v-model="notifyEmail"
                    type="email"
                    placeholder="Your email"
                    class="flex-1 px-4 py-2 bg-white border border-pink-200 rounded-lg focus:outline-none focus:border-primary text-slate-800"
                  />
                  <button 
                    @click="subscribeNotification"
                    class="px-6 py-2 bg-primary hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Notify
                  </button>
                </div>
              </div>
              
              <!-- Social Share -->
              <div class="glass-card rounded-2xl p-4 border border-pink-200">
                <p class="font-semibold text-textPrimary mb-3">Share this product</p>
                <div class="flex gap-3">
                  <button 
                    @click="shareToSocial('facebook')"
                    class="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span class="text-sm font-semibold">Facebook</span>
                  </button>
                  <button 
                    @click="shareToSocial('twitter')"
                    class="flex-1 flex items-center justify-center gap-2 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    <span class="text-sm font-semibold">Twitter</span>
                  </button>
                  <button 
                    @click="shareToSocial('pinterest')"
                    class="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                    </svg>
                    <span class="text-sm font-semibold">Pin</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tabs Section -->
        <div class="mt-16">
          <div class="border-b border-pink-200 mb-8">
            <div class="flex gap-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'pb-4 font-semibold transition-all duration-200 cursor-pointer',
                  activeTab === tab.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-slate-600 hover:text-primary'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>
          
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'" class="glass-card rounded-2xl p-8 border border-pink-200">
            <h3 class="font-display text-2xl font-semibold mb-4 text-textPrimary">Product Description</h3>
            <p class="text-slate-600 leading-relaxed mb-6">
              Experience luxury and comfort with our premium lingerie collection. Each piece is carefully crafted 
              with the finest materials to ensure both elegance and comfort. Perfect for special occasions or 
              everyday wear, our designs celebrate your natural beauty.
            </p>
            
            <h4 class="font-semibold text-lg mb-3 text-textPrimary">Features:</h4>
            <ul class="space-y-2 text-slate-600">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Premium quality materials - soft, breathable, and durable
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Elegant design with attention to detail
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Perfect fit with adjustable features
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Easy care - hand wash recommended
              </li>
            </ul>
          </div>
          
          <!-- Specifications Tab -->
          <div v-if="activeTab === 'specifications'" class="glass-card rounded-2xl p-8 border border-pink-200">
            <h3 class="font-display text-2xl font-semibold mb-6 text-textPrimary">Specifications</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p class="text-sm text-slate-600 mb-1">Material</p>
                <p class="font-semibold text-textPrimary">90% Nylon, 10% Spandex</p>
              </div>
              <div>
                <p class="text-sm text-slate-600 mb-1">Care Instructions</p>
                <p class="font-semibold text-textPrimary">Hand wash cold, lay flat to dry</p>
              </div>
              <div>
                <p class="text-sm text-slate-600 mb-1">Origin</p>
                <p class="font-semibold text-textPrimary">Made in Italy</p>
              </div>
              <div>
                <p class="text-sm text-slate-600 mb-1">Style</p>
                <p class="font-semibold text-textPrimary">Elegant & Comfortable</p>
              </div>
            </div>
          </div>
          
          <!-- Size Chart Tab -->
          <div v-if="activeTab === 'size-chart'" class="glass-card rounded-2xl p-8 border border-pink-200">
            <h3 class="font-display text-2xl font-semibold mb-6 text-textPrimary">Size Comparison Chart</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b-2 border-pink-200">
                    <th class="py-3 px-4 font-semibold text-textPrimary">Size</th>
                    <th class="py-3 px-4 font-semibold text-textPrimary">Bust (inches)</th>
                    <th class="py-3 px-4 font-semibold text-textPrimary">Waist (inches)</th>
                    <th class="py-3 px-4 font-semibold text-textPrimary">Hips (inches)</th>
                    <th class="py-3 px-4 font-semibold text-textPrimary">US Size</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-pink-100 hover:bg-pink-50 transition-colors">
                    <td class="py-3 px-4 font-semibold text-primary">XS</td>
                    <td class="py-3 px-4 text-slate-600">30-32</td>
                    <td class="py-3 px-4 text-slate-600">23-25</td>
                    <td class="py-3 px-4 text-slate-600">33-35</td>
                    <td class="py-3 px-4 text-slate-600">0-2</td>
                  </tr>
                  <tr class="border-b border-pink-100 hover:bg-pink-50 transition-colors">
                    <td class="py-3 px-4 font-semibold text-primary">S</td>
                    <td class="py-3 px-4 text-slate-600">32-34</td>
                    <td class="py-3 px-4 text-slate-600">25-27</td>
                    <td class="py-3 px-4 text-slate-600">35-37</td>
                    <td class="py-3 px-4 text-slate-600">4-6</td>
                  </tr>
                  <tr class="border-b border-pink-100 hover:bg-pink-50 transition-colors">
                    <td class="py-3 px-4 font-semibold text-primary">M</td>
                    <td class="py-3 px-4 text-slate-600">34-36</td>
                    <td class="py-3 px-4 text-slate-600">27-29</td>
                    <td class="py-3 px-4 text-slate-600">37-39</td>
                    <td class="py-3 px-4 text-slate-600">8-10</td>
                  </tr>
                  <tr class="border-b border-pink-100 hover:bg-pink-50 transition-colors">
                    <td class="py-3 px-4 font-semibold text-primary">L</td>
                    <td class="py-3 px-4 text-slate-600">36-38</td>
                    <td class="py-3 px-4 text-slate-600">29-31</td>
                    <td class="py-3 px-4 text-slate-600">39-41</td>
                    <td class="py-3 px-4 text-slate-600">12-14</td>
                  </tr>
                  <tr class="hover:bg-pink-50 transition-colors">
                    <td class="py-3 px-4 font-semibold text-primary">XL</td>
                    <td class="py-3 px-4 text-slate-600">38-40</td>
                    <td class="py-3 px-4 text-slate-600">31-33</td>
                    <td class="py-3 px-4 text-slate-600">41-43</td>
                    <td class="py-3 px-4 text-slate-600">16-18</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 class="font-semibold text-blue-900 mb-2">How to Measure</h4>
              <ul class="space-y-2 text-sm text-blue-800">
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span><strong>Bust:</strong> Measure around the fullest part of your bust</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span><strong>Waist:</strong> Measure around the narrowest part of your waist</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span><strong>Hips:</strong> Measure around the fullest part of your hips</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- FAQ Tab -->
          <div v-if="activeTab === 'faq'" class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index" class="glass-card rounded-2xl border border-pink-200 overflow-hidden">
              <button 
                @click="toggleFaq(index)"
                class="w-full flex items-center justify-between p-6 text-left hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <span class="font-semibold text-textPrimary pr-4">{{ faq.question }}</span>
                <svg 
                  :class="['w-5 h-5 text-primary transition-transform flex-shrink-0', openFaq === index ? 'rotate-180' : '']" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div 
                v-show="openFaq === index"
                class="px-6 pb-6 text-slate-600 leading-relaxed"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
          
          <!-- Reviews Tab -->
          <div v-if="activeTab === 'reviews'">
            <div class="glass-card rounded-2xl p-8 border border-pink-200 mb-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-display text-2xl font-semibold text-textPrimary">Customer Reviews</h3>
                <button class="bg-primary hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 cursor-pointer">
                  Write a Review
                </button>
              </div>
              
              <div class="flex items-center gap-6 mb-8">
                <div class="text-center">
                  <div class="text-5xl font-bold text-primary mb-2">4.0</div>
                  <div class="flex items-center justify-center mb-1">
                    <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= 4 ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <p class="text-sm text-slate-600">Based on 128 reviews</p>
                </div>
                
                <div class="flex-1">
                  <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-3 mb-2">
                    <span class="text-sm text-slate-600 w-12">{{ star }} star</span>
                    <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div :class="`h-full bg-yellow-400`" :style="{ width: star === 5 ? '60%' : star === 4 ? '30%' : '10%' }"></div>
                    </div>
                    <span class="text-sm text-slate-600 w-12">{{ star === 5 ? '77' : star === 4 ? '38' : '13' }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Individual Reviews -->
            <div class="space-y-4">
              <div v-for="review in reviews" :key="review.id" class="glass-card rounded-2xl p-6 border border-pink-200">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <p class="font-semibold text-textPrimary">{{ review.author }}</p>
                    <div class="flex items-center gap-2 mt-1">
                      <div class="flex">
                        <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <span class="text-sm text-slate-600">{{ review.date }}</span>
                    </div>
                  </div>
                  <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Verified Purchase</span>
                </div>
                <p class="text-slate-600 leading-relaxed">{{ review.comment }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Related Products -->
        <div class="mt-20">
          <h2 class="font-display text-3xl font-bold text-primary mb-8 text-center">You May Also Like</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              v-for="relatedProduct in relatedProducts" 
              :key="relatedProduct.id" 
              :product="relatedProduct" 
            />
          </div>
        </div>
      </div>
    </section>
    
    <section v-else class="pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="font-display text-4xl font-bold text-primary mb-4">Product Not Found</h1>
        <NuxtLink to="/products" class="inline-block bg-cta hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 cursor-pointer">
          Back to Products
        </NuxtLink>
      </div>
    </section>
    
    <TheFooter />
    
    <!-- Image Modal -->
    <Teleport to="body">
      <div v-if="showImageModal" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" @click="showImageModal = false">
        <button 
          @click="showImageModal = false"
          class="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
        >
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <img 
          v-if="product"
          :src="product.image" 
          :alt="product.name"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />
      </div>
    </Teleport>
    
    <!-- Video Modal -->
    <Teleport to="body">
      <div v-if="showVideoModal" class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" @click="showVideoModal = false">
        <button 
          @click="showVideoModal = false"
          class="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-10"
        >
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div class="max-w-4xl w-full" @click.stop>
          <div class="aspect-video bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center">
            <div class="text-center text-white">
              <svg class="w-24 h-24 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
              </svg>
              <p class="text-xl font-semibold">Product Video Demo</p>
              <p class="text-sm opacity-75 mt-2">Video content would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>


<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const { products, getProductById } = useProducts()

const productId = computed(() => parseInt(route.query.id as string))
const product = computed(() => getProductById(productId.value))

// Stock level (random for demo)
const stockLevel = ref(Math.floor(Math.random() * 20) + 3)

// Image modal
const showImageModal = ref(false)
const showVideoModal = ref(false)

// Product options
const selectedSize = ref('M')
const selectedColor = ref('Black')
const quantity = ref(1)

const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = [
  { name: 'Black', hex: '#1F2937' },
  { name: 'White', hex: '#F9FAFB' },
  { name: 'Pink', hex: '#F9A8D4' },
  { name: 'Red', hex: '#DC2626' }
]

// Wishlist
const isInWishlist = ref(false)

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value
  
  if (process.client) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    
    if (isInWishlist.value) {
      if (!wishlist.includes(productId.value)) {
        wishlist.push(productId.value)
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
      }
    } else {
      const index = wishlist.indexOf(productId.value)
      if (index > -1) {
        wishlist.splice(index, 1)
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
      }
    }
  }
}

// Compare
const isInCompare = ref(false)

const toggleCompare = () => {
  isInCompare.value = !isInCompare.value
  
  if (process.client) {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]')
    
    if (isInCompare.value) {
      if (compareList.length >= 4) {
        alert('You can only compare up to 4 products at a time')
        isInCompare.value = false
        return
      }
      
      if (!compareList.find((p: any) => p.id === productId.value)) {
        compareList.push({
          id: product.value?.id,
          name: product.value?.name,
          price: product.value?.price,
          image: product.value?.image,
          category: product.value?.category
        })
        localStorage.setItem('compareList', JSON.stringify(compareList))
        alert('Product added to compare list!')
      }
    } else {
      const index = compareList.findIndex((p: any) => p.id === productId.value)
      if (index > -1) {
        compareList.splice(index, 1)
        localStorage.setItem('compareList', JSON.stringify(compareList))
      }
    }
  }
}

// Check if in wishlist on mount
const checkWishlist = () => {
  if (process.client) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    isInWishlist.value = wishlist.includes(productId.value)
    
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]')
    isInCompare.value = compareList.some((p: any) => p.id === productId.value)
  }
}

// Save to recently viewed
const saveToRecentlyViewed = () => {
  if (process.client && product.value) {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    
    // Remove if already exists
    const index = recentlyViewed.findIndex((p: any) => p.id === product.value?.id)
    if (index > -1) {
      recentlyViewed.splice(index, 1)
    }
    
    // Add to beginning
    recentlyViewed.unshift({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      viewedAt: new Date().toISOString()
    })
    
    // Keep only last 10
    if (recentlyViewed.length > 10) {
      recentlyViewed.pop()
    }
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
  }
}

// Share
const shareProduct = async () => {
  if (navigator.share && product.value) {
    try {
      await navigator.share({
        title: product.value.name,
        text: product.value.description,
        url: window.location.href
      })
    } catch (err) {
      console.log('Share failed:', err)
    }
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}

// Tabs
const activeTab = ref('description')
const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'size-chart', label: 'Size Chart' },
  { id: 'faq', label: 'FAQ' },
  { id: 'reviews', label: 'Reviews (128)' }
]

// FAQ
const openFaq = ref<number | null>(null)
const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

const faqs = [
  {
    question: 'What materials are used in this product?',
    answer: 'Our lingerie is crafted from premium quality materials including 90% Nylon and 10% Spandex, ensuring both comfort and durability. The fabric is soft, breathable, and designed to maintain its shape and color after multiple washes.'
  },
  {
    question: 'How should I care for this item?',
    answer: 'We recommend hand washing in cold water with mild detergent. Lay flat to dry and avoid using bleach or fabric softeners. Do not tumble dry or iron. Following these care instructions will help maintain the quality and longevity of your lingerie.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unworn, unwashed items with original tags attached. Returns are free and easy - simply contact our customer service team to initiate a return. Refunds are processed within 5-7 business days of receiving the returned item.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days within the US. Express shipping (1-2 business days) is available at checkout. Free shipping is offered on all orders over $100. International shipping times vary by location.'
  },
  {
    question: 'Is this true to size?',
    answer: 'Yes, our products are true to size. We recommend referring to our detailed size chart above for the best fit. If you are between sizes, we suggest sizing up for a more comfortable fit. Our customer service team is also available to help with sizing questions.'
  },
  {
    question: 'Can I exchange for a different size or color?',
    answer: 'Absolutely! We offer free exchanges within 30 days of purchase. Simply contact our customer service team, and we will send you a prepaid return label. Once we receive your return, we will ship out your exchange immediately.'
  }
]

// Shipping calculator
const zipCode = ref('')
const shippingEstimate = ref('')

const calculateShipping = () => {
  if (!zipCode.value) {
    alert('Please enter a ZIP code')
    return
  }
  
  // Simulate shipping calculation
  const days = Math.floor(Math.random() * 3) + 3 // 3-5 days
  const date = new Date()
  date.setDate(date.getDate() + days)
  
  shippingEstimate.value = `${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} (${days} business days)`
}

// Stock notification
const notifyEmail = ref('')

const subscribeNotification = () => {
  if (!notifyEmail.value || !notifyEmail.value.includes('@')) {
    alert('Please enter a valid email address')
    return
  }
  
  // Save to localStorage
  if (process.client) {
    const notifications = JSON.parse(localStorage.getItem('stockNotifications') || '[]')
    notifications.push({
      productId: productId.value,
      email: notifyEmail.value,
      date: new Date().toISOString()
    })
    localStorage.setItem('stockNotifications', JSON.stringify(notifications))
  }
  
  alert('Thank you! We will notify you when this item is back in stock.')
  notifyEmail.value = ''
}

// Social sharing
const shareToSocial = (platform: string) => {
  if (!product.value) return
  
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(product.value.name)
  
  let shareUrl = ''
  
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
      break
    case 'pinterest':
      shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}&media=${encodeURIComponent(product.value.image)}`
      break
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }
}

// Reviews data
const reviews = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    date: 'January 15, 2026',
    comment: 'Absolutely love this! The quality is amazing and it fits perfectly. Highly recommend!'
  },
  {
    id: 2,
    author: 'Emily R.',
    rating: 4,
    date: 'January 10, 2026',
    comment: 'Beautiful design and very comfortable. The material is soft and luxurious.'
  },
  {
    id: 3,
    author: 'Jessica L.',
    rating: 5,
    date: 'January 5, 2026',
    comment: 'This exceeded my expectations! The attention to detail is incredible. Will definitely buy more.'
  }
]

// Related products
const relatedProducts = computed(() => {
  if (!product.value) return []
  return products
    .filter(p => p.id !== product.value?.id)
    .slice(0, 4)
})

const badgeColor = computed(() => {
  if (product.value?.badge === 'Sale') return 'bg-cta'
  if (product.value?.badge === 'Bestseller') return 'bg-primary'
  return 'bg-cta'
})

const handleAddToCart = () => {
  if (!product.value) return
  
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
    image: product.value.image
  })
  
  // Open cart sidebar
  const isCartOpen = useState('cartSidebarOpen')
  isCartOpen.value = true
  
  // Reset quantity
  quantity.value = 1
}

const handleBuyNow = () => {
  if (!product.value) return
  
  // Add to cart first
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
    image: product.value.image
  })
  
  // Navigate to checkout
  navigateTo('/checkout')
}

onMounted(() => {
  cartStore.loadCart()
  checkWishlist()
  saveToRecentlyViewed()
})

// Close image modal on escape
if (process.client) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showImageModal.value = false
      showVideoModal.value = false
    }
  })
}
</script>
