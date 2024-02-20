const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
export const baseImagePath = (size, path) =>
  `https://image.tmdb.org/t/p/${size}/${path}`;
export const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
export const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
export const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
export const searchMovies = (keyword) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;

export const searchGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

export const movieDetails = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

export const movieCastDetails = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
