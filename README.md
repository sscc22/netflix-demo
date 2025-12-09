# Netflix Demo - Movie Discovery Web Application

![Netflix Demo](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![License](https://img.shields.io/badge/license-MIT-green)

Netflix와 유사한 영화 검색 및 관리 웹 애플리케이션입니다. TMDB API를 활용하여 실시간 영화 정보를 제공합니다.

## 🎬 주요 기능

- **사용자 인증**: 회원가입/로그인 시스템 (TMDB API Key 사용)
- **영화 탐색**: 인기, 현재 상영작, 최고 평점, 개봉 예정 영화 카테고리
- **고급 검색**: 장르별 필터링, 평점별 정렬, 다양한 정렬 옵션
- **위시리스트**: 좋아하는 영화를 저장하고 관리
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **무한 스크롤 & 페이지네이션**: 두 가지 뷰 모드 지원
- **CSS 애니메이션**: 부드러운 트랜지션 및 인터랙티브 효과

## 🛠 기술 스택

### Frontend Framework
- **React 18.3.1**: 컴포넌트 기반 UI 개발
- **React Router DOM 6.26.1**: SPA 라우팅
- **Vite 5.4.2**: 빠른 개발 서버 및 빌드 도구

### 스타일링
- **CSS3**: 커스텀 스타일링 및 애니메이션
- **Font Awesome 6.4.0**: 아이콘 라이브러리
- **반응형 디자인**: Media Queries 활용

### API & 데이터 관리
- **Axios 1.7.7**: HTTP 클라이언트
- **TMDB API**: 영화 데이터 소스
- **Local Storage**: 사용자 데이터 및 위시리스트 저장

## 📁 프로젝트 구조

```
netflix-demo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 배포 설정
├── src/
│   ├── components/
│   │   ├── Header.jsx          # 네비게이션 헤더
│   │   ├── Header.css
│   │   ├── MovieCard.jsx       # 영화 카드 컴포넌트
│   │   └── MovieCard.css
│   ├── pages/
│   │   ├── SignIn.jsx          # 로그인/회원가입 페이지
│   │   ├── SignIn.css
│   │   ├── Home.jsx            # 메인 페이지
│   │   ├── Home.css
│   │   ├── Popular.jsx         # 인기 영화 페이지
│   │   ├── Popular.css
│   │   ├── Search.jsx          # 검색/필터링 페이지
│   │   ├── Search.css
│   │   ├── Wishlist.jsx        # 위시리스트 페이지
│   │   └── Wishlist.css
│   ├── utils/
│   │   ├── Authentication.js   # 인증 관련 유틸리티
│   │   ├── tmdbAPI.js          # TMDB API 호출 함수
│   │   └── wishlist.js         # 위시리스트 관리
│   ├── styles/
│   │   └── global.css          # 전역 스타일
│   ├── App.jsx                 # 메인 앱 컴포넌트
│   └── main.jsx                # 엔트리 포인트
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/netflix-demo.git

# 프로젝트 디렉토리로 이동
cd netflix-demo

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

## 🔑 TMDB API Key 발급

1. [TMDB 웹사이트](https://www.themoviedb.org)에 가입
2. 계정 설정 > API로 이동
3. API Key 신청 및 발급
4. 회원가입 시 비밀번호로 API Key 사용

## 💾 Local Storage 사용

애플리케이션은 다음 데이터를 Local Storage에 저장합니다:

- `users`: 사용자 계정 정보 (이메일, 비밀번호)
- `TMDb-Key`: 현재 사용자의 TMDB API Key
- `currentUser`: 현재 로그인한 사용자 이메일
- `rememberMe`: 자동 로그인 설정
- `movieWishlist`: 사용자의 위시리스트 영화 목록

## 🎨 주요 CSS 애니메이션

- **페이지 전환**: Fade-in, Slide 효과
- **카드 호버**: Scale, Transform 효과
- **로그인/회원가입 전환**: 3D Rotation 효과
- **무한 스크롤**: Smooth Loading 효과
- **버튼 인터랙션**: Hover, Active 상태 애니메이션

## 📱 반응형 디자인 브레이크포인트

- **모바일**: < 480px
- **태블릿**: 480px - 768px
- **데스크톱**: > 768px

## 🌐 배포

### GitHub Pages 자동 배포

1. GitHub Repository Settings > Pages
2. Source: GitHub Actions 선택
3. main 브랜치에 push하면 자동 배포

### 수동 배포

```bash
npm run build
# dist 폴더의 내용을 호스팅 서비스에 업로드
```

## 🔒 Git Flow 브랜치 전략

- `main`: 프로덕션 배포 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `hotfix/*`: 긴급 수정 브랜치

## 📝 커밋 메시지 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드
chore: 빌드 업무, 패키지 매니저 설정
```

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👨‍💻 개발자

- **이름**: [Your Name]
- **학번**: [Your Student ID]
- **이메일**: [Your Email]

## 🙏 감사의 말

- [TMDB](https://www.themoviedb.org) - 영화 데이터 제공
- [Font Awesome](https://fontawesome.com) - 아이콘 제공
- [React](https://react.dev) - UI 프레임워크

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 등록해주세요.

---

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!
