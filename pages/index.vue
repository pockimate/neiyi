<template>
  <div class="bg-white min-h-screen">
    <TheNavbar />
    
    <!-- Hero Carousel - 全屏轮播图 -->
    <section class="relative h-screen overflow-hidden">
      <!-- 轮播图片 -->
      <div class="absolute inset-0">
        <TransitionGroup name="carousel">
          <div
            v-for="(slide, index) in slides"
            v-show="currentSlide === index"
            :key="index"
            class="absolute inset-0"
          >
            <img 
              :src="slide.image" 
              :alt="slide.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
        </TransitionGroup>
      </div>
      
      <!-- 轮播内容 -->
      <div class="relative z-10 h-full flex items-center justify-center">
        <div class="text-center text-white px-6 max-w-4xl">
          <TransitionGroup name="fade">
            <div v-show="currentSlide === index" v-for="(slide, index) in slides" :key="`content-${index}`">
              <h1 class="text-6xl md:text-8xl font-light mb-8 tracking-widest uppercase">
                {{ slide.title }}
              </h1>
              <p class="text-base md:text-lg font-light mb-12 tracking-widest uppercase">
                {{ slide.subtitle }}
              </p>
              <NuxtLink :to="slide.link" class="btn-primary inline-block">
                {{ slide.buttonText }}
              </NuxtLink>
            </div>
          </TransitionGroup>
        </div>
      </div>
      
      <!-- 轮播指示器 -->
      <div class="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
        <button
          v-for="(slide, index) in slides"
          :key="`dot-${index}`"
          @click="goToSlide(index)"
          :class="[
            'w-2 h-2 transition-all duration-300 cursor-pointer',
            currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>
      
      <!-- 左右箭头 -->
      <button
        @click="prevSlide"
        class="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
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

// 轮播图数据
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=1920&h=1080&fit=crop',
    title: 'INTIMATE ELEGANCE',
    subtitle: 'Luxury Lingerie Collection',
    buttonText: 'Explore Collection',
    link: '/products'
  },
  {
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1920&h=1080&fit=crop',
    title: 'NEW ARRIVALS',
    subtitle: 'Discover Latest Designs',
    buttonText: 'Shop New',
    link: '/products?filter=new'
  },
  {
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=1920&h=1080&fit=crop&sat=-100',
    title: 'BESTSELLERS',
    subtitle: 'Most Loved Pieces',
    buttonText: 'View Bestsellers',
    link: '/products?filter=bestsellers'
  }
]

const currentSlide = ref(0)
let autoplayInterval: NodeJS.Timeout | null = null

// 下一张
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

// 上一张
const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

// 跳转到指定幻灯片
const goToSlide = (index: number) => {
  currentSlide.value = index
}

// 自动播放
const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 5000) // 5秒切换
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

// 分类数据
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

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
/* 轮播图过渡效果 */
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 1s ease;
}

.carousel-enter-from {
  opacity: 0;
}

.carousel-leave-to {
  opacity: 0;
}

/* 内容淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
