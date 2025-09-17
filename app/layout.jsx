import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdsterraLayoutWrapper from '../components/AdsterraLayoutWrapper';

export const metadata = {
  title: 'LK21 Stream | Watch Movies and TV Series Free HD ',
  description: 'LK21 Stream is your one-stop destination for free movies, TV shows, and web series. Download thousands of titles in HD quality, with unlimited access to the latest blockbusters and trending series. Start your free entertainment journey today! ',
  openGraph: {
    title: 'LK21 Stream | Watch Movies and TV Series Free HD',
    description: 'LK21 Stream is your one-stop destination for free movies, TV shows, and web series. Download thousands of titles in HD quality, with unlimited access to the latest blockbusters and trending series. Start your free entertainment journey today! ',
    url: 'https://LK21-Stream1.vercel.app',
    siteName: 'LK21 Stream',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54791981402_5d33da66b5_b.jpg',
        width: 1200,
        height: 630,
        alt: 'LK21 Stream - Free HD Movies, TV Shows and Web Series',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WatchStream123',
    creator: '@WatchStream123',
    title: 'LK21 Stream | Watch Movies and TV Series Free HD',
    description: 'LK21 Stream is your one-stop destination for free movies, TV shows, and web series. Download thousands of titles in HD quality, with unlimited access to the latest blockbusters and trending series. Start your free entertainment journey today!',
    images: ['https://live.staticflickr.com/65535/54791981402_5d33da66b5_b.jpg'],
  },
  // Tambahkan tag meta eksplisit untuk Facebook
  other: {
    'fb:app_id': '100074345305108',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Tag verifikasi Google Search Console */}
        <meta name="google-site-verification" content="43U0FE_9YdrByOFa7zNlMk0hxaMxt1P1zitJs_LBJFU" />
      </head>
      <body>
        <AdsterraLayoutWrapper>
          <div className="flex flex-col min-h-screen bg-slate-900">
            <header className="w-full max-w-7xl mx-auto px-4 py-4 sticky top-0 z-50 bg-slate-900 shadow-lg">
              <Navbar />
            </header>
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 mt-2">
              {children}
            </main>
            <footer className="w-full max-w-7xl mx-auto px-4 py-8">
              {/* Tempatkan div Native Banner di sini, sebelum Footer */}
              <div id="container-53e9873acb732e3714c0472b0f8d3ec1"></div>
              <Footer />
            </footer>
          </div>
        </AdsterraLayoutWrapper>
      </body>
    </html>
  );
}
