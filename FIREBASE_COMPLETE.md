# 🎉 Firebase 통합 완료!

## ✨ 구현된 기능

### 1. Google 로그인
- ✅ Firebase Authentication 연동
- ✅ Google OAuth 로그인
- ✅ 사용자 프로필 표시 (이름, 프로필 사진)
- ✅ 자동 로그인 유지

### 2. 사용자별 위시리스트
- ✅ Firestore Database 연동
- ✅ 실시간 데이터 동기화
- ✅ 사용자별 독립적인 위시리스트
- ✅ 모든 기기에서 동기화

### 3. 보안
- ✅ Firebase 보안 규칙 적용
- ✅ 본인 데이터만 접근 가능
- ✅ 인증된 사용자만 위시리스트 사용

---

## 🚀 시작하기

### 1단계: Firebase 프로젝트 생성 (필수!)

**중요:** 먼저 Firebase 프로젝트를 생성해야 합니다!

```
1. https://console.firebase.google.com 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: netflix-demo)
4. 프로젝트 생성 완료
```

자세한 내용: `FIREBASE_SETUP.md` 참조

### 2단계: Firebase 설정 정보 복사

1. Firebase Console > 프로젝트 설정 > 일반
2. "내 앱" 섹션에서 웹 앱 추가 (</>)
3. Firebase SDK 스니펫 복사

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "netflix-demo.firebaseapp.com",
  projectId: "netflix-demo",
  storageBucket: "netflix-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 3단계: .env 파일 설정

```env
# TMDB API
VITE_TMDB_API_KEY=87f58b2fd5477e14aae3aff6029ef584

# Firebase (위에서 복사한 값으로 교체!)
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=netflix-demo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=netflix-demo
VITE_FIREBASE_STORAGE_BUCKET=netflix-demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4단계: Firebase Authentication 활성화

1. Firebase Console > Authentication
2. "시작하기" 클릭
3. Sign-in method 탭
4. Google 제공업체 선택
5. 사용 설정 ON
6. 프로젝트 지원 이메일 선택
7. 저장

### 5단계: Firestore Database 생성

1. Firebase Console > Firestore Database
2. "데이터베이스 만들기" 클릭
3. "프로덕션 모드로 시작" 선택
4. 위치: asia-northeast3 (Seoul)
5. 사용 설정 클릭

### 6단계: Firestore 보안 규칙 설정

규칙 탭에서 다음 규칙 추가:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wishlists/{documentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
                   && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null 
                    && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

게시 클릭!

### 7단계: 의존성 설치

```bash
cd C:\Users\User\Desktop\webProject\netflix-demo
npm install
```

### 8단계: 개발 서버 실행

```bash
npm run dev
```

### 9단계: 테스트!

```
http://localhost:5173 접속

1. Google 로그인 버튼 클릭
2. Google 계정 선택
3. 권한 승인
4. 메인 페이지 확인
5. 영화 카드에서 하트 버튼 클릭
6. Wishlist 페이지에서 확인
```

---

## 📦 변경된 파일들

### 새로 추가된 파일
```
src/config/firebase.js              # Firebase 초기화
src/utils/firebaseAuth.js           # Google 로그인 함수
src/utils/firebaseWishlist.js       # Firestore 위시리스트 관리
FIREBASE_SETUP.md                   # Firebase 설정 가이드
```

### 수정된 파일
```
package.json                        # Firebase 의존성 추가
.env                                # Firebase 환경 변수 추가
.env.example                        # Firebase 환경 변수 예시
src/App.jsx                         # Firebase 인증 체크
src/components/Header.jsx           # 사용자 프로필 표시
src/components/Header.css           # 프로필 스타일
src/components/MovieCard.jsx        # Firebase 위시리스트 연동
src/pages/SignIn.jsx                # Google 로그인 UI
src/pages/SignIn.css                # 로그인 페이지 스타일
src/pages/Wishlist.jsx              # Firestore에서 위시리스트 가져오기
README.md                           # Firebase 정보 추가
```

---

## 🎯 주요 변경 사항

### Before (Local Storage)
```javascript
// 로컬에만 저장
localStorage.setItem('wishlist', JSON.stringify(movies));

// 문제점:
// - 기기별로 다른 위시리스트
// - 브라우저 캐시 삭제 시 데이터 손실
// - 사용자 구분 불가
```

### After (Firebase Firestore)
```javascript
// 클라우드에 저장
await addToWishlist(userId, movie);

// 장점:
// ✅ 모든 기기에서 동일한 위시리스트
// ✅ 영구 저장
// ✅ 사용자별 독립적인 데이터
// ✅ 실시간 동기화
```

---

## 🔥 Firebase 기능

### 1. Authentication (인증)
```javascript
// Google 로그인
const result = await signInWithGoogle();
console.log(result.user); // 사용자 정보

// 로그아웃
await logoutUser();

// 현재 사용자
const user = getCurrentUser();
```

### 2. Firestore (데이터베이스)
```javascript
// 위시리스트 가져오기
const wishlist = await getUserWishlist(userId);

// 추가
await addToWishlist(userId, movie);

// 제거
await removeFromWishlist(userId, movieId);

// 확인
const exists = await isInWishlist(userId, movieId);
```

---

## 🚀 배포 전 체크리스트

### Local 테스트
- [ ] Firebase 프로젝트 생성
- [ ] Google Authentication 활성화
- [ ] Firestore Database 생성
- [ ] 보안 규칙 설정
- [ ] .env 파일 설정
- [ ] npm install 실행
- [ ] Google 로그인 테스트
- [ ] 위시리스트 추가/제거 테스트
- [ ] 다른 기기에서 동기화 확인

### GitHub Pages 배포
- [ ] GitHub Secrets 설정 (모든 환경 변수)
- [ ] Firebase 승인 도메인 추가 (yourusername.github.io)
- [ ] git push
- [ ] Actions에서 빌드 성공 확인
- [ ] 배포된 사이트에서 로그인 테스트

---

## 💡 팁

### 1. Firebase Console에서 데이터 확인
```
Firebase Console > Firestore Database > wishlists 컬렉션

사용자가 추가한 위시리스트를 실시간으로 볼 수 있습니다!
```

### 2. 사용자 관리
```
Firebase Console > Authentication > Users

로그인한 사용자 목록을 볼 수 있습니다.
```

### 3. 디버깅
```javascript
// Console에서 확인
console.log(getCurrentUser()); // 현재 사용자
console.log(await getUserWishlist(userId)); // 위시리스트
```

---

## 🆘 문제 해결

### "Firebase: Error (auth/unauthorized-domain)"

**해결:**
```
Firebase Console > Authentication > Settings > 승인된 도메인
현재 도메인 추가 (예: localhost, yourusername.github.io)
```

### "Missing or insufficient permissions"

**해결:**
```
Firestore > 규칙 탭
위의 보안 규칙 복사 & 게시
```

### 위시리스트가 저장 안 됨

**확인:**
```
1. Firebase Console에서 프로젝트 확인
2. .env 파일 확인
3. 브라우저 Console 에러 확인
4. 서버 재시작 (Ctrl+C → npm run dev)
```

---

## 🎊 완료!

이제 다음 기능을 사용할 수 있습니다:

✅ Google 계정으로 로그인
✅ 프로필 사진과 이름 표시
✅ 영화를 위시리스트에 추가
✅ 모든 기기에서 동기화
✅ 안전한 데이터 저장

**다음 단계:**
1. 로컬에서 테스트
2. GitHub에 푸시
3. 배포 확인
4. 모바일에서 테스트

Happy Coding! 🚀
