# 设计系统文档

## 完整的CSS变量系统

本项目使用CSS变量建立了完整的设计系统，确保一致性和易维护性。

---

## 🎨 颜色系统

### 品牌色
```css
--brand-primary: #D4AF37;        /* 主品牌金色 */
--brand-primary-light: #F5E6D3;  /* 浅金色 */
--brand-primary-dark: #B8860B;   /* 深金色 */
--brand-accent: #C9A882;         /* 强调金棕色 */
```

**使用示例：**
```css
.button {
  background: var(--brand-primary);
  color: var(--neutral-white);
}

.button:hover {
  background: var(--brand-primary-dark);
}
```

### 中性色
```css
--neutral-black: #000000;
--neutral-white: #FFFFFF;
--neutral-gray-50: #FAFAFA;   /* 最浅灰 */
--neutral-gray-100: #F0F0F0;
--neutral-gray-200: #E0E0E0;
--neutral-gray-300: #CCCCCC;
--neutral-gray-400: #999999;
--neutral-gray-600: #666666;
--neutral-gray-800: #333333;
--neutral-gray-900: #2C2C2C;  /* 最深灰 */
```

### 语义化颜色
```css
/* 背景色 */
--bg-primary: #FAFAFA;
--bg-secondary: #FFFFFF;
--bg-light: #F8F8F8;

/* 文字色 */
--text-primary: #2C2C2C;      /* 主要文字 */
--text-secondary: #666666;    /* 次要文字 */
--text-muted: #999999;        /* 弱化文字 */
--text-inverse: #FFFFFF;      /* 反色文字 */

/* 边框色 */
--border-light: #F0F0F0;
--border-default: #E0E0E0;
--border-dark: #CCCCCC;
```

### 功能色
```css
/* 成功 */
--success: #10B981;
--success-light: #D1FAE5;

/* 警告 */
--warning: #F59E0B;
--warning-light: #FEF3C7;

/* 错误 */
--error: #EF4444;
--error-light: #FEE2E2;

/* 信息 */
--info: #3B82F6;
--info-light: #DBEAFE;
```

**使用示例：**
```css
.alert-success {
  background: var(--success-light);
  color: var(--success);
  border: 1px solid var(--success);
}
```

---

## 🌑 阴影系统

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.2);
--shadow-brand: 0 4px 12px rgba(212, 175, 55, 0.3);
--shadow-brand-lg: 0 8px 24px rgba(212, 175, 55, 0.4);
```

**使用指南：**
- `shadow-xs/sm`: 卡片、输入框
- `shadow-md`: 悬浮卡片、下拉菜单
- `shadow-lg`: 模态框、弹出层
- `shadow-xl`: 大型弹窗
- `shadow-brand`: 品牌按钮
- `shadow-brand-lg`: 品牌按钮hover

**使用示例：**
```css
.card {
  box-shadow: var(--shadow-sm);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.btn-primary {
  box-shadow: var(--shadow-brand);
}
```

---

## 📐 圆角系统

```css
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-full: 9999px;
```

**使用指南：**
- `radius-xs`: 小元素（标签）
- `radius-sm`: 按钮、输入框
- `radius-md`: 卡片
- `radius-lg`: 大卡片、模态框
- `radius-xl`: 特大卡片
- `radius-2xl`: 胶囊形状（标签）
- `radius-full`: 圆形（头像、颜色选择器）

**使用示例：**
```css
.button {
  border-radius: var(--radius-sm);
}

.card {
  border-radius: var(--radius-md);
}

.badge {
  border-radius: var(--radius-2xl);
}

.avatar {
  border-radius: var(--radius-full);
}
```

---

## ⚡ 过渡系统

```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
```

**使用指南：**
- `transition-fast`: 小元素hover、focus
- `transition-base`: 按钮、链接、一般交互
- `transition-slow`: 大型动画、页面过渡

**使用示例：**
```css
.button {
  transition: all var(--transition-base);
}

.link:hover {
  transition: color var(--transition-fast);
}

.modal {
  transition: opacity var(--transition-slow);
}
```

---

## 📏 间距系统

```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 40px;
--space-xl: 64px;
--space-2xl: 96px;
--space-3xl: 128px;
```

**使用指南：**
- `space-xs`: 紧密元素间距
- `space-sm`: 小元素间距、网格gap
- `space-md`: 卡片内部padding、中等间距
- `space-lg`: 大间距、section内部
- `space-xl`: section间距
- `space-2xl`: 大section间距
- `space-3xl`: Hero区域

**使用示例：**
```css
.card {
  padding: var(--space-md);
}

.grid {
  gap: var(--space-sm);
}

.section {
  padding: var(--space-2xl) var(--space-md);
}
```

---

## 🔢 Z-index层级

```css
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

**使用指南：**
- 避免随意使用z-index数值
- 使用预定义的层级变量
- 确保正确的堆叠顺序

**使用示例：**
```css
.navbar {
  z-index: var(--z-fixed);
}

.modal-backdrop {
  z-index: var(--z-modal-backdrop);
}

.modal {
  z-index: var(--z-modal);
}
```

---

## 🎯 最佳实践

### 1. 优先使用变量
❌ **不推荐：**
```css
.button {
  background: #D4AF37;
  padding: 24px;
  border-radius: 4px;
  transition: all 0.3s ease;
}
```

✅ **推荐：**
```css
.button {
  background: var(--brand-primary);
  padding: var(--space-md);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
}
```

### 2. 语义化命名
使用语义化的变量名而不是具体的颜色值：
```css
/* 好 */
color: var(--text-primary);
background: var(--bg-secondary);

/* 不好 */
color: var(--neutral-gray-900);
background: var(--neutral-white);
```

### 3. 一致性
在整个项目中保持一致的变量使用：
- 所有按钮使用相同的圆角
- 所有卡片使用相同的阴影
- 所有过渡使用相同的时长

### 4. 响应式调整
某些变量可以在媒体查询中覆盖：
```css
@media (max-width: 768px) {
  :root {
    --space-lg: 32px; /* 移动端减小 */
  }
}
```

---

## 📦 组件示例

### 按钮组件
```css
.btn {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
  font-size: 14px;
}

.btn-primary {
  background: var(--brand-primary);
  color: var(--text-inverse);
  box-shadow: var(--shadow-brand);
}

.btn-primary:hover {
  background: var(--brand-primary-dark);
  box-shadow: var(--shadow-brand-lg);
}
```

### 卡片组件
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

### 输入框组件
```css
.input {
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-sm);
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: border-color var(--transition-base);
}

.input:focus {
  border-color: var(--brand-primary);
  outline: none;
  box-shadow: 0 0 0 4px var(--brand-primary-light);
}
```

---

## 🔄 维护指南

### 修改颜色
只需在`:root`中修改变量值，全站自动更新：
```css
:root {
  --brand-primary: #E5C100; /* 修改品牌色 */
}
```

### 添加新变量
遵循命名规范添加新变量：
```css
:root {
  --brand-secondary: #8B7355; /* 新增次要品牌色 */
  --shadow-2xl: 0 16px 48px rgba(0, 0, 0, 0.25); /* 新增超大阴影 */
}
```

### 主题切换
可以通过切换`:root`变量实现主题切换：
```css
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  /* ... 其他深色主题变量 */
}
```

---

## ✅ 检查清单

在添加新样式时，确保：
- [ ] 使用CSS变量而不是硬编码值
- [ ] 颜色使用语义化变量名
- [ ] 间距使用间距系统变量
- [ ] 阴影使用预定义阴影
- [ ] 圆角使用圆角系统
- [ ] 过渡使用过渡系统
- [ ] Z-index使用层级变量

---

**最后更新**: 2026-01-27
**版本**: 1.0.0
