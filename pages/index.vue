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
    
    <!-- Video/Image Showcase - Obsessive风格 -->
    <section class="relative h-screen overflow-hidden">
      <!-- 背景视频或图片 -->
      <div class="absolute inset-0">
        <!-- 使用图片代替视频（可以替换为video标签） -->
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=1920&h=1080&fit=crop&sat=-50" 
          alt="Showcase"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/50"></div>
      </div>
      
      <!-- 内容 -->
      <div class="relative z-10 h-full flex items-center justify-center">
        <div class="text-center text-white px-6 max-w-4xl">
          <h2 class="text-5xl md:text-7xl font-light mb-8 tracking-widest uppercase">
            EVERYTHING
          </h2>
          <p class="text-2xl md:text-4xl font-light mb-12 tracking-wider">
            For your <span class="italic">pleasure</span>
          </p>
          <p class="text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Are you looking for amazing lingerie that will let you feel real delight? At Intimate Elegance you'll find unique designs with a pinch of spice!
          </p>
          <NuxtLink to="/products" class="btn-primary inline-block">
            SEE MORE
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Just Irresistible Section - Obsessive风格网格 -->
    <section class="py-24 px-6 bg-backgroundLight">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-light text-primary mb-6 tracking-widest uppercase">Just Irresistible</h2>
          <p class="text-base text-textSecondary max-w-2xl mx-auto">
            We know that details make perfection. It's all for your fantastic experiences!
          </p>
        </div>
        
        <!-- Obsessive风格的图片网格 - 中间大图，周围小图 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          <!-- 左上 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop" 
              alt="Collection 1"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
          
          <!-- 上中 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop" 
              alt="Collection 2"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
          
          <!-- 中间大图 - 占据2行2列 -->
          <div class="col-span-2 row-span-2 group relative overflow-hidden bg-black border border-border cursor-pointer">
            <!-- 可以替换为视频 -->
            <img 
              src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=800&h=1000&fit=crop&sat=-50" 
              alt="Featured"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <!-- 可选：添加播放按钮图标 -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- 右上 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop&hue=30" 
              alt="Collection 3"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
          
          <!-- 左下 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop&hue=30" 
              alt="Collection 4"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
          
          <!-- 下中 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop&hue=60" 
              alt="Collection 5"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
          
          <!-- 右下 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop&hue=60" 
              alt="Collection 6"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
          
          <!-- 底部左 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop&hue=90" 
              alt="Collection 7"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
          
          <!-- 底部中左 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop&hue=90" 
              alt="Collection 8"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
          
          <!-- 底部中右 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop&hue=120" 
              alt="Collection 9"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
          
          <!-- 底部右 -->
          <div class="group relative overflow-hidden bg-white border border-border cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop&hue=120" 
              alt="Collection 10"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- About Section - 简化版 -->
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

// Showcase展示项
const showcaseItems = [
  {
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=600&h=800&fit=crop',
    title: 'Elegant Lace',
    description: 'Delicate designs for special moments'
  },
  {
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop',
    title: 'Sensual Silk',
    description: 'Luxurious comfort meets style'
  },
  {
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=600&h=800&fit=crop&sat=-50',
    title: 'Bold & Beautiful',
    description: 'Make a statement with confidence'
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
