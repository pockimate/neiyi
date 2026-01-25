@echo off
chcp 65001 >nul
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     Intimate Elegance - 自动部署到 GitHub 和 Vercel         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM 检查 Git 是否安装
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未检测到 Git，请先安装 Git
    echo    下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git 已安装
echo.

REM 获取 GitHub 用户名
set /p GITHUB_USERNAME="请输入你的 GitHub 用户名: "
if "%GITHUB_USERNAME%"=="" (
    echo ❌ 错误: 用户名不能为空
    pause
    exit /b 1
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   第 1 步: 准备推送到 GitHub
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM 检查是否已有远程仓库
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
    echo ⚠️  检测到已存在的远程仓库
    set /p REMOVE_REMOTE="是否移除并重新配置? (y/n): "
    if /i "%REMOVE_REMOTE%"=="y" (
        git remote remove origin
        echo ✅ 已移除旧的远程仓库配置
    )
)

REM 添加远程仓库
echo.
echo 📝 配置远程仓库...
git remote add origin https://github.com/%GITHUB_USERNAME%/intimate-elegance.git
if errorlevel 1 (
    echo ⚠️  远程仓库可能已存在，尝试更新...
    git remote set-url origin https://github.com/%GITHUB_USERNAME%/intimate-elegance.git
)

echo ✅ 远程仓库配置完成
echo    仓库地址: https://github.com/%GITHUB_USERNAME%/intimate-elegance.git
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   第 2 步: 推送代码到 GitHub
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo 📤 正在推送代码...
echo.
echo ⚠️  重要提示:
echo    如果提示需要登录，请使用:
echo    - 用户名: %GITHUB_USERNAME%
echo    - 密码: 使用 Personal Access Token (不是 GitHub 密码)
echo.
echo    如何获取 Token:
echo    1. 访问: https://github.com/settings/tokens
echo    2. 点击 "Generate new token (classic)"
echo    3. 勾选 "repo" 权限
echo    4. 复制生成的 token 作为密码使用
echo.
pause

git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ 推送失败！
    echo.
    echo 💡 可能的原因:
    echo    1. GitHub 仓库不存在 - 请先访问 https://github.com/new 创建仓库
    echo    2. 认证失败 - 请使用 Personal Access Token
    echo    3. 网络问题 - 检查网络连接
    echo.
    echo 📖 详细步骤请查看 DEPLOY-HELPER.md
    pause
    exit /b 1
)

echo.
echo ✅ 代码已成功推送到 GitHub!
echo    查看仓库: https://github.com/%GITHUB_USERNAME%/intimate-elegance
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   第 3 步: 部署到 Vercel
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo 🚀 现在需要在 Vercel 上部署...
echo.
echo 📝 请按照以下步骤操作:
echo.
echo    1. 打开浏览器访问: https://vercel.com
echo    2. 点击 "Sign Up" 或 "Login"
echo    3. 选择 "Continue with GitHub"
echo    4. 授权 Vercel 访问你的 GitHub
echo    5. 点击 "Add New..." → "Project"
echo    6. 找到并选择 "intimate-elegance" 仓库
echo    7. 点击 "Import"
echo    8. 保持默认设置，点击 "Deploy"
echo    9. 等待 30-60 秒完成部署
echo.
echo 🌐 部署完成后，你的网站地址将是:
echo    https://intimate-elegance.vercel.app
echo.

set /p OPEN_VERCEL="是否现在打开 Vercel 网站? (y/n): "
if /i "%OPEN_VERCEL%"=="y" (
    start https://vercel.com
)

echo.
set /p OPEN_GITHUB="是否打开 GitHub 仓库查看? (y/n): "
if /i "%OPEN_GITHUB%"=="y" (
    start https://github.com/%GITHUB_USERNAME%/intimate-elegance
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   ✅ 部署流程完成！
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📋 下一步:
echo    1. 在 Vercel 完成部署（按照上面的步骤）
echo    2. 访问你的网站测试功能
echo    3. 分享链接给朋友
echo.
echo 📖 详细文档:
echo    - VERCEL-DEPLOY.md - Vercel 部署详细指南
echo    - DEPLOY-HELPER.md - 分步部署助手
echo    - DEPLOYMENT.md - 完整部署文档
echo.
echo 🆘 遇到问题?
echo    查看文档或访问: https://vercel.com/docs
echo.
pause
