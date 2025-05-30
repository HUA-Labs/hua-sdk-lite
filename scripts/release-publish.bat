@echo off
set /p msg="Release commit message: "
for /f "delims=" %%i in ('node -p "require('./package.json').version"') do set VERSION=%%i
git add .
git commit -m "%msg%"
git tag v%VERSION%
git push origin main --tags
npm publish --access public
pause 