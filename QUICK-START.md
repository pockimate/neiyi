# 🚀 快速开始指南

## 服务器已启动！

当前服务器正在运行在: **http://localhost:8000**

## 📄 页面导航

### 主要页面
- 🏠 **首页**: http://localhost:8000/index.html
- 🛍️ **产品列表**: http://localhost:8000/products.html
- 📦 **产品详情**: http://localhost:8000/product-detail.html
- 🛒 **购物车**: http://localhost:8000/cart.html
- 💳 **结账**: http://localhost:8000/checkout.html

### 测试页面
- 🧪 **功能测试**: http://localhost:8000/test.html

## ✨ 快速测试流程

### 1. 测试购物车功能
```
1. 打开首页 → 点击任意产品的 "Add to Cart"
2. 观察右上角购物车徽章数字变化
3. 点击购物车图标进入购物车页面
4. 测试 +/- 按钮调整数量
5. 点击 "Proceed to Checkout" 进入结账
```

### 2. 测试产品浏览
```
1. 打开产品列表页
2. 使用左侧筛选器（分类、价格、尺码）
3. 使用右上角排序下拉菜单
4. 点击任意产品的 "Add to Cart"
```

### 3. 测试完整购物流程
```
首页 → 产品列表 → 加入购物车 → 购物车 → 结账 → 完成
```

## 🎨 设计特色

- **风格**: Liquid Glass（流动玻璃效果）
- **配色**: 浪漫粉色 + 优雅金色
- **字体**: Playfair Display + Inter
- **响应式**: 完美适配所有设备

## 🛠️ 开发者工具

### 查看购物车数据
打开浏览器控制台（F12），输入：
```javascript
JSON.parse(localStorage.getItem('cart'))
```

### 清空购物车
```javascript
localStorage.removeItem('cart')
location.reload()
```

### 添加测试商品
```javascript
addToCart({
    id: 999,
    name: 'Test Product',
    price: 99.99,
    size: 'M',
    color: 'Pink',
    quantity: 1
})
```

## 📱 响应式测试

### Chrome DevTools
1. 按 F12 打开开发者工具
2. 点击设备工具栏图标（Ctrl+Shift+M）
3. 选择不同设备：
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1440px)

## 🔧 停止服务器

如需停止服务器，在命令行按 `Ctrl+C`

## 📝 文件说明

| 文件 | 说明 |
|------|------|
| index.html | 首页（Hero、产品展示、关于） |
| products.html | 产品列表（12个产品+筛选） |
| product-detail.html | 产品详情（尺码、颜色选择） |
| cart.html | 购物车（商品管理、价格计算） |
| checkout.html | 结账（表单、支付方式） |
| js/cart.js | 购物车管理函数 |
| js/products.js | 产品数据和渲染 |
| test.html | 功能测试页面 |

## 🎯 核心功能

✅ 完整的购物车系统  
✅ LocalStorage 数据持久化  
✅ 实时购物车徽章更新  
✅ 产品筛选和排序  
✅ 尺码和颜色选择  
✅ 响应式设计  
✅ 流畅的动画效果  
✅ 无障碍支持  

## 💡 提示

- 购物车数据保存在浏览器 LocalStorage 中
- 刷新页面不会丢失购物车内容
- 可以在不同页面间自由切换
- 所有交互都有平滑过渡动画

---

**享受你的奢华内衣独立站！** ✨
