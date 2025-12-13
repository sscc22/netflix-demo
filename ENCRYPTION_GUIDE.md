# 🔐 API Key 암호화 및 보안 저장 가이드

## ✨ 주요 변경사항

### 이전 방식:
- ❌ 비밀번호 = API Key (불편함)
- ❌ API Key가 평문으로 저장

### 새로운 방식:
- ✅ 비밀번호는 일반 비밀번호 사용
- ✅ API Key는 별도로 입력
- ✅ API Key가 XOR 암호화로 안전하게 저장

---

## 🚀 사용 방법

### 1. 회원가입
```
Email: your-email@example.com
Password: mypassword123 (원하는 비밀번호!)
Confirm Password: mypassword123
TMDB API Key: [발급받은 API Key]
```

### 2. 로그인
```
Email: your-email@example.com
Password: mypassword123
TMDB API Key: [동일한 API Key]
```

---

## 🔒 암호화 원리

API Key는 XOR 암호화 + Base64 인코딩으로 저장됩니다.

**저장 예시:**
- 원본: a1b2c3d4e5f6g7h8
- 암호화: QRVbXl5YW1peXFteWVxd...

Local Storage에서 직접 확인 시 암호화된 값만 보입니다.

---

## ✅ 완료!

이제 더 편리하고 안전하게 사용하세요! 🎉
