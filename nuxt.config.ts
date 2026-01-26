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
            // Obsessive风格 - 玫瑰金奢华配色
            // 主色系 - 深色调
            primary: '#2C2C2C',        // 深灰 - 主要文字、按钮
            primaryDark: '#1A1A1A',    // 更深灰 - hover状态
            primaryLight: '#4A4A4A',   // 中灰 - 次要元素
            
            // 品牌强调色 - 玫瑰金系（奢华感）
            accent: '#D4AF37',         // 玫瑰金 - 主要CTA和强调
            accentDark: '#B8860B',     // 深金色 - hover状态
            accentLight: '#F5E6D3',    // 浅玫瑰金 - 背景点缀
            
            // 次要强调色 - 柔和粉色（保留）
            rose: '#D4A5A5',           // 柔和玫瑰粉
            roseDark: '#B88B8B',       // 深玫瑰粉
            roseLight: '#E8C5C5',      // 浅玫瑰粉
            
            // 背景色系 - 柔和白色
            background: '#FAFAFA',     // 柔和白背景
            backgroundLight: '#FFFFFF', // 纯白背景
            backgroundDark: '#F0F0F0', // 浅灰背景
            
            // 文字色系 - 柔和深色
            textPrimary: '#2C2C2C',    // 深灰 - 主标题
            textSecondary: '#5A5A5A',  // 中灰 - 正文
            textMuted: '#8A8A8A',      // 浅灰 - 次要文字
            textLight: '#B0B0B0',      // 更浅灰 - 辅助文字
            
            // 边框色系
            border: '#E0E0E0',         // 柔和边框
            borderDark: '#C0C0C0',     // 深边框
            
            // 中性色系（保持）
            neutral: {
              50: '#FAFAFA',
              100: '#F5F5F5',
              200: '#E5E5E5',
              300: '#D4D4D4',
              400: '#A3A3A3',
              500: '#737373',
              600: '#525252',
              700: '#404040',
              800: '#262626',
              900: '#171717'
            },
            
            // 功能色
            success: '#10B981',        // 成功绿
            warning: '#F59E0B',        // 警告橙
            error: '#EF4444',          // 错误红
            info: '#3B82F6'            // 信息蓝
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
