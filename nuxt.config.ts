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
            primary: '#DB2777',
            secondary: '#F472B6',
            cta: '#CA8A04',
            background: '#FDF2F8',
            textPrimary: '#831843'
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
          }
        }
      }
    }
  },

  nitro: {
    preset: 'vercel'
  }
})
