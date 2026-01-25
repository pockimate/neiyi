@echo off
REM Intimate Elegance - Windows 快速部署脚本
REM 使用方法: deploy.bat "你的提交信息"

echo.
echo ========================================
echo   Intimate Elegance - 快速部署
echo ========================================
echo.

REM 检查是否提供了提交信息
if "%~1"=="" (
    set COMMIT_MSG=Update website
) else (
    set COMMIT_MSG=%~1
)

REM 添加所有更改
echo [1/3] 添加文件...
git add .

REM 提交更改
echo [2/3] 提交更改: %COMMIT_MSG%
git commit -m "%COMMIT_MSG%"

REM 推送到远程仓库
echo [3/3] 推送到 GitHub...
git push

echo.
echo ========================================
echo   部署完成！
echo ========================================
echo.
echo 你的网站将在几分钟内更新
echo GitHub Pages: https://YOUR-USERNAME.github.io/intimate-elegance/
echo.
echo 提示: 首次部署需要在 GitHub 仓库设置中启用 Pages
echo.
pause
