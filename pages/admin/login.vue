<template>
  <div class="min-h-screen flex items-center justify-center px-4" style="background: linear-gradient(180deg, #0A0908 0%, #1C1917 100%);">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h1 class="font-display text-3xl font-bold text-white mb-2">Admin Login</h1>
        <p class="text-slate-400">Sign in to access the dashboard</p>
      </div>
      
      <!-- Login Form -->
      <div class="glass-card-dark rounded-2xl p-8 border border-pink-200">
        <form @submit.prevent="handleLogin">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2 text-white">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full max-w-md px-4 py-3 bg-slate-800 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-primary text-white placeholder-slate-400"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2 text-white">Password</label>
              <input 
                v-model="form.password"
                type="password" 
                required
                class="w-full max-w-md px-4 py-3 bg-slate-800 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-primary text-white placeholder-slate-400"
                placeholder="••••••••"
              />
            </div>
            
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input type="checkbox" class="w-4 h-4 text-primary border-pink-200 rounded focus:ring-primary">
                <span class="ml-2 text-sm text-slate-300">Remember me</span>
              </label>
              <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
            
            <button 
              type="submit"
              :disabled="isLoading"
              :class="[
                'w-full py-3 rounded-lg font-semibold transition-all duration-200',
                isLoading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-primary hover:bg-pink-700 cursor-pointer'
              ]"
              class="text-white"
            >
              <span v-if="!isLoading">Sign In</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            </button>
          </div>
        </form>
        
        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p class="text-sm text-yellow-200 mb-2 font-semibold">Demo Credentials:</p>
          <p class="text-xs text-yellow-300">Email: admin@demo.com</p>
          <p class="text-xs text-yellow-300">Password: admin123</p>
        </div>
        
        <div v-if="error" class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p class="text-sm text-red-300">{{ error }}</p>
        </div>
      </div>
      
      <!-- Back to Store -->
      <div class="text-center mt-6">
        <NuxtLink to="/" class="text-sm text-slate-400 hover:text-primary transition-colors">
          ← Back to Store
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Demo credentials check
  if (form.email === 'admin@demo.com' && form.password === 'admin123') {
    // Set admin session
    if (process.client) {
      localStorage.setItem('adminAuth', 'true')
    }
    router.push('/admin/dashboard')
  } else {
    error.value = 'Invalid email or password'
  }
  
  isLoading.value = false
}
</script>
