<template>
  <div>
    <NuxtPage />
    <CartSidebar :is-open="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isCartOpen = useState('cartSidebarOpen', () => false)

useHead({
  htmlAttrs: {
    lang: 'en',
    class: 'scroll-smooth'
  }
})
</script>
