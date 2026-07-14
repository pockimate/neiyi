<template>
  <div class="bg-primary-800 min-h-screen pb-20 md:pb-0">
    <TheNavbar />
    
    <section v-if="product" class="pt-24 pb-20">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <!-- Breadcrumb -->
        <Breadcrumb :items="[
          { label: 'Products', to: '/products' },
          { label: product.name }
        ]" />
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <!-- Left: Product Images -->
          <div>
            <!-- Main Image - 正方形 with Zoom -->
            <div 
              class="mb-4 aspect-square bg-transparent border border-border overflow-hidden group relative cursor-zoom-in"
              @mouseenter="showZoom = true"
              @mouseleave="showZoom = false"
              @mousemove="handleMouseMove"
              @click="openLightbox"
            >
              <img 
                ref="mainImageRef"
                :src="currentImage" 
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-500"
                :class="{ 'scale-150': showZoom }"
                :style="zoomStyle"
              />
              
              <!-- 全屏查看图标 -->
              <div class="absolute top-4 right-4 w-10 h-10 bg-primary-900/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10">
                <svg class="w-5 h-5 text-cream-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                </svg>
              </div>
              
              <!-- Zoom 提示 -->
              <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Hover to zoom • Click for fullscreen
              </div>
            </div>
            
            <!-- Thumbnail Gallery - 正方形缩略图 -->
            <div class="grid grid-cols-4 gap-3">
              <button
                v-for="(image, index) in productImages"
                :key="index"
                @click="selectImage(index)"
                :class="[
                  'aspect-square border-2 transition-all duration-300 overflow-hidden cursor-pointer group relative',
                  currentImageIndex === index 
                    ? 'border-accent shadow-md' 
                    : 'border-border hover:border-accent hover:shadow-sm'
                ]"
              >
                <img 
                  :src="image" 
                  :alt="`${product.name} view ${index + 1}`"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <!-- 选中指示器 -->
                <div 
                  v-if="currentImageIndex === index"
                  class="absolute inset-0 bg-accent/10 pointer-events-none"
                ></div>
              </button>
            </div>
          </div>
          
          <!-- Right: Product Info -->
          <div>
            <!-- Badge -->
            <div 
              v-if="product.badge" 
              :class="getBadgeClass(product.badge)"
              class="inline-block mb-4"
            >
              {{ product.badge }}
            </div>
            
            <!-- Product Name -->
            <h1 class="text-3xl font-normal text-cream-200 mb-4 leading-tight">
              {{ product.name }}
            </h1>
            
            <!-- Description -->
            <p class="text-sm text-cream-200 mb-6 leading-relaxed">
              {{ product.description }}
            </p>
            
            <!-- Rating -->
            <div class="flex items-center gap-3 mb-6 pb-6 border-b border-border">
              <div class="flex text-accent">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" :fill="i <= Math.round(Number(overallRating)) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span class="text-sm text-cream-300">{{ overallRating }} ({{ reviews.length }} reviews)</span>
            </div>
            
            <!-- Price -->
            <div class="mb-8">
              <div class="flex items-baseline gap-3">
                <span class="text-3xl font-semibold text-cream-200">${{ (product.price ?? 0).toFixed(2) }}</span>
                <span v-if="product.originalPrice" class="text-lg text-cream-300 line-through">${{ (product.originalPrice ?? 0).toFixed(2) }}</span>
              </div>
              <p v-if="product.stock === 0" class="text-sm text-red-400 mt-2 font-semibold">Out of stock — restocking soon</p>
              <p v-else-if="product.stock <= 5" class="text-sm text-orange-400 mt-2 font-semibold">Only {{ product.stock }} left — selling fast</p>
              <p v-else class="text-sm text-green-400 mt-2">In stock — ships within 24 hours</p>
            </div>
            
            <!-- Size Selection -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <label class="text-sm font-semibold text-cream-200 uppercase tracking-wider">
                  Size: {{ selectedSize }}
                </label>
                <NuxtLink to="/size-guide" class="text-xs text-cream-300 hover:text-cream-200 transition-colors underline">
                  Size Guide
                </NuxtLink>
              </div>
              <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="size in sizesWithStock"
                  :key="size.name"
                  @click="selectSize(size.name)"
                  :disabled="size.stock === 0"
                  :class="[
                    'size-selector py-3 text-sm font-semibold border transition-all duration-200 relative',
                    selectedSize === size.name 
                      ? 'bg-primary-900/60 text-white border-accent-500/40' 
                      : size.stock === 0
                        ? 'bg-primary-950/40 text-cream-300 border-accent-500/20 cursor-not-allowed'
                        : 'bg-primary-800 text-cream-200 border-border hover:border-accent-500/40 cursor-pointer'
                  ]"
                  :title="size.stock === 0 ? 'Out of stock' : `${size.stock} in stock`"
                >
                  {{ size.name }}
                  <!-- 售罄标记 -->
                  <span 
                    v-if="size.stock === 0"
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <span class="w-full h-px bg-primary-800 rotate-[-20deg]"></span>
                  </span>
                  <!-- 低库存提示 -->
                  <span 
                    v-if="size.stock > 0 && size.stock <= 3 && selectedSize === size.name"
                    class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                  ></span>
                </button>
              </div>
              <!-- 库存提示 -->
              <p
                v-if="selectedSizeStock && selectedSizeStock <= 5"
                class="text-xs mt-2"
                :class="selectedSizeStock <= 3 ? 'text-red-600' : 'text-orange-600'"
              >
                Only {{ selectedSizeStock }} left in stock.
              </p>
            </div>
            
            <!-- Color Selection -->
            <div class="mb-8">
              <label class="block text-sm font-semibold text-cream-200 uppercase tracking-wider mb-3">
                Color: {{ selectedColor }}
              </label>
              <div class="flex gap-3">
                <button
                  v-for="color in colors"
                  :key="color.name"
                  @click="selectColor(color)"
                  :class="[
                    'color-selector w-12 h-12 rounded-full border-2 transition-all duration-200 cursor-pointer relative group',
                    selectedColor === color.name 
                      ? 'border-accent-500/40 scale-110 shadow-lg' 
                      : 'border-accent-500/30 hover:border-accent-500/40 hover:scale-105'
                  ]"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                >
                  <!-- 选中标记 -->
                  <span 
                    v-if="selectedColor === color.name"
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <svg class="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                  
                  <!-- Hover 提示 -->
                  <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {{ color.name }}
                  </span>
                </button>
              </div>
            </div>
            
            <!-- Quantity -->
            <div class="mb-8">
              <div class="flex items-center justify-between mb-3">
                <label class="text-sm font-semibold text-cream-200 uppercase tracking-wider">Quantity</label>
                <span class="text-xs text-cream-300">Max: {{ maxQuantity }}</span>
              </div>
              <div class="flex items-center gap-3">
                <button 
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  :class="[
                    'quantity-btn w-12 h-12 border transition-colors flex items-center justify-center',
                    quantity <= 1 
                      ? 'border-accent-500/20 text-cream-200 cursor-not-allowed' 
                      : 'border-border hover:border-accent-500/40 cursor-pointer'
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <input 
                  v-model.number="quantity" 
                  type="number" 
                  min="1"
                  :max="maxQuantity"
                  @input="validateQuantity"
                  class="w-20 h-12 text-center border border-border focus:border-accent-500/40 focus:outline-none"
                />
                <button 
                  @click="increaseQuantity"
                  :disabled="quantity >= maxQuantity"
                  :class="[
                    'quantity-btn w-12 h-12 border transition-colors flex items-center justify-center',
                    quantity >= maxQuantity 
                      ? 'border-accent-500/20 text-cream-200 cursor-not-allowed' 
                      : 'border-border hover:border-accent-500/40 cursor-pointer'
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
              
              <!-- 批量购买优惠提示 -->
              <div class="mt-3 space-y-2">
                <div 
                  v-if="quantity >= 3 && quantity < 5"
                  class="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded flex items-center gap-2"
                >
                  <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  <span>Buy 5+ items and get 10% off!</span>
                </div>
                <div 
                  v-if="quantity >= 5"
                  class="text-xs bg-green-50 text-green-700 px-3 py-2 rounded flex items-center gap-2"
                >
                  <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>10% bulk discount applied!</span>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="space-y-3 mb-8">
              <BaseButton
                @click="handleAddToCart"
                variant="primary"
                size="md"
                block
                class="touch-target"
                :disabled="product.stock === 0 || selectedSizeStock === 0"
              >
                {{ product.stock === 0 ? 'Out of Stock' : (selectedSizeStock === 0 ? 'Size Unavailable' : 'Add to Cart') }}
              </BaseButton>
              <BaseButton
                @click="handleBuyNow"
                variant="accent"
                size="md"
                block
                class="touch-target"
                :disabled="product.stock === 0 || selectedSizeStock === 0"
              >
                Buy Now
              </BaseButton>
              <BaseButton 
                @click="toggleWishlist"
                variant="secondary"
                size="md"
                block
                :class="{ 'active': isWishlistAnimating }"
                class="touch-target"
              >
                <svg class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                {{ isInWishlist ? 'In Wishlist' : 'Add to Wishlist' }}
              </BaseButton>
            </div>
            
            <!-- Product Features -->
            <div class="border-t border-border pt-6 space-y-3">
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-cream-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-cream-200">Premium Quality Materials</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-cream-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-cream-200">Complimentary Shipping Over $75</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-cream-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-cream-200">30-Day Easy Returns</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <svg class="w-5 h-5 text-cream-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-cream-200">Discreet Packaging</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Product Details Tabs -->
        <!-- Tabs Section - Desktop -->
        <div class="mt-20 border-t border-border hidden md:block">
          <div class="flex gap-8 border-b border-border">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              :class="[
                'py-4 text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer',
                activeTab === tab 
                  ? 'text-cream-200 border-b-2 border-accent-500/40' 
                  : 'text-cream-300 hover:text-cream-200'
              ]"
            >
              {{ tab }}
              <span v-if="tab === 'Reviews'" class="ml-1 text-xs">({{ reviews.length }})</span>
            </button>
          </div>
          
          <div class="py-8">
            <!-- Description Tab -->
            <div v-if="activeTab === 'Description'" class="prose max-w-none">
              <p class="text-cream-200 leading-relaxed">
                {{ product.description }}
              </p>
              <p class="text-cream-200 leading-relaxed mt-4">
                Experience luxury and comfort with our premium lingerie collection. Each piece is carefully crafted with the finest materials to ensure both style and comfort.
              </p>
            </div>
            
            <!-- Details Tab -->
            <div v-if="activeTab === 'Details'" class="space-y-3">
              <div class="flex py-3 border-b border-border">
                <span class="w-1/3 text-sm font-semibold text-cream-200">Material</span>
                <span class="w-2/3 text-sm text-cream-200">90% Polyamide, 10% Elastane</span>
              </div>
              <div class="flex py-3 border-b border-border">
                <span class="w-1/3 text-sm font-semibold text-cream-200">Care</span>
                <span class="w-2/3 text-sm text-cream-200">Hand wash cold, lay flat to dry</span>
              </div>
              <div class="flex py-3 border-b border-border">
                <span class="w-1/3 text-sm font-semibold text-cream-200">Origin</span>
                <span class="w-2/3 text-sm text-cream-200">Made in Europe</span>
              </div>
            </div>
            
            <!-- Shipping Tab -->
            <div v-if="activeTab === 'Shipping'" class="space-y-4">
              <p class="text-cream-200 text-sm leading-relaxed">
                Complimentary standard shipping on orders over $75. Express shipping available at checkout.
              </p>
              <p class="text-cream-200 text-sm leading-relaxed">
                Orders are processed within 1-2 business days and typically arrive within 3-5 business days.
              </p>
            </div>
            
            <!-- Reviews Tab -->
            <div v-if="activeTab === 'Reviews'">
              <!-- Rating Summary -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
                <!-- Overall Rating -->
                <div class="text-center">
                  <div class="text-5xl font-bold text-cream-200 mb-2">{{ overallRating }}</div>
                  <div class="flex justify-center text-accent mb-2">
                    <svg v-for="i in 5" :key="i" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <p class="text-sm text-cream-300">Based on {{ reviews.length }} reviews</p>
                </div>
                
                <!-- Rating Distribution -->
                <div class="space-y-2">
                  <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-3">
                    <span class="text-sm text-cream-200 w-12">{{ star }} star</span>
                    <div class="flex-1 h-2 bg-primary-900/60 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-accent transition-all duration-300"
                        :style="{ width: `${getRatingPercentage(star)}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-cream-300 w-12 text-right">{{ getRatingCount(star) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Review Filters -->
              <div class="flex flex-wrap gap-3 mb-6">
                <button
                  v-for="filter in reviewFilters"
                  :key="filter.value"
                  @click="selectedReviewFilter = filter.value"
                  :class="[
                    'px-4 py-2 text-sm border rounded-full transition-all',
                    selectedReviewFilter === filter.value
                      ? 'bg-primary-900/60 text-white border-accent-500/40'
                      : 'bg-primary-800 text-cream-200 border-border hover:border-accent-500/40'
                  ]"
                >
                  {{ filter.label }}
                </button>
              </div>
              
              <!-- Reviews List -->
              <div class="space-y-6">
                <div 
                  v-for="review in filteredReviews" 
                  :key="review.id"
                  class="border-b border-border pb-6 last:border-0"
                >
                  <div class="flex items-start gap-4">
                    <!-- Avatar -->
                    <div class="w-12 h-12 rounded-full bg-primary-900/60 flex items-center justify-center flex-shrink-0">
                      <span class="text-lg font-semibold text-cream-100">{{ review.userName.charAt(0) }}</span>
                    </div>
                    
                    <div class="flex-1">
                      <!-- Header -->
                      <div class="flex items-center justify-between mb-2">
                        <div>
                          <h4 class="font-semibold text-cream-200">{{ review.userName }}</h4>
                          <div class="flex items-center gap-2 mt-1">
                            <div class="flex text-accent">
                              <svg v-for="i in review.rating" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            </div>
                            <span class="text-xs text-cream-300">{{ review.date }}</span>
                          </div>
                        </div>
                        <span v-if="review.verified" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          ✓ Verified Purchase
                        </span>
                      </div>
                      
                      <!-- Specs -->
                      <p class="text-xs text-cream-300 mb-3">
                        Size: {{ review.size }} • Color: {{ review.color }}
                      </p>
                      
                      <!-- Content -->
                      <p class="text-sm text-cream-200 leading-relaxed mb-3">
                        {{ review.content }}
                      </p>
                      
                      <!-- Images -->
                      <div v-if="review.images && review.images.length > 0" class="flex gap-2 mb-3">
                        <img 
                          v-for="(img, idx) in review.images" 
                          :key="idx"
                          :src="img" 
                          alt="Review image"
                          class="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          @click="openImageModal(img)"
                        />
                      </div>
                      
                      <!-- Actions -->
                      <div class="flex items-center gap-4 text-sm">
                        <button 
                          @click="likeReview(review.id)"
                          class="flex items-center gap-1 text-cream-300 hover:text-cream-200 transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                          </svg>
                          <span>Helpful ({{ review.likes }})</span>
                        </button>
                        <button class="text-cream-300 hover:text-red-600 transition-colors">
                          Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Load More -->
              <div v-if="filteredReviews.length < reviews.length" class="text-center mt-8">
                <BaseButton variant="secondary" size="md">
                  Load More Reviews
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tabs Section - Mobile (Collapsible) -->
        <div class="mt-12 md:hidden space-y-3">
          <div 
            v-for="tab in tabs" 
            :key="tab"
            class="border border-border overflow-hidden"
          >
            <button
              @click="toggleMobileTab(tab)"
              class="w-full flex items-center justify-between px-4 py-4 bg-primary-800 text-left"
            >
              <span class="text-sm font-semibold uppercase tracking-wider text-cream-200">
                {{ tab }}
                <span v-if="tab === 'Reviews'" class="ml-1 text-xs">({{ reviews.length }})</span>
              </span>
              <svg 
                class="w-5 h-5 text-cream-200 transition-transform duration-200"
                :class="{ 'rotate-180': expandedMobileTabs.includes(tab) }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <Transition name="accordion">
              <div v-if="expandedMobileTabs.includes(tab)" class="px-4 py-4 bg-transparent">
                <!-- Description Tab -->
                <div v-if="tab === 'Description'" class="prose max-w-none">
                  <p class="text-cream-200 leading-relaxed text-sm">
                    {{ product.description }}
                  </p>
                  <p class="text-cream-200 leading-relaxed mt-4 text-sm">
                    Experience luxury and comfort with our premium lingerie collection. Each piece is carefully crafted with the finest materials to ensure both style and comfort.
                  </p>
                </div>
                
                <!-- Details Tab -->
                <div v-if="tab === 'Details'" class="space-y-3">
                  <div class="flex py-2 border-b border-border">
                    <span class="w-1/3 text-xs font-semibold text-cream-200">Material</span>
                    <span class="w-2/3 text-xs text-cream-200">90% Polyamide, 10% Elastane</span>
                  </div>
                  <div class="flex py-2 border-b border-border">
                    <span class="w-1/3 text-xs font-semibold text-cream-200">Care</span>
                    <span class="w-2/3 text-xs text-cream-200">Hand wash cold, lay flat to dry</span>
                  </div>
                  <div class="flex py-2 border-b border-border">
                    <span class="w-1/3 text-xs font-semibold text-cream-200">Origin</span>
                    <span class="w-2/3 text-xs text-cream-200">Made in Europe</span>
                  </div>
                </div>
                
                <!-- Shipping Tab -->
                <div v-if="tab === 'Shipping'" class="space-y-3">
                  <p class="text-cream-200 text-xs leading-relaxed">
                    Complimentary standard shipping on orders over $75. Express shipping available at checkout.
                  </p>
                  <p class="text-cream-200 text-xs leading-relaxed">
                    Orders are processed within 1-2 business days and typically arrive within 3-5 business days.
                  </p>
                </div>
                
                <!-- Reviews Tab (Simplified for mobile) -->
                <div v-if="tab === 'Reviews'">
                  <div class="text-center mb-4 pb-4 border-b border-border">
                    <div class="text-3xl font-bold text-cream-200 mb-1">{{ overallRating }}</div>
                    <div class="flex justify-center text-accent mb-1">
                      <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <p class="text-xs text-cream-300">Based on {{ reviews.length }} reviews</p>
                  </div>
                  
                  <div class="space-y-4">
                    <div 
                      v-for="review in reviews.slice(0, 3)" 
                      :key="review.id"
                      class="pb-4 border-b border-border last:border-0"
                    >
                      <div class="flex items-start gap-3">
                        <div class="w-10 h-10 rounded-full bg-primary-900/60 flex items-center justify-center flex-shrink-0">
                          <span class="text-sm font-semibold text-cream-100">{{ review.userName.charAt(0) }}</span>
                        </div>
                        <div class="flex-1">
                          <h4 class="font-semibold text-sm text-cream-200">{{ review.userName }}</h4>
                          <div class="flex items-center gap-2 mt-1">
                            <div class="flex text-accent">
                              <svg v-for="i in review.rating" :key="i" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            </div>
                            <span class="text-xs text-cream-300">{{ review.date }}</span>
                          </div>
                          <p class="text-xs text-cream-200 leading-relaxed mt-2">
                            {{ review.content }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        
        <!-- Recommended Products Section -->
        <div class="mt-20">
          <!-- You May Also Like -->
          <div class="mb-16">
            <h2 class="text-2xl font-light text-cream-200 mb-6 uppercase tracking-wider">You May Also Like</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ProductCard 
                v-for="product in recommendedProducts" 
                :key="product.id"
                :product="product"
              />
            </div>
          </div>
          
          <!-- Frequently Bought Together -->
          <div class="mb-16 bg-primary-950/40 p-8 rounded-lg">
            <h2 class="text-2xl font-light text-cream-200 mb-6 uppercase tracking-wider">Frequently Bought Together</h2>
            <div class="flex flex-col md:flex-row items-center gap-6">
              <div class="flex items-center gap-4 flex-wrap justify-center">
                <div v-for="(item, index) in bundleItems" :key="item.id" class="flex items-center">
                  <div class="w-24 h-24 bg-primary-800 border border-border rounded-lg overflow-hidden">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <svg v-if="index < bundleItems.length - 1" class="w-6 h-6 text-cream-300 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="text-center mb-4">
                  <p class="text-sm text-cream-300 mb-1">Bundle Price:</p>
                  <div class="flex items-baseline gap-2 justify-center">
                    <span class="text-2xl font-bold text-cream-200">${{ bundlePrice.toFixed(2) }}</span>
                    <span class="text-sm text-cream-300 line-through">${{ bundleOriginalPrice.toFixed(2) }}</span>
                  </div>
                  <p class="text-xs text-green-600 font-semibold">Save ${{ (bundleOriginalPrice - bundlePrice).toFixed(2) }}</p>
                </div>
                <BaseButton variant="primary" size="md" block>
                  Add Bundle to Cart
                </BaseButton>
              </div>
            </div>
          </div>
          
          <!-- Recently Viewed -->
          <div v-if="recentlyViewed.length > 0">
            <h2 class="text-2xl font-light text-cream-200 mb-6 uppercase tracking-wider">Recently Viewed</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ProductCard 
                v-for="product in recentlyViewed" 
                :key="product.id"
                :product="product"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Mobile Fixed Bottom Bar -->
    <div v-if="product" class="md:hidden fixed bottom-16 left-0 right-0 bg-primary-800 border-t border-border z-40 safe-area-bottom">
      <div class="px-4 py-3">
        <div class="flex items-center gap-3">
          <button 
            @click="toggleWishlist"
            class="w-12 h-12 border border-border flex items-center justify-center transition-colors"
            :class="{ 'bg-accent/10 border-accent': isInWishlist }"
          >
            <svg class="w-6 h-6" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          <button
            @click="handleAddToCart"
            :disabled="product.stock === 0 || selectedSizeStock === 0"
            class="flex-1 h-12 bg-primary-900/60 text-white font-semibold text-sm uppercase tracking-wider transition-colors active:bg-primary-900/80 disabled:bg-primary-950/40 disabled:text-cream-300"
          >
            {{ product.stock === 0 ? 'Sold Out' : (selectedSizeStock === 0 ? 'Unavailable' : 'Add to Cart') }}
          </button>
          <button
            @click="handleBuyNow"
            :disabled="product.stock === 0 || selectedSizeStock === 0"
            class="flex-1 h-12 bg-accent text-white font-semibold text-sm uppercase tracking-wider transition-colors active:bg-accent/90 disabled:bg-primary-950/40 disabled:text-cream-300"
          >
            Buy Now
          </button>
        </div>
        <div class="mt-2 text-center">
          <p class="text-xs text-cream-300">
            <span class="font-semibold text-cream-200">${{ (product.price ?? 0).toFixed(2) }}</span>
            <span class="mx-2">•</span>
            Size: {{ selectedSize }}
            <span class="mx-2">•</span>
            Color: {{ selectedColor }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- Mobile Fullscreen Image Carousel -->
    <Teleport to="body">
      <div 
        v-if="isMobileCarouselOpen"
        class="md:hidden fixed inset-0 z-50 bg-black"
      >
        <!-- Header -->
        <div class="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent z-10 safe-area-top">
          <div class="flex items-center justify-between px-4 py-4">
            <button
              @click="closeMobileCarousel"
              class="w-10 h-10 bg-primary-900/10 rounded-full flex items-center justify-center"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div class="text-white text-sm font-medium">
              {{ currentImageIndex + 1 }} / {{ productImages.length }}
            </div>
            <div class="w-10"></div>
          </div>
        </div>
        
        <!-- Swipeable Image Container -->
        <div 
          class="h-full flex items-center justify-center"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <img 
            :src="currentImage" 
            :alt="product?.name"
            class="max-w-full max-h-full object-contain px-4"
          />
        </div>
        
        <!-- Navigation Dots -->
        <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-2 safe-area-bottom">
          <button
            v-for="(image, index) in productImages"
            :key="index"
            @click="selectImage(index)"
            :class="[
              'w-2 h-2 rounded-full transition-all',
              currentImageIndex === index
                ? 'bg-white w-6'
                : 'bg-white/40'
            ]"
          ></button>
        </div>
      </div>
    </Teleport>
    
    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div 
        v-if="isLightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        @click="closeLightbox"
      >
        <!-- Close Button -->
        <button
          @click="closeLightbox"
          class="absolute top-6 right-6 w-12 h-12 bg-primary-900/10 hover:bg-primary-900/20 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <!-- Image Counter -->
        <div class="absolute top-6 left-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {{ currentImageIndex + 1 }} / {{ productImages.length }}
        </div>
        
        <!-- Main Image -->
        <div class="relative max-w-5xl max-h-[80vh] mx-auto" @click.stop>
          <img 
            :src="currentImage" 
            :alt="product?.name"
            class="max-w-full max-h-[80vh] object-contain"
          />
        </div>
        
        <!-- Navigation Arrows -->
        <button
          v-if="currentImageIndex > 0"
          @click.stop="previousImage"
          class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary-900/10 hover:bg-primary-900/20 rounded-full flex items-center justify-center transition-colors"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <button
          v-if="currentImageIndex < productImages.length - 1"
          @click.stop="nextImage"
          class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary-900/10 hover:bg-primary-900/20 rounded-full flex items-center justify-center transition-colors"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        
        <!-- Thumbnail Strip -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-3 rounded-lg">
          <button
            v-for="(image, index) in productImages"
            :key="index"
            @click.stop="selectImage(index)"
            :class="[
              'w-16 h-16 border-2 transition-all overflow-hidden',
              currentImageIndex === index ? 'border-white' : 'border-white/30 hover:border-white/60'
            ]"
          >
            <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </Teleport>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { products } = useProducts()

const productId = computed(() => parseInt(route.query.id as string))
const product = computed(() => products.find(p => p.id === productId.value))

// SEO - 动态标题与描述
useSeoMeta(() => {
  if (!product.value) {
    return {
      title: 'Product · LUNA·SENSUAL',
      robots: 'noindex'
    }
  }
  const p = product.value
  return {
    title: `${p.name} · LUNA·SENSUAL`,
    description: p.description,
    ogTitle: p.name,
    ogDescription: p.description,
    ogImage: p.image,
    ogType: 'product',
    twitterCard: 'summary_large_image'
  }
})

// Product images (using same image for demo, replace with actual images)
const productImages = computed(() => {
  const colorData = selectedColorData.value
  if (colorData && colorData.images) {
    return colorData.images
  }
  // 默认图片
  return [
    product.value?.image,
    product.value?.image,
    product.value?.image,
    product.value?.image
  ]
})

const currentImageIndex = ref(0)
const currentImage = computed(() => productImages.value[currentImageIndex.value])
const selectedSize = ref('M')
const selectedColor = ref('Black')
const quantity = ref(1)
const isInWishlist = computed(() => product.value ? wishlistStore.has(product.value.id) : false)
const isWishlistAnimating = ref(false)
const activeTab = ref('Description')
const expandedMobileTabs = ref<string[]>([])
const isMobileCarouselOpen = ref(false)

// Touch handling for mobile carousel
const touchStartX = ref(0)
const touchEndX = ref(0)

// Image zoom functionality
const showZoom = ref(false)
const zoomStyle = ref({})
const mainImageRef = ref<HTMLImageElement | null>(null)

// Lightbox functionality
const isLightboxOpen = ref(false)

// Size stock data — 来自商品数据
const sizesWithStock = computed(() => {
  if (product.value?.sizes) {
    return product.value.sizes
  }
  // 兜底默认
  return [
    { name: 'XS', stock: 5 },
    { name: 'S', stock: 8 },
    { name: 'M', stock: 12 },
    { name: 'L', stock: 3 },
    { name: 'XL', stock: 0 }
  ]
})

// Color data with images — 来自商品数据
const colors = computed(() => {
  if (product.value?.colors && product.value.colors.length > 0) {
    return product.value.colors.map(c => ({
      ...c,
      images: [
        product.value?.image,
        product.value?.hoverImage || product.value?.image,
        product.value?.image,
        product.value?.hoverImage || product.value?.image
      ]
    }))
  }
  // 兜底默认
  return [
    { name: 'Black', hex: '#000000', images: [product.value?.image, product.value?.image, product.value?.image, product.value?.image] },
    { name: 'White', hex: '#FFFFFF', images: [product.value?.image, product.value?.image, product.value?.image, product.value?.image] },
    { name: 'Nude', hex: '#E8C4A0', images: [product.value?.image, product.value?.image, product.value?.image, product.value?.image] },
    { name: 'Red', hex: '#DC2626', images: [product.value?.image, product.value?.image, product.value?.image, product.value?.image] }
  ]
})

const tabs = ['Description', 'Details', 'Shipping', 'Reviews']

// Reviews data
const reviews = ref([
  {
    id: 1,
    userName: 'Sarah M.',
    rating: 5,
    date: '2 days ago',
    verified: true,
    size: 'M',
    color: 'Black',
    content: 'Absolutely love this! The quality is amazing and it fits perfectly. Very comfortable and looks stunning. Highly recommend!',
    images: [product.value?.image],
    likes: 24
  },
  {
    id: 2,
    userName: 'Emma L.',
    rating: 5,
    date: '1 week ago',
    verified: true,
    size: 'S',
    color: 'White',
    content: 'Beautiful piece! The material is soft and luxurious. True to size and very flattering.',
    images: [],
    likes: 18
  },
  {
    id: 3,
    userName: 'Jessica K.',
    rating: 4,
    date: '2 weeks ago',
    verified: true,
    size: 'L',
    color: 'Nude',
    content: 'Great quality and comfortable. Only giving 4 stars because shipping took a bit longer than expected, but the product itself is perfect!',
    images: [product.value?.image, product.value?.image],
    likes: 12
  },
  {
    id: 4,
    userName: 'Amanda R.',
    rating: 5,
    date: '3 weeks ago',
    verified: false,
    size: 'M',
    color: 'Black',
    content: 'This exceeded my expectations! The fit is perfect and the quality is outstanding.',
    images: [],
    likes: 8
  }
])

const selectedReviewFilter = ref('all')
const reviewFilters = [
  { label: 'All Reviews', value: 'all' },
  { label: '5 Stars', value: '5' },
  { label: '4 Stars', value: '4' },
  { label: 'With Photos', value: 'photos' },
  { label: 'Verified', value: 'verified' }
]

// Computed properties for reviews
const overallRating = computed(() => {
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const filteredReviews = computed(() => {
  let filtered = reviews.value
  
  if (selectedReviewFilter.value === '5') {
    filtered = filtered.filter(r => r.rating === 5)
  } else if (selectedReviewFilter.value === '4') {
    filtered = filtered.filter(r => r.rating === 4)
  } else if (selectedReviewFilter.value === 'photos') {
    filtered = filtered.filter(r => r.images && r.images.length > 0)
  } else if (selectedReviewFilter.value === 'verified') {
    filtered = filtered.filter(r => r.verified)
  }
  
  return filtered
})

const getRatingCount = (star: number) => {
  return reviews.value.filter(r => r.rating === star).length
}

const getRatingPercentage = (star: number) => {
  const count = getRatingCount(star)
  return (count / reviews.value.length) * 100
}

// Recommended products
const recommendedProducts = computed(() => products.slice(0, 4))
// Recently Viewed: 从 localStorage 读取真实访问历史
const recentlyViewed = ref<typeof products>([])

const loadRecentlyViewed = () => {
  if (!import.meta.client) return
  try {
    const stored = localStorage.getItem('recently_viewed')
    if (!stored) return
    const ids: number[] = JSON.parse(stored)
    // 排除当前商品，取最多 4 个
    recentlyViewed.value = ids
      .filter(id => id !== productId.value)
      .map(id => products.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 4)
  } catch (e) {
    console.error('Failed to load recently viewed:', e)
  }
}

const trackProductView = () => {
  if (!import.meta.client || !product.value) return
  try {
    const stored = localStorage.getItem('recently_viewed')
    const ids: number[] = stored ? JSON.parse(stored) : []
    // 把当前商品移到最前，去重，保留最近 8 个
    const updated = [product.value.id, ...ids.filter(id => id !== product.value!.id)].slice(0, 8)
    localStorage.setItem('recently_viewed', JSON.stringify(updated))
  } catch (e) {
    console.error('Failed to track product view:', e)
  }
}

// Bundle items
const bundleItems = computed(() => [
  product.value,
  products[1],
  products[2]
].filter(Boolean))

const bundleOriginalPrice = computed(() => {
  return bundleItems.value.reduce((sum, item) => sum + (item?.price || 0), 0)
})

const bundlePrice = computed(() => {
  return bundleOriginalPrice.value * 0.85 // 15% discount
})

// Computed properties
const selectedSizeStock = computed(() => {
  const size = sizesWithStock.value.find(s => s.name === selectedSize.value)
  return size?.stock || 0
})

const maxQuantity = computed(() => {
  return Math.min(selectedSizeStock.value, 10) // 最多购买10件
})

const selectedColorData = computed(() => {
  return colors.value.find(c => c.name === selectedColor.value)
})

const handleMouseMove = (event: MouseEvent) => {
  if (!showZoom.value) return
  
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  
  zoomStyle.value = {
    transformOrigin: `${x}% ${y}%`
  }
}

const selectImage = (index: number) => {
  currentImageIndex.value = index
}

const selectSize = (size: string) => {
  const sizeData = sizesWithStock.value.find(s => s.name === size)
  if (sizeData && sizeData.stock > 0) {
    selectedSize.value = size
    // 如果当前数量超过新尺码的库存，调整数量
    if (quantity.value > sizeData.stock) {
      quantity.value = sizeData.stock
    }
  }
}

const selectColor = (color: typeof colors[0]) => {
  selectedColor.value = color.name
  // 切换颜色时更新图片
  if (color.images && color.images.length > 0) {
    currentImageIndex.value = 0 // 重置到第一张图片
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  if (quantity.value < maxQuantity.value) {
    quantity.value++
  }
}

const validateQuantity = () => {
  if (quantity.value < 1) {
    quantity.value = 1
  } else if (quantity.value > maxQuantity.value) {
    quantity.value = maxQuantity.value
  }
}

const openLightbox = () => {
  // On mobile, open mobile carousel instead
  if (window.innerWidth < 768) {
    isMobileCarouselOpen.value = true
  } else {
    isLightboxOpen.value = true
  }
  // Prevent body scroll
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  // Restore body scroll
  document.body.style.overflow = ''
}

const closeMobileCarousel = () => {
  isMobileCarouselOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentImageIndex.value < productImages.value.length - 1) {
    currentImageIndex.value++
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

// Keyboard navigation for lightbox
const handleKeydown = (event: KeyboardEvent) => {
  if (!isLightboxOpen.value) return
  
  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  } else if (event.key === 'ArrowLeft') {
    previousImage()
  }
}

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
  
  const isCartOpen = useState('cartSidebarOpen', () => false)
  isCartOpen.value = true
}

const handleBuyNow = () => {
  if (!product.value) return
  
  // 添加到购物车但不打开侧边栏
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
    image: product.value.image
  })
  
  // 直接跳转到结账页面
  navigateTo('/checkout')
}

const toggleWishlist = () => {
  if (!product.value) return
  const added = wishlistStore.toggle(product.value.id)

  // 触发心形动画（仅在添加到愿望清单时）
  if (added) {
    isWishlistAnimating.value = true
    setTimeout(() => {
      isWishlistAnimating.value = false
    }, 600)
  }
}

// 页面加载时同步愿望清单状态
const loadWishlist = () => {
  if (!import.meta.client) return
  wishlistStore.loadFromStorage()
}

const likeReview = (reviewId: number) => {
  const review = reviews.value.find(r => r.id === reviewId)
  if (review) {
    review.likes++
  }
}

const openImageModal = (imageUrl: string) => {
  // 找到这张图片在 productImages 中的索引，打开 lightbox
  const index = productImages.value.indexOf(imageUrl)
  if (index > -1) {
    currentImageIndex.value = index
  }
  if (window.innerWidth < 768) {
    isMobileCarouselOpen.value = true
  } else {
    isLightboxOpen.value = true
  }
  document.body.style.overflow = 'hidden'
}

// Mobile tab toggle
const toggleMobileTab = (tab: string) => {
  const index = expandedMobileTabs.value.indexOf(tab)
  if (index > -1) {
    expandedMobileTabs.value.splice(index, 1)
  } else {
    expandedMobileTabs.value.push(tab)
  }
}

// Touch handlers for mobile carousel
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const swipeThreshold = 50
  const diff = touchStartX.value - touchEndX.value
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next image
      nextImage()
    } else {
      // Swipe right - previous image
      previousImage()
    }
  }
  
  touchStartX.value = 0
  touchEndX.value = 0
}

// 根据badge类型返回对应的class
const getBadgeClass = (badge: string) => {
  const badgeLower = badge.toLowerCase()
  if (badgeLower.includes('new')) return 'tag-new'
  if (badgeLower.includes('bestseller') || badgeLower.includes('best')) return 'tag-bestseller'
  if (badgeLower.includes('sale') || badgeLower.includes('off')) return 'tag-sale'
  return 'tag-new' // 默认
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  // 加载最近浏览 + 记录本次访问
  loadRecentlyViewed()
  trackProductView()
  // 同步 wishlist 状态
  loadWishlist()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  // Ensure body scroll is restored
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Zoom cursor */
.cursor-zoom-in {
  cursor: zoom-in;
}

/* 愿望清单心形动画 */
.wishlist-btn {
  position: relative;
}

.wishlist-btn.active::after {
  content: '♥';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: #C9A882;
  animation: heart-pop 0.6s ease;
  pointer-events: none;
}

@keyframes heart-pop {
  0% { 
    transform: translate(-50%, -50%) scale(0); 
    opacity: 1; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.5); 
    opacity: 0.8; 
  }
  100% { 
    transform: translate(-50%, -50%) scale(0); 
    opacity: 0; 
  }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Lightbox animations */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* Accordion animation for mobile tabs */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Safe area for devices with notch */
.safe-area-top {
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
