# 完整设计系统文档

## 概述

这是 Intimate Elegance 电商网站的完整设计系统，包含所有设计令牌、组件规范和使用指南。

---

## 📐 设计令牌 (Design Tokens)

### 颜色系统

#### 品牌色
```css
--brand-primary: #D4AF37        /* 主金色 */
--brand-primary-light: #F5E6D3  /* 浅金色 */
--brand-primary-dark: #B8860B   /* 深金色 */
--brand-accent: #C9A882         /* 强调金棕色 */
```

#### 中性色
```css
--neutral-black: #000000
--neutral-white: #FFFFFF
--neutral-gray-50: #F8F8F8
--neutral-gray-100: #F0F0F0
--neutral-gray-200: #E0E0E0
--neutral-gray-300: #CCCCCC
--neutral-gray-400: #AAAAAA
--neutral-gray-500: #808080
--neutral-gray-600: #666666
--neutral-gray-700: #4D4D4D
--neutral-gray-800: #333333
--neutral-gray-900: #2C2C2C
```

#### 功能色
```css
--success: #10B981  /* 成功 - 绿色 */
--warning: #F59E0B  /* 警告 - 橙色 */
--error: #EF4444    /* 错误 - 红色 */
--info: #3B82F6     /* 信息 - 蓝色 */
```

### 字体系统

#### 字体族
- **标题**: `'Playfair Display', serif`
- **正文**: `'Montserrat', sans-serif`
- **装饰**: `'Allura', cursive`

#### 字体大小
```css
--font-xs: 12px
--font-sm: 14px
--font-base: 16px
--font-lg: 18px
--font-xl: 24px
--font-2xl: 32px
--font-3xl: 48px
```

#### 字重
```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### 间距系统

```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
--space-4xl: 96px
```

### 圆角系统

```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-full: 9999px
```

### 阴影系统

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08)
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08)
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12)
--shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.15)
--shadow-brand: 0 4px 12px rgba(212, 175, 55, 0.3)
```

### 过渡系统

```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 🎨 组件系统

### 1. 按钮系统

#### 主按钮 (Primary Button)
**用途**: 主要操作（购买、提交、确认等）

```html
<button class="btn-primary">Shop Now</button>
<button class="btn-primary btn-lg">Large Button</button>
<button class="btn-primary btn-rounded">Rounded Button</button>
```

**样式特征**:
- 金色渐变背景
- 白色文字
- 圆角或方角可选
- 悬停时上移 + 阴影增强

#### 次要按钮 (Secondary Button)
**用途**: 次要操作（返回、取消、浏览等）

```html
<button class="btn-secondary">Back to Cart</button>
<button class="btn-secondary btn-sm">Small Button</button>
```

**样式特征**:
- 透明背景
- 金色边框和文字
- 悬停时浅金色背景

#### 按钮尺寸
```html
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary">Default</button>
<button class="btn-primary btn-lg">Large</button>
<button class="btn-primary btn-xl">Extra Large</button>
```

#### 按钮状态
```html
<!-- 加载状态 -->
<button class="btn-primary btn-loading">Loading...</button>

<!-- 禁用状态 -->
<button class="btn-primary" disabled>Disabled</button>

<!-- 全宽按钮 -->
<button class="btn-primary btn-block">Full Width</button>
```

### 2. 标签系统

#### New 标签
```html
<span class="tag-new">New</span>
```
- 金色渐变背景
- 白色文字
- 用于新品

#### Bestseller 标签
```html
<span class="tag-bestseller">Bestseller</span>
```
- 深金色渐变背景
- 黑色文字
- 用于畅销品

#### Sale 标签
```html
<span class="tag-sale">Sale</span>
```
- 红色渐变背景
- 白色文字
- 用于促销品

### 3. 卡片系统

#### 基础卡片
```html
<div class="card">
  <div class="card-body">
    <h3>Card Title</h3>
    <p>Card content goes here...</p>
  </div>
</div>
```

**样式特征**:
- 白色背景
- 12px 圆角
- 标准阴影
- 悬停时上移 + 阴影增强

### 4. 表单元素

#### 输入框
```html
<label class="form-label">Email Address</label>
<input type="email" class="form-input" placeholder="your@email.com">
```

#### 文本域
```html
<label class="form-label">Message</label>
<textarea class="form-textarea" placeholder="Your message..."></textarea>
```

#### 选择框
```html
<label class="form-label">Country</label>
<select class="form-select">
  <option>United States</option>
  <option>Canada</option>
</select>
```

#### 复选框
```html
<input type="checkbox" class="form-checkbox" id="terms">
<label for="terms">I agree to the terms</label>
```

#### 错误状态
```html
<input type="email" class="form-input error">
<p class="form-error-message">Please enter a valid email</p>
```

### 5. 空状态设计

#### 空购物车
```html
<div class="empty-state">
  <div class="empty-state-icon">
    <svg><!-- 购物车图标 --></svg>
  </div>
  <h2 class="empty-state-title">Your cart is empty</h2>
  <p class="empty-state-description">
    Looks like you haven't added anything to your cart yet.
    Start shopping to find your perfect pieces.
  </p>
  <button class="btn-primary empty-state-action">Shop Now</button>
</div>
```

#### 搜索无结果
```html
<div class="empty-state">
  <div class="empty-state-icon">
    <svg><!-- 搜索图标 --></svg>
  </div>
  <h2 class="empty-state-title">No products found</h2>
  <p class="empty-state-description">
    We couldn't find any products matching your search.
    Try different keywords or browse our collections.
  </p>
  <button class="btn-primary empty-state-action">View All Products</button>
</div>
```

### 6. 加载状态

#### 骨架屏
```html
<!-- 产品卡片骨架屏 -->
<div class="skeleton-product-card">
  <div class="skeleton skeleton-image"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text skeleton-text-short"></div>
</div>
```

#### 页面加载器
```html
<div class="page-loader">
  <div class="page-loader-spinner"></div>
</div>
```

### 7. 页面标题系统

```html
<section class="page-header">
  <h1 class="page-title">Our Story</h1>
  <p class="page-subtitle">
    Where elegance meets desire, and confidence becomes your signature
  </p>
</section>
```

**样式特征**:
- 居中对齐
- 渐变文字效果
- 顶部装饰线
- 响应式字体大小

---

## 📱 响应式设计

### 断点系统

```css
--breakpoint-sm: 640px   /* 小屏幕 */
--breakpoint-md: 768px   /* 平板 */
--breakpoint-lg: 1024px  /* 桌面 */
--breakpoint-xl: 1280px  /* 大屏幕 */
```

### 响应式规则

#### 页面标题
- **桌面**: 48px
- **平板**: 36px
- **手机**: 32px

#### 按钮
- **桌面**: 16px 字体, 14px-32px 内边距
- **平板**: 15px 字体, 12px-24px 内边距
- **手机**: 14px 字体, 12px-20px 内边距

---

## ♿ 无障碍设计

### 焦点可见性
所有可交互元素都有清晰的焦点指示器：
```css
:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
```

### 减少动画
尊重用户的动画偏好设置：
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 屏幕阅读器
使用 `.sr-only` 类隐藏视觉内容但保留给屏幕阅读器：
```html
<span class="sr-only">Skip to main content</span>
```

---

## 🎯 使用指南

### 颜色使用原则

1. **品牌色**: 用于主要操作、强调元素、悬停状态
2. **中性色**: 用于文字、边框、背景
3. **功能色**: 用于状态反馈（成功、警告、错误）

### 间距使用原则

1. **组件内间距**: 使用 xs, sm, md
2. **组件间间距**: 使用 lg, xl
3. **区块间间距**: 使用 2xl, 3xl, 4xl

### 字体使用原则

1. **标题**: 使用 Playfair Display（衬线字体）
2. **正文**: 使用 Montserrat（无衬线字体）
3. **装饰**: 使用 Allura（手写字体）

### 阴影使用原则

1. **卡片**: shadow-md
2. **悬停**: shadow-lg
3. **模态框**: shadow-xl
4. **按钮**: shadow-brand

---

## 📦 组件清单

### 已实现组件
- ✅ 按钮系统（主按钮、次要按钮、尺寸变体）
- ✅ 标签系统（New、Bestseller、Sale）
- ✅ 卡片系统（基础卡片、产品卡片）
- ✅ 表单元素（输入框、文本域、选择框、复选框）
- ✅ 空状态设计（空购物车、搜索无结果）
- ✅ 加载状态（骨架屏、页面加载器）
- ✅ 页面标题系统
- ✅ 面包屑导航

### 待实现组件
- ⏳ 模态框系统
- ⏳ 通知系统（Toast）
- ⏳ 下拉菜单
- ⏳ 标签页（Tabs）
- ⏳ 手风琴（Accordion）
- ⏳ 分页组件

---

## 🔧 维护指南

### 添加新颜色
1. 在 `:root` 中定义 CSS 变量
2. 在 `tailwind.config.ts` 中添加对应配置
3. 更新本文档

### 添加新组件
1. 在 `assets/css/main.css` 中定义样式
2. 创建 Vue 组件（如需要）
3. 添加使用示例到本文档
4. 测试响应式和无障碍性

### 修改现有组件
1. 更新 CSS 样式
2. 测试所有使用该组件的页面
3. 更新文档
4. 提交 Git 记录

---

## 📚 相关文档

- [BUTTON-SYSTEM.md](./BUTTON-SYSTEM.md) - 按钮系统详细规范
- [CARD-SYSTEM.md](./CARD-SYSTEM.md) - 卡片系统详细规范
- [BREADCRUMB-SYSTEM.md](./BREADCRUMB-SYSTEM.md) - 面包屑导航规范
- [PAGE-HEADER-SYSTEM.md](./PAGE-HEADER-SYSTEM.md) - 页面标题规范
- [BRAND-COLOR-SYSTEM.md](./BRAND-COLOR-SYSTEM.md) - 品牌色系统

---

**版本**: 1.0.0  
**最后更新**: 2026-01-27  
**维护者**: Development Team
