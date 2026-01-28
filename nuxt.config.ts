// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // 禁用 SSR 以避免 hydration 问题
  ssr: false,
  
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
        { name: 'description', content: 'Discover our curated collection of luxury lingerie designed to make you feel confident, beautiful, and empowered.' },
        { name: 'theme-color', content: '#2C2C2C' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800&family=Allura&display=swap' 
        },
        { rel: 'manifest', href: '/manifest.json' }
      ],
      script: [
        {
          src: 'https://www.paypal.com/sdk/js?client-id=test&currency=USD&components=buttons,card-fields,googlepay',
          defer: true
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
            // 衬线字体 - 用于标题和品牌元素
            display: ['Playfair Display', 'Georgia', 'serif'],
            // 无衬线字体 - 用于正文和UI元素
            body: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            // 手写字体 - 用于装饰性文字
            script: ['Allura', 'cursive'],
            // 系统字体栈 - 用于表单和数据
            mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
          },
          fontSize: {
            // 标题层级 (H1-H6)
            'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],      // 48px
            'h2': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],   // 36px
            'h3': ['1.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],        // 30px
            'h4': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],          // 24px
            'h5': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],         // 20px
            'h6': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],        // 18px
            
            // 正文层级
            'body-xl': ['1.25rem', { lineHeight: '1.7', letterSpacing: '0' }],                       // 20px
            'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],                      // 18px
            'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],                             // 16px (默认)
            'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],                      // 14px
            
            // 辅助文字
            'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],                  // 12px
            'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '600' }], // 12px uppercase
            
            // 显示文字 (Hero/Landing)
            'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],  // 72px
            'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }], // 60px
            'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],    // 48px
            
            // 兼容旧配置
            'h1-old': '48px',
            'h2-old': '36px',
            'h3-old': '24px',
            'small': '14px'
          },
          lineHeight: {
            'tighter': '1.1',
            'tight': '1.2',
            'snug': '1.3',
            'normal': '1.5',
            'relaxed': '1.6',
            'loose': '1.7',
            'extra-loose': '1.8'
          },
          letterSpacing: {
            'tighter': '-0.02em',
            'tight': '-0.01em',
            'normal': '0',
            'wide': '0.01em',
            'wider': '0.05em',
            'widest': '0.1em'
          },
          fontWeight: {
            'thin': '100',
            'extralight': '200',
            'light': '300',
            'normal': '400',
            'medium': '500',
            'semibold': '600',
            'bold': '700',
            'extrabold': '800',
            'black': '900'
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
    preset: 'vercel',
    // 启用资源压缩 (Gzip + Brotli)
    compressPublicAssets: true,
    // 禁用预渲染（避免SSR指令问题）
    prerender: {
      crawlLinks: false,
      routes: []
    },
    // 修复Windows路径问题
    output: {
      dir: '.vercel/output'
    },
    // 安全响应头 - 开发环境放宽限制
    routeRules: {
      '/**': {
        headers: {
          // XSS 防护
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
          'X-XSS-Protection': '1; mode=block',
          
          // 引用策略
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      }
    }
  },

  // 路由规则 - 缓存策略
  routeRules: {
    // 动态页面 - 短期缓存
    '/': { swr: 3600 },
    '/products': { swr: 600 },
    '/search': { swr: 300 },
    '/about': { swr: 3600 },
    '/contact': { swr: 3600 },
    '/terms': { swr: 3600 },
    '/privacy': { swr: 3600 },
    '/shipping': { swr: 3600 },
    '/returns': { swr: 3600 },
    '/size-guide': { swr: 3600 },
    
    // 用户相关页面 - 客户端渲染
    '/cart': { ssr: false },
    '/checkout': { ssr: false },
    '/account/**': { ssr: false },
    '/admin/**': { ssr: false }
  },

  // 实验性功能 - 性能优化
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true
  },

  vite: {
    optimizeDeps: {
      exclude: []
    },
    build: {
      // 代码分割配置
      rollupOptions: {
        output: {
          // 简化的分块策略（避免循环依赖）
          manualChunks: (id) => {
            // Vendor chunks - 第三方库
            if (id.includes('node_modules')) {
              // Vue 生态系统
              if (id.includes('vue') || id.includes('@vue') || id.includes('pinia')) {
                return 'vendor-vue'
              }
              // 其他第三方库
              return 'vendor-libs'
            }
          },
          // 文件命名策略
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: 'entry/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      },
      // 压缩配置
      minify: 'terser',
      terserOptions: {
        compress: {
          // 移除 console
          drop_console: true,
          // 移除 debugger
          drop_debugger: true,
          // 移除未使用的代码
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        },
        format: {
          // 移除注释
          comments: false
        }
      },
      // CSS 代码分割
      cssCodeSplit: true,
      // 资源内联阈值 (4KB)
      assetsInlineLimit: 4096,
      // 启用 source map (仅开发环境)
      sourcemap: false,
      // 目标浏览器
      target: 'es2015',
      // 报告压缩后的大小
      reportCompressedSize: false
    },
    // CSS 优化
    css: {
      devSourcemap: false
    },
    // 服务器配置
    server: {
      // 预热常用文件
      warmup: {
        clientFiles: [
          './app.vue',
          './pages/index.vue',
          './pages/products.vue',
          './components/TheNavbar.vue',
          './components/TheFooter.vue',
          './components/ProductCard.vue'
        ]
      }
    }
  },

  // 组件自动导入优化
  components: {
    dirs: [
      {
        path: '~/components',
        // 全局组件
        global: false,
        // 路径前缀
        pathPrefix: false
      }
    ]
  }
})
