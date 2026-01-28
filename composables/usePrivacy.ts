/**
 * Privacy & Consent Management
 * 隐私与同意管理 - GDPR/CCPA 合规
 */

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export interface PrivacySettings {
  consent: CookieConsent
  consentDate?: string
  consentVersion: string
}

export const usePrivacy = () => {
  const CONSENT_KEY = 'cookie_consent'
  const CONSENT_VERSION = '1.0'
  
  const consent = ref<CookieConsent>({
    necessary: true, // 必要 Cookie 始终启用
    analytics: false,
    marketing: false,
    preferences: false
  })
  
  const showBanner = ref(false)
  const consentGiven = ref(false)
  
  // 加载已保存的同意设置
  const loadConsent = () => {
    if (!process.client) return
    
    try {
      const saved = localStorage.getItem(CONSENT_KEY)
      if (saved) {
        const settings: PrivacySettings = JSON.parse(saved)
        
        // 检查版本是否匹配
        if (settings.consentVersion === CONSENT_VERSION) {
          consent.value = settings.consent
          consentGiven.value = true
          showBanner.value = false
          return
        }
      }
    } catch (error) {
      console.error('Failed to load consent:', error)
    }
    
    // 没有保存的同意或版本不匹配，显示横幅
    showBanner.value = true
  }
  
  // 保存同意设置
  const saveConsent = (newConsent: Partial<CookieConsent>) => {
    if (!process.client) return
    
    consent.value = {
      necessary: true, // 必要 Cookie 始终启用
      ...newConsent
    }
    
    const settings: PrivacySettings = {
      consent: consent.value,
      consentDate: new Date().toISOString(),
      consentVersion: CONSENT_VERSION
    }
    
    localStorage.setItem(CONSENT_KEY, JSON.stringify(settings))
    consentGiven.value = true
    showBanner.value = false
    
    // 应用同意设置
    applyConsent()
  }
  
  // 接受所有 Cookie
  const acceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
      preferences: true
    })
  }
  
  // 拒绝非必要 Cookie
  const rejectAll = () => {
    saveConsent({
      analytics: false,
      marketing: false,
      preferences: false
    })
  }
  
  // 应用同意设置
  const applyConsent = () => {
    if (!process.client) return
    
    // 分析 Cookie
    if (!consent.value.analytics) {
      // 禁用 Google Analytics
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        })
      }
    }
    
    // 营销 Cookie
    if (!consent.value.marketing) {
      // 禁用营销追踪
      if (window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'denied'
        })
      }
    }
  }
  
  // 撤销同意
  const revokeConsent = () => {
    if (!process.client) return
    
    localStorage.removeItem(CONSENT_KEY)
    consent.value = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    consentGiven.value = false
    showBanner.value = true
    
    // 清除非必要 Cookie
    clearNonEssentialCookies()
  }
  
  // 清除非必要 Cookie
  const clearNonEssentialCookies = () => {
    if (!process.client) return
    
    const cookies = document.cookie.split(';')
    const essentialCookies = ['csrf_token', 'session_id', 'cart']
    
    cookies.forEach(cookie => {
      const [name] = cookie.split('=')
      const cookieName = name.trim()
      
      if (!essentialCookies.includes(cookieName)) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      }
    })
  }
  
  // 获取隐私政策链接
  const getPrivacyPolicyUrl = () => '/privacy'
  const getCookiePolicyUrl = () => '/privacy#cookies'
  
  // 初始化
  onMounted(() => {
    loadConsent()
  })
  
  return {
    consent: readonly(consent),
    showBanner,
    consentGiven: readonly(consentGiven),
    saveConsent,
    acceptAll,
    rejectAll,
    revokeConsent,
    getPrivacyPolicyUrl,
    getCookiePolicyUrl
  }
}

/**
 * GDPR 数据主体权利
 */
export const useDataRights = () => {
  // 请求数据导出
  const requestDataExport = async (email: string) => {
    // 实际应用中，这会调用 API
    console.log('Requesting data export for:', email)
    
    // 模拟 API 调用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Data export request received. You will receive an email within 30 days.'
        })
      }, 1000)
    })
  }
  
  // 请求数据删除
  const requestDataDeletion = async (email: string, reason?: string) => {
    console.log('Requesting data deletion for:', email, 'Reason:', reason)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Data deletion request received. Your data will be deleted within 30 days.'
        })
      }, 1000)
    })
  }
  
  // 请求数据更正
  const requestDataCorrection = async (email: string, corrections: any) => {
    console.log('Requesting data correction for:', email, corrections)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Data correction request received.'
        })
      }, 1000)
    })
  }
  
  return {
    requestDataExport,
    requestDataDeletion,
    requestDataCorrection
  }
}
