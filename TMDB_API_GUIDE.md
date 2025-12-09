# 🎬 TMDB API Key 설정 완벽 가이드

## ⚠️ 중요: API Key가 없으면 영화 데이터가 표시되지 않습니다!

현재 프로젝트는 TMDB API가 **완벽하게 구현**되어 있지만, API Key가 필요합니다.

---

## 📝 구현된 TMDB API 기능 (7개)

✅ 1. Popular Movies - 인기 영화
✅ 2. Now Playing - 현재 상영작  
✅ 3. Top Rated - 최고 평점
✅ 4. Upcoming - 개봉 예정
✅ 5. Search Movies - 영화 검색
✅ 6. Movies by Genre - 장르별 영화
✅ 7. Get Genres - 장르 목록

**페이지별 사용:**
- Home 페이지: 4개 API (Popular, Now Playing, Top Rated, Upcoming)
- Popular 페이지: Popular Movies API
- Search 페이지: Movies by Genre, Get Genres API

---

## 🔑 TMDB API Key 발급 (5분 소요)

### 1단계: 회원가입

```
1. 접속: https://www.themoviedb.org/signup
2. 정보 입력:
   - Username: 원하는 사용자명
   - Password: 비밀번호 (8자 이상)
   - Email: 본인 이메일
3. "회원가입" 클릭
4. 이메일 확인 후 인증 링크 클릭
```

### 2단계: API Key 신청

```
1. 로그인 후 우측 상단 프로필 아이콘 클릭
2. "Settings" 선택
3. 왼쪽 메뉴에서 "API" 클릭
4. "Request an API Key" 클릭
```

### 3단계: Developer 선택

```
1. "Developer" 옵션 선택
2. 약관 동의 체크
3. "Continue" 클릭
```

### 4단계: 애플리케이션 정보 입력

```
Application Name: Netflix Demo
Application URL: http://localhost:5173
Application Summary: Educational project for learning web development with React and TMDB API

(또는 자유롭게 작성)
```

### 5단계: API Key 복사

```
✅ API Key (v3 auth) 복사
예시: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

⚠️ 이 키를 안전하게 보관하세요!
```

---

## 🚀 API Key 사용 방법

### 방법 1: 웹 애플리케이션에서 회원가입 (권장 ⭐)

#### 1. 개발 서버 실행
```bash
cd C:\Users\User\Desktop\webProject\netflix-demo
npm install
npm run dev
```

#### 2. 브라우저 접속
```
http://localhost:5173
```

#### 3. 회원가입
- 우측 "Sign Up" 버튼 클릭 또는 자동으로 로그인 페이지 이동
- **Email**: test@example.com (아무 이메일 형식)
- **Password**: [TMDB에서 발급받은 API Key 붙여넣기]
- **Password Confirm**: [동일하게 API Key 붙여넣기]
- **약관 동의** 체크
- "Sign Up" 클릭

#### 4. 로그인
- **Email**: test@example.com
- **Password**: [API Key]
- "Sign In" 클릭

#### 5. 완료!
메인 페이지에서 영화 포스터가 표시되는지 확인

---

### 방법 2: 브라우저 콘솔에서 직접 설정 (빠른 테스트용)

#### 1. 개발자 도구 열기
```
브라우저에서 F12 키 누르기
또는 우클릭 > 검사
```

#### 2. Console 탭 선택

#### 3. 다음 코드 입력 (API Key 교체 필요!)
```javascript
// API Key 설정
localStorage.setItem('TMDb-Key', 'YOUR_API_KEY_HERE');
localStorage.setItem('currentUser', 'test@example.com');

// 페이지 새로고침
location.reload();
```

#### 4. Enter 키로 실행

---

## ✅ API 작동 확인 방법

### 테스트 1: 브라우저에서 확인

1. **개발 서버 실행 중인 상태에서**
2. **메인 페이지 접속**
3. **다음 사항 확인:**
   - ✅ 영화 포스터 이미지가 보이는가?
   - ✅ 영화 제목이 한글로 표시되는가?
   - ✅ Popular Movies, Now Playing 등 섹션에 영화가 있는가?
   - ✅ 로딩 스피너가 잠깐 나타났다가 사라지는가?

### 테스트 2: 콘솔에서 확인

**F12 > Console 탭에서:**

```javascript
// Local Storage 확인
console.log('API Key:', localStorage.getItem('TMDb-Key'));
console.log('Current User:', localStorage.getItem('currentUser'));

// API 직접 테스트
fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + localStorage.getItem('TMDb-Key') + '&language=ko-KR&page=1')
  .then(res => res.json())
  .then(data => {
    console.log('✅ API 테스트 성공!');
    console.log('영화 개수:', data.results.length);
    console.log('첫 번째 영화:', data.results[0].title);
  })
  .catch(err => console.error('❌ API 테스트 실패:', err));
```

**예상 결과:**
```
✅ API 테스트 성공!
영화 개수: 20
첫 번째 영화: 베놈: 라스트 댄스
```

### 테스트 3: Network 탭에서 확인

**F12 > Network 탭에서:**

1. 페이지 새로고침 (Ctrl+R)
2. Network 탭에서 `themoviedb.org` 검색
3. 여러 개의 API 요청이 보이는지 확인
4. 아무 요청이나 클릭 > Preview 탭에서 데이터 확인

---

## ❌ 문제 해결

### 문제 1: "Invalid API key" 오류

**원인:** API Key가 잘못되었거나 복사가 제대로 안됨

**해결:**
1. TMDB Settings > API에서 API Key 다시 확인
2. 공백 없이 정확하게 복사
3. Local Storage 초기화 후 다시 설정
   ```javascript
   localStorage.clear();
   ```

### 문제 2: 영화 포스터가 안 보임

**원인:** API Key가 설정되지 않음

**해결:**
```javascript
// Console에서 확인
console.log(localStorage.getItem('TMDb-Key'));

// null이면 설정 안된 것
localStorage.setItem('TMDb-Key', 'YOUR_API_KEY');
```

### 문제 3: 로그인 페이지로 계속 튀김

**원인:** currentUser가 설정되지 않음

**해결:**
```javascript
localStorage.setItem('currentUser', 'test@example.com');
location.reload();
```

### 문제 4: CORS 오류

**원인:** 브라우저의 보안 정책

**해결:**
- 개발 서버 재시작: `npm run dev`
- 브라우저 캐시 삭제: Ctrl+Shift+Delete

---

## 🎯 최종 확인 체크리스트

배포 전 확인사항:

- [ ] TMDB API Key 발급 완료
- [ ] 로컬에서 회원가입 테스트 완료
- [ ] 메인 페이지에 영화 4개 섹션 표시 확인
- [ ] Popular 페이지 작동 확인
- [ ] Search 페이지 필터링 작동 확인
- [ ] Wishlist 추가/제거 작동 확인
- [ ] 모든 페이지 로딩 없이 전환 확인
- [ ] 반응형 디자인 확인 (브라우저 창 크기 조절)

---

## 📱 배포 시 주의사항

### GitHub Pages 배포 후:

**배포된 사이트에서도 API Key 설정 필요!**

1. 배포된 URL 접속 (예: https://username.github.io/netflix-demo/)
2. 회원가입 페이지에서 API Key로 회원가입
3. 로그인

또는:

```javascript
// 배포된 사이트의 Console에서
localStorage.setItem('TMDb-Key', 'YOUR_API_KEY');
localStorage.setItem('currentUser', 'test@example.com');
location.reload();
```

---

## 🔒 보안 고려사항

### ⚠️ API Key 노출 방지

**현재 구현:**
- Local Storage에 저장 (클라이언트 측)
- 비밀번호로 사용 (사용자가 직접 입력)

**주의:**
- API Key를 코드에 하드코딩하지 마세요
- GitHub에 올릴 때 .env 파일은 .gitignore에 추가
- 공개 저장소에서는 API Key가 보이지 않도록 주의

**권장 방법:**
- 각 사용자가 자신의 API Key 사용
- 서버 사이드에서 API Key 관리 (프로덕션 환경)

---

## 💡 추가 정보

### TMDB API 제한사항

- **무료 계정:** 초당 50 요청까지
- **일일 제한:** 제한 없음
- **상업적 사용:** 가능 (크레딧 표기 권장)

### API 문서

공식 문서: https://developers.themoviedb.org/3

---

## 🆘 추가 도움말

문제가 계속되면:

1. **Local Storage 완전 초기화**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

2. **브라우저 캐시 삭제**
   - Ctrl + Shift + Delete
   - 캐시 이미지 및 파일 선택
   - 데이터 삭제

3. **개발 서버 재시작**
   ```bash
   Ctrl + C (서버 종료)
   npm run dev (재시작)
   ```

API Key 설정이 완료되면 모든 기능이 정상 작동합니다! 🎉
