import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurah, setSearchTerm, toggleDarkMode } from '../features/quranSlice';
import { Link } from 'react-router-dom';
import { SkeletonCard } from '../components/Skeleton';

const Home = () => {
  const dispatch = useDispatch();
  const { surahList, loading, searchTerm, lastRead, darkMode } = useSelector((state) => state.quran);

  useEffect(() => {
    dispatch(getAllSurah());
  }, [dispatch]);

  const filteredSurah = surahList.filter((s) =>
    s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <nav className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">QureX</h1>
        <button 
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center transition-all"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      <section className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 mb-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Assalamualaikum,</h2>
          <p className="opacity-90 mb-6 text-emerald-50">Mari tadabbur Al-Qur'an hari ini.</p>
          
          {lastRead && (
            <Link 
              to={`/surat/${lastRead.nomor}`}
              className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md p-4 rounded-2xl hover:bg-white/30 transition-all border border-white/30"
            >
              <div className="bg-white/90 rounded-xl p-2">
                <span className="text-emerald-600 text-sm font-bold">📖</span>
              </div>
              <div>
                <p className="text-xs text-emerald-100 uppercase font-semibold">Terakhir Dibaca</p>
                <p className="font-bold">{lastRead.surah} : {lastRead.ayat}</p>
              </div>
            </Link>
          )}
        </div>
        <div className="absolute -right-10 -bottom-10 text-[180px] opacity-10 rotate-12 select-none">
          ☪
        </div>
      </section>

      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative group">
          <input
            type="text"
            placeholder="Cari Surah (contoh: Al-Kahfi)..."
            className="w-full p-4 pl-12 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none dark:text-white"
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 transition-opacity">
            🔍
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          filteredSurah.map((surah) => (
            <Link to={`/surat/${surah.nomor}`} key={surah.nomor}>
              <div className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl hover:shadow-xl hover:shadow-emerald-100/20 dark:hover:shadow-none transition-all hover:-translate-y-1 group">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 w-12 h-12 flex items-center justify-center rounded-2xl font-bold text-lg">
                      {surah.nomor}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg dark:text-white group-hover:text-emerald-600 transition-colors">
                        {surah.namaLatin}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{surah.arti}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">
                      {surah.nama}
                    </h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{surah.jumlahAyat} Ayat</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;