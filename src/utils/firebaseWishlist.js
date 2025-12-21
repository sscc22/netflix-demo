import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// 위시리스트 컬렉션 이름
const WISHLIST_COLLECTION = 'wishlists';

// 사용자의 위시리스트 가져오기
export const getUserWishlist = async (userId) => {
  try {
    const q = query(
      collection(db, WISHLIST_COLLECTION),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const wishlist = [];
    
    querySnapshot.forEach((doc) => {
      wishlist.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return wishlist;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }
};

// 위시리스트에 영화 추가
export const addToWishlist = async (userId, movie) => {
  try {
    // 문서 ID: userId_movieId
    const docId = `${userId}_${movie.id}`;
    
    await setDoc(doc(db, WISHLIST_COLLECTION, docId), {
      userId,
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
      addedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return { success: false, error: error.message };
  }
};

// 위시리스트에서 영화 제거
export const removeFromWishlist = async (userId, movieId) => {
  try {
    const docId = `${userId}_${movieId}`;
    await deleteDoc(doc(db, WISHLIST_COLLECTION, docId));
    return { success: true };
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return { success: false, error: error.message };
  }
};

// 영화가 위시리스트에 있는지 확인
export const isInWishlist = async (userId, movieId) => {
  try {
    const docId = `${userId}_${movieId}`;
    const docRef = doc(db, WISHLIST_COLLECTION, docId);
    const docSnap = await getDoc(docRef);
    
    return docSnap.exists();
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};

// 위시리스트 토글 (추가/제거)
export const toggleWishlist = async (userId, movie) => {
  try {
    const inWishlist = await isInWishlist(userId, movie.id);
    
    if (inWishlist) {
      return await removeFromWishlist(userId, movie.id);
    } else {
      return await addToWishlist(userId, movie);
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    return { success: false, error: error.message };
  }
};

// 위시리스트 전체 삭제
export const clearWishlist = async (userId) => {
  try {
    const wishlist = await getUserWishlist(userId);
    
    const deletePromises = wishlist.map(item => 
      deleteDoc(doc(db, WISHLIST_COLLECTION, item.id))
    );
    
    await Promise.all(deletePromises);
    return { success: true };
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    return { success: false, error: error.message };
  }
};
