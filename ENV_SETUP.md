# 🔑 환경 변수 설정 가이드 (TMDB API Key)

## 📝 설정 방법

### 1. .env 파일에 API Key 추가

프로젝트 루트 폴더에 `.env` 파일이 있습니다:

```bash
C:\Users\User\Desktop\webProject\netflix-demo\.env
```

파일을 열고 다음과 같이 수정하세요:

```env
VITE_TMDB_API_KEY=여기에_발급받은_API_Key_붙여넣기
```

**예시:**
```env
VITE_TMDB_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 2. 서버 재시작

환경 변수를 변경했으면 개발 서버를 재시작해야 합니다:

```bash
# Ctrl+C로 서버 종료
npm run dev  # 서버 재시작
```

### 3. 완료!

이제 로그인만 하면 영화 데이터가 자동으로 표시됩니다!

---

## 🔒 보안

### GitHub에 올릴 때:

✅ **.env 파일은 자동으로 제외됨** (.gitignore에 포함)
✅ **API Key가 GitHub에 노출되지 않음**
❌ **절대로 .env 파일을 Git에 추가하지 마세요!**

### 확인 방법:

```bash
git status
```

`.env` 파일이 목록에 나타나지 않아야 합니다!

---

## 🚀 GitHub Pages 배포 시

### 문제:
GitHub Pages는 환경 변수를 지원하지 않습니다.

### 해결책 1: GitHub Secrets 사용 (권장)

1. **GitHub Repository > Settings > Secrets and variables > Actions**
2. **"New repository secret" 클릭**
3. **설정:**
   - Name: `VITE_TMDB_API_KEY`
   - Value: [발급받은 API Key]
4. **Save 클릭**

그러면 GitHub Actions가 자동으로 빌드 시 환경 변수를 주입합니다!

### 해결책 2: 빌드 시 직접 주입

`.github/workflows/deploy.yml` 수정:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_TMDB_API_KEY: ${{ secrets.VITE_TMDB_API_KEY }}
```

---

## 🧪 테스트

### 로컬에서 API Key 확인:

브라우저 콘솔(F12)에서:

```javascript
// API Key가 설정되었는지 확인
console.log('API Key exists:', !!import.meta.env.VITE_TMDB_API_KEY);
```

**예상 결과:**
```
API Key exists: true
```

---

## ❗ 주의사항

1. **Vite 환경 변수는 `VITE_` 접두사 필수**
   - ✅ `VITE_TMDB_API_KEY`
   - ❌ `TMDB_API_KEY` (작동 안 됨)

2. **환경 변수 변경 후 반드시 서버 재시작**

3. **.env 파일을 절대로 공유하지 마세요**

4. **빌드된 파일에는 API Key가 포함됨**
   - 하지만 난독화되어 있어 쉽게 확인 불가
   - 완벽한 보안은 서버 사이드에서만 가능

---

## 📄 파일 구조

```
netflix-demo/
├── .env                  # API Key 저장 (Git 제외됨)
├── .env.example         # 예시 파일 (GitHub에 올림)
├── .gitignore           # .env 제외 설정
└── src/
    └── utils/
        └── tmdbAPI.js   # 환경 변수 사용
```

---

## 🎯 빠른 체크리스트

- [ ] TMDB API Key 발급 완료
- [ ] `.env` 파일에 API Key 추가
- [ ] 개발 서버 재시작
- [ ] 로그인 후 영화 데이터 확인
- [ ] `git status`로 .env 제외 확인
- [ ] GitHub Secrets 설정 (배포 시)

완료! 🎉
