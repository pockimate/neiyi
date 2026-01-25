# 🚀 部署指南

## 方法 1: GitHub Pages 部署（推荐）

### 步骤 1: 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - Repository name: `intimate-elegance` (或其他名称)
   - Description: `Luxury lingerie e-commerce website`
   - 选择 Public
   - 不要勾选 "Initialize with README"（我们已经有了）
4. 点击 "Create repository"

### 步骤 2: 推送代码到 GitHub

在项目目录执行以下命令：

```bash
# 添加远程仓库（替换 YOUR-USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR-USERNAME/intimate-elegance.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 3: 启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 "Settings"
2. 在左侧菜单找到 "Pages"
3. 在 "Source" 下拉菜单选择 "main" 分支
4. 点击 "Save"
5. 等待几分钟，页面会显示部署地址：
   ```
   https://YOUR-USERNAME.github.io/intimate-elegance/
   ```

### 步骤 4: 访问网站

打开浏览器访问：
```
https://YOUR-USERNAME.github.io/intimate-elegance/index.html
```

---

## 方法 2: Vercel 部署（更快）

### 步骤 1: 推送到 GitHub（同上）

### 步骤 2: 导入到 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的 `intimate-elegance` 仓库
5. 点击 "Import"
6. 保持默认设置，点击 "Deploy"
7. 等待部署完成（通常 1-2 分钟）

### 访问地址

Vercel 会自动生成地址：
```
https://intimate-elegance.vercel.app
```

---

## 方法 3: Netlify 部署

### 步骤 1: 推送到 GitHub（同上）

### 步骤 2: 导入到 Netlify

1. 访问 [Netlify](https://netlify.com)
2. 使用 GitHub 账号登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择 "GitHub"
5. 选择你的 `intimate-elegance` 仓库
6. 保持默认设置，点击 "Deploy site"
7. 等待部署完成

### 访问地址

Netlify 会生成随机地址，可以自定义：
```
https://intimate-elegance.netlify.app
```

---

## 方法 4: 本地服务器（开发/测试）

### Python HTTP Server

```bash
python -m http.server 8000
```

访问: `http://localhost:8000`

### Node.js HTTP Server

```bash
npx http-server -p 8000
```

访问: `http://localhost:8000`

---

## 🔧 部署后配置

### 自定义域名（可选）

#### GitHub Pages
1. 在仓库 Settings → Pages
2. 在 "Custom domain" 输入你的域名
3. 在域名 DNS 设置中添加 CNAME 记录指向 `YOUR-USERNAME.github.io`

#### Vercel/Netlify
1. 在项目设置中找到 "Domains"
2. 添加自定义域名
3. 按照提示配置 DNS

---

## 📝 更新网站

### 本地修改后推送

```bash
# 查看修改
git status

# 添加修改
git add .

# 提交修改
git commit -m "Update: 描述你的修改"

# 推送到 GitHub
git push
```

GitHub Pages/Vercel/Netlify 会自动重新部署！

---

## ✅ 部署检查清单

部署前确认：

- [ ] 所有页面链接正确
- [ ] 图片路径正确（相对路径）
- [ ] JavaScript 文件路径正确
- [ ] CSS 文件路径正确
- [ ] 购物车功能测试通过
- [ ] 响应式设计测试通过
- [ ] 浏览器兼容性测试

部署后测试：

- [ ] 首页加载正常
- [ ] 导航链接工作
- [ ] 产品页面显示
- [ ] 购物车功能正常
- [ ] 结账流程完整
- [ ] 移动端显示正常

---

## 🎯 推荐部署方案

| 平台 | 速度 | 难度 | 自定义域名 | 推荐度 |
|------|------|------|------------|--------|
| **Vercel** | ⚡⚡⚡ | 简单 | ✅ 免费 | ⭐⭐⭐⭐⭐ |
| **Netlify** | ⚡⚡⚡ | 简单 | ✅ 免费 | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ⚡⚡ | 简单 | ✅ 免费 | ⭐⭐⭐⭐ |

**推荐**: Vercel 或 Netlify（部署最快，功能最强）

---

## 🆘 常见问题

### Q: 页面显示 404
A: 确保访问 `index.html`，如 `https://xxx.github.io/intimate-elegance/index.html`

### Q: 样式没有加载
A: 检查 Tailwind CDN 链接是否正常，确保网络连接

### Q: 购物车不工作
A: 确保浏览器允许 LocalStorage，检查浏览器控制台错误

### Q: 图片不显示
A: 当前使用 SVG 占位符，如需真实图片，替换相应代码

---

## 📞 技术支持

如遇到部署问题：
1. 检查浏览器控制台错误信息
2. 查看 GitHub Actions 或部署平台的构建日志
3. 确认所有文件已正确提交到仓库

---

**祝部署顺利！** 🎉
