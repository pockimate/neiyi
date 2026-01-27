<template>
  <div :class="cardClasses">
    <h2 v-if="title" :class="titleClasses">{{ title }}</h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  titleSize?: 'sm' | 'md' | 'lg' | 'xl'
  highlight?: boolean
  variant?: 'default' | 'gray' | 'red'
}

const props = withDefaults(defineProps<Props>(), {
  titleSize: 'md',
  highlight: false,
  variant: 'default'
})

const cardClasses = computed(() => {
  const base = 'glass-card rounded-2xl p-8 border border-gray-200'
  const variants = {
    default: '',
    gray: 'bg-gray-50',
    red: 'bg-red-50'
  }
  return `${base} ${variants[props.variant]}`
})

const titleClasses = computed(() => {
  const base = 'font-display font-bold text-textPrimary mb-4'
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }
  const spacing = props.titleSize === 'lg' || props.titleSize === 'xl' ? 'mb-6' : 'mb-4'
  return `${base} ${sizes[props.titleSize]} ${spacing}`
})
</script>
