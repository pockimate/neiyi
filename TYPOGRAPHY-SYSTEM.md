# 字体系统规范

## 概述

完整的字体层级系统，包含标题、正文、辅助文字和显示文字的规范，确保视觉层次清晰和品牌一致性。

---

## 🎯 字体家族

### Display Font（衬线字体）- Playfair Display
**用途**: 标题、品牌元素、重要信息

```vue
<h1 class="font-display">Elegant Heading</h1>
```

**特点**:
- 优雅的衬线字体
- 适合大标题和品牌标语
- 传达奢华和精致感
- 备用字体: Georgia, serif

### Body Font（无衬线字体）- Montserrat
**用途**: 正文、UI元素、导航、按钮

```vue
<p class="font-body">Clean and readable body text</p>
```

**特点**:
- 现代无衬线字体
- 易读性强
- 适合长文本阅读
- 备用字体: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif

### Script Font（手写字体）- Allura
**用途**: 装饰性文字、品牌签名、特殊强调

```vue
<span class="font-script">Handwritten touch</span>
```

**特点**:
- 优雅的手写风格
- 用于点缀和装饰
- 不适合长文本
- 谨慎使用

### Mono Font（等宽字体）
**用途**: 代码、数据、表单输入

```vue
<code class="font-mono">SKU-12345</code>
```

---

## 📏 字体层级规范

### 标题层级 (H1-H6)

#### H1 - 主标题
```vue
<h1 class="text-h1 font-display text-primary">
  Main Page Title
</h1>
```
- **尺寸**: 48px (3rem)
- **行高**: 1.2
- **字重**: 700 (Bold)
- **字间距**: -0.02em
- **用途**: 页面主标题、Hero区域

#### H2 - 次级标题
```vue
<h2 class="text-h2 font-display text-primary">
  Section Title
</h2>
```
- **尺寸**: 36px (2.25rem)
- **行高**: 1.3
- **字重**: 600 (Semibold)
- **字间距**: -0.01em
- **用途**: 主要区块标题

#### H3 - 三级标题
```vue
<h3 class="text-h3 font-display text-primary">
  Subsection Title
</h3>
```
- **尺寸**: 30px (1.875rem)
- **行高**: 1.4
- **字重**: 600 (Semibold)
- **用途**: 子区块标题、卡片标题

#### H4 - 四级标题
```vue
<h4 class="text-h4 font-body text-primary">
  Component Title
</h4>
```
- **尺寸**: 24px (1.5rem)
- **行高**: 1.4
- **字重**: 600 (Semibold)
- **用途**: 组件标题、列表标题

#### H5 - 五级标题
```vue
<h5 class="text-h5 font-body text-primary">
  Small Section Title
</h5>
```
- **尺寸**: 20px (1.25rem)
- **行高**: 1.5
- **字重**: 600 (Semibold)
- **用途**: 小区块标题

#### H6 - 六级标题
```vue
<h6 class="text-h6 font-body text-primary">
  Smallest Title
</h6>
```
- **尺寸**: 18px (1.125rem)
- **行高**: 1.5
- **字重**: 600 (Semibold)
- **用途**: 最小标题、强调文字

---

### 正文层级

#### Body XL - 大号正文
```vue
<p class="text-body-xl font-body text-primary-500">
  Large body text for emphasis
</p>
```
- **尺寸**: 20px (1.25rem)
- **行高**: 1.7
- **用途**: 引言、重要段落

#### Body LG - 中大号正文
```vue
<p class="text-body-lg font-body text-primary-500">
  Medium-large body text
</p>
```
- **尺寸**: 18px (1.125rem)
- **行高**: 1.7
- **用途**: 强调段落、介绍文字

#### Body - 标准正文 ⭐
```vue
<p class="text-body font-body text-primary-500">
  Standard body text for reading
</p>
```
- **尺寸**: 16px (1rem) - 默认
- **行高**: 1.6
- **用途**: 主要正文内容

#### Body SM - 小号正文
```vue
<p class="text-body-sm font-body text-primary-500">
  Smaller body text
</p>
```
- **尺寸**: 14px (0.875rem)
- **行高**: 1.6
- **用途**: 次要信息、辅助说明

---

### 辅助文字

#### Caption - 说明文字
```vue
<span class="text-caption font-body text-textMuted">
  Image caption or metadata
</span>
```
- **尺寸**: 12px (0.75rem)
- **行高**: 1.5
- **字间距**: 0.01em
- **用途**: 图片说明、元数据、时间戳

#### Overline - 上标文字
```vue
<span class="text-overline font-body text-textMuted uppercase">
  Category Label
</span>
```
- **尺寸**: 12px (0.75rem)
- **行高**: 1.5
- **字重**: 600 (Semibold)
- **字间距**: 0.1em
- **用途**: 分类标签、章节标记（通常大写）

---

### 显示文字 (Hero/Landing)

#### Display XL - 超大显示
```vue
<h1 class="text-display-xl font-display text-primary">
  Hero Title
</h1>
```
- **尺寸**: 72px (4.5rem)
- **行高**: 1.1
- **字重**: 800 (Extrabold)
- **字间距**: -0.02em
- **用途**: Hero区域主标题

#### Display LG - 大号显示
```vue
<h1 class="text-display-lg font-display text-primary">
  Landing Title
</h1>
```
- **尺寸**: 60px (3.75rem)
- **行高**: 1.1
- **字重**: 800 (Extrabold)
- **字间距**: -0.02em
- **用途**: Landing页面标题

#### Display MD - 中号显示
```vue
<h1 class="text-display-md font-display text-primary">
  Section Hero
</h1>
```
- **尺寸**: 48px (3rem)
- **行高**: 1.2
- **字重**: 700 (Bold)
- **字间距**: -0.02em
- **用途**: 区块Hero标题

---

## 🎨 字体样式工具类

### 字重 (Font Weight)

```vue
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-extrabold">Extrabold (800)</p>
```

### 行高 (Line Height)

```vue
<p class="leading-tight">Tight (1.2)</p>
<p class="leading-snug">Snug (1.3)</p>
<p class="leading-normal">Normal (1.5)</p>
<p class="leading-relaxed">Relaxed (1.6)</p>
<p class="leading-loose">Loose (1.7)</p>
```

### 字间距 (Letter Spacing)

```vue
<p class="tracking-tighter">Tighter (-0.02em)</p>
<p class="tracking-tight">Tight (-0.01em)</p>
<p class="tracking-normal">Normal (0)</p>
<p class="tracking-wide">Wide (0.01em)</p>
<p class="tracking-wider">Wider (0.05em)</p>
<p class="tracking-widest">Widest (0.1em)</p>
```

---

## 📱 响应式字体

### 移动端优化

```vue
<!-- 响应式标题 -->
<h1 class="text-h3 md:text-h2 lg:text-h1 font-display">
  Responsive Heading
</h1>

<!-- 响应式正文 -->
<p class="text-body-sm md:text-body lg:text-body-lg font-body">
  Responsive body text
</p>
```

### 推荐断点

| 屏幕尺寸 | 建议字号调整 |
|---------|------------|
| Mobile (< 768px) | 减小 10-20% |
| Tablet (768px - 1024px) | 标准尺寸 |
| Desktop (> 1024px) | 标准或增大 10% |

---

## 🎯 使用场景示例

### 产品卡片

```vue
<div class="product-card">
  <!-- 分类标签 -->
  <span class="text-overline font-body text-textMuted uppercase tracking-widest">
    New Arrival
  </span>
  
  <!-- 产品名称 -->
  <h3 class="text-h4 font-display text-primary mt-2">
    Silk Lace Bralette
  </h3>
  
  <!-- 产品描述 -->
  <p class="text-body-sm font-body text-primary-500 mt-2">
    Delicate silk with intricate lace details
  </p>
  
  <!-- 价格 -->
  <p class="text-h5 font-body text-accent-600 mt-4 font-semibold">
    $89.00
  </p>
</div>
```

### Hero区域

```vue
<section class="hero">
  <!-- 上标 -->
  <span class="text-overline font-body text-accent-600 uppercase tracking-widest">
    Spring Collection 2025
  </span>
  
  <!-- 主标题 -->
  <h1 class="text-display-xl md:text-display-lg font-display text-primary mt-4">
    Elegance Redefined
  </h1>
  
  <!-- 副标题 -->
  <p class="text-body-xl font-body text-primary-500 mt-6 max-w-2xl">
    Discover our curated collection of luxury lingerie designed to make you feel confident and beautiful
  </p>
</section>
```

### 文章内容

```vue
<article class="prose">
  <!-- 文章标题 -->
  <h1 class="text-h1 font-display text-primary mb-4">
    The Art of Lingerie
  </h1>
  
  <!-- 元数据 -->
  <div class="text-caption font-body text-textMuted mb-8">
    Published on January 27, 2025 · 5 min read
  </div>
  
  <!-- 引言 -->
  <p class="text-body-lg font-body text-primary-500 mb-6">
    Lingerie is more than just undergarments—it's an expression of confidence and self-love.
  </p>
  
  <!-- 正文 -->
  <p class="text-body font-body text-primary-500 mb-4">
    Every piece in our collection is thoughtfully designed with premium materials...
  </p>
  
  <!-- 小标题 -->
  <h2 class="text-h3 font-display text-primary mt-8 mb-4">
    Quality Materials
  </h2>
  
  <!-- 正文继续 -->
  <p class="text-body font-body text-primary-500 mb-4">
    We source only the finest fabrics from around the world...
  </p>
</article>
```

---

## ⚡ 性能优化

### Font Display Swap

所有字体已配置 `display=swap`，确保文字立即显示，避免 FOIT (Flash of Invisible Text)。

```html
<!-- 已在 nuxt.config.ts 中配置 -->
<link href="...&display=swap" rel="stylesheet">
```

### 字体预加载

使用 `preconnect` 加速字体加载：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 字重优化

只加载实际使用的字重，减少加载时间：

- **Playfair Display**: 400, 500, 600, 700, 800, 900
- **Montserrat**: 300, 400, 500, 600, 700, 800
- **Allura**: 400

---

## ✅ 最佳实践

### 推荐做法

1. **标题使用 Display 字体**: `font-display` 用于 H1-H3
2. **正文使用 Body 字体**: `font-body` 用于段落和UI
3. **保持层级清晰**: 不要跳过标题层级（H1 → H3）
4. **限制字重变化**: 每个页面最多使用 3-4 种字重
5. **响应式调整**: 移动端适当减小字号
6. **行高适配**: 长文本使用 `leading-relaxed` 或 `leading-loose`

### 避免做法

1. ~~不要过度使用 Script 字体~~: 仅用于装饰
2. ~~不要混用太多字体~~: 最多 2-3 种字体家族
3. ~~不要忽略可读性~~: 正文最小 14px
4. ~~不要使用过小的行高~~: 正文至少 1.5
5. ~~不要全部大写长文本~~: 影响可读性

---

## 📊 字体对比度参考

| 文字颜色 | 背景颜色 | 对比度 | WCAG等级 | 最小字号 |
|---------|---------|--------|----------|---------|
| `primary-800` | `white` | 12.6:1 | AAA | 12px |
| `primary-500` | `white` | 7.2:1 | AAA | 14px |
| `textMuted` | `white` | 4.8:1 | AA | 16px |
| `white` | `primary-800` | 12.6:1 | AAA | 12px |

---

## 🎨 实际应用示例

查看以下文件了解实际使用：
- `pages/index.vue` - Hero区域显示文字
- `pages/about.vue` - 文章内容排版
- `components/ProductCard.vue` - 产品信息层级
- `components/PageHeader.vue` - 页面标题样式

---

**更新日期**: 2025-01-27
**版本**: 2.0
