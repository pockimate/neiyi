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
            // ========== 品牌主色系 ==========
            // 深灰色 - 主要品牌色
            primary: {
              DEFAULT: '#2C2C2C',      // 主色 - 按钮、标题
              50: '#F7F7F7',           // 极浅灰 - 背景
              100: '#EFEFEF',          // 很浅灰 - 悬停背景
              200: '#DCDCDC',          // 浅灰 - 边框
              300: '#BDBDBD',          // 中浅灰 - 禁用状态
              400: '#8C8C8C',          // 中灰 - 次要文字
              500: '#5A5A5A',          // 标准灰 - 正文
              600: '#4A4A4A',          // 深灰 - 次要元素
              700: '#3A3A3A',          // 更深灰 - 强调
              800: '#2C2C2C',          // 主深灰 - 主要元素
              900: '#1A1A1A',          // 最深灰 - hover/active
              950: '#0D0D0D'           // 纯黑 - 特殊强调
            },
            
            // 金棕色 - 品牌强调色/CTA
            accent: {
              DEFAULT: '#C9A882',      // 主强调色 - 柔和金棕
              50: '#FAF7F3',           // 极浅金 - 背景提示
              100: '#F5EFE7',          // 很浅金 - 悬停背景
              200: '#EBE0D0',          // 浅金 - 边框
              300: '#DCC9AD',          // 中浅金 - 次要强调
              400: '#D4B895',          // 中金 - 标签
              500: '#C9A882',          // 标准金棕 - 主CTA
              600: '#B8956F',          // 深金棕 - hover
              700: '#9A7B5C',          // 更深金棕 - active
              800: '#7D6349',          // 深棕 - 阴影
              900: '#5E4A37',          // 最深棕 - 特殊状态
              950: '#3F3125'           // 纯棕 - 极深
            },
            
            // 辅助色 - 柔和白色
            secondary: {
              DEFAULT: '#FAFAFA',      // 主背景色
              50: '#FFFFFF',           // 纯白 - 卡片
              100: '#FAFAFA',          // 柔和白 - 主背景
              200: '#F5F5F5',          // 浅灰白 - 次要背景
              300: '#F0F0F0',          // 中灰白 - 分隔
              400: '#E8E8E8',          // 深灰白 - 边框
              500: '#E0E0E0',          // 标准灰 - 边框
              600: '#D4D4D4',          // 深边框
              700: '#C0C0C0',          // 更深边框
              800: '#A8A8A8',          // 深灰
              900: '#8C8C8C'           // 最深灰
            },
            
            // ========== 语义化状态色 ==========
            // 成功色 - 绿色系
            success: {
              DEFAULT: '#10B981',      // 标准成功绿
              50: '#ECFDF5',           // 极浅绿 - 背景
              100: '#D1FAE5',          // 很浅绿 - 提示背景
              200: '#A7F3D0',          // 浅绿 - 边框
              300: '#6EE7B7',          // 中浅绿
              400: '#34D399',          // 中绿
              500: '#10B981',          // 标准绿 - 成功状态
              600: '#059669',          // 深绿 - hover
              700: '#047857',          // 更深绿 - active
              800: '#065F46',          // 深墨绿
              900: '#064E3B'           // 最深绿
            },
            
            // 警告色 - 橙色系
            warning: {
              DEFAULT: '#F59E0B',      // 标准警告橙
              50: '#FFFBEB',           // 极浅橙 - 背景
              100: '#FEF3C7',          // 很浅橙 - 提示背景
              200: '#FDE68A',          // 浅橙 - 边框
              300: '#FCD34D',          // 中浅橙
              400: '#FBBF24',          // 中橙
              500: '#F59E0B',          // 标准橙 - 警告状态
              600: '#D97706',          // 深橙 - hover
              700: '#B45309',          // 更深橙 - active
              800: '#92400E',          // 深棕橙
              900: '#78350F'           // 最深橙
            },
            
            // 错误色 - 红色系
            error: {
              DEFAULT: '#EF4444',      // 标准错误红
              50: '#FEF2F2',           // 极浅红 - 背景
              100: '#FEE2E2',          // 很浅红 - 提示背景
              200: '#FECACA',          // 浅红 - 边框
              300: '#FCA5A5',          // 中浅红
              400: '#F87171',          // 中红
              500: '#EF4444',          // 标准红 - 错误状态
              600: '#DC2626',          // 深红 - hover
              700: '#B91C1C',          // 更深红 - active
              800: '#991B1B',          // 深暗红
              900: '#7F1D1D'           // 最深红
            },
            
            // 信息色 - 蓝色系
            info: {
              DEFAULT: '#3B82F6',      // 标准信息蓝
              50: '#EFF6FF',           // 极浅蓝 - 背景
              100: '#DBEAFE',          // 很浅蓝 - 提示背景
              200: '#BFDBFE',          // 浅蓝 - 边框
              300: '#93C5FD',          // 中浅蓝
              400: '#60A5FA',          // 中蓝
              500: '#3B82F6',          // 标准蓝 - 信息状态
              600: '#2563EB',          // 深蓝 - hover
              700: '#1D4ED8',          // 更深蓝 - active
              800: '#1E40AF',          // 深暗蓝
              900: '#1E3A8A'           // 最深蓝
            },
            
            // ========== 兼容性别名（保持向后兼容）==========
            primaryDark: '#1A1A1A',
            primaryLight: '#4A4A4A',
            accentDark: '#B8956F',
            accentLight: '#F5EFE7',
            
            background: '#FAFAFA',
            backgroundLight: '#FFFFFF',
            backgroundDark: '#F0F0F0',
            
            textPrimary: '#2C2C2C',
            textSecondary: '#5A5A5A',
            textMuted: '#8A8A8A',
            textLight: '#B0B0B0',
            
            border: '#E0E0E0',
            borderDark: '#C0C0C0',
            
            // 移除粉色，使用中性灰色
            rose: '#E0E0E0',
            roseDark: '#CCCCCC',
            roseLight: '#F0F0F0'
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
  },

  vite: {
    optimizeDeps: {
      exclude: ['#app-manifest']
    }
  }
})
