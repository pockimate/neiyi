# 🚀 完整电商系统实施指南

## 📦 已准备的文件

### 1. 数据库架构
- ✅ `supabase/schema.sql` - 完整的数据库表结构
  - 8个核心表
  - RLS 安全策略
  - 索引优化
  - 触发器和函数
  - 初始产品数据

### 2. 配置文件
- ✅ `.env.example` - 环境变量模板
- ✅ `FULL-ECOMMERCE-PLAN.md` - 完整实施计划

---

## 🎯 实施步骤

### 步骤 1: 创建 Supabase 项目 (5分钟)

1. **访问 Supabase**
   ```
   https://supabase.com
   ```

2. **创建新项目**
   - 点击 "New Project"
   - 项目名称: `intimate-elegance`
   - 数据库密码: (保存好)
   - 区域: 选择最近的 (如 East US)

3. **等待项目初始化** (约2分钟)

4. **获取 API 密钥**
   - 进入 Settings → API
   - 复制 `Project URL`
   - 复制 `anon public` key
   - 复制 `service_role` key (保密!)

5. **执行数据库迁移**
   - 进入 SQL Editor
   - 点击 "New Query"
   - 复制粘贴 `supabase/schema.sql` 的全部内容
   - 点击 "Run"
   - 等待执行完成 (约10秒)

6. **验证数据**
   - 进入 Table Editor
   - 查看 `products` 表
   - 应该看到 12 个产品

---

### 步骤 2: 创建 Stripe 账户 (10分钟)

1. **访问 Stripe**
   ```
   https://stripe.com
   ```

2. **注册账户**
   - 使用邮箱注册
   - 填写基本信息
   - 选择 "Test Mode"

3. **获取 API 密钥**
   - 进入 Developers → API keys
   - 复制 `Publishable key` (pk_test_xxx)
   - 复制 `Secret key` (sk_test_xxx)

4. **设置 Webhook** (稍后配置)
   - 进入 Developers → Webhooks
   - 点击 "Add endpoint"
   - URL: `https://your-domain.vercel.app/api/webhooks/stripe`
   - 选择事件: `checkout.session.completed`, `payment_intent.succeeded`

---

### 步骤 3: 配置环境变量 (2分钟)

1. **创建 `.env` 文件**
   ```bash
   cp .env.example .env
   ```

2. **填写环境变量**
   ```env
   # Supabase (从步骤1获取)
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   # Stripe (从步骤2获取)
   STRIPE_PUBLIC_KEY=pk_test_xxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   
   # Email (可选，稍后配置)
   RESEND_API_KEY=re_xxxxx
   
   # App
   BASE_URL=http://localhost:3000
   ADMIN_EMAIL=your-email@example.com
   ```

3. **在 Vercel 配置环境变量**
   - 进入 Vercel 项目设置
   - Settings → Environment Variables
   - 添加所有环境变量
   - 选择 Production, Preview, Development

---

### 步骤 4: 安装依赖 (2分钟)

```bash
# 安装 Supabase, Stripe, Email 依赖
npm install @supabase/supabase-js stripe @stripe/stripe-js resend

# 安装开发依赖
npm install -D @types/stripe
```

---

### 步骤 5: 创建 Supabase 客户端

**文件**: `server/utils/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Client-side (anon key)
export const supabaseClient = createClient(
  supabaseUrl,
  process.env.SUPABASE_ANON_KEY!
)
```

---

### 步骤 6: 创建产品 API

**文件**: `server/api/products/index.get.ts`
```typescript
import { supabase } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  return data
})
```

**文件**: `server/api/products/[id].get.ts`
```typescript
import { supabase } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw createError({
      statusCode: 404,
      message: 'Product not found'
    })
  }

  return data
})
```

---

### 步骤 7: 创建 Stripe Checkout API

**文件**: `server/api/checkout/create-session.post.ts`
```typescript
import Stripe from 'stripe'
import { supabase } from '~/server/utils/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { items, customerEmail } = body

  // 创建 Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image]
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    })),
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/checkout/cancel`,
    customer_email: customerEmail,
    metadata: {
      items: JSON.stringify(items)
    }
  })

  return { sessionId: session.id }
})
```

---

### 步骤 8: 创建订单 API

**文件**: `server/api/orders/create.post.ts`
```typescript
import { supabase } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 生成订单号
  const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  
  // 创建订单
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: body.userId || null,
      status: 'pending',
      subtotal: body.subtotal,
      tax: body.tax,
      total: body.total,
      customer_email: body.email,
      customer_phone: body.phone,
      shipping_first_name: body.firstName,
      shipping_last_name: body.lastName,
      shipping_address_line1: body.address,
      shipping_city: body.city,
      shipping_state: body.state,
      shipping_zip_code: body.zipCode,
      payment_intent_id: body.paymentIntentId
    })
    .select()
    .single()

  if (orderError) {
    throw createError({
      statusCode: 500,
      message: orderError.message
    })
  }

  // 创建订单商品
  const orderItems = body.items.map((item: any) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    product_image_url: item.image,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.price * item.quantity
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    throw createError({
      statusCode: 500,
      message: itemsError.message
    })
  }

  return order
})
```

---

### 步骤 9: 更新前端使用 API

**文件**: `composables/useProducts.ts`
```typescript
export const useProducts = () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const data = await $fetch('/api/products')
      products.value = data
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const getProductById = async (id: string) => {
    try {
      return await $fetch(`/api/products/${id}`)
    } catch (e: any) {
      error.value = e.message
      return null
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById
  }
}
```

---

### 步骤 10: 集成 Stripe Checkout

**文件**: `pages/checkout.vue` (更新)
```typescript
<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const loading = ref(false)

const handleCheckout = async () => {
  loading.value = true
  
  try {
    // 创建 Stripe Checkout Session
    const { sessionId } = await $fetch('/api/checkout/create-session', {
      method: 'POST',
      body: {
        items: cartStore.items,
        customerEmail: form.email
      }
    })

    // 重定向到 Stripe Checkout
    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY!)
    await stripe?.redirectToCheckout({ sessionId })
  } catch (error) {
    console.error('Checkout error:', error)
    alert('支付失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>
```

---

## 🎉 测试流程

### 1. 测试产品列表
```bash
# 启动开发服务器
npm run dev

# 访问
http://localhost:3000/products
```

### 2. 测试支付流程
- 添加产品到购物车
- 进入结账页面
- 使用测试卡号: `4242 4242 4242 4242`
- 任意未来日期和 CVC
- 完成支付

### 3. 验证订单
- 进入 Supabase Dashboard
- 查看 `orders` 表
- 应该看到新订单

---

## 📊 下一步

### 立即实施 (必须)
1. ✅ 创建 Supabase 项目
2. ✅ 创建 Stripe 账户
3. ✅ 配置环境变量
4. ✅ 安装依赖
5. ✅ 创建 API 端点
6. ✅ 测试支付流程

### 后续增强 (重要)
7. 创建后台管理面板
8. 添加用户认证
9. 实现邮件通知
10. 添加订单追踪

### 高级功能 (可选)
11. 产品搜索和筛选
12. 评论系统
13. 优惠券
14. 数据分析

---

## 🆘 常见问题

### Q: Supabase 连接失败？
A: 检查环境变量是否正确，确保 URL 和 Key 没有多余空格

### Q: Stripe 支付失败？
A: 确保使用测试模式，使用测试卡号 4242 4242 4242 4242

### Q: 订单没有创建？
A: 检查 Supabase RLS 策略，确保允许插入订单

### Q: 图片无法显示？
A: Unsplash 图片可能需要翻墙，可以替换为本地图片

---

## 📞 需要帮助？

每个步骤我都可以提供详细的代码和指导。告诉我你想从哪里开始！

**推荐顺序**:
1. 先完成步骤 1-4 (设置账户和配置)
2. 然后步骤 5-8 (创建 API)
3. 最后步骤 9-10 (集成前端)

准备好了吗？🚀
