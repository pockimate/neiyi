/**
 * Security Composables
 * 安全功能 - XSS防护、CSRF防护、输入验证
 */

/**
 * XSS 防护 - 输入清理和输出转义
 */
export const useSanitize = () => {
  // HTML 转义
  const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
    return text.replace(/[&<>"'/]/g, (char) => map[char])
  }
  
  // 移除危险的 HTML 标签
  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '')
  }
  
  // 清理 URL（防止 javascript: 协议）
  const sanitizeUrl = (url: string): string => {
    const dangerous = /^(javascript|data|vbscript):/i
    if (dangerous.test(url)) {
      return ''
    }
    return url
  }
  
  // 清理用户输入
  const sanitizeInput = (input: string, options?: {
    maxLength?: number
    allowHtml?: boolean
  }): string => {
    const { maxLength = 1000, allowHtml = false } = options || {}
    
    let cleaned = input.trim()
    
    // 限制长度
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength)
    }
    
    // 移除 HTML（如果不允许）
    if (!allowHtml) {
      cleaned = stripHtml(cleaned)
    }
    
    return cleaned
  }
  
  return {
    escapeHtml,
    stripHtml,
    sanitizeUrl,
    sanitizeInput
  }
}

/**
 * CSRF 防护 - 表单令牌验证
 */
export const useCsrf = () => {
  const token = ref<string>('')
  
  // 生成 CSRF Token
  const generateToken = (): string => {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }
  
  // 初始化 Token
  const initToken = () => {
    if (process.client) {
      let storedToken = sessionStorage.getItem('csrf_token')
      
      if (!storedToken) {
        storedToken = generateToken()
        sessionStorage.setItem('csrf_token', storedToken)
      }
      
      token.value = storedToken
    }
  }
  
  // 验证 Token
  const validateToken = (submittedToken: string): boolean => {
    return submittedToken === token.value
  }
  
  // 获取 Token（用于表单）
  const getToken = (): string => {
    if (!token.value) {
      initToken()
    }
    return token.value
  }
  
  // 刷新 Token
  const refreshToken = () => {
    const newToken = generateToken()
    token.value = newToken
    if (process.client) {
      sessionStorage.setItem('csrf_token', newToken)
    }
  }
  
  onMounted(() => {
    initToken()
  })
  
  return {
    token: readonly(token),
    getToken,
    validateToken,
    refreshToken
  }
}

/**
 * 输入验证
 */
export const useValidation = () => {
  // Email 验证
  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  
  // 密码强度验证
  const isStrongPassword = (password: string): {
    valid: boolean
    strength: 'weak' | 'medium' | 'strong'
    issues: string[]
  } => {
    const issues: string[] = []
    let strength: 'weak' | 'medium' | 'strong' = 'weak'
    
    if (password.length < 8) {
      issues.push('Password must be at least 8 characters')
    }
    
    if (!/[a-z]/.test(password)) {
      issues.push('Password must contain lowercase letters')
    }
    
    if (!/[A-Z]/.test(password)) {
      issues.push('Password must contain uppercase letters')
    }
    
    if (!/[0-9]/.test(password)) {
      issues.push('Password must contain numbers')
    }
    
    if (!/[^a-zA-Z0-9]/.test(password)) {
      issues.push('Password must contain special characters')
    }
    
    // 计算强度
    if (issues.length === 0) {
      strength = 'strong'
    } else if (issues.length <= 2) {
      strength = 'medium'
    }
    
    return {
      valid: issues.length === 0,
      strength,
      issues
    }
  }
  
  // 电话号码验证
  const isValidPhone = (phone: string): boolean => {
    const regex = /^[\d\s\-\+\(\)]+$/
    return regex.test(phone) && phone.replace(/\D/g, '').length >= 10
  }
  
  // 信用卡号验证（Luhn算法）
  const isValidCreditCard = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\D/g, '')
    
    if (cleaned.length < 13 || cleaned.length > 19) {
      return false
    }
    
    let sum = 0
    let isEven = false
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i])
      
      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }
  
  // 邮政编码验证
  const isValidPostalCode = (code: string, country: string = 'US'): boolean => {
    const patterns: Record<string, RegExp> = {
      US: /^\d{5}(-\d{4})?$/,
      UK: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
      CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
      CN: /^\d{6}$/
    }
    
    const pattern = patterns[country] || patterns.US
    return pattern.test(code)
  }
  
  return {
    isValidEmail,
    isStrongPassword,
    isValidPhone,
    isValidCreditCard,
    isValidPostalCode
  }
}

/**
 * 速率限制（防止暴力攻击）
 */
export const useRateLimit = (maxAttempts: number = 5, windowMs: number = 60000) => {
  const attempts = ref<Map<string, number[]>>(new Map())
  
  const checkLimit = (key: string): boolean => {
    const now = Date.now()
    const userAttempts = attempts.value.get(key) || []
    
    // 清理过期的尝试
    const validAttempts = userAttempts.filter(time => now - time < windowMs)
    
    if (validAttempts.length >= maxAttempts) {
      return false // 超过限制
    }
    
    // 记录新尝试
    validAttempts.push(now)
    attempts.value.set(key, validAttempts)
    
    return true // 允许
  }
  
  const reset = (key: string) => {
    attempts.value.delete(key)
  }
  
  return {
    checkLimit,
    reset
  }
}
