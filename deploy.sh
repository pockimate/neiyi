#!/bin/bash

# Intimate Elegance - 快速部署脚本
# 使用方法: ./deploy.sh "你的提交信息"

echo "🚀 开始部署 Intimate Elegance..."
echo ""

# 检查是否提供了提交信息
if [ -z "$1" ]; then
    COMMIT_MSG="Update website"
else
    COMMIT_MSG="$1"
fi

# 添加所有更改
echo "📦 添加文件..."
git add .

# 提交更改
echo "💾 提交更改: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# 推送到远程仓库
echo "⬆️  推送到 GitHub..."
git push

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 你的网站将在几分钟内更新"
echo "   GitHub Pages: https://YOUR-USERNAME.github.io/intimate-elegance/"
echo ""
echo "💡 提示: 首次部署需要在 GitHub 仓库设置中启用 Pages"
