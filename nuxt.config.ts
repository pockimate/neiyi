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
            // 黑白极简风格 - Obsessive风格
            // 主色系 - 黑色
            primary: '#000000',        // 纯黑 - 主要文字、按钮、边框
            primaryDark: '#1A1A1A',    // 深灰 - hover状态
            primaryLight: '#333333',   // 浅黑 - 次要元素
            
            // 品牌强调色 - 玫瑰粉（保留识别度）
            accent: '#E91E63',         // 玫瑰粉 - 仅用于重要CTA和强调
            accentDark: '#C2185B',     // 深玫瑰粉 - hover状态
            accentLight: '#F06292',    // 浅玫瑰粉 - 装饰
            
            // 背景色系 - 纯白
            background: '#FFFFFF',     // 纯白背景
            backgroundLight: '#FAFAFA', // 极浅灰背景
            backgroundDark: '#F5F5F5', // 浅灰背景
            
            // 文字色系 - 黑色为主
            textPrimary: '#000000',    // 纯黑 - 主标题
            textSecondary: '#333333',  // 深灰 - 正文
            textMuted: '#666666',      // 中灰 - 次要文字
            textLight: '#999999',      // 浅灰 - 辅助文字
            
            // 边框色系
            border: '#E5E5E5',         // 浅灰边框
            borderDark: '#CCCCCC',     // 深灰边框
            
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
