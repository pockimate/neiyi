# 移动端优化修复清单

## 已修复的问题

### 1. ✅ 图片裁切问题
**问题：** 产品卡片图片使用 `object-fit: cover` 导致模特头部被裁切

**解决方案：**
- 将 `object-fit: cover` 改为 `object-fit: contain`
- 添加 `object-position: center center` 确保居中显示
- 保留渐变背景填充空白区域

**修改文件：**
- `components/ProductCard.vue`

### 2. ✅ 按钮尺寸问题
**问题：** 部分按钮小于 48px，不符合移动端触控标准

**解决方案：**
- 所有按钮添加 `min-h-[48px]` 和 `min-w-[120px]`
- 按钮文字从 `text-sm` 改为 `text-base` (16px)
- 增加 padding 确保点击区域足够大

**修改文件：**
- `components/ProductCard.vue` - Add to Cart 按钮
- `assets/css/main.css` - 全局按钮样式

### 3. ✅ 字体大小问题
**问题：** 部分文字小于 16px，在移动端难以阅读

**解决方案：**
- 全局设置 `body { font-size: 16px }`
- 限制 `text-sm` 最小 14px
- 限制 `text-xs` 最小 14px
- 产品描述从 `text-sm` 改为 `text-base`

**修改文件：**
- `assets/css/main.css`
- `components/ProductCard.vue`

### 4. ✅ 移动端专属优化
**新增功能：**
- 移动端按钮自动增大：`min-height: 48px`, `min-width: 120px`
- 移动端输入框：`min-height: 48px`, `font-size: 16px`（防止 iOS 自动缩放）
- 移动端标题自适应缩小但保持可读性

**修改文件：**
- `assets/css/main.css` - 添加 `@media (max-width: 768px)` 规则

## 需要手动检查的页面

### 商品详情页 (pages/product-detail.vue)
需要更新的小按钮和文本：

1. **360° View 徽章** - `text-xs` → `text-sm`
2. **Trust Badges 文字** - `text-xs` → `text-sm`
3. **产品标签** - `text-sm` → `text-base`
4. **社交分享按钮** - `py-2` → `py-3`, `text-sm` → `text-base`
5. **配送计算器按钮** - `py-2` → `py-3`
6. **库存通知按钮** - `py-2` → `py-3`

### 购物车页面 (pages/cart.vue)
需要检查：
- 数量调整按钮（+/-）
- 应用优惠券按钮
- 结账按钮

### 结账页面 (pages/checkout.vue)
需要检查：
- 表单输入框高度
- 提交按钮尺寸
- 支付方式选择按钮

## CSS 优化总结

### 新增的全局样式

```css
/* 确保最小字体 */
body {
  font-size: 16px;
}

p, span, a, button, input, textarea, select {
  font-size: 16px;
}

.text-sm {
  font-size: 14px !important;
}

.text-xs {
  font-size: 14px !important;
}

/* 按钮基础样式 */
button, .btn, a.btn {
  min-height: 48px;
  min-width: 48px;
  font-size: 16px;
  padding: 12px 24px;
}

/* 图片安全显示 */
.safe-image {
  object-fit: contain;
  object-position: center center;
}

.safe-image-cover {
  object-fit: cover;
  object-position: center 20%;
}

/* 移动端优化 */
@media (max-width: 768px) {
  button, .btn, a.btn {
    min-height: 48px;
    min-width: 120px;
    font-size: 16px;
    padding: 14px 28px;
  }
  
  input, textarea, select {
    min-height: 48px;
    font-size: 16px;
  }
}
```

## 测试清单

### 移动端测试（< 768px）
- [ ] 产品卡片图片完整显示，无裁切
- [ ] 所有按钮至少 48x48px
- [ ] 所有文字至少 14px
- [ ] 输入框至少 48px 高
- [ ] 点击区域足够大，无误触

### 平板测试（768px - 1024px）
- [ ] 布局正常
- [ ] 按钮尺寸合适
- [ ] 文字清晰可读

### 桌面测试（> 1024px）
- [ ] 保持原有设计
- [ ] 无样式冲突

## 下一步行动

1. ✅ 修复 ProductCard 组件
2. ✅ 更新全局 CSS
3. ⏳ 修复商品详情页小按钮
4. ⏳ 检查购物车页面
5. ⏳ 检查结账页面
6. ⏳ 移动端实机测试
7. ⏳ 提交并部署

## 预期效果

### 修复前
- ❌ 图片裁切模特头部
- ❌ 按钮太小，难以点击
- ❌ 文字太小，难以阅读
- ❌ 输入框触发 iOS 自动缩放

### 修复后
- ✅ 图片完整显示，居中对齐
- ✅ 所有按钮 ≥ 48x48px
- ✅ 所有文字 ≥ 14px
- ✅ 输入框 16px，无自动缩放
- ✅ 符合 WCAG 2.1 AA 标准

---

**更新时间：** 2026年1月26日  
**状态：** 部分完成，需继续优化商品详情页
