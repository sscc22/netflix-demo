# Netflix Demo 프로젝트

## 빠른 시작 가이드

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 http://localhost:5173 으로 접속

### 3. 프로덕션 빌드
```bash
npm run build
```

### 4. 빌드 미리보기
```bash
npm run preview
```

## TMDB API Key 발급 방법

1. https://www.themoviedb.org 접속
2. 회원가입 후 로그인
3. Settings > API로 이동
4. API Key 발급
5. 애플리케이션 회원가입 시 비밀번호로 사용

## 주의사항

- node_modules 폴더는 제출하지 않습니다
- package.json은 반드시 포함해야 합니다
- npm install이 정상적으로 실행되는지 확인하세요
- TMDB API Key 없이는 영화 데이터를 불러올 수 없습니다

## 문제 해결

### npm install 실패 시
```bash
# 캐시 정리
npm cache clean --force

# 재설치
npm install
```

### 포트 충돌 시
vite.config.js에서 포트 변경:
```javascript
export default defineConfig({
  server: {
    port: 3000  // 원하는 포트로 변경
  }
})
```

## 지원

문제가 발생하면 이슈를 등록해주세요.
