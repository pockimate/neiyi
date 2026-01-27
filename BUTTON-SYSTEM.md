# 完整按钮系统规范 ✅

## 更新时间
2026-01-27

## 概述

建立完整的按钮系统，涵盖所有使用场景，确保一致性和可维护性。

---

## 按钮类型

### 1. 主按钮 (`.btn-primary`)

**用途**: 主要操作（如提交、购买、确认）

**特点**:
- 金色渐变背景
- 白色文字
- 悬停上移效果
- 阴影增强

**使用示例**:
```html
<button class="btn-primary">Add to Cart</button>
<button class="btn-primary btn-loading">Processing...</button>
```

**应用场景**:
- 添加到购物车
- 立即购买
- 提交表单
- 确认操作

---

### 2. 次要按钮 (`.btn-secondary`)

**用途**: 次要操作（如取消、返回）

**特点**:
- 透明背景
- 品牌色边框和文字
- 悬停时背景变色

**使用示例**:
```html
<button class="btn-secondary">Cancel</button>
<button class="btn-secondary">Learn More</button>
```

**应用场景**:
- 取消操作
- 返回上一步
- 查看更多
- 次要功能

---

### 3. 强调按钮 (`.btn-accent`)

**用途**: 特殊强调操作

**特点**:
- 深色背景
- 品牌色文字
- 悬停时反转颜色

**使用示例**:
```html
<button class="btn-accent">Shop Now</button>
<button class="btn-accent">Explore Collection</button>
```

**应用场景**:
- CTA 按钮
- 特殊促销
- 重要功能入口

---

### 4. 文本按钮 (`.btn-text`)

**用途**: 链接式操作

**特点**:
- 透明背景
- 带下划线
- 悬停变色

**使用示例**:
```html
<button class="btn-text">View Details</button>
<a href="#" class="btn-text">Read More</a>
```

**应用场景**:
- 查看详情
- 阅读更多
- 内联链接
- 轻量操作

---

### 5. 链接按钮 (`.btn-link`)

**用途**: 无下划线的链接

**特点**:
- 透明背景
- 品牌色文字
- 无下划线（悬停时显示）

**使用示例**:
```html
<a href="/products" class="btn-link">Browse Products</a>
```

**应用场景**:
- 导航链接
- 面包屑
- 页面跳转

---

### 6. 图标按钮 (`.btn-icon`)

**用途**: 纯图标操作

**特点**:
- 圆形或方形
- 透明背景
- 悬停时背景变色

**使用示例**:
```html
<!-- 圆形 -->
<button class="btn-icon">
  <svg><!-- icon --></svg>
</button>

<!-- 方形 -->
<button class="btn-icon btn-icon-square">
  <svg><!-- icon --></svg>
</button>

<!-- 品牌色 -->
<button class="btn-icon btn-icon-primary">
  <svg><!-- icon --></svg>
</button>
```

**尺寸变体**:
- `.btn-icon-sm` - 32x32px
- `.btn-icon` - 40x40px（默认）
- `.btn-icon-lg` - 48x48px

**应用场景**:
- 关闭按钮
- 菜单按钮
- 收藏按钮
- 分享按钮

---

### 7. 轮廓按钮

#### 白色轮廓 (`.btn-outline-white`)
```html
<button class="btn-outline-white">Learn More</button>
```
用于深色背景

#### 品牌色轮廓 (`.btn-outline-primary`)
```html
<button class="btn-outline-primary">View Collection</button>
```
用于浅色背景

#### 深色轮廓 (`.btn-outline-dark`)
```html
<button class="btn-outline-dark">Contact Us</button>
```
用于浅色背景

---

### 8. 幽灵按钮 (`.btn-ghost`)

**用途**: 半透明效果，用于图片或视频上

**特点**:
- 半透明背景
- 毛玻璃效果
- 白色文字

**使用示例**:
```html
<button class="btn-ghost">Explore</button>
```

**应用场景**:
- Hero 区域
- 图片叠加
- 视频封面

---

### 9. 语义化按钮

#### 危险按钮 (`.btn-danger`)
```html
<button class="btn-danger">Delete</button>
```
用于删除、取消订单等危险操作

#### 成功按钮 (`.btn-success`)
```html
<button class="btn-success">Confirm</button>
```
用于确认、完成等成功操作

#### 警告按钮 (`.btn-warning`)
```html
<button class="btn-warning">Warning</button>
```
用于警告、注意等提示操作

#### 信息按钮 (`.btn-info`)
```html
<button class="btn-info">Learn More</button>
```
用于信息、帮助等提示操作

---

### 10. 浅色/深色按钮

#### 浅色按钮 (`.btn-light`)
```html
<button class="btn-light">Cancel</button>
```

#### 深色按钮 (`.btn-dark`)
```html
<button class="btn-dark">Continue</button>
```

---

## 按钮尺寸

### 标准尺寸
```html
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary">Default</button>
<button class="btn-primary btn-lg">Large</button>
<button class="btn-primary btn-xl">Extra Large</button>
```

### 尺寸规格

| 类名 | 内边距 | 字体大小 | 高度 |
|------|--------|---------|------|
| `.btn-sm` | 10px 20px | 14px | ~34px |
| `.btn` | 14px 32px | 16px | ~46px |
| `.btn-lg` | 18px 40px | 18px | ~54px |
| `.btn-xl` | 22px 48px | 20px | ~64px |

### 全宽按钮
```html
<button class="btn-primary btn-block">Full Width Button</button>
```

---

## 按钮状态

### 1. 默认状态
```html
<button class="btn-primary">Normal</button>
```

### 2. 悬停状态
自动应用，无需额外类名

### 3. 激活状态
自动应用，无需额外类名

### 4. 禁用状态
```html
<button class="btn-primary" disabled>Disabled</button>
```

### 5. 加载状态
```html
<button class="btn-primary btn-loading">Loading...</button>
```

---

## 按钮组合

### 1. 带图标的按钮

#### 左侧图标
```html
<button class="btn-primary">
  <svg><!-- icon --></svg>
  <span>Add to Cart</span>
</button>
```

#### 右侧图标
```html
<button class="btn-primary">
  <span>Continue</span>
  <svg><!-- arrow icon --></svg>
</button>
```

#### 仅图标
```html
<button class="btn-primary">
  <svg><!-- icon --></svg>
</button>
```

### 2. 按钮组 (`.btn-group`)

```html
<div class="btn-group">
  <button class="btn-secondary">Left</button>
  <button class="btn-secondary">Middle</button>
  <button class="btn-secondary">Right</button>
</div>
```

### 3. 移动端垂直按钮组

```html
<div class="btn-group btn-group-mobile-vertical">
  <button class="btn-primary">Option 1</button>
  <button class="btn-primary">Option 2</button>
  <button class="btn-primary">Option 3</button>
</div>
```

---

## 按钮效果

### 1. 圆角按钮
```html
<button class="btn-primary btn-rounded">Rounded</button>
```

### 2. 悬浮效果增强
```html
<button class="btn-primary btn-float">Float Effect</button>
```

### 3. 脉冲动画
```html
<button class="btn-primary btn-pulse">Pulse</button>
```

### 4. 闪烁效果
```html
<button class="btn-primary btn-shine">Shine</button>
```

---

## 使用指南

### 1. 选择合适的按钮类型

| 场景 | 按钮类型 |
|------|---------|
| 主要操作 | `.btn-primary` |
| 次要操作 | `.btn-secondary` |
| 特殊强调 | `.btn-accent` |
| 链接式操作 | `.btn-text` 或 `.btn-link` |
| 图标操作 | `.btn-icon` |
| 危险操作 | `.btn-danger` |
| 确认操作 | `.btn-success` |

### 2. 按钮层级

**一个页面/区域应该有明确的按钮层级**:

```html
<!-- ✅ 正确：主次分明 -->
<div class="flex gap-4">
  <button class="btn-primary">Add to Cart</button>
  <button class="btn-secondary">Add to Wishlist</button>
</div>

<!-- ❌ 错误：两个主按钮 -->
<div class="flex gap-4">
  <button class="btn-primary">Add to Cart</button>
  <button class="btn-primary">Buy Now</button>
</div>
```

### 3. 按钮间距

```html
<!-- 水平间距 -->
<div class="flex gap-4">
  <button class="btn-primary">Button 1</button>
  <button class="btn-secondary">Button 2</button>
</div>

<!-- 垂直间距 -->
<div class="flex flex-col gap-3">
  <button class="btn-primary btn-block">Button 1</button>
  <button class="btn-secondary btn-block">Button 2</button>
</div>
```

### 4. 响应式按钮

```html
<!-- 移动端全宽，桌面端自适应 -->
<button class="btn-primary w-full md:w-auto">
  Responsive Button
</button>
```

---

## 最佳实践

### 1. 文字规范
- 使用动词开头（如 "Add", "Buy", "Submit"）
- 简洁明了（2-4 个单词）
- 避免使用 "Click Here"

```html
<!-- ✅ 好 -->
<button class="btn-primary">Add to Cart</button>
<button class="btn-primary">Buy Now</button>

<!-- ❌ 不好 -->
<button class="btn-primary">Click Here</button>
<button class="btn-primary">Click to Add Product to Your Shopping Cart</button>
```

### 2. 加载状态
```html
<button 
  class="btn-primary"
  :class="{ 'btn-loading': isLoading }"
  :disabled="isLoading"
>
  {{ isLoading ? 'Processing...' : 'Submit' }}
</button>
```

### 3. 禁用状态
```html
<button 
  class="btn-primary"
  :disabled="!isValid"
>
  Submit
</button>
```

### 4. 可访问性
```html
<!-- 添加 aria-label -->
<button class="btn-icon" aria-label="Close">
  <svg><!-- close icon --></svg>
</button>

<!-- 添加 title -->
<button class="btn-icon" title="Add to Wishlist">
  <svg><!-- heart icon --></svg>
</button>
```

---

## 示例场景

### 1. 产品详情页
```html
<div class="flex gap-4">
  <button class="btn-primary btn-lg flex-1">
    <svg><!-- cart icon --></svg>
    <span>Add to Cart</span>
  </button>
  <button class="btn-icon btn-icon-lg">
    <svg><!-- heart icon --></svg>
  </button>
</div>
```

### 2. 表单提交
```html
<div class="flex justify-end gap-3">
  <button type="button" class="btn-secondary">Cancel</button>
  <button type="submit" class="btn-primary">Submit</button>
</div>
```

### 3. Hero 区域
```html
<div class="flex gap-4">
  <button class="btn-primary btn-lg btn-rounded">Shop Now</button>
  <button class="btn-outline-white btn-lg btn-rounded">Learn More</button>
</div>
```

### 4. 购物车
```html
<div class="flex flex-col gap-3">
  <button class="btn-primary btn-block">Proceed to Checkout</button>
  <button class="btn-text">Continue Shopping</button>
</div>
```

### 5. 模态框
```html
<div class="flex justify-between items-center">
  <button class="btn-text">Cancel</button>
  <div class="flex gap-3">
    <button class="btn-secondary">Save Draft</button>
    <button class="btn-primary">Publish</button>
  </div>
</div>
```

---

## 响应式设计

### 桌面 (>768px)
- 标准尺寸
- 水平排列
- 完整动画

### 平板 (≤768px)
- 略小尺寸
- 可能换行
- 简化动画

### 手机 (≤480px)
- 最小尺寸
- 垂直排列
- 全宽按钮
- 触摸优化

```html
<!-- 响应式示例 -->
<div class="flex flex-col md:flex-row gap-3">
  <button class="btn-primary w-full md:w-auto">
    Primary Action
  </button>
  <button class="btn-secondary w-full md:w-auto">
    Secondary Action
  </button>
</div>
```

---

## 性能优化

### 1. 避免过度动画
```css
/* ✅ 好：使用 transform */
.btn:hover {
  transform: translateY(-2px);
}

/* ❌ 不好：使用 top */
.btn:hover {
  top: -2px;
}
```

### 2. 使用 will-change（谨慎）
```css
.btn-primary {
  will-change: transform;
}
```

### 3. 减少重绘
```css
/* 使用 opacity 而非 display */
.btn-loading::after {
  opacity: 1;
}
```

---

## 可访问性清单

- [ ] 所有按钮有明确的文字或 aria-label
- [ ] 键盘可访问（Tab 键导航）
- [ ] Focus 状态可见
- [ ] 颜色对比度 ≥ 4.5:1
- [ ] 触摸目标 ≥ 44x44px
- [ ] 禁用状态明确
- [ ] 加载状态有反馈

---

## 相关文件

### 核心文件
- `assets/css/main.css` - 按钮样式定义

### 使用页面
- 所有页面都使用按钮系统

### 文档
- `BUTTON-SYSTEM.md` - 本文档
- `DESIGN-SYSTEM.md` - 完整设计系统

---

## 总结

✅ **已完成**：
- 10+ 种按钮类型
- 4 种尺寸变体
- 5 种状态
- 多种组合方式
- 完整的响应式设计

✅ **优势**：
- 覆盖所有使用场景
- 统一的视觉风格
- 易于维护和扩展
- 可访问性友好

✅ **效果**：
- 专业的交互体验
- 清晰的视觉层级
- 一致的用户体验
- 品牌识别度提升

---

**状态**: ✅ 完成  
**最后更新**: 2026-01-27  
**维护者**: Development Team
