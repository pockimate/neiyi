# 结账页面调试指南

## 当前问题

从截图看到：
1. PayPal 和 Google Pay 按钮没有显示
2. 控制台有错误信息

## 调试步骤

### 1. 检查 PayPal SDK 是否加载

打开浏览器控制台（F12），输入：
```javascript
console.log(window.paypal)
```

**预期结果：** 应该显示 PayPal SDK 对象  
**如果显示 undefined：** SDK 没有加载

### 2. 检查网络请求

1. 打开 Network 标签
2. 刷新页面
3. 查找 `paypal.com/sdk/js` 请求
4. 检查状态码是否为 200

### 3. 检查控制台错误

查看 Console 标签中的红色错误信息，常见错误：

- **"paypal is not defined"** - SDK 未加载
- **"Cannot read property 'Buttons' of undefined"** - SDK 加载失败
- **"Invalid client-id"** - Client ID 错误

## 临时解决方案

如果 PayPal 按钮不显示，可以：

### 方案 A：使用测试 Client ID

当前配置使用 `client-id=test`，这可能不支持所有功能。

### 方案 B：隐藏 Express Checkout 区域

如果只想测试信用卡支付，可以暂时隐藏快捷支付区域。

### 方案 C：检查 HTTPS

PayPal SDK 某些功能需要 HTTPS。本地开发使用 HTTP 可能导致部分功能不可用。

## 快速修复

### 修复 1：添加加载状态

在 Express Checkout 区域添加加载提示：

```vue
<div v-if="!paypalLoaded" class="text-center py-4">
  <p class="text-sm text-textMuted">Loading payment options...</p>
</div>
```

### 修复 2：添加错误提示

```vue
<div v-if="paypalError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
  <p class="text-sm text-red-800">{{ paypalError }}</p>
</div>
```

### 修复 3：延迟初始化

增加 SDK 加载等待时间：

```javascript
setTimeout(() => {
  if (window.paypal) {
    initPayPal()
  }
}, 2000)
```

## 验证清单

- [ ] PayPal SDK 脚本已添加到 nuxt.config.ts
- [ ] 页面包含 `#paypal-button-container` 元素
- [ ] 页面包含 `#google-pay-button-container` 元素
- [ ] `initPayPal()` 函数在 onMounted 中调用
- [ ] 购物车不为空
- [ ] 浏览器支持（Chrome/Firefox/Safari 最新版本）

## 当前配置

**SDK URL:**
```
https://www.paypal.com/sdk/js?client-id=test&currency=USD&components=buttons,card-fields,googlepay
```

**组件：**
- buttons - PayPal 按钮
- card-fields - 信用卡字段
- googlepay - Google Pay

## 下一步

1. 打开浏览器控制台
2. 截图显示完整的错误信息
3. 检查 Network 标签中的 PayPal SDK 请求
4. 告诉我具体的错误信息

## 备用方案

如果 PayPal 集成有问题，可以：
1. 先使用简单的信用卡表单（不通过 PayPal）
2. 等获取真实 Client ID 后再测试
3. 使用 Stripe 作为替代支付方案
