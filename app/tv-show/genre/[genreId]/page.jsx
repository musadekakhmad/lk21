// app/tv-show/genre/[genreId]/page.jsx
import { getTvSeriesByGenre, getTvSeriesGenres } from '../../../../lib/api';
import TvSeriesList from '../../../../components/TvSeriesList';
import Head from 'next/head';

export async function generateMetadata({ params }) {
  const genres = await getTvSeriesGenres();
  const genreName = genres.find(g => g.id == params.genreId)?.name || 'Unknown';
  return {
    title: `Fmovies - ${genreName} TV Series`,
  };
}

export default async function TvSeriesByGenrePage({ params }) {
  const genreId = params.genreId;
  const series = await getTvSeriesByGenre(genreId);
  const genres = await getTvSeriesGenres();
  const genreName = genres.find(g => g.id == genreId)?.name || 'Unknown';

  return (
    <>
      <Head>
        <title>{`Fmovies - ${genreName} TV Series`}</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
          {genreName} TV Series
        </h1>
        {series && series.length > 0 ? (
          <TvSeriesList series={series} />
        ) : (
          <p className="text-center text-white">Tidak ada serial TV di genre ini.</p>
        )}
      </div>
    </>
  );
}