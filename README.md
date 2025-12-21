# Netflix Demo - Movie Discovery Web Application

![Netflix Demo](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange)
![License](https://img.shields.io/badge/license-MIT-green)

Netflix와 유사한 영화 검색 및 관리 웹 애플리케이션입니다. TMDB API와 Firebase를 활용하여 실시간 영화 정보 및 사용자별 위시리스트를 제공합니다.

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/sscc22/netflix-demo.git
cd netflix-demo
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정

`.env` 파일 생성 및 설정:

```env
# TMDB API Key
VITE_TMDB_API_KEY=your_tmdb_api_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**설정 가이드:**
- TMDB API: `ENV_SETUP.md` 참조
- Firebase: `FIREBASE_SETUP.md` 참조

### 4. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 http://localhost:5173 접속

## 🎬 주요 기능

### 🔐 사용자 인증
- **Google 로그인**: Firebase Authentication
- **자동 로그인 유지**: 세션 관리
- **보안**: Firebase 보안 규칙 적용

### 🎥 영화 탐색
- **인기 영화**: Popular, Now Playing, Top Rated, Upcoming
- **제목 검색**: 실시간 영화 검색
- **고급 필터링**: 장르, 평점, 정렬 옵션
- **무한 스크롤**: 끊김 없는 영화 탐색

### ❤️ 위시리스트
- **개인 위시리스트**: 사용자별 저장 (Firestore)
- **실시간 동기화**: 모든 기기에서 동기화
- **즉시 반영**: 추가/제거 즉시 업데이트

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 완벽 지원
- 터치 이벤트 최적화
- 햄버거 메뉴 (모바일)

## 🛠 기술 스택

### Frontend
- **React 18.3.1** - UI 프레임워크
- **React Router DOM 6.26.1** - SPA 라우팅
- **Vite 5.4.2** - 빌드 도구
- **Axios 1.7.7** - HTTP 클라이언트

### Backend Services
- **Firebase Authentication** - Google 로그인
- **Cloud Firestore** - 위시리스트 저장
- **TMDB API** - 영화 데이터

### Styling
- **CSS3** - 커스텀 스타일
- **CSS Animations** - 부드러운 트랜지션
- **Font Awesome 6.4.0** - 아이콘

## 📁 프로젝트 구조

```
netflix-demo/
├── .github/workflows/     # GitHub Actions
├── public/               # 정적 파일
├── src/
│   ├── components/       # React 컴포넌트
│   │   ├── Header.jsx
│   │   └── MovieCard.jsx
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── SignIn.jsx
│   │   ├── Home.jsx
│   │   ├── Popular.jsx
│   │   ├── Search.jsx
│   │   └── Wishlist.jsx
│   ├── utils/           # 유틸리티 함수
│   │   ├── firebaseAuth.js
│   │   ├── firebaseWishlist.js
│   │   └── tmdbAPI.js
│   ├── config/          # 설정 파일
│   │   └── firebase.js
│   └── styles/          # 전역 스타일
├── .env                 # 환경 변수
├── .env.example         # 환경 변수 예시
└── package.json
```

## 🎨 페이지

| 경로 | 설명 | 기능 |
|------|------|------|
| `/signin` | 로그인 | Google 로그인 |
| `/` | 메인 | 4개 카테고리 영화 |
| `/popular` | 인기 영화 | 무한 스크롤/페이지네이션 |
| `/search` | 검색 | 제목 검색, 필터링 |
| `/wishlist` | 위시리스트 | 내가 찜한 영화 |

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

### GitHub Pages 배포

1. **Firebase 프로젝트 설정** (`FIREBASE_SETUP.md` 참조)

2. **GitHub Secrets 설정**
   - Repository > Settings > Secrets and variables > Actions
   - 필요한 Secrets 추가:
     - `VITE_TMDB_API_KEY`
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`

3. **Firebase 승인 도메인 추가**
   - Firebase Console > Authentication > Settings
   - 승인된 도메인에 `yourusername.github.io` 추가

4. **코드 푸시**
```bash
git add .
git commit -m "feat: Add Firebase authentication and wishlist"
git push origin main
```

자세한 내용은 `DEPLOYMENT_GUIDE.md` 참조

## 📝 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `VITE_TMDB_API_KEY` | TMDB API 키 | ✅ |
| `VITE_FIREBASE_API_KEY` | Firebase API 키 | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase 인증 도메인 | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID | ✅ |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase 스토리지 버킷 | ✅ |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase 메시징 Sender ID | ✅ |
| `VITE_FIREBASE_APP_ID` | Firebase 앱 ID | ✅ |

## 🔒 보안

- ✅ Firebase Authentication으로 안전한 로그인
- ✅ Firestore 보안 규칙으로 데이터 보호
- ✅ 환경 변수는 Git에서 제외 (.gitignore)
- ✅ GitHub Secrets로 배포 시 환경 변수 관리

## 🗃️ 데이터베이스 구조

### Firestore - wishlists 컬렉션

```javascript
{
  // 문서 ID: userId_movieId
  "userId": "google_user_id_123",
  "movieId": 12345,
  "title": "Avengers: Endgame",
  "poster_path": "/path/to/poster.jpg",
  "vote_average": 8.3,
  "release_date": "2019-04-24",
  "overview": "Movie description...",
  "addedAt": "2024-12-17T10:30:00.000Z"
}
```

## 📱 반응형 디자인

- **모바일**: < 480px
- **태블릿**: 480px - 768px
- **데스크톱**: > 768px

## 🎯 Git Flow

- `main` - 프로덕션 배포
- `develop` - 개발
- `feature/*` - 기능 개발

## 🆘 문제 해결

### Firebase 인증 오류
- Firebase Console에서 Google 인증 활성화 확인
- 승인된 도메인에 현재 도메인 추가

### Firestore 권한 오류
- Firestore 보안 규칙 확인 (`FIREBASE_SETUP.md` 참조)

### 환경 변수 오류
- `.env` 파일 존재 및 내용 확인
- 서버 재시작 (`Ctrl+C` → `npm run dev`)

자세한 내용은 각 설정 가이드 참조:
- `ENV_SETUP.md` - TMDB API 설정
- `FIREBASE_SETUP.md` - Firebase 설정
- `DEPLOYMENT_GUIDE.md` - 배포 가이드

## 📄 라이선스

MIT License

## 👨‍💻 개발자

- **이름**: [Your Name]
- **학번**: [Your Student ID]
- **이메일**: [Your Email]

## 🙏 감사의 말

- [TMDB](https://www.themoviedb.org) - 영화 데이터
- [Firebase](https://firebase.google.com) - 인증 및 데이터베이스
- [Font Awesome](https://fontawesome.com) - 아이콘
- [React](https://react.dev) - UI 프레임워크

---

⭐ Star를 눌러주시면 큰 힘이 됩니다!
