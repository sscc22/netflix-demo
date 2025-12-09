@echo off

echo Building project...
call npm run build

echo Deploying to GitHub Pages...
cd dist

git init
git add -A
git commit -m "deploy"

REM YOUR_USERNAME를 본인의 GitHub 사용자명으로 변경하세요
git push -f https://github.com/YOUR_USERNAME/netflix-demo.git main:gh-pages

cd ..

echo Deployment complete!
pause
