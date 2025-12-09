# 🚀 GitHub Pages 배포 완벽 가이드

## 준비사항
- GitHub 계정
- Git 설치
- 프로젝트 빌드 확인 (`npm run build`가 성공적으로 실행되는지 확인)

---

## 방법 1: GitHub Actions 자동 배포 (권장) ⭐

### 1단계: GitHub 저장소 생성

1. GitHub에서 새 저장소 생성
   - 저장소 이름: `netflix-demo` (또는 원하는 이름)
   - Public으로 설정
   - README, .gitignore, license는 추가하지 않음

### 2단계: vite.config.js 확인 및 수정

**중요:** `base` 경로를 저장소 이름과 일치시켜야 합니다!

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/netflix-demo/'  // 저장소 이름으로 변경!
})
```

저장소 이름이 `my-movie-app`이라면:
```javascript
base: '/my-movie-app/'
```

### 3단계: 코드 업로드

```bash
# 터미널 또는 Git Bash에서 실행

# 1. 프로젝트 폴더로 이동
cd C:\Users\User\Desktop\webProject\netflix-demo

# 2. Git 초기화
git init

# 3. 모든 파일 추가
git add .

# 4. 첫 커밋
git commit -m "feat: Initial commit - Netflix demo project"

# 5. 기본 브랜치를 main으로 설정
git branch -M main

# 6. GitHub 저장소 연결 (YOUR_USERNAME을 본인 GitHub ID로 변경!)
git remote add origin https://github.com/YOUR_USERNAME/netflix-demo.git

# 7. GitHub에 푸시
git push -u origin main
```

### 4단계: GitHub Pages 설정

1. GitHub 저장소 페이지로 이동
2. 상단 메뉴에서 **Settings** 클릭
3. 왼쪽 사이드바에서 **Pages** 클릭
4. **Source** 섹션에서:
   - **GitHub Actions** 선택
5. 자동으로 workflow가 실행됩니다!

### 5단계: 배포 확인

- Actions 탭에서 배포 진행 상황 확인
- 성공하면 초록색 체크마크 표시
- 배포 완료까지 약 1-3분 소요

**배포 URL:**
```
https://YOUR_USERNAME.github.io/netflix-demo/
```

---

## 방법 2: 수동 배포 (GitHub Actions가 안 될 경우)

### 1단계: 수동 배포 스크립트 사용

#### Windows 사용자:
```bash
# deploy.bat 파일 수정
# YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경

# 실행
deploy.bat
```

#### Mac/Linux 사용자:
```bash
# deploy.sh 실행 권한 부여
chmod +x deploy.sh

# deploy.sh 파일 수정
# YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경

# 실행
./deploy.sh
```

### 2단계: GitHub Pages 설정 (수동 배포용)

1. GitHub 저장소 > Settings > Pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** 선택, **/ (root)** 선택
4. Save 클릭

**배포 URL:**
```
https://YOUR_USERNAME.github.io/netflix-demo/
```

---

## 문제 해결 🔧

### ❌ 404 페이지가 나올 때

**원인:** `vite.config.js`의 `base` 경로가 잘못됨

**해결:**
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/저장소이름/'  // 저장소 이름과 정확히 일치해야 함!
})
```

수정 후:
```bash
git add .
git commit -m "fix: Update base path"
git push
```

### ❌ CSS/JS 파일이 로드되지 않을 때

**원인:** base 경로 문제

**해결:**
1. `vite.config.js`의 `base` 확인
2. `src/App.jsx`의 Router `basename` 확인:
```jsx
<Router basename="/netflix-demo">
```

### ❌ GitHub Actions가 실행되지 않을 때

**원인:** Workflow 권한 문제

**해결:**
1. Settings > Actions > General
2. **Workflow permissions**에서:
   - "Read and write permissions" 선택
   - "Allow GitHub Actions to create and approve pull requests" 체크
3. Save

### ❌ 라우팅이 작동하지 않을 때 (새로고침 시 404)

**원인:** GitHub Pages는 SPA 라우팅을 기본 지원하지 않음

**해결:** 404.html 추가

`public` 폴더에 `404.html` 생성:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Netflix Demo</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

---

## 배포 확인 체크리스트 ✅

- [ ] GitHub 저장소 생성 완료
- [ ] `vite.config.js`의 `base` 경로 수정 완료
- [ ] Git 초기화 및 코드 푸시 완료
- [ ] GitHub Pages 설정 완료
- [ ] Actions 탭에서 배포 성공 확인
- [ ] 배포 URL 접속하여 작동 확인
- [ ] 모든 페이지 라우팅 작동 확인
- [ ] 모바일 반응형 확인

---

## 배포 후 업데이트 방법

### GitHub Actions 사용 시:
```bash
# 코드 수정 후
git add .
git commit -m "feat: Add new feature"
git push

# 자동으로 재배포됨!
```

### 수동 배포 사용 시:
```bash
# Windows
deploy.bat

# Mac/Linux
./deploy.sh
```

---

## 유용한 명령어 모음

```bash
# 로컬 빌드 테스트
npm run build
npm run preview

# Git 상태 확인
git status

# 원격 저장소 확인
git remote -v

# 최근 커밋 확인
git log --oneline

# 브랜치 확인
git branch -a
```

---

## 참고 사항

1. **첫 배포는 2-3분 소요**됩니다
2. **무료 계정은 Public 저장소만** GitHub Pages 사용 가능
3. **HTTPS가 자동 적용**됩니다
4. **커스텀 도메인 연결** 가능 (Settings > Pages > Custom domain)

---

## 도움이 필요하신가요?

- GitHub Actions 로그: Repository > Actions > 최근 workflow 클릭
- 에러 메시지 확인: 빨간색 X 표시 클릭 > 로그 확인
- GitHub Pages 상태: Settings > Pages에서 확인

배포 성공을 기원합니다! 🎉
