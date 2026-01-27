# 统一卡片系统 ✅ 完成

## 更新时间
2026-01-27

## 概述

建立统一的卡片系统，规范化网站中的所有卡片类型，确保视觉一致性和可维护性。

---

## 卡片类型

### 1. 基础卡片 (`.card`)

**用途**: 通用卡片容器

**特点**:
- 白色背景
- 12px 圆角
- 阴影效果
- 悬停时上移 4px

**使用示例**:
```html
<div class="card">
  <div class="card-body">
    <!-- 内容 -->
  </div>
</div>
```

**变体**:
- `.card-body` - 标准内边距 (24px)
- `.card-body-lg` - 大内边距 (32px)
- `.card-body-sm` - 小内边距 (16px)

---

### 2. 产品卡片 (`.card-product`)

**用途**: 商品展示

**结构**:
```html
<div class="card-product">
  <div class="card-product-image">
    <img src="product.jpg" alt="Product">
    <div class="card-product-badge">
      <span class="tag-new">New</span>
    </div>
  </div>
  <div class="card-product-body">
    <h3 class="card-product-title">Product Name</h3>
    <div class="card-product-price">
      $49.99
      <span class="card-product-price-original">$69.99</span>
    </div>
  </div>
</div>
```

**特点**:
- 正方形图片 (aspect-ratio: 1)
- 图片悬停放大 (scale 1.05)
- 徽章位置：左上角
- 价格突出显示（品牌金棕色）

**应用页面**:
- Products 页面
- 首页商品推荐
- 相关商品

---

### 3. 分类卡片 (`.card-category`)

**用途**: 商品分类展示

**结构**:
```html
<div class="card-category">
  <img src="category.jpg" alt="Category" class="card-category-image">
  <div class="card-category-content">
    <h3 class="card-category-title">Bras</h3>
    <p class="card-category-count">120 items</p>
  </div>
</div>
```

**特点**:
- 固定高度 300px
- 渐变遮罩（底部深色）
- 图片悬停放大 (scale 1.1)
- 文字位于底部，白色

**应用页面**:
- 首页分类导航
- 分类列表页

---

### 4. 价值观卡片 (`.card-value`)

**用途**: 展示品牌价值、特点

**结构**:
```html
<div class="card-value">
  <div class="card-value-icon">
    <svg><!-- icon --></svg>
  </div>
  <h3 class="card-value-title">Quality First</h3>
  <p class="card-value-description">
    We never compromise on materials or craftsmanship.
  </p>
</div>
```

**特点**:
- 居中对齐
- 圆形图标（渐变背景）
- 图标尺寸：64x64px
- 悬停上移效果

**应用页面**:
- About 页面（Our Values）
- 首页特点展示

---

### 5. 配送选项卡片 (`.card-shipping`)

**用途**: 配送方式选择

**结构**:
```html
<div class="card-shipping">
  <span class="card-shipping-badge">POPULAR</span>
  <h3 class="card-shipping-title">Express Shipping</h3>
  <div class="card-shipping-price">$12.99</div>
  <p class="card-shipping-duration">2-3 business days</p>
  <p class="card-shipping-note">Expedited processing</p>
</div>
```

**特点**:
- 2px 边框
- 悬停时边框变为品牌色
- 背景渐变效果
- 支持 `.active` 状态

**应用页面**:
- Shipping 页面
- Checkout 页面

---

### 6. 信息卡片 (`.card-info`)

**用途**: 联系方式、FAQ、帮助信息

**结构**:
```html
<div class="card-info">
  <div class="card-info-icon">
    <svg><!-- icon --></svg>
  </div>
  <h3 class="card-info-title">Email Us</h3>
  <div class="card-info-content">
    <p>support@intimateelegance.com</p>
    <p class="text-sm text-muted">We'll respond within 24 hours</p>
  </div>
</div>
```

**特点**:
- 1px 边框
- 圆角图标容器
- 悬停时边框变色
- 轻微阴影

**应用页面**:
- Contact 页面
- FAQ 页面
- 帮助中心

---

### 7. 统计卡片 (`.card-stat`)

**用途**: 数据展示、成就展示

**结构**:
```html
<div class="card-stat">
  <div class="card-stat-value">10K+</div>
  <div class="card-stat-label">Happy Customers</div>
</div>
```

**特点**:
- 居中对齐
- 大号数字（48px）
- 品牌色数字
- 小号标签（大写）

**应用页面**:
- About 页面（Stats Section）
- Dashboard
- 成就展示

---

### 8. 玻璃卡片 (`.card-glass`)

**用途**: 特殊效果、叠加层

**结构**:
```html
<div class="card-glass">
  <div class="card-body">
    <!-- 内容 -->
  </div>
</div>
```

**特点**:
- 半透明背景
- 毛玻璃效果 (backdrop-filter)
- 白色边框
- 现代感强

**应用场景**:
- Hero 区域叠加
- 图片上的文字卡片
- 特殊效果区域

---

## 设计规范

### 圆角
- 统一使用 `12px` 圆角
- 保持一致性

### 阴影
- **默认**: `0 4px 12px rgba(0, 0, 0, 0.08)`
- **悬停**: `0 8px 24px rgba(0, 0, 0, 0.12)`
- **品牌色阴影**: `0 4px 12px rgba(201, 168, 130, 0.3)`

### 过渡动画
- **时长**: 0.3s
- **缓动**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **悬停上移**: `translateY(-4px)`

### 内边距
- **标准**: 24px
- **大**: 32px
- **小**: 16px

### 颜色
- **背景**: #FFFFFF
- **边框**: #E0E0E0
- **品牌色**: #C9A882
- **文字**: #2C2C2C (标题), #666666 (正文)

---

## 响应式设计

### 桌面 (>768px)
- 标准尺寸
- 完整内边距
- 完整动画效果

### 平板 (≤768px)
- 内边距减小
- 分类卡片高度：250px
- 图标尺寸：56px

### 手机 (≤480px)
- 最小内边距
- 分类卡片高度：200px
- 图标尺寸：48px
- 统计数字：36px

---

## 使用指南

### 1. 选择合适的卡片类型

| 用途 | 卡片类型 |
|------|---------|
| 商品展示 | `.card-product` |
| 分类导航 | `.card-category` |
| 品牌价值 | `.card-value` |
| 配送选项 | `.card-shipping` |
| 联系信息 | `.card-info` |
| 数据统计 | `.card-stat` |
| 通用内容 | `.card` |

### 2. 组合使用

```html
<!-- 基础卡片 + 自定义内容 -->
<div class="card">
  <div class="card-body-lg">
    <h2>Custom Content</h2>
    <p>Your content here...</p>
  </div>
</div>

<!-- 产品卡片 + 链接 -->
<NuxtLink to="/product/123" class="card-product">
  <!-- 产品内容 -->
</NuxtLink>
```

### 3. 添加状态

```html
<!-- 激活状态 -->
<div class="card-shipping active">
  <!-- 内容 -->
</div>

<!-- 禁用状态 -->
<div class="card opacity-50 cursor-not-allowed">
  <!-- 内容 -->
</div>
```

---

## 最佳实践

### 1. 保持一致性
- 同一页面使用相同类型的卡片
- 统一的间距和对齐
- 一致的悬停效果

### 2. 合理使用阴影
- 不要过度使用阴影
- 保持层级清晰
- 悬停时增强阴影

### 3. 响应式优先
- 移动端优先设计
- 测试不同屏幕尺寸
- 确保触摸友好

### 4. 性能优化
- 避免过多的 backdrop-filter
- 优化图片大小
- 使用 CSS transform 而非 position

### 5. 可访问性
- 确保足够的颜色对比度
- 添加适当的 ARIA 标签
- 键盘导航支持

---

## 示例页面

### About 页面
```vue
<!-- 价值观卡片 -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="card-value">
    <div class="card-value-icon">
      <svg><!-- icon --></svg>
    </div>
    <h3 class="card-value-title">Quality First</h3>
    <p class="card-value-description">
      We never compromise on materials or craftsmanship.
    </p>
  </div>
  <!-- 更多卡片... -->
</div>

<!-- 统计卡片 -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
  <div class="card-stat">
    <div class="card-stat-value">10K+</div>
    <div class="card-stat-label">Happy Customers</div>
  </div>
  <!-- 更多统计... -->
</div>
```

### Contact 页面
```vue
<!-- 信息卡片 -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="card-info">
    <div class="card-info-icon">
      <svg><!-- email icon --></svg>
    </div>
    <h3 class="card-info-title">Email Us</h3>
    <div class="card-info-content">
      <p>support@intimateelegance.com</p>
    </div>
  </div>
  <!-- 更多联系方式... -->
</div>
```

### Shipping 页面
```vue
<!-- 配送选项卡片 -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="card-shipping">
    <h3 class="card-shipping-title">Standard Shipping</h3>
    <div class="card-shipping-price">$5.99</div>
    <p class="card-shipping-duration">5-7 business days</p>
  </div>
  
  <div class="card-shipping active">
    <span class="card-shipping-badge">POPULAR</span>
    <h3 class="card-shipping-title">Express Shipping</h3>
    <div class="card-shipping-price">$12.99</div>
    <p class="card-shipping-duration">2-3 business days</p>
  </div>
  <!-- 更多选项... -->
</div>
```

---

## 未来优化

### 高优先级
1. **卡片加载动画** - 骨架屏效果
2. **卡片翻转效果** - 正反面内容
3. **卡片拖拽排序** - 管理后台

### 中优先级
4. **卡片展开/收起** - 手风琴效果
5. **卡片滑动切换** - 移动端优化
6. **卡片筛选动画** - 平滑过渡

### 低优先级
7. **3D 卡片效果** - 视差效果
8. **卡片主题变体** - 深色模式
9. **卡片打印样式** - 打印优化

---

## 相关文件

### 核心文件
- `assets/css/main.css` - 卡片样式定义

### 使用页面
- `pages/index.vue` - 首页（分类卡片、产品卡片）
- `pages/products.vue` - 商品列表（产品卡片）
- `pages/about.vue` - 关于我们（价值观卡片、统计卡片）
- `pages/contact.vue` - 联系我们（信息卡片）
- `pages/shipping.vue` - 配送信息（配送选项卡片）
- `components/ProductCard.vue` - 产品卡片组件

### 文档
- `CARD-SYSTEM.md` - 本文档
- `DESIGN-SYSTEM.md` - 完整设计系统

---

## 总结

✅ **已完成**：
- 8 种卡片类型
- 统一的设计规范
- 响应式设计
- 完整的 CSS 样式库

✅ **优势**：
- 视觉一致性
- 易于维护
- 可复用性高
- 响应式友好

✅ **效果**：
- 专业的视觉效果
- 统一的用户体验
- 品牌识别度提升
- 开发效率提高

---

**状态**: ✅ 完成  
**最后更新**: 2026-01-27  
**维护者**: Development Team
