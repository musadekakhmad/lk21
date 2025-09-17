// app/sitemap.js
import {
  getMovieGenres,
  getMoviesByCategory,
  getMovieById,
  getTvSeriesByGenre,
  getTvSeriesGenres,
  getTvSeriesById,
  getMoviesByGenre
} from '../lib/api';

const BASE_URL = 'https://lk21-stream.vercel.app';

// Fungsi utilitas untuk membuat slug
const createSlug = (name, year) => {
  if (!name) return '';
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
  if (!year || year === 'undefined' || typeof year !== 'string' || year.length < 4) {
    return baseSlug;
  }
  return `${baseSlug}-${year}`;
};

export default async function sitemap() {
  const movieCategories = ['popular', 'now_playing', 'upcoming', 'top_rated'];
  const tvCategories = ['popular', 'airing_today', 'on_the_air', 'top_rated'];

  try {
    const [movieGenres, tvGenres] = await Promise.all([
      getMovieGenres(),
      getTvSeriesGenres()
    ]);

    // Ambil semua film dari semua kategori
    const movieCategoryPromises = movieCategories.map(async (category) => {
      const movies = await getMoviesByCategory(category);
      return movies?.results || [];
    });
    
    // Ambil semua film dari semua genre
    const movieGenrePromises = (movieGenres || []).map(async (genre) => {
      const movies = await getMoviesByGenre(genre.id);
      return movies?.results || [];
    });

    // Ambil semua serial TV dari semua kategori
    const tvCategoryPromises = tvCategories.map(async (category) => {
      const series = await getTvSeriesByGenre(category);
      return series?.results || [];
    });

    // Ambil semua serial TV dari semua genre
    const tvGenrePromises = (tvGenres || []).map(async (genre) => {
      const series = await getTvSeriesByGenre(genre.id);
      return series?.results || [];
    });

    // Gabungkan semua hasil pengambilan data
    const allMovieLists = await Promise.all([...movieCategoryPromises, ...movieGenrePromises]);
    const allTvLists = await Promise.all([...tvCategoryPromises, ...tvGenrePromises]);

    // Gunakan Map untuk menyimpan ID unik agar tidak ada duplikasi URL
    const uniqueMovies = new Map();
    allMovieLists.flat().forEach(movie => {
      if (movie?.id) {
        uniqueMovies.set(movie.id, movie);
      }
    });

    const uniqueTvShows = new Map();
    allTvLists.flat().forEach(tvShow => {
      if (tvShow?.id) {
        uniqueTvShows.set(tvShow.id, tvShow);
      }
    });

    console.log(`Jumlah film unik yang ditemukan: ${uniqueMovies.size}`);
    console.log(`Jumlah serial TV unik yang ditemukan: ${uniqueTvShows.size}`);
    
    // Ambil detail lengkap untuk setiap item unik
    const movieDetailsPromises = Array.from(uniqueMovies.values()).map(async (movie) => {
      const details = await getMovieById(movie.id);
      return details;
    });

    const tvDetailsPromises = Array.from(uniqueTvShows.values()).map(async (tvShow) => {
      const details = await getTvSeriesById(tvShow.id);
      return details;
    });

    const [movieDetails, tvDetails] = await Promise.allSettled([
      Promise.all(movieDetailsPromises),
      Promise.all(tvDetailsPromises)
    ]).then(results => results.map(result => result.status === 'fulfilled' ? result.value : []));

    console.log(`Jumlah detail film yang berhasil diambil: ${movieDetails.length}`);
    console.log(`Jumlah detail serial TV yang berhasil diambil: ${tvDetails.length}`);

    // Buat URL statis, kategori, dan genre
    const staticUrls = [
      { url: `${BASE_URL}/`, lastModified: new Date() },
      { url: `${BASE_URL}/trending`, lastModified: new Date() },
    ];

    const movieCategoryUrls = movieCategories.map((category) => ({
      url: `${BASE_URL}/movie/${category}`, lastModified: new Date()
    }));

    const tvCategoryUrls = tvCategories.map((category) => ({
      url: `${BASE_URL}/tv-show/${category}`, lastModified: new Date()
    }));
    
    const movieGenreUrls = (movieGenres || []).map((genre) => ({
      url: `${BASE_URL}/movie/genre/${createSlug(genre.name)}`, lastModified: new Date()
    }));
    
    const tvGenreUrls = (tvGenres || []).map((genre) => ({
      url: `${BASE_URL}/tv-show/genre/${createSlug(genre.name)}`, lastModified: new Date()
    }));

    // Buat URL slug film dan serial TV dari detail yang sudah diambil
    const movieSlugUrls = (movieDetails || []).map((movie) => {
      if (movie?.title && movie?.release_date) {
        return {
          url: `${BASE_URL}/movie/${createSlug(movie.title, movie.release_date.substring(0, 4))}`,
          lastModified: new Date(),
        };
      }
      return null;
    }).filter(Boolean);

    const movieStreamUrls = (movieDetails || []).map((movie) => {
      if (movie?.title && movie?.release_date) {
        return {
          url: `${BASE_URL}/movie/${createSlug(movie.title, movie.release_date.substring(0, 4))}/stream`,
          lastModified: new Date(),
        };
      }
      return null;
    }).filter(Boolean);

    const tvSlugUrls = (tvDetails || []).map((tvShow) => {
      if (tvShow?.name && tvShow?.first_air_date) {
        return {
          url: `${BASE_URL}/tv-show/${createSlug(tvShow.name, tvShow.first_air_date.substring(0, 4))}`,
          lastModified: new Date(),
        };
      }
      return null;
    }).filter(Boolean);

    const tvStreamUrls = (tvDetails || []).map((tvShow) => {
      if (tvShow?.name && tvShow?.first_air_date) {
        return {
          url: `${BASE_URL}/tv-show/${createSlug(tvShow.name, tvShow.first_air_date.substring(0, 4))}/stream`,
          lastModified: new Date(),
        };
      }
      return null;
    }).filter(Boolean);

    return [
      ...staticUrls,
      ...movieCategoryUrls,
      ...tvCategoryUrls,
      ...movieGenreUrls,
      ...tvGenreUrls,
      ...movieSlugUrls,
      ...movieStreamUrls,
      ...tvSlugUrls,
      ...tvStreamUrls,
    ];

  } catch (error) {
    console.error("Kesalahan saat membuat sitemap:", error);
    return []; // Mengembalikan sitemap kosong jika ada kesalahan
  }
}