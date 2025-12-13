# GitHub Secrets 설정 가이드

## 🔑 GitHub Secrets 설정 (필수!)

### 1단계: Secrets 페이지 접속
```
https://github.com/sscc22/netflix-demo/settings/secrets/actions
```

### 2단계: 기존 Secret 삭제 (있다면)
- `VITE_TMDB_API_KEY` 옆의 "Remove" 클릭

### 3단계: 새로 추가
1. **"New repository secret"** 클릭
2. **Name:** `VITE_TMDB_API_KEY` (정확히!)
3. **Secret:** [TMDB API Key 붙여넣기]
4. **"Add secret"** 클릭

### 4단계: 재배포
```bash
git commit --allow-empty -m "fix: Trigger redeploy with secrets"
git push origin main
```

---

## ✅ 확인 방법

배포된 사이트에서 F12 > Console:

```javascript
// 오류 메시지 확인
// "API Key not configured" 라고 나오면 Secret 설정 안 된 것
```

---

## 🎯 체크리스트

- [ ] Secret 이름: `VITE_TMDB_API_KEY` (정확히!)
- [ ] API Key 값이 올바른지 확인
- [ ] 재배포 완료
- [ ] Actions에서 빌드 성공 확인
- [ ] 배포된 사이트에서 영화 데이터 확인