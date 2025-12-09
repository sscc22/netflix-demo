# 🎯 빠른 배포 명령어 (복사해서 실행하세요!)

## ⚠️ 시작하기 전에

1. GitHub에서 새 저장소 생성: https://github.com/new
   - 저장소 이름: `netflix-demo` (또는 원하는 이름)
   - Public으로 설정
   - README, .gitignore, license 추가하지 않음

2. vite.config.js에서 base 경로 확인
   - 저장소 이름이 `netflix-demo`면 그대로 사용
   - 다른 이름이면 수정 필요!

---

## 📝 명령어 (순서대로 실행)

### 1. 프로젝트 폴더로 이동
```bash
cd C:\Users\User\Desktop\webProject\netflix-demo
```

### 2. Git 초기화
```bash
git init
```

### 3. 모든 파일 추가
```bash
git add .
```

### 4. 첫 커밋
```bash
git commit -m "feat: Initial commit - Netflix demo project"
```

### 5. 메인 브랜치 설정
```bash
git branch -M main
```

### 6. GitHub 저장소 연결
**⚠️ YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경!**
```bash
git remote add origin https://github.com/YOUR_USERNAME/netflix-demo.git
```

예시:
```bash
git remote add origin https://github.com/john-doe/netflix-demo.git
```

### 7. GitHub에 푸시
```bash
git push -u origin main
```

### 8. GitHub Pages 설정 (웹에서)
1. https://github.com/YOUR_USERNAME/netflix-demo 접속
2. Settings 탭 클릭
3. 왼쪽 메뉴에서 Pages 클릭
4. Source: **GitHub Actions** 선택
5. 완료!

### 9. 배포 확인
- Actions 탭에서 배포 진행 상황 확인
- 1-3분 후 배포 완료
- 배포 URL: `https://YOUR_USERNAME.github.io/netflix-demo/`

---

## 🔧 vite.config.js 수정이 필요한 경우

저장소 이름이 `netflix-demo`가 아니라면:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPOSITORY_NAME/'  // 여기를 저장소 이름으로 변경!
})
```

수정 후:
```bash
git add vite.config.js
git commit -m "fix: Update base path"
git push
```

---

## 🎉 배포 성공 후

배포된 사이트 주소:
```
https://YOUR_USERNAME.github.io/netflix-demo/
```

이 주소를 link.pdf에 기록하세요!

---

## 🆘 문제가 생겼을 때

### Git 인증 오류
GitHub에서 Personal Access Token 필요:
1. GitHub > Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. repo 권한 선택
4. 생성된 토큰을 비밀번호 대신 사용

### 404 오류
1. vite.config.js의 base 경로 확인
2. Settings > Pages에서 Source가 GitHub Actions인지 확인

### Actions 실행 안됨
1. Settings > Actions > General
2. Workflow permissions: "Read and write permissions" 선택
3. Save

---

## 📱 모바일 테스트

배포 완료 후:
1. 스마트폰으로 배포 URL 접속
2. 화면 녹화 또는 스크린샷
3. mobile.mp4로 저장

---

## 🔄 업데이트 방법

코드 수정 후:
```bash
git add .
git commit -m "feat: 수정 내용"
git push
```

자동으로 재배포됩니다!
