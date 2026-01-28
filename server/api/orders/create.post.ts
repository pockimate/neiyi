export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 验证请求数据
  if (!body.items || !body.amount) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields: items and amount'
    })
  }
  
  // 在生产环境中，这里应该：
  // 1. 验证金额是否正确
  // 2. 调用 PayPal API 创建订单
  // 3. 保存订单到数据库
  
  // 当前返回模拟订单 ID（用于测试）
  const orderId = 'ORDER_' + Math.random().toString(36).substr(2, 9).toUpperCase()
  
  return {
    id: orderId,
    status: 'CREATED'
  }
})
