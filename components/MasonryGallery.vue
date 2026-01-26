<template>
  <div class="w-full">
    <!-- 标题 -->
    <div class="text-center mb-12 md:mb-16">
      <p class="text-xs md:text-sm text-accent font-semibold mb-3 tracking-widest uppercase">
        Join #ObsessiveLingerie
      </p>
      <h2 class="text-3xl md:text-5xl font-light text-primary mb-4 tracking-widest uppercase">
        Your Photos
      </h2>
      <p class="text-sm md:text-base text-textSecondary max-w-3xl mx-auto">
        Tag @ObsessiveLingerie and add #YesObsessive on social for a chance to be featured in our galleries.
      </p>
    </div>

    <!-- 瀑布流网格 -->
    <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="break-inside-avoid mb-4 group relative overflow-hidden cursor-pointer"
        :class="{ 'animate-fade-in': isLoaded }"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="relative overflow-hidden bg-gray-100">
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            @load="onImageLoad(index)"
          />
          <!-- 遮罩层 -->
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          
          <!-- Hover时显示的图标 -->
          <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载更多按钮 -->
    <div class="text-center mt-12 md:mt-16">
      <button @click="loadMore" class="btn-secondary inline-block">
        Load More Photos
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoaded = ref(false)
const loadedImages = ref(0)

// 示例照片数据
const photos = ref([
  {
    src: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=600&fit=crop',
    alt: 'Gallery photo 1'
  },
  {
    src: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=500&fit=crop',
    alt: 'Gallery photo 2'
  },
  {
    src: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=700&fit=crop&hue=30',
    alt: 'Gallery photo 3'
  },
  {
    src: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=550&fit=crop&hue=30',
    alt: 'Gallery photo 4'
  },
  {
    src: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=650&fit=crop&hue=60',
    alt: 'Gallery photo 5'
  },
  {
    src: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=600&fit=crop&hue=60',
    alt: 'Gallery photo 6'
  },
  {
    src: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=500&fit=crop&hue=90',
    alt: 'Gallery photo 7'
  },
  {
    src: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=700&fit=crop&hue=90',
    alt: 'Gallery photo 8'
  },
  {
    src: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=550&fit=crop&hue=120',
    alt: 'Gallery photo 9'
  },
  {
    src: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=650&fit=crop&hue=120',
    alt: 'Gallery photo 10'
  },
  {
    src: 'https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=600&fit=crop&hue=150',
    alt: 'Gallery photo 11'
  },
  {
    src: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=500&fit=crop&hue=150',
    alt: 'Gallery photo 12'
  }
])

const onImageLoad = (index: number) => {
  loadedImages.value++
  if (loadedImages.value === photos.value.length) {
    isLoaded.value = true
  }
}

const loadMore = () => {
  // 加载更多照片的逻辑
  console.log('Load more photos')
}

onMounted(() => {
  // 延迟触发动画
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<style scoped>
/* 淡入动画 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}

/* 确保图片加载时有平滑过渡 */
img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
