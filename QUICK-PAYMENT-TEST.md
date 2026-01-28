# 🚀 快速支付测试指南

## 测试步骤（5分钟）

### 1️⃣ 启动服务器
```bash
npm run dev
```
访问：http://localhost:3000

### 2️⃣ 添加商品
1. 进入 Products 页面
2. 点击任意商品的 "Add to Cart"
3. 确认购物车有商品

### 3️⃣ 进入结账
1. 点击购物车图标
2. 点击 "Checkout" 按钮
3. 或直接访问：http://localhost:3000/checkout

---

## 测试信用卡支付

### 填写配送信息
```
Email: test@example.com
Phone: +1 555 000 0000
First Name: John
Last Name: Doe
Country: United States
Address: 123 Test Street
City: New York
State: NY
ZIP: 10001
```

### 填写卡片信息
```
Cardholder Name: John Doe
Card Number: 4032039933196896
Expiry: 12/25
CVV: 123
```

### 点击 "Place Order"
✅ 应该跳转到成功页面

---

## 测试支付方式切换

1. 默认显示 "Credit Card" - 应该看到卡片字段 ✅
2. 点击 "PayPal" 标签 - 应该看到说明文字 ✅
3. 再点击 "Credit Card" - 字段应该重新出现 ✅

---

## 测试 PayPal 快捷支付

1. 点击金色的 "PayPal" 按钮
2. 使用 PayPal 测试账号登录
3. 确认支付
4. 应该返回并跳转到成功页面

**注意：** 需要先配置真实的 Client ID

---

## 测试卡号

| 卡类型 | 卡号 |
|--------|------|
| Visa | 4032039933196896 |
| Mastercard | 5425233430109903 |
| Amex | 374245455400126 |

**有效期：** 任意未来日期  
**CVV：** 任意3-4位数字

---

## 常见问题

### PayPal 按钮不显示？
- 刷新页面
- 查看浏览器控制台（F12）
- 确认 PayPal SDK 已加载

### Card Fields 不显示？
- 确认选择了 "Credit Card" 标签
- 尝试切换到 PayPal 再切回
- 刷新页面

### Google Pay 不显示？
- 这是正常的！需要 Chrome + HTTPS + 用户配置

---

## 下一步

✅ 测试通过？查看 `PAYPAL-SETUP-GUIDE.md` 配置真实的 Client ID

❌ 遇到问题？查看 `PAYMENT-INTEGRATION-COMPLETE.md` 故障排除部分
