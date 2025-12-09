// TMDB API 테스트 스크립트
// 브라우저 콘솔(F12)에서 실행하세요

// 1. API Key 설정 (YOUR_API_KEY를 실제 키로 변경)
const API_KEY = 'YOUR_API_KEY_HERE';
localStorage.setItem('TMDb-Key', API_KEY);

// 2. API 테스트
async function testTMDB() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
    );
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API 연결 성공!');
      console.log(`📽️ 총 ${data.results.length}개의 영화를 불러왔습니다.`);
      console.log('첫 번째 영화:', data.results[0].title);
      return true;
    } else {
      console.error('❌ API 연결 실패:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    return false;
  }
}

// 3. 테스트 실행
testTMDB();
