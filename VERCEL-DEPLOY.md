# 🚀 Vercel 部署指南

## 📋 准备工作

你需要：
1. ✅ GitHub 账号
2. ✅ 代码已提交到本地 Git（已完成）

---

## 🎯 部署步骤

### 方法 1: 通过 GitHub 部署（推荐）

#### 第 1 步: 创建 GitHub 仓库并推送代码

1. **创建 GitHub 仓库**
   - 访问: https://github.com/new
   - Repository name: `intimate-elegance`
   - 选择 Public
   - 点击 "Create repository"

2. **推送代码到 GitHub**
   
   在当前项目目录执行：
   
   ```bash
   # 添加远程仓库（替换 YOUR-USERNAME）
   git remote add origin https://github.com/YOUR-USERNAME/intimate-elegance.git
   
   # 推送代码
   git branch -M main
   git push -u origin main
   ```
   
   如果需要输入密码，使用 GitHub Personal Access Token：
   - GitHub 头像 → Settings → Developer settings → Personal access tokens
   - Generate new token → 勾选 `repo` → 复制 token
   - 推送时用 token 作为密码

#### 第 2 步: 连接 Vercel

1. **访问 Vercel**
   - 打开: https://vercel.com
   - 点击 "Sign Up" 或 "Login"
   - 选择 "Continue with GitHub"
   - 授权 Vercel 访问你的 GitHub

2. **导入项目**
   - 登录后，点击 "Add New..." → "Project"
   - 在列表中找到 `intimate-elegance` 仓库
   - 点击 "Import"

3. **配置项目**
   - Project Name: `intimate-elegance`（可自定义）
   - Framework Preset: 选择 "Other"
   - Root Directory: 保持默认 `./`
   - Build Command: 留空
   - Output Directory: 留空
   - Install Command: 留空

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待 30-60 秒

5. **完成！**
   - 部署成功后会显示：
     ```
     🎉 Congratulations!
     Your project is live at:
     https://intimate-elegance.vercel.app
     ```

---

### 方法 2: 使用 Vercel CLI（高级）

#### 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 登录 Vercel

```bash
vercel login
```

#### 部署

```bash
# 在项目目录执行
vercel

# 按提示操作：
# - Set up and deploy? Yes
# - Which scope? 选择你的账号
# - Link to existing project? No
# - What's your project's name? intimate-elegance
# - In which directory is your code located? ./
```

#### 生产环境部署

```bash
vercel --prod
```

---

## 🌐 访问你的网站

部署完成后，你的网站将在以下地址可用：

### 主域名
```
https://intimate-elegance.vercel.app
```

### 预览域名（每次部署）
```
https://intimate-elegance-xxx.vercel.app
```

---

## 🔄 自动部署

### GitHub 集成

一旦连接 GitHub，每次推送代码都会自动部署：

```bash
# 修改代码后
git add .
git commit -m "Update website"
git push

# Vercel 会自动检测并部署（30秒内完成）
```

### 部署分支

- `main` 分支 → 生产环境
- 其他分支 → 预览环境

---

## 🎨 自定义域名

### 添加自定义域名

1. 在 Vercel 项目页面，点击 "Settings"
2. 左侧菜单选择 "Domains"
3. 点击 "Add"
4. 输入你的域名（如 `intimate-elegance.com`）
5. 点击 "Add"

### 配置 DNS

Vercel 会提供 DNS 配置说明：

**选项 1: 使用 Vercel DNS（推荐）**
```
在域名注册商处，将 Nameservers 改为：
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**选项 2: 使用 CNAME**
```
类型: CNAME
名称: www
值: cname.vercel-dns.com
```

**选项 3: 使用 A 记录**
```
类型: A
名称: @
值: 76.76.21.21
```

---

## 📊 Vercel 功能

### 1. 实时分析

- 访问 Vercel 项目 → Analytics
- 查看访问量、性能指标
- 免费版有基础分析

### 2. 环境变量

如果需要添加环境变量：

1. 项目 Settings → Environment Variables
2. 添加变量（如 API keys）
3. 重新部署生效

### 3. 部署保护

1. Settings → Deployment Protection
2. 可以设置密码保护预览部署

### 4. 性能优化

Vercel 自动提供：
- ✅ 全球 CDN
- ✅ 自动 HTTPS
- ✅ 图片优化
- ✅ 边缘缓存
- ✅ Gzip 压缩

---

## 🔧 高级配置

### vercel.json 配置

我们已经创建了 `vercel.json`，包含：

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

### 重定向配置

如果需要重定向，在 `vercel.json` 添加：

```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

---

## 🆘 常见问题

### ❌ 部署失败

**检查：**
1. 确认所有文件已推送到 GitHub
2. 查看 Vercel 部署日志
3. 检查 `vercel.json` 语法

### ❌ 页面 404

**解决：**
1. 确认文件路径正确
2. 检查 `vercel.json` 路由配置
3. 清除浏览器缓存

### ❌ 样式不加载

**解决：**
1. 检查 Tailwind CDN 链接
2. 查看浏览器控制台错误
3. 确认网络连接正常

### ❌ 购物车不工作

**解决：**
1. 确认浏览器允许 LocalStorage
2. 检查 JavaScript 文件加载
3. 查看控制台错误信息

---

## 📈 部署后优化

### 1. 性能监控

使用 Vercel Analytics：
```bash
# 在项目中添加
npm install @vercel/analytics
```

### 2. SEO 优化

确保每个页面有：
- `<title>` 标签
- `<meta name="description">` 标签
- Open Graph 标签

### 3. 添加 Sitemap

创建 `sitemap.xml`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://intimate-elegance.vercel.app/index.html</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://intimate-elegance.vercel.app/products.html</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://intimate-elegance.vercel.app/cart.html</loc>
    <priority>0.6</priority>
  </url>
</urlset>
```

---

## 🎯 下一步

部署成功后：

1. ✅ 测试所有页面功能
2. ✅ 测试购物车系统
3. ✅ 测试响应式设计
4. ✅ 分享网站链接
5. ✅ 设置自定义域名（可选）
6. ✅ 添加 Google Analytics（可选）

---

## 📞 需要帮助？

### Vercel 文档
- https://vercel.com/docs

### Vercel 支持
- https://vercel.com/support

### 社区
- https://github.com/vercel/vercel/discussions

---

## ✅ 快速检查清单

部署前：
- [ ] 代码已提交到 Git
- [ ] 已创建 GitHub 仓库
- [ ] 代码已推送到 GitHub
- [ ] 有 Vercel 账号

部署中：
- [ ] 已连接 GitHub 到 Vercel
- [ ] 已导入项目
- [ ] 配置正确
- [ ] 部署成功

部署后：
- [ ] 网站可以访问
- [ ] 所有页面正常
- [ ] 购物车功能正常
- [ ] 移动端显示正常

---

**🎉 准备好了吗？现在就开始部署吧！**

1. 先推送代码到 GitHub
2. 然后访问 https://vercel.com
3. 导入你的项目
4. 点击 Deploy

30 秒后，你的网站就上线了！🚀
