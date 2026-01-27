<template>
  <component
    :is="tag"
    :type="type"
    :disabled="disabled"
    :to="to"
    :class="['base-button', variantClass, sizeClass, { 'w-full': block }]"
    :style="buttonStyle"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  block?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  to?: string
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  block: false,
  disabled: false,
  type: 'button',
  tag: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClass = computed(() => `button-${props.variant}`)
const sizeClass = computed(() => `button-${props.size}`)

const buttonStyle = computed(() => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    borderRadius: '4px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? '0.5' : '1',
    textDecoration: 'none'
  }

  // Variant styles
  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
      color: '#FFFFFF',
      border: 'none',
      boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
    },
    secondary: {
      background: 'transparent',
      color: '#2C2C2C',
      border: '2px solid #2C2C2C'
    },
    accent: {
      background: '#2C2C2C',
      color: '#FFFFFF',
      border: 'none'
    }
  }

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '10px 20px',
      fontSize: '14px'
    },
    md: {
      padding: '14px 32px',
      fontSize: '16px'
    },
    lg: {
      padding: '18px 40px',
      fontSize: '18px'
    },
    xl: {
      padding: '22px 48px',
      fontSize: '20px'
    }
  }

  return {
    ...baseStyle,
    ...variantStyles[props.variant],
    ...sizeStyles[props.size]
  }
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.button-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%) !important;
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4) !important;
}

.button-secondary:hover:not(:disabled) {
  background: #000000 !important;
  color: #FFFFFF !important;
}

.button-accent:hover:not(:disabled) {
  background: #1A1A1A !important;
}

.base-button:active:not(:disabled) {
  transform: translateY(0);
}
</style>
