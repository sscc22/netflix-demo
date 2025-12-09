#!/usr/bin/env sh

# 오류 발생 시 중단
set -e

# 빌드
npm run build

# 빌드 출력 디렉토리로 이동
cd dist

# 배포를 위한 git 초기화
git init
git add -A
git commit -m 'deploy'

# GitHub Pages에 배포
# YOUR_USERNAME를 본인의 GitHub 사용자명으로 변경하세요
git push -f git@github.com:YOUR_USERNAME/netflix-demo.git main:gh-pages

cd -
