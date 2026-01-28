<template>
  <!-- Cookie 同意横幅 -->
  <Transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-primary shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div class="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <!-- 简单模式 -->
        <div v-if="!showDetails" class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div class="flex-1">
            <h3 id="cookie-consent-title" class="text-lg font-semibold text-primary mb-2">
              🍪 We Value Your Privacy
            </h3>
            <p id="cookie-consent-description" class="text-sm text-textSecondary">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
              <button
                @click="showDetails = true"
                class="text-accent hover:text-accent-700 underline ml-1"
              >
                Customize
              </button>
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <BaseButton
              @click="rejectAll"
              variant="secondary"
              size="md"
              class="w-full sm:w-auto"
            >
              Reject All
            </BaseButton>
            <BaseButton
              @click="acceptAll"
              variant="primary"
              size="md"
              class="w-full sm:w-auto"
            >
              Accept All
            </BaseButton>
          </div>
        </div>
        
        <!-- 详细设置模式 -->
        <div v-else class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-primary">
              Cookie Preferences
            </h3>
            <button
              @click="showDetails = false"
              class="text-textMuted hover:text-primary"
              aria-label="Close details"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Cookie 类别 -->
          <div class="space-y-4">
            <!-- 必要 Cookie -->
            <div class="flex items-start gap-4 p-4 bg-secondary-100 rounded">
              <div class="flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked
                  disabled
                  class="w-5 h-5 rounded border-gray-300"
                />
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-primary mb-1">
                  Necessary Cookies
                  <span class="text-xs text-textMuted font-normal ml-2">(Always Active)</span>
                </h4>
                <p class="text-sm text-textSecondary">
                  These cookies are essential for the website to function properly. They enable basic features like page navigation and access to secure areas.
                </p>
              </div>
            </div>
            
            <!-- 分析 Cookie -->
            <div class="flex items-start gap-4 p-4 border border-border rounded">
              <div class="flex-shrink-0 mt-1">
                <input
                  v-model="tempConsent.analytics"
                  type="checkbox"
                  class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-primary mb-1">Analytics Cookies</h4>
                <p class="text-sm text-textSecondary">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>
            </div>
            
            <!-- 营销 Cookie -->
            <div class="flex items-start gap-4 p-4 border border-border rounded">
              <div class="flex-shrink-0 mt-1">
                <input
                  v-model="tempConsent.marketing"
                  type="checkbox"
                  class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-primary mb-1">Marketing Cookies</h4>
                <p class="text-sm text-textSecondary">
                  These cookies are used to track visitors across websites to display relevant advertisements and encourage them to engage.
                </p>
              </div>
            </div>
            
            <!-- 偏好 Cookie -->
            <div class="flex items-start gap-4 p-4 border border-border rounded">
              <div class="flex-shrink-0 mt-1">
                <input
                  v-model="tempConsent.preferences"
                  type="checkbox"
                  class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-primary mb-1">Preference Cookies</h4>
                <p class="text-sm text-textSecondary">
                  These cookies enable the website to remember choices you make (such as language or region) and provide enhanced features.
                </p>
              </div>
            </div>
          </div>
          
          <!-- 链接 -->
          <div class="flex flex-wrap gap-4 text-sm">
            <NuxtLink to="/privacy" class="text-accent hover:text-accent-700 underline">
              Privacy Policy
            </NuxtLink>
            <NuxtLink to="/privacy#cookies" class="text-accent hover:text-accent-700 underline">
              Cookie Policy
            </NuxtLink>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex flex-col sm:flex-row gap-3">
            <BaseButton
              @click="saveCustomConsent"
              variant="primary"
              size="md"
              class="flex-1"
            >
              Save Preferences
            </BaseButton>
            <BaseButton
              @click="acceptAll"
              variant="secondary"
              size="md"
              class="flex-1"
            >
              Accept All
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { usePrivacy } from '~/composables/usePrivacy'

const { showBanner, acceptAll, rejectAll, saveConsent } = usePrivacy()

const showDetails = ref(false)
const tempConsent = ref({
  analytics: false,
  marketing: false,
  preferences: false
})

const saveCustomConsent = () => {
  saveConsent(tempConsent.value)
  showDetails.value = false
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
