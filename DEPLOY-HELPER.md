# 🤖 部署助手 - 跟着我一步步来

## 👋 欢迎！

我会帮你把网站部署到 Vercel。整个过程大约需要 **5-10 分钟**。

---

## 📝 开始之前

请确认你有：
- [ ] GitHub 账号（没有？去 https://github.com/signup 注册）
- [ ] 能访问 GitHub 和 Vercel
- [ ] 项目文件夹已打开命令行

准备好了？让我们开始！👇

---

## 🎯 第一步：推送代码到 GitHub

### 1.1 创建 GitHub 仓库

1. 打开浏览器，访问：
   ```
   https://github.com/new
   ```

2. 填写信息：
   ```
   Repository name: intimate-elegance
   Description: Luxury lingerie e-commerce website
   选择: ⚪ Public
   不要勾选任何初始化选项
   ```

3. 点击绿色按钮 **"Create repository"**

4. **重要！** 复制页面上显示的仓库地址，类似：
   ```
   https://github.com/你的用户名/intimate-elegance.git
   ```

### 1.2 连接并推送代码

在项目文件夹的命令行中，执行以下命令：

**命令 1：添加远程仓库**
```bash
git remote add origin https://github.com/你的用户名/intimate-elegance.git
```
⚠️ 记得替换 `你的用户名` 为你的实际 GitHub 用户名！

**命令 2：重命名分支**
```bash
git branch -M main
```

**命令 3：推送代码**
```bash
git push -u origin main
```

### 1.3 可能遇到的问题

**❌ 如果提示需要登录：**

GitHub 现在需要使用 Personal Access Token（个人访问令牌）：

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 填写：
   - Note: `Vercel Deploy`
   - Expiration: `90 days`
   - 勾选: `repo` (所有子选项)
4. 点击底部 "Generate token"
5. **立即复制** token（只显示一次！）
6. 推送时，用户名输入你的 GitHub 用户名，密码输入刚才复制的 token

**✅ 成功标志：**
看到类似这样的输出：
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
...
To https://github.com/你的用户名/intimate-elegance.git
 * [new branch]      main -> main
```

---

## 🚀 第二步：部署到 Vercel

### 2.1 访问 Vercel

1. 打开浏览器，访问：
   ```
   https://vercel.com
   ```

2. 点击右上角 **"Sign Up"**（如果已有账号点 "Login"）

3. 选择 **"Continue with GitHub"**

4. 点击 **"Authorize Vercel"** 授权

### 2.2 导入项目

1. 登录后，你会看到仪表板

2. 点击 **"Add New..."** → **"Project"**

3. 在项目列表中找到 **"intimate-elegance"**
   - 如果没看到，点击 "Adjust GitHub App Permissions" 授权更多仓库

4. 点击 **"Import"** 按钮

### 2.3 配置项目

在配置页面：

```
Project Name: intimate-elegance
Framework Preset: Other
Root Directory: ./
Build Command: [留空]
Output Directory: [留空]
Install Command: [留空]
```

**不需要修改任何设置！** 保持默认即可。

### 2.4 开始部署

1. 点击蓝色大按钮 **"Deploy"**

2. 等待部署（通常 30-60 秒）
   - 你会看到构建日志滚动
   - 看到动画效果

3. **成功！** 🎉
   
   看到这个页面：
   ```
   🎉 Congratulations!
   
   Your project is successfully deployed.
   
   https://intimate-elegance.vercel.app
   ```

---

## 🌐 第三步：访问你的网站

### 3.1 点击链接

在 Vercel 成功页面，点击：
```
https://intimate-elegance-xxxx.vercel.app
```

或者访问主域名：
```
https://intimate-elegance.vercel.app
```

### 3.2 测试功能

打开网站后，测试：

**基础功能：**
- [ ] 首页加载正常
- [ ] 点击导航菜单
- [ ] 查看产品页面
- [ ] 点击产品详情

**购物车功能：**
- [ ] 点击 "Add to Cart"
- [ ] 查看购物车徽章数字变化
- [ ] 进入购物车页面
- [ ] 调整商品数量
- [ ] 进入结账页面

**响应式设计：**
- [ ] 缩小浏览器窗口测试
- [ ] 在手机上打开测试

---

## 🎨 第四步：自定义（可选）

### 4.1 更改项目名称

如果想改域名：

1. Vercel 项目页面 → Settings
2. 左侧 "General"
3. "Project Name" 修改
4. 新域名：`https://新名称.vercel.app`

### 4.2 添加自定义域名

如果你有自己的域名：

1. Vercel 项目 → Settings → Domains
2. 点击 "Add"
3. 输入域名（如 `intimate-elegance.com`）
4. 按照提示配置 DNS

---

## 🔄 第五步：更新网站

以后修改代码后，只需：

```bash
# 1. 添加修改
git add .

# 2. 提交修改
git commit -m "更新说明"

# 3. 推送到 GitHub
git push
```

**Vercel 会自动检测并重新部署！** 30秒内完成。

---

## 🎯 快速命令参考

### 首次部署
```bash
git remote add origin https://github.com/你的用户名/intimate-elegance.git
git branch -M main
git push -u origin main
```

### 后续更新
```bash
git add .
git commit -m "更新内容"
git push
```

### 使用部署脚本（Windows）
```bash
deploy.bat "更新说明"
```

---

## 🆘 遇到问题？

### 问题 1: Git 推送失败

**错误信息：** `Permission denied` 或 `Authentication failed`

**解决方案：**
1. 使用 Personal Access Token（见上面 1.3 节）
2. 或者使用 SSH 密钥

### 问题 2: Vercel 找不到仓库

**解决方案：**
1. 点击 "Adjust GitHub App Permissions"
2. 授权 Vercel 访问所有仓库
3. 刷新页面

### 问题 3: 部署失败

**解决方案：**
1. 查看 Vercel 部署日志
2. 确认所有文件已推送到 GitHub
3. 检查 `vercel.json` 文件语法

### 问题 4: 网站显示 404

**解决方案：**
1. 访问完整路径：`/index.html`
2. 等待 2-3 分钟让 DNS 生效
3. 清除浏览器缓存

---

## ✅ 完成检查清单

- [ ] GitHub 仓库已创建
- [ ] 代码已推送到 GitHub
- [ ] Vercel 账号已创建
- [ ] 项目已导入到 Vercel
- [ ] 部署成功
- [ ] 网站可以访问
- [ ] 所有功能正常
- [ ] 已分享给朋友测试

---

## 🎉 恭喜！

你的网站已经成功上线了！

**你的网站地址：**
```
https://intimate-elegance.vercel.app
```

**接下来可以做：**
1. ✅ 分享链接给朋友
2. ✅ 添加真实产品图片
3. ✅ 设置自定义域名
4. ✅ 添加 Google Analytics
5. ✅ 继续完善功能

---

## 📞 需要更多帮助？

- 📖 查看 VERCEL-DEPLOY.md 详细文档
- 🌐 访问 Vercel 文档：https://vercel.com/docs
- 💬 Vercel 社区：https://github.com/vercel/vercel/discussions

---

**祝你部署顺利！** 🚀

有任何问题随时查看文档或寻求帮助。
