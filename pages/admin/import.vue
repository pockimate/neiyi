<template>
  <div class="min-h-screen bg-backgroundLight">
    <AdminLayout>
      <div class="max-w-4xl mx-auto">
        <!-- 页面标题 -->
        <div class="mb-8">
          <h1 class="text-3xl font-light text-primary mb-2">导入商品</h1>
          <p class="text-textMuted">从Shopify CSV文件批量导入商品数据</p>
        </div>

        <!-- 导入步骤 -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between mb-6">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                currentStep >= index + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              ]">
                {{ index + 1 }}
              </div>
              <span :class="[
                'ml-3 text-sm font-medium',
                currentStep >= index + 1 ? 'text-primary' : 'text-gray-500'
              ]">
                {{ step }}
              </span>
              <div v-if="index < steps.length - 1" class="w-16 h-0.5 bg-gray-200 mx-4"></div>
            </div>
          </div>
        </div>

        <!-- 步骤1: 上传文件 -->
        <div v-if="currentStep === 1" class="bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-xl font-semibold text-primary mb-4">上传CSV文件</h2>
          
          <!-- 文件上传区域 -->
          <div 
            @drop.prevent="handleDrop"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            :class="[
              'border-2 border-dashed rounded-lg p-12 text-center transition-colors',
              isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
            ]"
          >
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            
            <p class="text-lg font-medium text-primary mb-2">
              拖拽CSV文件到这里，或点击选择文件
            </p>
            <p class="text-sm text-textMuted mb-4">
              支持Shopify标准CSV格式
            </p>
            
            <input 
              ref="fileInput"
              type="file" 
              accept=".csv"
              @change="handleFileSelect"
              class="hidden"
            />
            
            <button 
              @click="$refs.fileInput.click()"
              class="btn-primary"
            >
              选择文件
            </button>
          </div>

          <!-- 已选择的文件 -->
          <div v-if="selectedFile" class="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div class="flex items-center">
              <svg class="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <div>
                <p class="font-medium text-primary">{{ selectedFile.name }}</p>
                <p class="text-sm text-textMuted">{{ formatFileSize(selectedFile.size) }}</p>
              </div>
            </div>
            <button @click="removeFile" class="text-error hover:text-error/80">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- CSV格式说明 -->
          <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 class="font-semibold text-primary mb-2 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              CSV格式要求
            </h3>
            <p class="text-sm text-textSecondary mb-2">文件必须包含以下列（Shopify标准格式）：</p>
            <ul class="text-sm text-textSecondary space-y-1 ml-6 list-disc">
              <li>Handle（商品标识）</li>
              <li>Title（商品名称）</li>
              <li>Body (HTML)（商品描述）</li>
              <li>Vendor（品牌/供应商）</li>
              <li>Type（商品类型）</li>
              <li>Tags（标签，逗号分隔）</li>
              <li>Variant Price（价格）</li>
              <li>Variant Compare At Price（原价，可选）</li>
              <li>Image Src（图片URL）</li>
            </ul>
          </div>

          <!-- 下载模板 -->
          <div class="mt-4 text-center">
            <button @click="downloadTemplate" class="text-primary hover:text-primary/80 text-sm font-medium">
              下载CSV模板文件
            </button>
          </div>

          <!-- 操作按钮 -->
          <div class="mt-8 flex justify-end gap-4">
            <button @click="$router.push('/admin/products')" class="btn-secondary">
              取消
            </button>
            <button 
              @click="parseCSV" 
              :disabled="!selectedFile"
              class="btn-primary"
              :class="{ 'opacity-50 cursor-not-allowed': !selectedFile }"
            >
              下一步：预览数据
            </button>
          </div>
        </div>

        <!-- 步骤2: 预览数据 -->
        <div v-if="currentStep === 2" class="bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-xl font-semibold text-primary mb-4">预览导入数据</h2>
          
          <div class="mb-6">
            <p class="text-textSecondary">
              共检测到 <span class="font-semibold text-primary">{{ parsedProducts.length }}</span> 个商品
            </p>
          </div>

          <!-- 数据预览表格 -->
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left font-semibold text-primary">图片</th>
                  <th class="px-4 py-3 text-left font-semibold text-primary">商品名称</th>
                  <th class="px-4 py-3 text-left font-semibold text-primary">价格</th>
                  <th class="px-4 py-3 text-left font-semibold text-primary">类型</th>
                  <th class="px-4 py-3 text-left font-semibold text-primary">标签</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(product, index) in parsedProducts.slice(0, 10)" :key="index" class="hover:bg-gray-50">
                  <td class="px-4 py-3">
                    <img :src="product.image || '/placeholder.jpg'" :alt="product.name" class="w-16 h-16 object-cover rounded">
                  </td>
                  <td class="px-4 py-3 font-medium">{{ product.name }}</td>
                  <td class="px-4 py-3">
                    <span v-if="product.originalPrice" class="text-textMuted line-through text-xs mr-2">
                      ${{ product.originalPrice }}
                    </span>
                    <span class="font-semibold text-primary">${{ product.price }}</span>
                  </td>
                  <td class="px-4 py-3">{{ product.type || '-' }}</td>
                  <td class="px-4 py-3">
                    <span v-if="product.badge" class="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      {{ product.badge }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p v-if="parsedProducts.length > 10" class="text-sm text-textMuted mt-4 text-center">
            仅显示前10条，共{{ parsedProducts.length }}条数据
          </p>

          <!-- 操作按钮 -->
          <div class="mt-8 flex justify-between">
            <button @click="currentStep = 1" class="btn-secondary">
              上一步
            </button>
            <button @click="importProducts" class="btn-primary">
              确认导入
            </button>
          </div>
        </div>

        <!-- 步骤3: 导入结果 -->
        <div v-if="currentStep === 3" class="bg-white rounded-lg shadow-sm p-8 text-center">
          <div v-if="importing" class="py-12">
            <LoadingSpinner size="lg" />
            <p class="mt-4 text-lg text-primary">正在导入商品...</p>
            <p class="text-sm text-textMuted mt-2">请稍候，不要关闭页面</p>
          </div>

          <div v-else class="py-12">
            <svg class="w-20 h-20 mx-auto mb-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            
            <h2 class="text-2xl font-semibold text-primary mb-4">导入成功！</h2>
            <p class="text-textSecondary mb-8">
              成功导入 <span class="font-semibold text-primary">{{ importedCount }}</span> 个商品
            </p>

            <div class="flex justify-center gap-4">
              <button @click="resetImport" class="btn-secondary">
                继续导入
              </button>
              <button @click="$router.push('/admin/products')" class="btn-primary">
                查看商品列表
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup lang="ts">
const currentStep = ref(1)
const steps = ['上传文件', '预览数据', '导入完成']
const selectedFile = ref<File | null>(null)
const isDragging = ref(false)
const parsedProducts = ref<any[]>([])
const importing = ref(false)
const importedCount = ref(0)

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    selectedFile.value = event.dataTransfer.files[0]
  }
}

const removeFile = () => {
  selectedFile.value = null
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

const parseCSV = async () => {
  if (!selectedFile.value) return

  const text = await selectedFile.value.text()
  const lines = text.split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  
  const products: any[] = []
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue
    
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
    const product: any = {}
    
    headers.forEach((header, index) => {
      product[header] = values[index] || ''
    })
    
    // 转换为我们的商品格式
    const formattedProduct = {
      id: Date.now() + i,
      name: product['Title'] || product['title'],
      description: product['Body (HTML)'] || product['description'] || '',
      price: parseFloat(product['Variant Price'] || product['price'] || '0'),
      originalPrice: parseFloat(product['Variant Compare At Price'] || product['comparePrice'] || '0') || undefined,
      image: product['Image Src'] || product['image'] || '',
      type: product['Type'] || product['type'] || '',
      vendor: product['Vendor'] || product['vendor'] || '',
      badge: product['Tags']?.includes('New') ? 'New' : 
             product['Tags']?.includes('Sale') ? 'Sale' : 
             product['Tags']?.includes('Bestseller') ? 'Bestseller' : '',
      tags: product['Tags'] || product['tags'] || ''
    }
    
    products.push(formattedProduct)
  }
  
  parsedProducts.value = products
  currentStep.value = 2
}

const importProducts = async () => {
  currentStep.value = 3
  importing.value = true
  
  // 模拟导入过程
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 这里应该调用API保存到数据库
  // 现在只是保存到localStorage作为演示
  const existingProducts = JSON.parse(localStorage.getItem('products') || '[]')
  const allProducts = [...existingProducts, ...parsedProducts.value]
  localStorage.setItem('products', JSON.stringify(allProducts))
  
  importedCount.value = parsedProducts.value.length
  importing.value = false
}

const resetImport = () => {
  currentStep.value = 1
  selectedFile.value = null
  parsedProducts.value = []
  importedCount.value = 0
}

const downloadTemplate = () => {
  const template = `Handle,Title,Body (HTML),Vendor,Type,Tags,Variant Price,Variant Compare At Price,Image Src
lace-bra-001,Elegant Lace Bra,Beautiful lace bra with delicate details,Intimate Elegance,Bras,New,49.99,69.99,https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f
silk-chemise-002,Silk Chemise,Luxurious silk chemise,Intimate Elegance,Chemises,Bestseller,89.99,,https://images.unsplash.com/photo-1596783074918-c84cb06531ca
satin-bodysuit-003,Satin Bodysuit,Elegant satin bodysuit,Intimate Elegance,Bodysuits,Sale,59.99,79.99,https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f`
  
  const blob = new Blob([template], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'shopify-products-template.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
</style>
