<template>
  <div>
    <!-- Page Transitions -->
    <NuxtPage :transition="{
      name: 'page',
      mode: 'out-in',
      onBeforeEnter: onPageBeforeEnter,
      onAfterLeave: onPageAfterLeave
    }" />
    
    <CartSidebar :is-open="isCartOpen" @close="isCartOpen = false" />
    <MobileBottomNav />
    
    <!-- Cookie Consent Banner -->
    <CookieConsent />
    
    <!-- Flying Cart Animation Container -->
    <div id="flying-cart-container" class="fixed inset-0 pointer-events-none z-[9999]"></div>
  </div>
</template>

<script setup lang="ts">
const isCartOpen = useState('cartSidebarOpen', () => false)

useHead({
  htmlAttrs: {
    lang: 'en',
    class: 'scroll-smooth'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes' }
  ]
})

// Page transition callbacks
const onPageBeforeEnter = () => {
  // Scroll to top on page enter
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}

const onPageAfterLeave = () => {
  // Cleanup after page leave
}
</script>

<style>
/* ==========================================
   页面过渡动画
   ========================================== */

/* Fade + Slide Up */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ==========================================
   Flying Cart Animation Container
   ========================================== */
#flying-cart-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}

.flying-product {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 9999;
  animation: fly-to-cart 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fly-to-cart {
  0% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.8) rotate(10deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) rotate(20deg);
  }
}
</style>
