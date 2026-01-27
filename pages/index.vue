<template>
  <div class="bg-backgroundLight min-h-screen">
    <TheNavbar />
    
    <!-- 1. Hero Carousel - 全屏轮播 -->
    <section class="relative h-screen overflow-hidden" style="margin-bottom: var(--space-2xl);">
      <div class="absolute inset-0">
        <template v-for="(slide, slideIndex) in slides" :key="slideIndex">
          <div
            v-if="currentSlide === slideIndex"
            class="absolute inset-0 hero-slide-transition"
          >
            <img 
              :src="slide.image" 
              :alt="slide.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
        </template>
      </div>
      
      <!-- 进度条 -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div 
          class="h-full bg-white transition-all duration-300"
          :style="{ width: `${slideProgress}%` }"
        ></div>
      </div>
      
      <div class="relative z-10 h-full flex items-center">
        <div class="max-w-7xl mx-auto px-6 w-full">
          <template v-for="(slide, slideIndex) in slides" :key="`content-${slideIndex}`">
            <div v-if="currentSlide === slideIndex" class="max-w-2xl hero-content-transition">
              <h1 class="hero-title text-5xl md:text-8xl font-light mb-6 md:mb-8 tracking-widest uppercase text-white">
                {{ slide.title }}
              </h1>
              <p class="text-sm md:text-lg font-light mb-8 md:mb-12 tracking-widest uppercase text-white/90">
                {{ slide.subtitle }}
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <NuxtLink :to="slide.link" class="hero-btn-primary inline-block px-8 py-4 font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  {{ slide.buttonText }}
                </NuxtLink>
                <NuxtLink to="/about" class="hero-btn-secondary inline-block px-8 py-4 font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105">
                  Learn More
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>
      
      <!-- 指示点 -->
      <div class="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
        <button
          v-for="(slide, slideIndex) in slides"
          :key="`dot-${slideIndex}`"
          @click="goToSlide(slideIndex)"
          :class="[
            'w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:bg-white',
            currentSlide === slideIndex ? 'bg-white w-8' : 'bg-white/50'
          ]"
          :aria-label="`Go to slide ${slideIndex + 1}`"
        ></button>
      </div>
      
      <!-- 播放/暂停按钮 -->
      <button
        @click="toggleAutoplay"
        class="absolute bottom-12 right-6 z-20 p-2 text-white hover:bg-white/10 transition-colors cursor-pointer rounded-full"
        :aria-label="isPlaying ? 'Pause autoplay' : 'Play autoplay'"
      >
        <svg v-if="isPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
      
      <!-- 前后切换按钮 -->
      <button
        @click="prevSlide"
        class="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white hover:bg-white/10 transition-colors cursor-pointer rounded-full"
        aria-label="Previous slide"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white hover:bg-white/10 transition-colors cursor-pointer rounded-full"
        aria-label="Next slide"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </section>
    
    <!-- 2. Categories - 分类导航 -->
    <section class="section bg-backgroundLight">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4" style="gap: var(--space-sm);">
          <NuxtLink 
            v-for="(category, catIndex) in categories" 
            :key="catIndex"
            :to="category.link"
            class="fade-in-up group relative overflow-hidden cursor-pointer h-64 md:h-80 rounded-lg"
            :class="`delay-${catIndex * 100}`"
          >
            <img 
              :src="category.image" 
              :alt="category.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <h3 class="text-white text-lg md:text-2xl font-light tracking-widest uppercase mb-2 transition-transform duration-300 group-hover:scale-110">
                {{ category.name }}
              </h3>
              <p class="text-white/80 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {{ category.count }} items
              </p>
              <p class="text-white/70 text-xs mt-2 px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                {{ category.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- 3. Featured Products -->
    <section class="section bg-background">
      <div class="max-w-7xl mx-auto">
        <div class="fade-in-up text-center" style="margin-bottom: var(--space-xl);">
          <p class="text-xs md:text-sm text-accent font-semibold mb-3 tracking-widest uppercase">
            Discover Our Collection
          </p>
          <h2 class="text-3xl md:text-4xl font-light text-primary mb-4 tracking-widest uppercase">
            Featured Collection
          </h2>
          <div class="w-16 h-px bg-accent mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style="gap: var(--space-md);">
          <div class="fade-in-up" v-for="(product, index) in featuredProducts" :key="product.id" :class="`delay-${(index % 4) * 100}`">
            <ProductCard :product="product" />
          </div>
        </div>
        
        <div class="fade-in-up text-center" style="margin-top: var(--space-xl);">
          <NuxtLink to="/products" class="btn-secondary inline-block">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- 4. Full Screen Banner - "EVERYTHING For your pleasure" -->
    <section class="relative h-screen overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=1920&h=1080&fit=crop&sat=-50" 
          alt="Everything for your pleasure"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div class="relative z-10 h-full flex items-center justify-center">
        <div class="fade-in-up text-center text-white px-6 max-w-4xl">
          <h2 class="text-4xl md:text-7xl font-light mb-6 md:mb-8 tracking-widest uppercase">
            EVERYTHING
          </h2>
          <p class="text-xl md:text-4xl font-light mb-8 md:mb-12 tracking-wider">
            For your <span class="italic">pleasure</span>
          </p>
          <p class="text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Are you looking for amazing lingerie that will let you feel real delight? 
            At Intimate Elegance you'll find unique designs with a pinch of spice!
          </p>
          <NuxtLink to="/products" class="btn-primary inline-block">
            DISCOVER MORE
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- 5. Image Grid - "Just Irresistible" -->
    <section class="py-16 md:py-24 px-6 bg-backgroundLight">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl md:text-4xl font-light text-primary mb-4 md:mb-6 tracking-widest uppercase">
            Just Irresistible
          </h2>
          <p class="text-sm md:text-base text-textSecondary max-w-2xl mx-auto">
            We know that details make perfection. It's all for your fantastic experiences!
          </p>
        </div>
        
        <ImageGrid />
      </div>
    </section>
    
    <!-- 6. Masonry Gallery - "Your Photos" -->
    <section class="py-16 md:py-24 px-6 bg-background">
      <div class="max-w-7xl mx-auto">
        <MasonryGallery />
      </div>
    </section>
    
    <!-- 7. Newsletter Signup -->
    <section class="section bg-backgroundLight text-primary">
      <div class="max-w-3xl mx-auto text-center">
        <div class="fade-in-up" style="margin-bottom: var(--space-lg);">
          <p class="text-xs md:text-sm text-accent font-semibold mb-3 tracking-widest uppercase">
            Sign Up For
          </p>
          <h2 class="text-3xl md:text-4xl font-light mb-4 md:mb-6 tracking-widest uppercase">
            Newsletter Obsessive
          </h2>
          <p class="text-xs md:text-sm text-textMuted tracking-wide">
            GET AN EXCLUSIVE 10% DISCOUNT WHEN SHOPPING FOR MIN. 50 EURO
          </p>
        </div>
        
        <form @submit.prevent="handleNewsletterSubmit" class="fade-in-up delay-200 flex flex-col md:flex-row max-w-xl mx-auto" style="gap: var(--space-sm);">
          <input 
            v-model="newsletterEmail"
            type="email" 
            placeholder="Enter your e-mail address"
            :class="[
              'flex-1 px-6 py-3 border-2 bg-white text-primary transition-all duration-300 focus:outline-none',
              newsletterError ? 'border-red-500' : 'border-gray-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(201,168,130,0.1)]'
            ]"
            required
          />
          <button type="submit" class="btn-primary whitespace-nowrap" :disabled="isSubmitting">
            {{ isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE' }}
          </button>
        </form>
        
        <p v-if="newsletterError" class="text-red-500 text-sm mt-2">{{ newsletterError }}</p>
        <p v-if="newsletterSuccess" class="text-green-600 text-sm mt-2 font-semibold">
          🎉 {{ newsletterSuccess }}
        </p>
        
        <div class="fade-in-up delay-300 flex items-center justify-center gap-2 text-xs text-textMuted" style="margin-top: var(--space-md);">
          <input 
            v-model="newsletterConsent"
            type="checkbox" 
            id="newsletter-consent" 
            class="w-4 h-4 cursor-pointer" 
            required
          />
          <label for="newsletter-consent" class="cursor-pointer">
            I subscribe to the newsletter in accordance. Regulations.
          </label>
        </div>
      </div>
    </section>
    
    <!-- 8. Our Story -->
    <section class="section bg-backgroundLight">
      <div class="max-w-3xl mx-auto text-center">
        <div class="fade-in-up" style="margin-bottom: var(--space-lg);">
          <h2 class="text-3xl md:text-4xl font-light text-primary mb-6 md:mb-8 tracking-widest uppercase">
            Our Story
          </h2>
          <div class="w-16 h-px bg-primary mx-auto"></div>
        </div>
        <p class="fade-in-up delay-100 text-textSecondary leading-loose text-sm md:text-base" style="margin-bottom: var(--space-md);">
          We believe every woman deserves to feel beautiful, confident, and empowered. 
          Our journey began with a simple mission: to create luxury lingerie that celebrates 
          femininity in all its forms.
        </p>
        <p class="fade-in-up delay-200 text-textSecondary leading-loose text-sm md:text-base" style="margin-bottom: var(--space-lg);">
          Each piece in our collection is thoughtfully designed and crafted with premium materials, 
          ensuring both comfort and elegance.
        </p>
        <div class="fade-in-up delay-300">
          <NuxtLink to="/about" class="btn-secondary inline-block">
            Learn More
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
const featuredProducts = products.slice(0, 8)

// 轮播图数�?
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

// 分类数据
const categories = [
  {
    name: 'Bras',
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop',
    link: '/products?category=bras',
    count: 24,
    description: 'Comfortable & supportive'
  },
  {
    name: 'Bodysuits',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop',
    link: '/products?category=bodysuits',
    count: 18,
    description: 'Elegant one-pieces'
  },
  {
    name: 'Chemises',
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop&hue=30',
    link: '/products?category=chemises',
    count: 15,
    description: 'Luxurious sleepwear'
  },
  {
    name: 'Corsets',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop&hue=30',
    link: '/products?category=corsets',
    count: 12,
    description: 'Timeless classics'
  }
]

const currentSlide = ref(0)
const isPlaying = ref(true)
const slideProgress = ref(0)
let autoplayInterval: NodeJS.Timeout | null = null
let progressInterval: NodeJS.Timeout | null = null

// Newsletter form
const newsletterEmail = ref('')
const newsletterConsent = ref(false)
const newsletterError = ref('')
const newsletterSuccess = ref('')
const isSubmitting = ref(false)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
  resetProgress()
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
  resetProgress()
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetProgress()
}

const resetProgress = () => {
  slideProgress.value = 0
}

const startAutoplay = () => {
  isPlaying.value = true
  
  // 自动播放间隔
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
  
  // 进度条更新
  progressInterval = setInterval(() => {
    slideProgress.value += 2 // 每100ms增加2%，5秒完成
    if (slideProgress.value >= 100) {
      slideProgress.value = 0
    }
  }, 100)
}

const stopAutoplay = () => {
  isPlaying.value = false
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

const toggleAutoplay = () => {
  if (isPlaying.value) {
    stopAutoplay()
  } else {
    startAutoplay()
  }
}

const handleNewsletterSubmit = async () => {
  newsletterError.value = ''
  newsletterSuccess.value = ''
  
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newsletterEmail.value)) {
    newsletterError.value = 'Please enter a valid email address'
    return
  }
  
  if (!newsletterConsent.value) {
    newsletterError.value = 'Please accept the terms to subscribe'
    return
  }
  
  isSubmitting.value = true
  
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  newsletterSuccess.value = 'Successfully subscribed! Check your email for your 10% discount code.'
  newsletterEmail.value = ''
  newsletterConsent.value = false
  isSubmitting.value = false
  
  // 3秒后清除成功消息
  setTimeout(() => {
    newsletterSuccess.value = ''
  }, 5000)
}

onMounted(() => {
  startAutoplay()
  
  // 滚动触发动画 - Intersection Observer
  if (process.client) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })
    
    // 观察所有带 fade-in-up 类的元素
    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el)
    })
  }
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
/* Hero标题渐变闪烁效果 */
.hero-title {
  background: linear-gradient(135deg, #FFFFFF 0%, #C9A882 50%, #FFFFFF 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { 
    background-position: 0% 50%; 
  }
  50% { 
    background-position: 100% 50%; 
  }
}

/* Hero轮播过渡动画 */
.hero-slide-transition {
  animation: fadeIn 0.8s ease-in-out;
}

.hero-content-transition {
  animation: slideUp 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 主按钮 - 金色渐变 */
.hero-btn-primary {
  background: linear-gradient(135deg, #C9A882 0%, #B8956F 100%);
  color: #FFFFFF;
  border: none;
  box-shadow: 0 4px 15px rgba(201, 168, 130, 0.3);
}

.hero-btn-primary:hover {
  box-shadow: 0 6px 25px rgba(201, 168, 130, 0.5);
}

/* 次要按钮 - 毛玻璃效果 */
.hero-btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #FFFFFF;
  color: #FFFFFF;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.hero-btn-secondary:hover {
  background: #FFFFFF;
  color: #2C2C2C;
  border-color: #FFFFFF;
}

/* 移动端Hero优化 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem !important; /* 32px，从text-5xl的48px减小 */
    line-height: 1.2;
    margin-bottom: 1rem !important;
  }
  
  /* Hero按钮全宽 */
  .hero-btn-primary,
  .hero-btn-secondary {
    width: 100%;
    text-align: center;
    display: block;
  }
}

/* 小屏幕进一步优化 */
@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem !important; /* 28px */
  }
}
</style>
