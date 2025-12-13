# Netflix Demo - Movie Discovery Web Application

![Netflix Demo](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![License](https://img.shields.io/badge/license-MIT-green)

Netflix와 유사한 영화 검색 및 관리 웹 애플리케이션입니다. TMDB API를 활용하여 실시간 영화 정보를 제공합니다.

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/netflix-demo.git
cd netflix-demo
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env` 파일에 TMDB API Key 추가:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

**TMDB API Key 발급:**
1. https://www.themoviedb.org 회원가입
2. Settings > API > Request an API Key
3. Developer 선택 후 정보 입력
4. API Key 복사

### 4. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 http://localhost:5173 접속

### 5. 회원가입 및 로그인
```
Email: test@example.com
Password: test123
```

## 🎬 주요 기능

- **사용자 인증**: 간단한 회원가입/로그인 시스템
- **영화 탐색**: 인기, 현재 상영작, 최고 평점, 개봉 예정 영화
- **고급 검색**: 장르별 필터링, 평점별 정렬
- **위시리스트**: 좋아하는 영화 저장 및 관리
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **무한 스크롤**: 끊김 없는 영화 탐색
- **부드러운 애니메이션**: CSS3 트랜지션 효과

## 🛠 기술 스택

- **React 18.3.1** - UI 프레임워크
- **React Router DOM 6.26.1** - SPA 라우팅
- **Vite 5.4.2** - 빌드 도구
- **Axios 1.7.7** - HTTP 클라이언트
- **TMDB API** - 영화 데이터
- **Local Storage** - 데이터 저장

## 📁 프로젝트 구조

```
netflix-demo/
├── .github/workflows/     # GitHub Actions
├── public/               # 정적 파일
├── src/
│   ├── components/       # React 컴포넌트
│   ├── pages/           # 페이지 컴포넌트
│   ├── utils/           # 유틸리티 함수
│   └── styles/          # 전역 스타일
├── .env                 # 환경 변수 (Git 제외)
├── .env.example         # 환경 변수 예시
└── package.json
```

## 🎨 페이지

- **/** - 메인 페이지 (4개 카테고리)
- **/popular** - 인기 영화
- **/search** - 검색 및 필터링
- **/wishlist** - 위시리스트
- **/signin** - 로그인/회원가입

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 🚀 배포

### GitHub Pages

1. **GitHub Secrets 설정**
   - Repository > Settings > Secrets and variables > Actions
   - New repository secret 클릭
   - Name: `VITE_TMDB_API_KEY`
   - Value: [발급받은 API Key]

2. **코드 푸시**
```bash
git add .
git commit -m "feat: Initial commit"
git push origin main
```

3. **GitHub Pages 설정**
   - Settings > Pages
   - Source: GitHub Actions

자세한 내용은 `DEPLOYMENT_GUIDE.md` 참조

## 📝 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `VITE_TMDB_API_KEY` | TMDB API 키 | ✅ |

## 🔒 보안

- ✅ `.env` 파일은 Git에서 제외됨
- ✅ API Key는 GitHub Secrets로 관리
- ✅ 환경 변수는 빌드 시에만 주입

**주의:** `.env` 파일을 절대 공유하거나 커밋하지 마세요!

## 📱 반응형 디자인

- **모바일**: < 480px
- **태블릿**: 480px - 768px
- **데스크톱**: > 768px

## 🎯 Git Flow

- `main` - 프로덕션 배포
- `develop` - 개발
- `feature/*` - 기능 개발

## 📄 라이선스

MIT License

## 👨‍💻 개발자

- **이름**: 김홍기
- **이메일**: ghdrl900@gmail.com

## 🙏 감사의 말

- [TMDB](https://www.themoviedb.org) - 영화 데이터
- [Font Awesome](https://fontawesome.com) - 아이콘
- [React](https://react.dev) - UI 프레임워크

---

⭐ Star를 눌러주시면 큰 힘이 됩니다!
