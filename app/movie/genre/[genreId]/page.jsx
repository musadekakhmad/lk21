// app/movie/genre/[genreId]/page.jsx
import { getMoviesByGenre, getMovieGenres } from '../../../../lib/api';
import MovieList from '../../../../components/MovieList';
import Head from 'next/head';

export async function generateMetadata({ params }) {
  const genres = await getMovieGenres();
  const genreName = genres.find(g => g.id == params.genreId)?.name || 'Unknown';
  return {
    title: `Fmovies - ${genreName} Movies`,
  };
}

export default async function MoviesByGenrePage({ params }) {
  const genreId = params.genreId;
  const movies = await getMoviesByGenre(genreId);
  const genres = await getMovieGenres();
  const genreName = genres.find(g => g.id == genreId)?.name || 'Unknown';

  return (
    <>
      <Head>
        <title>{`Fmovies - ${genreName} Movies`}</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
          {genreName} Movies
        </h1>
        {movies && movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          <p className="text-center text-white">Tidak ada film di genre ini.</p>
        )}
      </div>
    </>
  );
}