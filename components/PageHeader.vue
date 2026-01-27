<template>
  <section :style="sectionStyle">
    <h1 :style="titleStyle">{{ title }}</h1>
    <p v-if="subtitle" :style="subtitleStyle">{{ subtitle }}</p>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()

const sectionStyle = {
  textAlign: 'center' as const,
  padding: '40px 16px 64px',
  background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)'
}

const titleStyle = {
  fontSize: '48px',
  fontWeight: '700',
  letterSpacing: '2px',
  marginBottom: '16px',
  color: '#2C2C2C',
  lineHeight: '1.2',
  fontFamily: "'Playfair Display', serif"
}

const subtitleStyle = {
  fontSize: '18px',
  color: '#666666',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6'
}
</script>
