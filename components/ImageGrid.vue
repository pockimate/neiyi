<template>
  <div class="w-full">
    <!-- 桌面端：4列网格 -->
    <div class="hidden md:grid md:grid-cols-4 gap-4">
      <!-- 第一行：2个小图 + 大图开始 -->
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop" 
          alt="Collection 1"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop" 
          alt="Collection 2"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      
      <!-- 大图 - 占2列2行 -->
      <div class="col-span-2 row-span-2 relative overflow-hidden bg-black group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=800&h=800&fit=crop&sat=-50" 
          alt="Featured Collection"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
        <!-- 播放按钮 -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- 第二行：2个小图（大图右侧） -->
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop&hue=30" 
          alt="Collection 3"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop&hue=60" 
          alt="Collection 4"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      
      <!-- 第三行：4个小图 -->
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop&hue=90" 
          alt="Collection 5"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop&hue=90" 
          alt="Collection 6"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop&hue=120" 
          alt="Collection 7"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop&hue=120" 
          alt="Collection 8"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
    </div>
    
    <!-- 移动端：2列简化网格 -->
    <div class="grid grid-cols-2 gap-3 md:hidden">
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop" 
          alt="Collection 1"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop" 
          alt="Collection 2"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div class="col-span-2 relative overflow-hidden bg-black aspect-video group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=800&h=600&fit=crop&sat=-50" 
          alt="Featured"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop&hue=30" 
          alt="Collection 3"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div class="relative overflow-hidden bg-gray-100 aspect-square group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f?w=400&h=400&fit=crop&hue=60" 
          alt="Collection 4"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 独立的图片网格组件
</script>
