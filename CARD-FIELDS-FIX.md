# 信用卡字段切换修复

## 问题
切换支付方式后，PayPal Card Fields 不会重新加载。

## 原因
PayPal Card Fields 只在页面加载时初始化一次。当用户切换到 PayPal 再切回信用卡时，字段容器被清空但没有重新渲染。

## 解决方案

### 方案 1：使用 v-if 强制重新渲染（推荐）

在信用卡表单区域使用 `v-if` 而不是 `v-show`：

```vue
<div v-if="form.paymentMethod === 'card'" class="space-y-4" :key="'card-fields'">
  <!-- Card fields here -->
</div>
```

### 方案 2：监听支付方式变化

添加 watch 监听器：

```typescript
watch(() => form.paymentMethod, (newMethod, oldMethod) => {
  if (newMethod === 'card' && oldMethod !== 'card') {
    nextTick(() => {
      initCardFields()
    })
  }
})
```

### 方案 3：简化为普通表单（临时方案）

如果 PayPal Card Fields 有问题，可以暂时使用普通的 HTML 表单：

```vue
<div v-if="form.paymentMethod === 'card'" class="space-y-4">
  <div>
    <label>Card Number *</label>
    <input 
      v-model="form.cardNumber"
      type="text"
      placeholder="1234 5678 9012 3456"
    />
  </div>
  <!-- 其他字段 -->
</div>
```

## 当前实现

已添加：
1. `cardFieldsRendered` 状态跟踪
2. `watch` 监听支付方式变化
3. `initCardFields()` 独立函数
4. 自动重新渲染逻辑

## 测试步骤

1. 刷新页面
2. 选择 "Credit Card" - 应该看到卡片字段
3. 切换到 "PayPal"
4. 再切回 "Credit Card" - 字段应该重新出现

## 如果仍有问题

使用简化的 HTML 表单作为备用方案。
