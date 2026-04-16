import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSurahDetail, toggleBookmark, setLastRead } from '../features/quranSlice';
import { SkeletonAyat } from '../components/Skeleton';

const Detail = () => {
  const [selectedQori, setSelectedQori] = useState('05');
  const audioRef = useRef(null);

  const headphoneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M18 12h1M3 12h1m-.707-.707l.707-.707M16.95 6.343l-.707-.707M19.071 12.45a8 8 0 11-16.142 0 8 8 0 0116.142 0z" />
    </svg>
  );
  const pinnedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
    </svg>
  );
  const bookmarkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
  const bookmarkIconFilled = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
  const arrowUpIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
    </svg>
  );

  const { nomor } = useParams();
  const dispatch = useDispatch();
  const { detailSurah, loading, bookmarks } = useSelector((state) => state.quran);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    dispatch(getSurahDetail(nomor));
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, nomor]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [selectedQori]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isBookmarked = (ayatNomor) => {
    return bookmarks.some(b => b.id === `${nomor}:${ayatNomor}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 md:p-12 space-y-10 max-w-5xl">
        <div className="animate-pulse bg-amber-50 dark:bg-slate-800/50 h-80 rounded-[4rem]"></div>
        <SkeletonAyat />
        <SkeletonAyat />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl pb-40 transition-all duration-500 bg-slate-50/30 dark:bg-[#0f172a]">
      <div className="flex justify-between items-center mb-12">
        <Link to="/" className="group flex items-center gap-4 text-amber-600 dark:text-amber-500 font-bold">
          <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-all group-hover:-translate-x-1">
            ←
          </div>
          <span className="hidden sm:inline tracking-tight text-sm uppercase font-black">Back to Library</span>
        </Link>
        <div className="text-right">
           <p className="text-[10px] uppercase tracking-[0.4em] text-amber-600/60 font-black mb-1">Chapter {detailSurah?.nomor}</p>
           <p className="font-black text-2xl text-slate-800 dark:text-white tracking-tighter">{detailSurah?.namaLatin}</p>
        </div>
      </div>

      {detailSurah && (
        <>
          <header className="relative bg-white dark:bg-slate-800 rounded-[4rem] p-12 md:p-24 text-center mb-20 shadow-[0_40px_100px_-20px_rgba(245,158,11,0.15)] dark:shadow-none border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-900/5 opacity-50"></div>
            <div className="relative z-10">
              <span className="inline-block px-6 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                {detailSurah.tempatTurun} • {detailSurah.arti}
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter italic">
                {detailSurah.namaLatin}
              </h1>
              <h2 className="text-4xl md:text-5xl font-arabic text-amber-600/80 dark:text-amber-500/80 mb-10">
                {detailSurah.nama}
              </h2>
              <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-700"></div>
                <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs">
                  {detailSurah.jumlahAyat} Revealed Verses
                </p>
                <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-700"></div>
              </div>
            </div>
          </header>

          <div className="space-y-16">
            {detailSurah.ayat.map((ayat) => (
              <article key={ayat.nomorAyat} className="group relative">
                <div className="bg-white dark:bg-slate-800 p-8 md:p-16 rounded-[4rem] border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-700">
                  <div className="absolute -left-4 top-12 w-12 h-12 bg-slate-900 dark:bg-amber-500 text-white flex items-center justify-center rounded-2xl font-black text-lg shadow-xl group-hover:scale-110 transition-transform">
                    {ayat.nomorAyat}
                  </div>
                  <div className="flex flex-col gap-12">
                    <h2 className="text-4xl md:text-6xl font-arabic text-right leading-[2.5] dark:text-slate-100" dir="rtl">
                      {ayat.teksArab}
                    </h2>
                    <div className="space-y-8 max-w-3xl">
                      <p className="text-amber-600 dark:text-amber-400 font-bold text-xl md:text-2xl italic leading-relaxed tracking-tight border-l-2 border-amber-200 dark:border-amber-900/50 pl-6">
                        {ayat.teksLatin}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
                        {ayat.teksIndonesia}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-10">
                      <button 
                        onClick={() => dispatch(toggleBookmark({ id: `${detailSurah.nomor}:${ayat.nomorAyat}`, data: ayat, surahName: detailSurah.namaLatin }))}
                        className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 ${
                          isBookmarked(ayat.nomorAyat) 
                          ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                        }`}
                      >
                        {isBookmarked(ayat.nomorAyat) ? bookmarkIconFilled : bookmarkIcon}
                        <span>{isBookmarked(ayat.nomorAyat) ? 'Saved' : 'Save Verse'}</span>
                      </button>
                      <button 
                        onClick={() => dispatch(setLastRead({ surah: detailSurah.namaLatin, nomor: detailSurah.nomor, ayat: ayat.nomorAyat }))}
                        className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-[2rem] hover:opacity-80 transition-all active:scale-95"
                      >
                        {pinnedIcon} Mark Reading
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 w-[95%] max-w-3xl px-4">
            <div className="flex-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-slate-700 p-3 md:p-4 rounded-[2.5rem] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.3)] flex items-center gap-4 overflow-visible">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-full flex items-center justify-center text-white flex-shrink-0 ">
                {headphoneIcon}
              </div>
              
              <div className="hidden lg:block flex-1 min-w-0">
                 <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-0.5">Now Playing</p>
                 <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{detailSurah.namaLatin}</p>
              </div>

              <div className="relative group">
                <select 
                  value={selectedQori}
                  onChange={(e) => setSelectedQori(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[13px] font-black uppercase tracking-tighter py-2 px-[18px] rounded-full border-none outline-none appearance-none cursor-pointer hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                >
                  <option value="01">Qori 01</option>
                  <option value="02">Qori 02</option>
                  <option value="03">Qori 03</option>
                  <option value="04">Qori 04</option>
                  <option value="05">Qori 05</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[8px]">▼</div>
              </div>

              <audio ref={audioRef} controls className="flex-1 h-8 custom-audio-mini max-w-[150px] md:max-w-xs">
                <source src={detailSurah.audioFull[selectedQori]} type="audio/mpeg" />
              </audio>
            </div>

            <button
              onClick={scrollToTop}
              className={`w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-500 rounded-full shadow-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 transition-all duration-500 hover:bg-amber-500 hover:text-white active:scale-90 flex-shrink-0 ${
                showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
              }`}
            >
              {arrowUpIcon}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;