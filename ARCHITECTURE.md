# 🏗️ 网站架构文档

## 📋 架构概览

### 架构类型
**JAMstack 架构**（JavaScript, APIs, Markup）

- **前端**: 纯静态 HTML + CSS + JavaScript
- **后端**: 无服务器（Serverless）
- **数据**: 客户端存储（LocalStorage）
- **部署**: Vercel 全球 CDN

---

## 🎯 技术栈

### 前端技术
```
HTML5          - 页面结构
Tailwind CSS   - 样式框架（CDN）
Vanilla JS     - 交互逻辑
Google Fonts   - 字体服务
```

### 开发工具
```
Git            - 版本控制
GitHub         - 代码托管
Vercel         - 部署平台
VS Code        - 开发环境
```

### 浏览器 API
```
LocalStorage   - 购物车数据持久化
Fetch API      - 未来 API 调用（预留）
History API    - 页面导航
```

---

## 📁 项目结构

```
neiyi/
├── index.html              # 首页
├── products.html           # 产品列表页
├── product-detail.html     # 产品详情页
├── cart.html              # 购物车页
├── checkout.html          # 结账页
│
├── js/
│   ├── cart.js            # 购物车管理
│   └── products.js        # 产品数据和渲染
│
├── vercel.json            # Vercel 配置
├── .gitignore             # Git 忽略文件
├── .vercelignore          # Vercel 忽略文件
│
└── docs/                  # 文档目录
    ├── README.md
    ├── DEPLOYMENT.md
    ├── ARCHITECTURE.md
    └── ...
```

---

## 🔄 数据流架构

### 1. 页面加载流程

```
用户访问 URL
    ↓
Vercel CDN 响应
    ↓
加载 HTML 文件
    ↓
加载 CSS (Tailwind CDN)
    ↓
加载 JavaScript 文件
    ↓
初始化购物车 (LocalStorage)
    ↓
渲染页面内容
```

### 2. 购物车数据流

```
用户点击 "Add to Cart"
    ↓
JavaScript 捕获事件
    ↓
创建产品对象
    ↓
读取 LocalStorage
    ↓
添加/更新商品
    ↓
保存到 LocalStorage
    ↓
更新购物车徽章
    ↓
显示成功通知
```

### 3. 页面导航流程

```
用户点击链接
    ↓
浏览器导航
    ↓
加载新页面
    ↓
读取 LocalStorage
    ↓
恢复购物车状态
    ↓
更新购物车徽章
```

---

## 💾 数据存储架构

### LocalStorage 结构

```javascript
// 购物车数据结构
{
  "cart": [
    {
      "id": 1,
      "name": "Silk Lace Set",
      "price": 89.99,
      "size": "M",
      "color": "Pink",
      "quantity": 1
    },
    {
      "id": 2,
      "name": "Satin Bodysuit",
      "price": 129.99,
      "size": "L",
      "color": "Black",
      "quantity": 2
    }
  ]
}
```

### 数据持久化

- **存储位置**: 浏览器 LocalStorage
- **容量限制**: 5-10MB（足够使用）
- **生命周期**: 永久（除非用户清除）
- **跨页面**: 同域名下共享

---

## 🎨 前端架构

### 页面架构

```
┌─────────────────────────────────────┐
│         Navigation Bar              │
│  (固定顶部，包含购物车徽章)          │
├─────────────────────────────────────┤
│                                     │
│         Page Content                │
│    (响应式布局，Tailwind CSS)        │
│                                     │
├─────────────────────────────────────┤
│            Footer                   │
│   (链接、社交媒体、版权信息)          │
└─────────────────────────────────────┘
```

### 组件化思想

虽然是纯 HTML，但采用了组件化思维：

```
页面 = 导航栏 + 内容区 + Footer
内容区 = Hero + Features + Products + CTA
Products = ProductCard × N
ProductCard = Image + Title + Price + Button
```

### CSS 架构（Tailwind）

```
Utility-First 方法
├── 布局类: flex, grid, container
├── 间距类: p-*, m-*, gap-*
├── 颜色类: bg-*, text-*, border-*
├── 响应式: sm:, md:, lg:, xl:
└── 自定义类: glass-card, hover-lift
```

---

## 🔧 JavaScript 架构

### 模块化设计

```javascript
// cart.js - 购物车模块
├── updateCartCount()      // 更新徽章
├── addToCart()           // 添加商品
├── showNotification()    // 显示通知
└── DOMContentLoaded      // 初始化

// products.js - 产品模块
├── products[]            // 产品数据
├── renderProducts()      // 渲染产品
├── quickAddToCart()      // 快速添加
└── DOMContentLoaded      // 初始化
```

### 事件驱动架构

```javascript
// 事件监听器
document.addEventListener('DOMContentLoaded', init)
button.addEventListener('click', handleClick)
form.addEventListener('submit', handleSubmit)
window.addEventListener('scroll', handleScroll)
```

---

## 🌐 部署架构

### Vercel 部署流程

```
GitHub 仓库
    ↓
Git Push
    ↓
Vercel 检测到更新
    ↓
自动构建（无需构建步骤）
    ↓
部署到全球 CDN
    ↓
生成预览 URL
    ↓
更新生产环境
```

### CDN 架构

```
用户请求
    ↓
Vercel Edge Network
    ↓
最近的 CDN 节点
    ↓
缓存命中？
├── 是 → 直接返回（超快）
└── 否 → 从源获取 → 缓存 → 返回
```

### 全球分布

```
Vercel CDN 节点分布：
├── 北美: 美国、加拿大
├── 欧洲: 英国、德国、法国
├── 亚洲: 日本、新加坡、香港
├── 大洋洲: 澳大利亚
└── 南美: 巴西
```

---

## 🔒 安全架构

### 前端安全

```
✅ HTTPS 强制（Vercel 自动）
✅ XSS 防护（内容转义）
✅ CSRF 防护（无服务器端）
✅ 输入验证（表单验证）
✅ 安全头部（Vercel 配置）
```

### 数据安全

```
✅ LocalStorage 仅存储非敏感数据
✅ 无密码存储
✅ 无支付信息存储
⚠️  未来需要：后端 API + 加密
```

---

## 📊 性能架构

### 加载优化

```
1. HTML 压缩（Vercel 自动）
2. CSS CDN（Tailwind）
3. 字体预加载（preconnect）
4. 图片懒加载（loading="lazy"）
5. 代码分割（按页面）
```

### 缓存策略

```javascript
// vercel.json 配置
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"  // 1小时
        }
      ]
    },
    {
      "source": "/js/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"  // 1年
        }
      ]
    }
  ]
}
```

### 性能指标目标

```
首屏加载: < 2秒
交互时间: < 3秒
FCP: < 1.8秒
LCP: < 2.5秒
CLS: < 0.1
```

---

## 🔄 状态管理架构

### 客户端状态

```javascript
// 全局状态（通过 LocalStorage）
const state = {
  cart: [],           // 购物车商品
  cartCount: 0,       // 商品数量
  lastUpdate: Date    // 最后更新时间
}

// 状态更新流程
Action → Update State → Save to LocalStorage → Update UI
```

### 页面间通信

```
页面 A (添加商品)
    ↓
LocalStorage (保存)
    ↓
页面 B (读取)
    ↓
更新 UI
```

---

## 🎯 扩展架构（未来）

### 后端集成（可选）

```
当前架构: 纯前端
    ↓
添加后端 API
    ↓
├── Node.js + Express
├── Python + Flask
├── Vercel Serverless Functions
└── Supabase / Firebase

功能扩展:
├── 用户认证
├── 订单管理
├── 支付集成
├── 库存管理
└── 数据分析
```

### 数据库集成（可选）

```
当前: LocalStorage
    ↓
升级到数据库
    ↓
├── PostgreSQL (Supabase)
├── MongoDB (Atlas)
├── Firebase Firestore
└── MySQL (PlanetScale)
```

### API 架构（未来）

```
RESTful API 设计:

GET    /api/products          # 获取产品列表
GET    /api/products/:id      # 获取产品详情
POST   /api/cart              # 添加到购物车
PUT    /api/cart/:id          # 更新购物车
DELETE /api/cart/:id          # 删除商品
POST   /api/orders            # 创建订单
GET    /api/orders/:id        # 获取订单详情
```

---

## 📱 响应式架构

### 断点系统

```css
/* Tailwind 断点 */
sm:  640px   /* 手机横屏 */
md:  768px   /* 平板 */
lg:  1024px  /* 小桌面 */
xl:  1280px  /* 桌面 */
2xl: 1536px  /* 大桌面 */
```

### 移动优先策略

```
设计流程:
1. 先设计移动端（375px）
2. 添加平板适配（768px）
3. 添加桌面适配（1024px+）
4. 优化大屏幕（1440px+）
```

---

## 🧪 测试架构（建议）

### 测试层级

```
单元测试 (未实现)
├── cart.js 函数测试
└── products.js 函数测试

集成测试 (未实现)
├── 购物车流程测试
└── 结账流程测试

E2E 测试 (未实现)
├── 用户完整购物流程
└── 跨浏览器测试

手动测试 (已完成)
├── 功能测试 ✅
├── 响应式测试 ✅
└── 浏览器兼容性 ✅
```

---

## 📈 监控架构（建议）

### 性能监控

```
Vercel Analytics (可选)
├── 页面加载时间
├── 用户访问量
├── 地理分布
└── 设备类型

Google Analytics (可选)
├── 用户行为
├── 转化率
├── 跳出率
└── 热力图
```

---

## 🎨 设计系统架构

### 设计令牌

```javascript
// Tailwind 配置
colors: {
  primary: '#DB2777',
  secondary: '#F472B6',
  cta: '#CA8A04',
  background: '#FDF2F8',
  textPrimary: '#831843'
}

fonts: {
  display: 'Playfair Display',
  body: 'Montserrat',
  script: 'Allura'
}

spacing: {
  touch: '48px',
  card: '16px',
  section: '80px'
}
```

---

## 🔧 构建架构

### 当前构建流程

```
无构建步骤！
├── 纯 HTML/CSS/JS
├── CDN 资源
├── 无需编译
└── 直接部署
```

### 未来构建选项

```
如需优化:
├── Vite (构建工具)
├── PostCSS (CSS 处理)
├── Terser (JS 压缩)
└── ImageOptim (图片优化)
```

---

## 📊 架构优势

### ✅ 优点

1. **简单**: 无复杂构建流程
2. **快速**: 全球 CDN 加速
3. **便宜**: 几乎零成本
4. **可靠**: 无服务器故障
5. **安全**: 无后端攻击面
6. **可扩展**: 易于添加功能

### ⚠️ 限制

1. **无后端**: 需要第三方服务
2. **无数据库**: 仅客户端存储
3. **无认证**: 需要集成服务
4. **SEO**: 需要优化（可改进）

---

## 🚀 架构演进路线

### 阶段 1: 当前（MVP）
```
✅ 纯前端
✅ LocalStorage
✅ 静态部署
```

### 阶段 2: 增强（可选）
```
⏳ Vercel Serverless Functions
⏳ Supabase 数据库
⏳ 用户认证
```

### 阶段 3: 完整（未来）
```
⏳ 完整后端 API
⏳ 支付集成
⏳ 订单管理
⏳ 管理后台
```

---

## 📝 总结

**当前架构**: JAMstack（纯前端 + CDN）

**核心特点**:
- 🚀 快速部署
- 💰 低成本
- 🔒 安全可靠
- 📱 响应式
- ⚡ 高性能

**适用场景**:
- ✅ 展示型网站
- ✅ 小型电商
- ✅ 原型验证
- ✅ 个人项目

**扩展性**: 可随时升级到全栈架构

---

**架构文档版本**: 1.0  
**最后更新**: 2026-01-25  
**维护者**: Intimate Elegance Team
