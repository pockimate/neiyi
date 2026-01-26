<template>
  <div 
    v-if="!isClosed" 
    class="announcement-bar fixed top-0 left-0 right-0 z-[60] overflow-hidden h-10"
  >
    <!-- 渐变背景 -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#FFF5F0] via-[#FFE8DC] to-[#FFF5F0]"></div>
    
    <!-- 装饰性光晕 -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"></div>
    
    <div class="relative h-full flex items-center">
      <!-- 跑马灯容器 -->
      <div class="marquee-wrapper w-full overflow-hidden">
        <div class="marquee-track">
          <!-- 第一组内容 -->
          <div class="marquee-content">
            <div 
              v-for="(announcement, index) in announcements" 
              :key="`group1-${index}`"
              class="inline-flex items-center gap-3 whitespace-nowrap px-6"
            >
              <!-- 图标 -->
              <svg class="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              
              <!-- 文字 -->
              <span class="text-sm font-medium text-neutral-800">
                {{ announcement.text }}
              </span>
              
              <!-- 链接（如果有） -->
              <NuxtLink 
                v-if="announcement.link"
                :to="announcement.link"
                class="text-sm font-semibold text-accent hover:text-accentDark underline underline-offset-2 transition-colors cursor-pointer"
              >
                {{ announcement.linkText || 'Learn More' }}
              </NuxtLink>
              
              <!-- 分隔符 -->
              <span class="text-accent/30 text-2xl mx-2">•</span>
            </div>
          </div>
          
          <!-- 第二组内容（克隆，确保无缝） -->
          <div class="marquee-content" aria-hidden="true">
            <div 
              v-for="(announcement, index) in announcements" 
              :key="`group2-${index}`"
              class="inline-flex items-center gap-3 whitespace-nowrap px-6"
            >
              <!-- 图标 -->
              <svg class="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              
              <!-- 文字 -->
              <span class="text-sm font-medium text-neutral-800">
                {{ announcement.text }}
              </span>
              
              <!-- 链接（如果有） -->
              <NuxtLink 
                v-if="announcement.link"
                :to="announcement.link"
                class="text-sm font-semibold text-accent hover:text-accentDark underline underline-offset-2 transition-colors cursor-pointer"
              >
                {{ announcement.linkText || 'Learn More' }}
              </NuxtLink>
              
              <!-- 分隔符 -->
              <span class="text-accent/30 text-2xl mx-2">•</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 关闭按钮 -->
      <button
        @click="closeBar"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-accent/10 rounded-full transition-colors duration-200 cursor-pointer group z-10 bg-white/80 backdrop-blur-sm"
        aria-label="Close announcement"
      >
        <svg class="w-4 h-4 text-neutral-600 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Announcement {
  text: string
  link?: string
  linkText?: string
}

defineProps({
  announcements: {
    type: Array as () => Announcement[],
    default: () => [
      {
        text: '🎉 New Arrivals: Spring Collection 2026 - Up to 30% OFF',
        link: '/products',
        linkText: 'Shop Now'
      },
      {
        text: '✨ Free Shipping on Orders Over $50',
        link: '/shipping'
      },
      {
        text: '💝 Valentine\'s Special: Buy 2 Get 1 Free',
        link: '/products',
        linkText: 'View Deals'
      }
    ]
  }
})

const isClosed = ref(false)

const closeBar = () => {
  isClosed.value = true
  // 保存到localStorage，避免刷新后再次显示
  if (process.client) {
    localStorage.setItem('announcementBarClosed', 'true')
  }
}

// 检查是否已关闭
onMounted(() => {
  if (process.client) {
    const closed = localStorage.getItem('announcementBarClosed')
    if (closed === 'true') {
      isClosed.value = true
    }
  }
})
</script>

<style scoped>
.announcement-bar {
  box-shadow: 0 2px 8px rgba(202, 138, 4, 0.1);
  font-family: 'Montserrat', sans-serif;
}

.marquee-wrapper {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.marquee-track {
  display: flex;
  width: fit-content;
  animation: scroll 40s linear infinite;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 鼠标悬停时暂停 */
.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}

/* 减少动画支持 */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
  
  .marquee-content:last-child {
    display: none;
  }
}
</style>
