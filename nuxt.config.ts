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
            // 品牌主色系 - 玫瑰粉（记忆点）
            primary: '#DB2777',        // 玫瑰粉 - 品牌识别色
            primaryDark: '#BE185D',    // 深玫瑰粉 - hover状态
            primaryLight: '#F472B6',   // 浅玫瑰粉 - 辅助色
            
            // 强调色 - 优雅金（高端感）
            accent: '#CA8A04',         // 优雅金 - CTA按钮
            accentDark: '#A16207',     // 深金色 - hover状态
            accentLight: '#EAB308',    // 亮金色 - 高光
            
            // 辅助色系
            secondary: '#F472B6',      // 次要粉色
            tertiary: '#EC4899',       // 第三色
            
            // 背景色系
            background: '#FDF2F8',     // 极浅粉背景
            backgroundLight: '#FEF3F9', // 更浅背景
            backgroundDark: '#FCE7F3', // 稍深背景
            
            // 文字色系
            textPrimary: '#831843',    // 深玫红 - 主标题
            textSecondary: '#4A4A4A',  // 深灰 - 正文
            textMuted: '#6B7280',      // 灰色 - 次要文字
            
            // 中性色系
            neutral: {
              50: '#FAFAF9',
              100: '#F5F5F4',
              200: '#E7E5E4',
              300: '#D6D3D1',
              400: '#A8A29E',
              500: '#78716C',
              600: '#57534E',
              700: '#44403C',
              800: '#292524',
              900: '#1C1917'
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
