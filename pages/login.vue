<template>
  <div>
    <TheNavbar />
    
    <section class="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full">
        <div class="glass-card rounded-3xl p-8 border border-pink-200">
          <div class="text-center mb-8">
            <h1 class="font-display text-4xl font-bold text-primary mb-2">Welcome Back</h1>
            <p class="text-slate-600">Sign in to your account</p>
          </div>
          
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-textPrimary mb-2">Email</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="your@email.com"
                class="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-xl focus:border-primary focus:outline-none text-base"
              />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-textPrimary mb-2">Password</label>
              <input
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-xl focus:border-primary focus:outline-none text-base"
              />
            </div>
            
            <div class="flex items-center justify-between">
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="rememberMe" class="w-4 h-4 text-primary border-pink-300 rounded focus:ring-primary">
                <span class="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <NuxtLink to="/forgot-password" class="text-sm text-primary hover:underline">
                Forgot password?
              </NuxtLink>
            </div>
            
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-primary hover:bg-pink-700 text-white py-4 rounded-full font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-slate-600">
              Don't have an account?
              <NuxtLink to="/register" class="text-primary font-semibold hover:underline">
                Sign up
              </NuxtLink>
            </p>
          </div>
          
          <div class="mt-8 pt-6 border-t border-pink-200">
            <p class="text-center text-sm text-slate-500 mb-4">Or continue with</p>
            <div class="grid grid-cols-2 gap-4">
              <button
                @click="loginWithGoogle"
                class="flex items-center justify-center gap-2 py-3 border-2 border-pink-200 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="text-sm font-semibold">Google</span>
              </button>
              <button
                @click="loginWithFacebook"
                class="flex items-center justify-center gap-2 py-3 border-2 border-pink-200 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="text-sm font-semibold">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    // 模拟登录 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 保存用户信息到 localStorage
    if (process.client) {
      const user = {
        email: email.value,
        name: email.value.split('@')[0],
        loggedInAt: new Date().toISOString()
      }
      localStorage.setItem('user', JSON.stringify(user))
      
      if (rememberMe.value) {
        localStorage.setItem('rememberMe', 'true')
      }
    }
    
    // 跳转到首页或之前的页面
    const redirect = useRoute().query.redirect as string
    navigateTo(redirect || '/')
  } catch (error) {
    alert('Login failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const loginWithGoogle = () => {
  alert('Google login will be implemented with OAuth')
}

const loginWithFacebook = () => {
  alert('Facebook login will be implemented with OAuth')
}
</script>
