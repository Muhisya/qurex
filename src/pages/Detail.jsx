import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSurahDetail, toggleBookmark, setLastRead } from '../features/quranSlice';
import { SkeletonAyat } from '../components/Skeleton';

const Detail = () => {
  const bookmarkIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 4C5.44772 4 5 4.44772 5 5V21L12 18L19 21V5C19 4.44772 18.5523 4 18 4H6Z" fill="currentColor"/>
    </svg>
  );
  const pinnedIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C11.4477 2 11 2.44772 11 3V9H5C4.44772 9 4 9.44772 4 10V22L12 19L20 22V10C20 9.44772 19.5523 9 19 9H13V3C13 2.44772 12.5523 2 12 2Z" fill="currentColor"/>
    </svg>
  );
  const { nomor } = useParams();
  const dispatch = useDispatch();
  const { detailSurah, loading, bookmarks } = useSelector((state) => state.quran);

  useEffect(() => {
    dispatch(getSurahDetail(nomor));
    window.scrollTo(0, 0);
  }, [dispatch, nomor]);

  const handleShare = (text, surah, nomorAyat) => {
    const shareText = `"${text}" - (QS. ${surah}: ${nomorAyat})`;
    if (navigator.share) {
      navigator.share({ 
        title: 'QureX Share', 
        text: shareText, 
        url: window.location.href 
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Ayat berhasil disalin!');
    }
  };

  const isBookmarked = (ayatNomor) => {
    return bookmarks.some(b => b.id === `${nomor}:${ayatNomor}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 md:p-12 space-y-10 max-w-5xl">
        <div className="animate-pulse bg-amber-100 dark:bg-slate-800 h-64 rounded-[3rem]"></div>
        <SkeletonAyat />
        <SkeletonAyat />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl pb-32 transition-colors duration-500">
      <div className="flex justify-between items-center mb-10">
        <Link to="/" className="group flex items-center gap-3 text-amber-600 dark:text-amber-500 font-black tracking-tight">
          <div className="w-10 h-10 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all">
            ←
          </div>
          <span className="hidden sm:inline">Kembali ke Beranda</span>
        </Link>
        <div className="text-right">
           <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Sedang Membaca</p>
           <p className="font-black text-slate-800 dark:text-white">{detailSurah?.namaLatin}</p>
        </div>
      </div>

      {detailSurah && (
        <>
          <header className="relative bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-[3rem] p-10 md:p-20 text-center mb-16 shadow-3xl shadow-amber-500/20 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
                <span className="absolute -left-10 -top-10 text-[250px] font-serif rotate-12">QS</span>
                <span className="absolute -right-10 -bottom-10 text-[250px] font-serif -rotate-12">{detailSurah.nomor}</span>
            </div>

            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter italic">
                {detailSurah.namaLatin}
              </h1>
              <div className="flex items-center justify-center gap-3 mb-10">
                <span className="h-px w-8 bg-white/40"></span>
                <p className="text-amber-50 text-lg md:text-xl font-medium tracking-wide">
                  {detailSurah.arti} • {detailSurah.jumlahAyat} Ayat
                </p>
                <span className="h-px w-8 bg-white/40"></span>
              </div>
              
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-2xl border border-white/20 p-4 md:p-6 rounded-[2rem] w-full max-w-xl shadow-2xl">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-amber-600">🎧</span>
                 </div>
                 <audio controls className="flex-1 h-10 custom-audio">
                    <source src={detailSurah.audioFull['05']} type="audio/mpeg" />
                 </audio>
              </div>
            </div>
          </header>

          <div className="space-y-12">
            {detailSurah.ayat.map((ayat) => (
              <article
                key={ayat.nomorAyat}
                className="group bg-white dark:bg-slate-800 p-8 md:p-14 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-amber-200 dark:hover:border-amber-900/50 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 bg-amber-500 text-white flex items-center justify-center rounded-[1.25rem] font-black text-2xl shadow-lg shadow-amber-500/30 group-hover:rotate-6 transition-transform">
                      {ayat.nomorAyat}
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-right leading-[2.2] dark:text-white font-arabic flex-1" dir="rtl">
                    {ayat.teksArab}
                  </h2>
                </div>

                <div className="space-y-6 mb-12">
                  <p className="text-amber-600 dark:text-amber-400 font-bold text-xl md:text-2xl text-right italic leading-relaxed tracking-tight">
                    {ayat.teksLatin}
                  </p>
                  <div className="relative p-6 md:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border-l-4 border-amber-400">
                    <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
                      {ayat.teksIndonesia}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-100 dark:border-slate-700/50">
                  <button 
                    onClick={() => dispatch(toggleBookmark({ id: `${detailSurah.nomor}:${ayat.nomorAyat}`, data: ayat, surahName: detailSurah.namaLatin }))}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm tracking-wide transition-all active:scale-95 shadow-md ${
                      isBookmarked(ayat.nomorAyat) 
                      ? 'bg-amber-500 text-white shadow-amber-500/20' 
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-600 hover:bg-amber-50 dark:hover:bg-amber-900/10'
                    }`}
                  >
                    {bookmarkIcon} {isBookmarked(ayat.nomorAyat) ? 'Stored' : 'Save Verse'}
                  </button>

                  <button 
                    onClick={() => dispatch(setLastRead({ surah: detailSurah.namaLatin, nomor: detailSurah.nomor, ayat: ayat.nomorAyat }))}
                    className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-black text-sm tracking-wide rounded-2xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all active:scale-95"
                  >
                    {pinnedIcon} Mark Reading
                  </button>

                  <button 
                    onClick={() => handleShare(ayat.teksIndonesia, detailSurah.namaLatin, ayat.nomorAyat)}
                    className="flex items-center justify-center w-14 h-14 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-2xl hover:bg-amber-500 hover:text-white transition-all active:scale-95 sm:ml-auto"
                  >
                    📤
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;