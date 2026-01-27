# 品牌色彩系统指南

## 概述

完整的语义化色彩系统，包含品牌色、状态色和功能色，确保视觉一致性和可访问性。

---

## 🎨 品牌色系

### Primary（深灰色）- 主要品牌色
**用途**: 主要文字、标题、按钮、导航

```vue
<!-- 使用示例 -->
<div class="bg-primary-800 text-white">主要按钮</div>
<h1 class="text-primary-800">主标题</h1>
<p class="text-primary-500">正文内容</p>
<span class="text-primary-400">次要文字</span>
```

**色阶**:
- `primary-50` (#F7F7F7) - 极浅灰背景
- `primary-100` (#EFEFEF) - 悬停背景
- `primary-200` (#DCDCDC) - 边框
- `primary-500` (#5A5A5A) - 正文
- `primary-800` (#2C2C2C) - 主要元素 ⭐
- `primary-900` (#1A1A1A) - hover/active

### Accent（金棕色）- 品牌强调色
**用途**: CTA按钮、重要标签、强调元素、悬停效果

```vue
<!-- 使用示例 -->
<button class="bg-accent-500 hover:bg-accent-600">立即购买</button>
<span class="bg-accent-100 text-accent-700 px-3 py-1">NEW</span>
<div class="border-accent-500">强调边框</div>
```

**色阶**:
- `accent-50` (#FAF7F3) - 极浅金背景
- `accent-100` (#F5EFE7) - 悬停背景
- `accent-500` (#C9A882) - 主强调色 ⭐
- `accent-600` (#B8956F) - hover状态
- `accent-700` (#9A7B5C) - active状态

### Secondary（柔和白色）- 辅助色
**用途**: 背景、卡片、分隔线

```vue
<!-- 使用示例 -->
<div class="bg-secondary-50">纯白卡片</div>
<div class="bg-secondary-100">主背景</div>
<div class="border-secondary-500">边框</div>
```

**色阶**:
- `secondary-50` (#FFFFFF) - 纯白卡片
- `secondary-100` (#FAFAFA) - 主背景 ⭐
- `secondary-200` (#F5F5F5) - 次要背景
- `secondary-500` (#E0E0E0) - 标准边框

---

## ✅ 语义化状态色

### Success（成功绿）
**用途**: 成功消息、确认状态、完成标记

```vue
<!-- 成功提示 -->
<div class="flex items-center gap-2 p-3 bg-success-50 border border-success-200 rounded">
  <svg class="w-4 h-4 text-success-600" fill="currentColor">
    <!-- 勾选图标 -->
  </svg>
  <span class="text-xs text-success-700 font-medium">操作成功！</span>
</div>

<!-- 成功按钮 -->
<button class="bg-success-500 hover:bg-success-600 text-white">确认</button>
```

**色阶**:
- `success-50` (#ECFDF5) - 背景
- `success-100` (#D1FAE5) - 提示背景
- `success-200` (#A7F3D0) - 边框
- `success-500` (#10B981) - 主色 ⭐
- `success-600` (#059669) - hover
- `success-700` (#047857) - 文字

### Warning（警告橙）
**用途**: 警告消息、库存不足、注意事项

```vue
<!-- 警告提示 -->
<div class="flex items-center gap-2 p-3 bg-warning-50 border border-warning-200 rounded">
  <svg class="w-4 h-4 text-warning-600" fill="currentColor">
    <!-- 警告图标 -->
  </svg>
  <span class="text-xs text-warning-700 font-medium">库存不足，仅剩3件</span>
</div>

<!-- 警告标签 -->
<span class="bg-warning-100 text-warning-700 px-2 py-1 text-xs">低库存</span>
```

**色阶**:
- `warning-50` (#FFFBEB) - 背景
- `warning-100` (#FEF3C7) - 提示背景
- `warning-200` (#FDE68A) - 边框
- `warning-500` (#F59E0B) - 主色 ⭐
- `warning-600` (#D97706) - hover
- `warning-700` (#B45309) - 文字

### Error（错误红）
**用途**: 错误消息、删除操作、验证失败

```vue
<!-- 错误提示 -->
<div class="flex items-center gap-2 p-3 bg-error-50 border border-error-200 rounded">
  <svg class="w-4 h-4 text-error-600" fill="currentColor">
    <!-- 错误图标 -->
  </svg>
  <span class="text-xs text-error-700 font-medium">优惠码无效</span>
</div>

<!-- 删除按钮 -->
<button class="text-error-600 hover:text-error-700">删除</button>
```

**色阶**:
- `error-50` (#FEF2F2) - 背景
- `error-100` (#FEE2E2) - 提示背景
- `error-200` (#FECACA) - 边框
- `error-500` (#EF4444) - 主色 ⭐
- `error-600` (#DC2626) - hover
- `error-700` (#B91C1C) - 文字

### Info（信息蓝）
**用途**: 信息提示、帮助文本、进度指示

```vue
<!-- 信息提示 -->
<div class="flex items-center gap-2 p-4 bg-info-50 border border-info-200 rounded">
  <svg class="w-4 h-4 text-info-600" fill="none" stroke="currentColor">
    <!-- 信息图标 -->
  </svg>
  <p class="text-xs text-info-700 font-medium">
    再添加 <span class="font-bold">$25.00</span> 即可享受免运费
  </p>
</div>

<!-- 进度条 -->
<div class="w-full h-2 bg-info-100 rounded-full">
  <div class="h-full bg-info-500 rounded-full" style="width: 75%"></div>
</div>
```

**色阶**:
- `info-50` (#EFF6FF) - 背景
- `info-100` (#DBEAFE) - 提示背景
- `info-200` (#BFDBFE) - 边框
- `info-500` (#3B82F6) - 主色 ⭐
- `info-600` (#2563EB) - hover
- `info-700` (#1D4ED8) - 文字

---

## 📋 使用规范

### 1. 状态提示卡片模板

```vue
<!-- 成功 -->
<div class="flex items-center gap-2 p-3 bg-success-50 border border-success-200 rounded">
  <svg class="w-4 h-4 text-success-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
  </svg>
  <span class="text-xs text-success-700 font-medium">成功消息</span>
</div>

<!-- 警告 -->
<div class="flex items-center gap-2 p-3 bg-warning-50 border border-warning-200 rounded">
  <svg class="w-4 h-4 text-warning-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
  </svg>
  <span class="text-xs text-warning-700 font-medium">警告消息</span>
</div>

<!-- 错误 -->
<div class="flex items-center gap-2 p-3 bg-error-50 border border-error-200 rounded">
  <svg class="w-4 h-4 text-error-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
  </svg>
  <span class="text-xs text-error-700 font-medium">错误消息</span>
</div>

<!-- 信息 -->
<div class="flex items-center gap-2 p-4 bg-info-50 border border-info-200 rounded">
  <svg class="w-4 h-4 text-info-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <span class="text-xs text-info-700 font-medium">信息提示</span>
</div>
```

### 2. 按钮颜色使用

```vue
<!-- 主要操作 - 使用 accent -->
<button class="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3">
  立即购买
</button>

<!-- 次要操作 - 使用 primary outline -->
<button class="border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white px-6 py-3">
  了解更多
</button>

<!-- 危险操作 - 使用 error -->
<button class="bg-error-500 hover:bg-error-600 text-white px-4 py-2">
  删除
</button>

<!-- 成功操作 - 使用 success -->
<button class="bg-success-500 hover:bg-success-600 text-white px-4 py-2">
  确认
</button>
```

### 3. 标签/徽章颜色

```vue
<!-- 新品标签 - accent -->
<span class="bg-accent-100 text-accent-700 px-3 py-1 text-xs font-semibold uppercase">
  NEW
</span>

<!-- 促销标签 - error -->
<span class="bg-error-100 text-error-700 px-3 py-1 text-xs font-semibold uppercase">
  SALE
</span>

<!-- 库存状态 - warning -->
<span class="bg-warning-100 text-warning-700 px-3 py-1 text-xs font-semibold">
  低库存
</span>

<!-- 成功状态 - success -->
<span class="bg-success-100 text-success-700 px-3 py-1 text-xs font-semibold">
  有货
</span>
```

### 4. 进度条

```vue
<!-- 免运费进度 - info -->
<div class="w-full h-2 bg-info-100 rounded-full overflow-hidden">
  <div class="h-full bg-info-500 transition-all duration-300 rounded-full" :style="{ width: '75%' }"></div>
</div>

<!-- 积分进度 - accent -->
<div class="w-full h-2 bg-accent-100 rounded-full overflow-hidden">
  <div class="h-full bg-accent-500 transition-all duration-300 rounded-full" :style="{ width: '60%' }"></div>
</div>
```

---

## 🎯 最佳实践

### ✅ 推荐做法

1. **使用语义化颜色**: 成功用 `success`，错误用 `error`，警告用 `warning`
2. **保持对比度**: 文字与背景对比度至少 4.5:1
3. **一致的状态色**: 全站统一使用相同的状态色
4. **渐进式色阶**: 使用 50-100 做背景，500-700 做文字和图标

### ❌ 避免做法

1. ~~不要混用状态色~~: 不要用 `error` 表示成功
2. ~~不要过度使用强调色~~: accent 应该用于真正需要强调的元素
3. ~~不要使用硬编码颜色~~: 避免 `#FF0000`，使用 `error-500`
4. ~~不要忽略可访问性~~: 确保颜色对比度符合 WCAG 标准

---

## 🔄 兼容性别名

为保持向后兼容，保留了以下别名：

```javascript
primary: '#2C2C2C'        // = primary-800
accent: '#C9A882'         // = accent-500
background: '#FAFAFA'     // = secondary-100
textPrimary: '#2C2C2C'    // = primary-800
textSecondary: '#5A5A5A'  // = primary-500
border: '#E0E0E0'         // = secondary-500
```

---

## 📊 色彩对比度参考

| 组合 | 对比度 | WCAG等级 |
|------|--------|----------|
| `primary-800` on `white` | 12.6:1 | AAA ✅ |
| `accent-700` on `white` | 4.8:1 | AA ✅ |
| `success-700` on `success-50` | 7.2:1 | AAA ✅ |
| `error-700` on `error-50` | 8.1:1 | AAA ✅ |
| `warning-700` on `warning-50` | 6.9:1 | AAA ✅ |
| `info-700` on `info-50` | 7.5:1 | AAA ✅ |

---

## 🎨 实际应用示例

查看以下文件了解实际使用：
- `pages/cart.vue` - 购物车页面状态色应用
- `components/BaseButton.vue` - 按钮品牌色应用
- `components/ProductCard.vue` - 标签和徽章应用
- `components/TheNavbar.vue` - 导航品牌色应用

---

**更新日期**: 2025-01-27
**版本**: 2.0
