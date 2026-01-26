<template>
  <div>
    <TheNavbar />
    
    <!-- Hero Carousel Section -->
    <section class="relative h-screen overflow-hidden">
      <!-- Carousel Container -->
      <div class="relative h-full">
        <!-- Slides -->
        <TransitionGroup name="slide">
          <div
            v-for="(slide, index) in carouselSlides"
            :key="slide.id"
            v-show="currentSlide === index"
            class="absolute inset-0 w-full h-full"
          >
            <!-- Background Image -->
            <div class="absolute inset-0">
              <img
                :src="slide.image"
                :alt="slide.title"
                class="w-full h-full object-cover"
              />
              <!-- Overlay Gradient -->
              <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            </div>
            
            <!-- Content -->
            <div class="relative h-full flex items-center">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div class="max-w-2xl">
                  <p class="font-script text-2xl md:text-4xl text-pink-300 mb-4 animate-fade-in">
                    {{ slide.subtitle }}
                  </p>
                  <h1 class="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                    {{ slide.title }}
                  </h1>
                  <p class="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s;">
                    {{ slide.description }}
                  </p>
                  <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style="animation-delay: 0.4s;">
                    <NuxtLink
                      :to="slide.ctaLink"
                      class="btn-accent flex items-center justify-center text-lg glow-accent"
                    >
                      {{ slide.ctaText }}
                    </NuxtLink>
                    <NuxtLink
                      to="/products"
                      class="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 cursor-pointer min-h-[48px] flex items-center justify-center text-lg"
                    >
                      View All
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
        
        <!-- Navigation Arrows -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 cursor-pointer"
          aria-label="Previous slide"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 cursor-pointer"
          aria-label="Next slide"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        
        <!-- Dots Indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          <button
            v-for="(slide, index) in carouselSlides"
            :key="`dot-${slide.id}`"
            @click="goToSlide(index)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300 cursor-pointer',
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
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

    <!-- Shop by Category -->
    <section class="py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display text-h2 md:text-5xl font-bold text-primary mb-4">Shop by Category</h2>
          <p class="text-slate-600 text-body max-w-2xl mx-auto leading-relaxed">Find your perfect style</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <NuxtLink to="/products" class="group glass-card rounded-2xl p-6 border border-pink-200 hover-lift cursor-pointer text-center">
            <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 class="font-display text-lg font-semibold text-textPrimary mb-1">Bras & Sets</h3>
            <p class="text-sm text-slate-500">Elegant essentials</p>
          </NuxtLink>
          
          <NuxtLink to="/products" class="group glass-card rounded-2xl p-6 border border-pink-200 hover-lift cursor-pointer text-center">
            <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
            </div>
            <h3 class="font-display text-lg font-semibold text-textPrimary mb-1">Bodysuits</h3>
            <p class="text-sm text-slate-500">Sensual silhouettes</p>
          </NuxtLink>
          
          <NuxtLink to="/products" class="group glass-card rounded-2xl p-6 border border-pink-200 hover-lift cursor-pointer text-center">
            <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
              </svg>
            </div>
            <h3 class="font-display text-lg font-semibold text-textPrimary mb-1">Chemises</h3>
            <p class="text-sm text-slate-500">Romantic nights</p>
          </NuxtLink>
          
          <NuxtLink to="/products" class="group glass-card rounded-2xl p-6 border border-pink-200 hover-lift cursor-pointer text-center">
            <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-display text-lg font-semibold text-textPrimary mb-1">Corsets</h3>
            <p class="text-sm text-slate-500">Timeless allure</p>
          </NuxtLink>
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
          <NuxtLink to="/products" class="inline-block btn-accent glow-accent">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Customer Testimonials -->
    <section class="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display text-h2 md:text-5xl font-bold text-primary mb-4">What Our Customers Say</h2>
          <p class="text-slate-600 text-body max-w-2xl mx-auto leading-relaxed">Join thousands of confident women who trust us</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="glass-card rounded-2xl p-8 border border-pink-200">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-500 text-xl">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            <p class="text-slate-600 text-body mb-6 leading-relaxed italic">"The quality is absolutely stunning! The lace is delicate yet durable, and the fit is perfect. I've never felt more confident."</p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full flex items-center justify-center text-primary font-semibold">
                S
              </div>
              <div class="ml-4">
                <p class="font-semibold text-textPrimary">Sarah M.</p>
                <p class="text-sm text-slate-500">Verified Buyer</p>
              </div>
            </div>
          </div>
          
          <div class="glass-card rounded-2xl p-8 border border-pink-200">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-500 text-xl">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            <p class="text-slate-600 text-body mb-6 leading-relaxed italic">"Fast shipping and discreet packaging. The pieces are even more beautiful in person. Will definitely order again!"</p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center text-primary font-semibold">
                E
              </div>
              <div class="ml-4">
                <p class="font-semibold text-textPrimary">Emma L.</p>
                <p class="text-sm text-slate-500">Verified Buyer</p>
              </div>
            </div>
          </div>
          
          <div class="glass-card rounded-2xl p-8 border border-pink-200">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-500 text-xl">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            <p class="text-slate-600 text-body mb-6 leading-relaxed italic">"Exceptional customer service and the size guide was spot on. These pieces make me feel absolutely gorgeous!"</p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full flex items-center justify-center text-primary font-semibold">
                M
              </div>
              <div class="ml-4">
                <p class="font-semibold text-textPrimary">Maria K.</p>
                <p class="text-sm text-slate-500">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p class="font-script text-3xl text-primary mb-4">Our Story</p>
            <h2 class="font-display text-h2 md:text-4xl font-bold text-textPrimary mb-6">Crafted with Love & Passion</h2>
            <p class="text-slate-600 text-body mb-6 leading-relaxed">
              We believe every woman deserves to feel beautiful, confident, and empowered. Our journey began with a simple mission: to create luxury lingerie that celebrates femininity in all its forms.
            </p>
            <p class="text-slate-600 text-body mb-6 leading-relaxed">
              Each piece in our collection is thoughtfully designed and crafted with premium materials, ensuring both comfort and elegance. From delicate lace to sumptuous silk, we source only the finest fabrics to create lingerie that feels as good as it looks.
            </p>
            <div class="flex flex-wrap gap-8 mt-8">
              <div>
                <p class="font-display text-3xl font-bold text-primary">10K+</p>
                <p class="text-slate-600 text-sm">Happy Customers</p>
              </div>
              <div>
                <p class="font-display text-3xl font-bold text-primary">500+</p>
                <p class="text-slate-600 text-sm">Unique Designs</p>
              </div>
              <div>
                <p class="font-display text-3xl font-bold text-primary">98%</p>
                <p class="text-slate-600 text-sm">Satisfaction Rate</p>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="glass-card rounded-3xl p-8 border border-pink-200 aspect-square flex items-center justify-center">
              <div class="text-center">
                <svg class="w-32 h-32 mx-auto text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <p class="font-script text-2xl text-primary">Made with love</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-20 px-4 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100">
      <div class="max-w-4xl mx-auto text-center">
        <div class="glass-card rounded-3xl p-8 md:p-12 border border-pink-200">
          <p class="font-script text-3xl text-primary mb-4">Stay Connected</p>
          <h2 class="font-display text-h2 md:text-4xl font-bold text-textPrimary mb-4">Join Our VIP List</h2>
          <p class="text-slate-600 text-body mb-8 max-w-2xl mx-auto leading-relaxed">
            Be the first to know about new arrivals, exclusive offers, and styling tips. Plus, get 15% off your first order!
          </p>
          <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="flex-1 px-6 py-4 rounded-full border-2 border-pink-200 focus:border-primary focus:outline-none bg-white/80 backdrop-blur-sm text-body"
            />
            <button 
              type="submit" 
              class="btn-accent glow-accent whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          <p class="text-sm text-slate-500 mt-4">We respect your privacy. Unsubscribe anytime.</p>
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

// Carousel state
const currentSlide = ref(0)
const autoplayInterval = ref<NodeJS.Timeout | null>(null)

// Carousel slides data
const carouselSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=1920&h=1080&fit=crop',
    title: 'Embrace Your Sensuality',
    subtitle: 'Where elegance meets desire',
    description: 'Discover our curated collection of luxury lingerie designed to make you feel confident, beautiful, and empowered.',
    ctaText: 'Shop Collection',
    ctaLink: '/products'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1920&h=1080&fit=crop',
    title: 'New Arrivals',
    subtitle: 'Fresh & Exclusive',
    description: 'Explore our latest collection featuring the finest fabrics and most elegant designs.',
    ctaText: 'Discover New',
    ctaLink: '/products'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=1920&h=1080&fit=crop&sat=-100',
    title: 'Timeless Elegance',
    subtitle: 'Classic Beauty',
    description: 'Indulge in our signature pieces that celebrate your natural beauty and confidence.',
    ctaText: 'Shop Now',
    ctaLink: '/products'
  }
]

// Carousel functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
  resetAutoplay()
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? carouselSlides.length - 1 : currentSlide.value - 1
  resetAutoplay()
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetAutoplay()
}

const startAutoplay = () => {
  autoplayInterval.value = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = null
  }
}

const resetAutoplay = () => {
  stopAutoplay()
  startAutoplay()
}

// Lifecycle
onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>


<style scoped>
/* Carousel Slide Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Fade In Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Float Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}
</style>
