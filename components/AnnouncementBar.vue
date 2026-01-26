<template>
  <div 
    v-if="!isClosed" 
    class="announcement-bar fixed top-0 left-0 right-0 z-[60] overflow-hidden"
    :style="{ height: barHeight }"
  >
    <!-- 渐变背景 -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#FFF5F0] via-[#FFE8DC] to-[#FFF5F0]"></div>
    
    <!-- 装饰性光晕 -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"></div>
    
    <div class="relative h-full flex items-center">
      <!-- 跑马灯容器 -->
      <div class="marquee-container w-full overflow-hidden">
        <div class="marquee-content flex items-center gap-12" :style="marqueeStyle">
          <!-- 重复3次以确保无缝滚动 -->
          <template v-for="i in 3" :key="i">
            <div 
              v-for="(announcement, index) in announcements" 
              :key="`${i}-${index}`"
              class="flex items-center gap-3 whitespace-nowrap"
            >
              <!-- 图标 -->
              <svg class="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
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
              <span class="text-accent/30 text-xl">•</span>
            </div>
          </template>
        </div>
      </div>
      
      <!-- 关闭按钮 -->
      <button
        @click="closeBar"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-accent/10 rounded-full transition-colors duration-200 cursor-pointer group"
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

const props = defineProps({
  height: {
    type: String,
    default: '40px'
  },
  speed: {
    type: Number,
    default: 40 // 像素/秒
  },
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
const barHeight = computed(() => props.height)

// 计算动画持续时间（基于速度）
const marqueeStyle = computed(() => {
  // 假设每个公告平均宽度约600px，3次重复 = 1800px
  const totalWidth = props.announcements.length * 600 * 3
  const duration = totalWidth / props.speed
  
  return {
    animation: `marquee ${duration}s linear infinite`
  }
})

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
}

.marquee-container {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%); /* 移动1/3（因为重复3次） */
  }
}

.marquee-content {
  animation: marquee 60s linear infinite;
}

/* 鼠标悬停时暂停 */
.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}

/* 减少动画支持 */
@media (prefers-reduced-motion: reduce) {
  .marquee-content {
    animation: none;
    transform: none;
  }
}
</style>
