# PayPal 支付集成完成

## ✅ 已实现的功能

### 1. PayPal Express Checkout（快捷支付）
- 用户无需填写表单
- 一键跳转到 PayPal 完成支付
- 自动返回并创建订单

### 2. Google Pay（快捷支付）
- 集成 Google Pay API
- 支持 Android 和 Chrome 用户
- 一键支付体验

### 3. PayPal Card Fields（信用卡支付）
- **安全的卡片处理** - 卡片信息直接发送到 PayPal
- **PCI DSS 合规** - 你的服务器永远不会接触卡片数据
- **托管字段** - PayPal 提供的安全 iframe
- 支持的卡片：Visa, Mastercard, Amex, Discover
- **✅ 修复：** Card Fields 现在可以在切换支付方式后重新加载

### 4. PayPal 标准支付
- 传统的 PayPal 账户支付
- 跳转到 PayPal 网站完成支付

### 5. 后端 API
- ✅ 创建了 `/api/orders/create` 端点
- 当前返回模拟订单 ID（用于测试）
- 生产环境需要调用真实的 PayPal API

## 🔧 最新修复（2026-01-28）

### Card Fields 切换问题修复

**问题：** 切换支付方式后，Card Fields 不会重新加载

**解决方案：**
1. 创建了独立的 `initCardFields()` 函数
2. 添加了 `cardFieldsRendered` 状态跟踪
3. 使用 `watch` 监听支付方式变化
4. 切换回信用卡时自动重新渲染字段

**代码改进：**
```typescript
// 独立的 Card Fields 初始化函数
const initCardFields = () => {
  if (!window.paypal || !window.paypal.CardFields) return
  if (cardFieldsRendered.value) return
  
  // 初始化逻辑...
  cardFieldsRendered.value = true
}

// 监听支付方式变化
watch(() => form.paymentMethod, (newMethod, oldMethod) => {
  if (newMethod === 'card' && oldMethod !== 'card' && paypalLoaded.value) {
    cardFieldsRendered.value = false
    nextTick(() => {
      initCardFields()
    })
  }
})
```

### 后端 API 创建

创建了 `server/api/orders/create.post.ts`：
- 接收订单数据（items, amount）
- 验证必填字段
- 返回订单 ID
- 当前使用模拟数据（生产环境需要调用 PayPal API）

## 配置说明

### 1. 获取 PayPal Client ID

1. 访问 [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. 登录或创建开发者账号
3. 创建新应用（Create App）
4. 复制 **Client ID**

### 2. 更新配置

在 `nuxt.config.ts` 中，将 `client-id=test` 替换为你的真实 Client ID：

```typescript
script: [
  {
    src: 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID_HERE&currency=USD&components=buttons,card-fields,googlepay',
    defer: true
  }
]
```

### 3. 环境配置

**Sandbox（测试环境）：**
```
client-id=YOUR_SANDBOX_CLIENT_ID
```

**Production（生产环境）：**
```
client-id=YOUR_PRODUCTION_CLIENT_ID
```

## 测试

### Sandbox 测试账号

PayPal 提供测试账号用于开发：

1. 访问 [Sandbox Accounts](https://developer.paypal.com/dashboard/accounts)
2. 使用提供的测试买家账号登录
3. 测试支付流程

**测试卡号：**
- Visa: 4032039933196896
- Mastercard: 5425233430109903
- Amex: 374245455400126

**有效期：** 任意未来日期  
**CVV：** 任意3-4位数字

## 支付流程

### Express Checkout 流程
```
1. 用户点击 PayPal/Google Pay 按钮
2. 弹出支付提供商窗口
3. 用户登录并确认支付
4. 返回网站，自动创建订单
5. 跳转到成功页面
```

### Card Fields 流程
```
1. 用户填写配送信息
2. 选择"Credit Card"支付方式
3. 填写卡片信息（在 PayPal 托管字段中）
4. 点击"Place Order"
5. PayPal 处理支付
6. 创建订单并跳转到成功页面
```

## 安全特性

### ✅ 已实现
- **PCI DSS 合规** - 使用 PayPal Card Fields
- **SSL 加密** - 所有通信加密
- **无卡片存储** - 卡片信息不经过你的服务器
- **3D Secure** - PayPal 自动处理

### 🔒 安全最佳实践
- 永远不要在前端存储完整卡号
- 永远不要记录 CVV
- 使用 HTTPS
- 实施速率限制
- 监控可疑交易

## 后端集成（需要实现）

### 创建订单 API

```javascript
// server/api/orders/create.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 创建 PayPal 订单
  const order = await fetch('https://api.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: body.amount
        }
      }]
    })
  })
  
  const data = await order.json()
  return { id: data.id }
})
```

### Webhook 处理

```javascript
// server/api/webhooks/paypal.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 验证 webhook 签名
  // 处理支付事件
  // 更新订单状态
  
  return { received: true }
})
```

## 生产环境检查清单

- [ ] 更新为生产环境 Client ID
- [ ] 配置 Webhook URL
- [ ] 实现后端订单创建 API
- [ ] 实现 Webhook 处理
- [ ] 测试所有支付流程
- [ ] 配置退款流程
- [ ] 添加错误日志
- [ ] 设置支付监控
- [ ] 测试失败场景
- [ ] 配置客服支持

## 支持的货币

当前配置：USD（美元）

支持的其他货币：
- EUR（欧元）
- GBP（英镑）
- CAD（加元）
- AUD（澳元）
- JPY（日元）
- 等等...

修改货币：
```typescript
src: 'https://www.paypal.com/sdk/js?client-id=XXX&currency=EUR&...'
```

## 故障排除

### PayPal 按钮不显示
1. 检查 Client ID 是否正确
2. 打开浏览器控制台查看错误
3. 确认 SDK 已加载（检查 `window.paypal`）

### Card Fields 不工作
1. 确认 SDK URL 包含 `card-fields` 组件
2. 检查容器元素是否存在
3. 查看控制台错误信息

### Google Pay 不显示
- Google Pay 仅在支持的浏览器和设备上可用
- 需要 HTTPS
- 用户需要配置 Google Pay

## 文档链接

- [PayPal JS SDK](https://developer.paypal.com/sdk/js/)
- [Card Fields](https://developer.paypal.com/docs/checkout/advanced/integrate/)
- [Google Pay](https://developer.paypal.com/docs/checkout/apm/google-pay/)
- [Webhooks](https://developer.paypal.com/api/rest/webhooks/)

## 下一步

1. **获取真实 Client ID** - 从 PayPal Developer Dashboard
2. **实现后端 API** - 创建订单和处理 webhook
3. **测试完整流程** - 使用 Sandbox 账号
4. **部署到生产** - 使用生产 Client ID
5. **监控和优化** - 跟踪支付成功率

## 当前状态

✅ 前端集成完成  
✅ Card Fields 切换问题已修复  
✅ 后端 API 基础完成  
⏳ 需要配置真实的 PayPal Client ID  
⏳ 需要实现完整的后端订单处理  
⏳ 需要配置 Webhook

## 文件清单

### 前端文件
- `pages/checkout.vue` - 结账页面，包含所有支付方式
- `nuxt.config.ts` - PayPal SDK 配置

### 后端文件
- `server/api/orders/create.post.ts` - 订单创建 API（基础版本）

### 文档文件
- `PAYPAL-INTEGRATION-COMPLETE.md` - 集成完成总结（本文件）
- `PAYPAL-SETUP-GUIDE.md` - 详细设置指南
- `CARD-FIELDS-FIX.md` - Card Fields 修复说明

## 快速开始

### 1. 获取 PayPal Client ID

详细步骤请查看 `PAYPAL-SETUP-GUIDE.md`

简要步骤：
1. 访问 [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. 创建应用
3. 复制 Client ID

### 2. 更新配置

在 `nuxt.config.ts` 中替换 `client-id=test`：

```typescript
script: [
  {
    src: 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD&components=buttons,card-fields,googlepay',
    defer: true
  }
]
```

### 3. 测试

使用 PayPal 提供的测试账号和测试卡号进行测试。

详细测试步骤请查看 `PAYPAL-SETUP-GUIDE.md`

---

**注意：** 当前使用 `client-id=test` 仅用于演示。在生产环境中必须使用真实的 Client ID。

完整的设置指南和故障排除，请查看 `PAYPAL-SETUP-GUIDE.md`。
