# ✅ 완료! API Key 환경 변수로 관리

## 🎉 변경 완료 사항

### ✨ 주요 변경점

**이전 (복잡함):**
- 사용자가 매번 API Key 입력 필요
- 로그인할 때마다 API Key 입력
- 암호화/복호화 로직 필요

**지금 (간단함):**
- ✅ `.env` 파일에 API Key 한 번만 설정
- ✅ 로그인 시 이메일/비밀번호만 입력
- ✅ API Key는 내부적으로 자동 사용
- ✅ GitHub에 API Key 노출 안 됨

---

## 🔑 설정 방법 (1분)

### 1. .env 파일 수정

파일 위치: `C:\Users\User\Desktop\webProject\netflix-demo\.env`

```env
VITE_TMDB_API_KEY=여기에_발급받은_API_Key_붙여넣기
```

**예시:**
```env
VITE_TMDB_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 2. 서버 실행/재시작

```bash
cd C:\Users\User\Desktop\webProject\netflix-demo
npm install
npm run dev
```

### 3. 회원가입/로그인

```
브라우저에서 http://localhost:5173 접속

회원가입:
- Email: test@example.com
- Password: test123
- Confirm Password: test123
- 약관 동의 체크

로그인:
- Email: test@example.com
- Password: test123
```

### 4. 완료! 🎉

영화 데이터가 자동으로 표시됩니다!

---

## 📁 변경된 파일들

### 1. 환경 변수 파일
- ✅ `.env` - API Key 저장 (Git 제외됨)
- ✅ `.env.example` - 예시 파일 (GitHub에 올림)

### 2. 수정된 파일
- ✅ `src/utils/tmdbAPI.js` - 환경 변수에서 API Key 가져오기
- ✅ `src/utils/Authentication.js` - 간단한 로그인으로 복원
- ✅ `src/pages/SignIn.jsx` - API Key 입력란 제거
- ✅ `src/pages/SignIn.css` - 스타일 정리
- ✅ `.github/workflows/deploy.yml` - GitHub Secrets 사용

### 3. 삭제된 파일
- ❌ `src/utils/encryption.js` - 더 이상 불필요

### 4. 새 가이드 문서
- ✅ `ENV_SETUP.md` - 환경 변수 설정 가이드

---

## 🔒 보안

### GitHub에 올려도 안전

`.gitignore`에 이미 포함되어 있음:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 확인 방법

```bash
git status
```

`.env` 파일이 목록에 나타나지 않으면 OK!

---

## 🚀 GitHub Pages 배포

### 배포 전 필수 작업

**GitHub Secrets 설정:**

1. GitHub Repository 접속
2. **Settings** > **Secrets and variables** > **Actions**
3. **New repository secret** 클릭
4. 입력:
   - Name: `VITE_TMDB_API_KEY`
   - Value: [발급받은 API Key 붙여넣기]
5. **Add secret** 클릭

### 배포

```bash
git add .
git commit -m "feat: Add Netflix demo with env variables"
git push origin main
```

자동으로 빌드 및 배포됩니다!

---

## 🧪 테스트

### 로컬 테스트

1. **API Key 설정 확인**
```bash
# .env 파일 열기
notepad .env

# API Key가 있는지 확인
VITE_TMDB_API_KEY=a1b2c3d4e5...
```

2. **서버 실행**
```bash
npm run dev
```

3. **브라우저에서 확인**
   - 로그인 후 메인 페이지 접속
   - 영화 포스터가 보이는지 확인
   - Popular, Search, Wishlist 페이지 테스트

### 배포 테스트

1. GitHub Pages URL 접속
2. 회원가입/로그인
3. 모든 페이지 작동 확인
4. 모바일에서도 테스트

---

## 📋 체크리스트

배포 전:

- [ ] TMDB API Key 발급 완료
- [ ] `.env` 파일에 API Key 추가
- [ ] 로컬에서 테스트 완료 (`npm run dev`)
- [ ] 모든 페이지 작동 확인
- [ ] GitHub Secrets 설정 완료
- [ ] `.env` 파일이 Git에서 제외되는지 확인
- [ ] 코드 커밋 및 푸시

배포 후:

- [ ] GitHub Actions 빌드 성공 확인
- [ ] 배포된 사이트 접속 확인
- [ ] 회원가입/로그인 테스트
- [ ] 영화 데이터 로딩 확인
- [ ] 모바일 반응형 확인
- [ ] 모든 기능 테스트

---

## 🎯 작동 원리

### 개발 환경 (Local)

```
.env 파일
    ↓
npm run dev 실행
    ↓
Vite가 환경 변수 읽음
    ↓
import.meta.env.VITE_TMDB_API_KEY
    ↓
TMDB API 호출
    ↓
영화 데이터 표시
```

### 배포 환경 (GitHub Pages)

```
GitHub Secrets
    ↓
GitHub Actions 실행
    ↓
빌드 시 환경 변수 주입
    ↓
정적 파일 생성 (dist/)
    ↓
GitHub Pages 배포
    ↓
사용자가 접속
    ↓
영화 데이터 표시
```

---

## ❗ 중요 사항

### 1. 환경 변수 이름
- ✅ `VITE_TMDB_API_KEY` (정확히 이렇게!)
- ❌ `TMDB_API_KEY` (작동 안 됨)
- **Vite는 `VITE_` 접두사 필수!**

### 2. 서버 재시작
- 환경 변수 변경 후 **반드시** 서버 재시작
- `Ctrl+C` → `npm run dev`

### 3. GitHub Secrets
- Secret 이름: `VITE_TMDB_API_KEY` (정확히!)
- 대소문자 구분
- 공백 없이 입력

### 4. .env 파일 절대 공유 금지
- ❌ GitHub에 커밋하지 마세요
- ❌ Discord/카카오톡에 공유하지 마세요
- ❌ 스크린샷에 포함하지 마세요

---

## 🆘 문제 해결

### 영화 데이터가 안 나와요

**원인 1: API Key 설정 안 됨**
```bash
# .env 파일 확인
notepad .env

# API Key가 있는지 확인
VITE_TMDB_API_KEY=...
```

**원인 2: 서버 재시작 안 함**
```bash
# 서버 종료 후 재시작
Ctrl+C
npm run dev
```

**원인 3: API Key가 틀림**
- TMDB 웹사이트에서 API Key 재확인
- 공백 없이 정확히 복사

### GitHub Pages에서 API Key 오류

**원인: GitHub Secrets 설정 안 됨**

해결:
1. Settings > Secrets and variables > Actions
2. VITE_TMDB_API_KEY 확인
3. 없으면 추가

### .env 파일이 Git에 올라가요

**원인: .gitignore가 작동 안 함**

해결:
```bash
# 이미 추가된 .env 제거
git rm --cached .env

# 다시 커밋
git commit -m "fix: Remove .env from git"
git push
```

---

## 📚 참고 문서

- **ENV_SETUP.md** - 환경 변수 상세 가이드
- **DEPLOYMENT_GUIDE.md** - 배포 가이드
- **README.md** - 프로젝트 설명

---

## 🎊 완료!

이제 API Key를 한 번만 설정하면 편리하게 사용할 수 있습니다!

**로컬에서**: `.env` 파일에 한 번만 설정
**배포 시**: GitHub Secrets에 한 번만 설정

더 이상 매번 API Key를 입력할 필요가 없습니다! 🎉
