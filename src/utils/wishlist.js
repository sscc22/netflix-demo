const WISHLIST_KEY = 'movieWishlist';

export const getWishlist = () => {
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

export const toggleWishlist = (movie) => {
  const wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.id === movie.id);
  
  if (index === -1) {
    wishlist.push(movie);
  } else {
    wishlist.splice(index, 1);
  }
  
  saveWishlist(wishlist);
  return wishlist;
};

export const isInWishlist = (movieId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === movieId);
};

export const clearWishlist = () => {
  localStorage.removeItem(WISHLIST_KEY);
};
