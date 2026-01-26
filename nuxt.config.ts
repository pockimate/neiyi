// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  app: {
    head: {
      title: 'Intimate Elegance - Luxury Lingerie Collection',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover our curated collection of luxury lingerie designed to make you feel confident, beautiful, and empowered.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800&family=Allura&display=swap' 
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: '#E91E63',        // 更鲜艳的粉色（Material Pink 500）
            primaryDark: '#C2185B',    // 深粉色（Material Pink 700）
            secondary: '#F06292',      // 次要粉色（Material Pink 300）
            cta: '#FFA726',            // 更明亮的橙色（Material Orange 400）
            background: '#F8C6D7',     // 更深的粉色背景
            backgroundLight: '#FCE4EC', // 浅粉色背景（Material Pink 50）
            textPrimary: '#880E4F',    // 深玫红文字（Material Pink 900）
            textSecondary: '#4A4A4A'   // 深灰色次要文字
          },
          fontFamily: {
            display: ['Playfair Display', 'serif'],
            body: ['Montserrat', 'sans-serif'],
            script: ['Allura', 'cursive']
          },
          fontSize: {
            'h1': '48px',
            'h2': '36px',
            'h3': '24px',
            'body': '16px',
            'small': '14px'
          },
          lineHeight: {
            'relaxed': '1.7',
            'loose': '1.8'
          },
          minHeight: {
            'touch': '48px'
          },
          minWidth: {
            'touch': '48px'
          },
          boxShadow: {
            'card': '0 8px 24px rgba(0, 0, 0, 0.1)',
            'card-hover': '0 12px 32px rgba(0, 0, 0, 0.15)',
            'glass': '0 8px 32px rgba(0, 0, 0, 0.12)'
          }
        }
      }
    }
  },

  nitro: {
    preset: 'vercel'
  }
})
