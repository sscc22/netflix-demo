# 🔥 Firebase 설정 가이드

## 📋 개요

이 프로젝트는 Firebase를 사용하여:
- ✅ Google 로그인 기능
- ✅ 사용자별 위시리스트 (Firestore)
- ✅ 실시간 데이터 동기화

---

## 🚀 Firebase 프로젝트 생성

### 1단계: Firebase Console 접속

```
https://console.firebase.google.com
```

### 2단계: 프로젝트 생성

1. **"프로젝트 추가"** 클릭
2. **프로젝트 이름 입력:** `netflix-demo` (또는 원하는 이름)
3. **Google Analytics 설정:** 선택 사항 (Skip 가능)
4. **프로젝트 만들기** 클릭

### 3단계: 웹 앱 추가

1. 프로젝트 대시보드에서 **웹 아이콘 (</>)** 클릭
2. **앱 닉네임 입력:** `Netflix Demo Web`
3. **Firebase Hosting 설정:** 체크 안 함
4. **앱 등록** 클릭
5. **Firebase SDK 구성 정보 복사** (나중에 사용)

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

---

## 🔐 Google 인증 설정

### 1단계: Authentication 활성화

1. 왼쪽 메뉴에서 **Authentication** 클릭
2. **시작하기** 버튼 클릭
3. **Sign-in method** 탭 선택
4. **Google** 제공업체 클릭
5. **사용 설정** 토글 ON
6. **프로젝트 지원 이메일** 선택
7. **저장** 클릭

---

## 💾 Firestore Database 설정

### 1단계: Firestore 생성

1. 왼쪽 메뉴에서 **Firestore Database** 클릭
2. **데이터베이스 만들기** 버튼 클릭
3. **프로덕션 모드로 시작** 선택
4. **다음** 클릭
5. **Cloud Firestore 위치** 선택: `asia-northeast3 (Seoul)` 권장
6. **사용 설정** 클릭

### 2단계: 보안 규칙 설정

1. **규칙** 탭 선택
2. 다음 규칙으로 변경:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 위시리스트 컬렉션
    match /wishlists/{documentId} {
      // 로그인한 사용자만 접근 가능
      allow read: if request.auth != null;
      // 본인의 위시리스트만 수정 가능
      allow write: if request.auth != null 
                   && request.auth.uid == resource.data.userId;
      // 새 문서 생성 (본인 것만)
      allow create: if request.auth != null 
                    && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

3. **게시** 클릭

---

## ⚙️ 환경 변수 설정

### 1단계: .env 파일 수정

```bash
# 파일 열기
C:\Users\User\Desktop\webProject\netflix-demo\.env
```

### 2단계: Firebase 설정 추가

```env
# TMDB API Configuration
VITE_TMDB_API_KEY=87f58b2fd5477e14aae3aff6029ef584

# Firebase Configuration (Firebase Console에서 복사)
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=netflix-demo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=netflix-demo
VITE_FIREBASE_STORAGE_BUCKET=netflix-demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**주의:** Firebase Console에서 복사한 실제 값으로 교체하세요!

---

## 📦 의존성 설치

```bash
cd C:\Users\User\Desktop\webProject\netflix-demo
npm install
```

---

## 🧪 로컬 테스트

### 1단계: 개발 서버 실행

```bash
npm run dev
```

### 2단계: 브라우저 테스트

```
http://localhost:5173
```

1. **Google 로그인** 버튼 클릭
2. Google 계정 선택
3. 권한 승인
4. 메인 페이지로 이동
5. 영화 위시리스트 추가/제거 테스트

---

## 🌐 GitHub Pages 배포

### 1단계: GitHub Secrets 추가

Repository > Settings > Secrets and variables > Actions

**추가할 Secrets:**

```
VITE_TMDB_API_KEY = [TMDB API Key]
VITE_FIREBASE_API_KEY = [Firebase API Key]
VITE_FIREBASE_AUTH_DOMAIN = [Firebase Auth Domain]
VITE_FIREBASE_PROJECT_ID = [Firebase Project ID]
VITE_FIREBASE_STORAGE_BUCKET = [Firebase Storage Bucket]
VITE_FIREBASE_MESSAGING_SENDER_ID = [Firebase Messaging Sender ID]
VITE_FIREBASE_APP_ID = [Firebase App ID]
```

### 2단계: Firebase 승인 도메인 추가

1. Firebase Console > Authentication > Settings
2. **승인된 도메인** 탭
3. **도메인 추가** 클릭
4. 추가할 도메인:
   ```
   sscc22.github.io
   ```
5. **추가** 클릭

### 3단계: 배포

```bash
git add .
git commit -m "feat: Add Firebase authentication and wishlist"
git push origin main
```

---

## 🔧 Firestore 데이터 구조

### wishlists 컬렉션

```javascript
{
  // 문서 ID: userId_movieId
  "userId": "google_user_id_123",
  "movieId": 12345,
  "title": "Avengers: Endgame",
  "poster_path": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  "vote_average": 8.3,
  "release_date": "2019-04-24",
  "overview": "After the devastating events...",
  "addedAt": "2024-12-17T10:30:00.000Z"
}
```

---

## ✅ 체크리스트

설정 완료 확인:

- [ ] Firebase 프로젝트 생성
- [ ] 웹 앱 추가 및 구성 정보 복사
- [ ] Google Authentication 활성화
- [ ] Firestore Database 생성
- [ ] Firestore 보안 규칙 설정
- [ ] .env 파일에 Firebase 설정 추가
- [ ] npm install 실행
- [ ] 로컬에서 Google 로그인 테스트
- [ ] 위시리스트 추가/제거 테스트
- [ ] GitHub Secrets 설정
- [ ] Firebase 승인 도메인 추가
- [ ] 배포 테스트

---

## 🆘 문제 해결

### "Firebase: Error (auth/unauthorized-domain)"

**원인:** 승인되지 않은 도메인

**해결:**
1. Firebase Console > Authentication > Settings
2. 승인된 도메인에 현재 도메인 추가

### "Missing or insufficient permissions"

**원인:** Firestore 보안 규칙 오류

**해결:**
1. Firestore > 규칙 탭
2. 위의 보안 규칙 복사
3. 게시

### 환경 변수가 undefined

**원인:** .env 파일 설정 오류 또는 서버 재시작 필요

**해결:**
```bash
# 서버 재시작
Ctrl+C
npm run dev
```

---

## 📚 참고 링크

- **Firebase Console:** https://console.firebase.google.com
- **Firebase 문서:** https://firebase.google.com/docs
- **Authentication 가이드:** https://firebase.google.com/docs/auth
- **Firestore 가이드:** https://firebase.google.com/docs/firestore

---

완료! 🎉
