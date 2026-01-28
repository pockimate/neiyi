# PayPal 支付集成设置指南

## 🎯 当前状态

✅ 前端集成完成  
✅ 后端 API 基础完成  
⏳ 需要配置真实的 PayPal Client ID  
⏳ 需要实现完整的后端订单处理

---

## 📋 快速开始

### 步骤 1: 创建 PayPal 开发者账号

1. 访问 [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. 使用你的 PayPal 账号登录（如果没有，先注册一个）
3. 进入开发者控制台

### 步骤 2: 创建应用

1. 点击 **"My Apps & Credentials"**
2. 选择 **"Sandbox"** 标签（用于测试）
3. 点击 **"Create App"**
4. 输入应用名称（例如：Intimate Elegance）
5. 点击 **"Create App"**

### 步骤 3: 获取 Client ID

创建应用后，你会看到：
- **Client ID** - 复制这个（公开的，可以在前端使用）
- **Secret** - 保密！只在后端使用

### 步骤 4: 更新配置

在 `nuxt.config.ts` 中，找到这一行：

```typescript
src: 'https://www.paypal.com/sdk/js?client-id=test&currency=USD&components=buttons,card-fields,googlepay',
```

替换为：

```typescript
src: 'https://www.paypal.com/sdk/js?client-id=YOUR_SANDBOX_CLIENT_ID&currency=USD&components=buttons,card-fields,googlepay',
```

**重要：** 将 `YOUR_SANDBOX_CLIENT_ID` 替换为你从 PayPal Dashboard 复制的 Client ID

---

## 🧪 测试支付

### Sandbox 测试账号

PayPal 自动为你创建了测试账号：

1. 在 Developer Dashboard 中，点击 **"Sandbox" > "Accounts"**
2. 你会看到两个账号：
   - **Business Account** (商家账号) - 接收付款
   - **Personal Account** (买家账号) - 用于测试支付

3. 点击买家账号旁边的 **"..."** > **"View/Edit Account"**
4. 查看登录邮箱和密码

### 测试信用卡

使用这些测试卡号进行测试：

| 卡类型 | 卡号 | 有效期 | CVV |
|--------|------|--------|-----|
| Visa | 4032039933196896 | 任意未来日期 | 任意3位数 |
| Mastercard | 5425233430109903 | 任意未来日期 | 任意3位数 |
| Amex | 374245455400126 | 任意未来日期 | 任意4位数 |

### 测试流程

1. **PayPal Express Checkout:**
   - 点击 PayPal 按钮
   - 使用测试买家账号登录
   - 确认支付
   - 应该返回到成功页面

2. **Credit Card (Card Fields):**
   - 选择 "Credit Card" 支付方式
   - 填写配送信息
   - 输入测试卡号
   - 点击 "Place Order"
   - 应该跳转到成功页面

3. **Google Pay:**
   - 需要在 Chrome 浏览器中
   - 需要配置 Google Pay（可能在测试环境中不可用）

---

## 🚀 生产环境部署

### 步骤 1: 创建生产应用

1. 在 PayPal Developer Dashboard 中
2. 切换到 **"Live"** 标签
3. 创建新应用（与 Sandbox 相同的步骤）
4. 获取 **Live Client ID**

### 步骤 2: 更新配置

使用环境变量来管理不同环境的 Client ID：

1. 创建 `.env` 文件：

```env
NUXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id
```

2. 创建 `.env.production` 文件：

```env
NUXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id
```

3. 更新 `nuxt.config.ts`：

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      paypalClientId: process.env.NUXT_PUBLIC_PAYPAL_CLIENT_ID || 'test'
    }
  },
  
  app: {
    head: {
      script: [
        {
          src: () => {
            const config = useRuntimeConfig()
            return `https://www.paypal.com/sdk/js?client-id=${config.public.paypalClientId}&currency=USD&components=buttons,card-fields,googlepay`
          },
          defer: true
        }
      ]
    }
  }
})
```

### 步骤 3: 实现完整的后端 API

当前的 `server/api/orders/create.post.ts` 只是一个占位符。在生产环境中，你需要：

1. **调用 PayPal API 创建订单：**

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  // 获取 PayPal Access Token
  const authResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${config.paypalClientId}:${config.paypalSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
  
  const { access_token } = await authResponse.json()
  
  // 创建订单
  const orderResponse = await fetch('https://api-m.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: body.amount
        },
        description: `Order from Intimate Elegance`
      }]
    })
  })
  
  const order = await orderResponse.json()
  return { id: order.id }
})
```

2. **配置 Webhook 接收支付通知：**

```typescript
// server/api/webhooks/paypal.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 验证 webhook 签名
  // 处理不同的事件类型
  switch (body.event_type) {
    case 'PAYMENT.CAPTURE.COMPLETED':
      // 支付成功，更新订单状态
      break
    case 'PAYMENT.CAPTURE.DENIED':
      // 支付失败
      break
    // 其他事件...
  }
  
  return { received: true }
})
```

### 步骤 4: 配置 Webhook

1. 在 PayPal Developer Dashboard 中
2. 选择你的应用
3. 点击 **"Add Webhook"**
4. 输入 Webhook URL：`https://yourdomain.com/api/webhooks/paypal`
5. 选择要接收的事件类型：
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `CHECKOUT.ORDER.APPROVED`
   - 等等...

---

## 🔒 安全最佳实践

### ✅ 必须做的事情

1. **永远不要在前端暴露 Secret**
   - Client ID 可以公开
   - Secret 只能在后端使用

2. **验证所有金额**
   - 在后端重新计算订单总额
   - 不要信任前端传来的金额

3. **验证 Webhook 签名**
   - PayPal 会发送签名
   - 验证签名以确保请求来自 PayPal

4. **使用 HTTPS**
   - 生产环境必须使用 HTTPS
   - PayPal 不会向 HTTP 端点发送 webhook

5. **实施速率限制**
   - 防止恶意用户滥用 API

6. **记录所有交易**
   - 保存订单详情
   - 记录 PayPal 交易 ID
   - 便于对账和退款

### ❌ 不要做的事情

1. 不要在前端存储完整卡号
2. 不要记录 CVV
3. 不要在日志中记录敏感信息
4. 不要跳过 webhook 验证
5. 不要信任前端数据

---

## 📊 监控和分析

### 查看交易

1. 登录 [PayPal Business Account](https://www.paypal.com/)
2. 查看 **"Activity"** 查看所有交易
3. 下载报表进行对账

### 开发者日志

1. 在 Developer Dashboard 中
2. 点击 **"Sandbox" > "Notifications"**
3. 查看 webhook 事件和错误

---

## 🆘 故障排除

### PayPal 按钮不显示

**可能原因：**
- Client ID 错误
- SDK 加载失败
- 浏览器控制台有错误

**解决方法：**
1. 打开浏览器控制台（F12）
2. 查看是否有错误信息
3. 确认 `window.paypal` 对象存在
4. 检查 Client ID 是否正确

### Card Fields 不工作

**可能原因：**
- SDK URL 缺少 `card-fields` 组件
- 容器元素不存在
- Card Fields 在某些地区不可用

**解决方法：**
1. 确认 SDK URL 包含 `components=buttons,card-fields,googlepay`
2. 检查容器元素 ID 是否正确
3. 查看控制台错误

### 支付成功但订单未创建

**可能原因：**
- Webhook 未配置
- Webhook URL 错误
- 后端处理失败

**解决方法：**
1. 检查 Webhook 配置
2. 查看后端日志
3. 在 PayPal Dashboard 中查看 webhook 事件

### Google Pay 不显示

**这是正常的！** Google Pay 有严格的要求：
- 只在支持的浏览器中可用（Chrome、Edge）
- 需要 HTTPS
- 用户需要配置 Google Pay
- 某些地区不可用

---

## 📚 相关文档

- [PayPal JS SDK 文档](https://developer.paypal.com/sdk/js/)
- [Card Fields 集成指南](https://developer.paypal.com/docs/checkout/advanced/integrate/)
- [Google Pay 集成](https://developer.paypal.com/docs/checkout/apm/google-pay/)
- [Webhook 事件参考](https://developer.paypal.com/api/rest/webhooks/)
- [测试卡号](https://developer.paypal.com/tools/sandbox/card-testing/)

---

## ✅ 部署检查清单

在部署到生产环境之前，确保：

- [ ] 获取了生产环境的 Client ID
- [ ] 配置了环境变量
- [ ] 实现了完整的后端订单创建 API
- [ ] 配置了 Webhook
- [ ] 实现了 Webhook 处理逻辑
- [ ] 测试了所有支付流程（PayPal、信用卡）
- [ ] 配置了退款流程
- [ ] 添加了错误日志和监控
- [ ] 测试了失败场景（卡被拒绝、余额不足等）
- [ ] 配置了客服支持流程
- [ ] 网站使用 HTTPS
- [ ] 实施了速率限制
- [ ] 添加了交易记录

---

## 💡 下一步

1. **立即：** 获取 Sandbox Client ID 并替换 `client-id=test`
2. **测试：** 使用测试账号和测试卡号测试所有支付流程
3. **开发：** 实现完整的后端 API 和 Webhook 处理
4. **部署：** 获取生产 Client ID 并部署到生产环境

---

**需要帮助？** 查看 [PayPal 开发者社区](https://www.paypal-community.com/t5/Developer-Community/ct-p/developer-community) 或联系 PayPal 技术支持。
