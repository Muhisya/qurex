import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurah, setSearchTerm, toggleDarkMode } from '../features/quranSlice';
import { Link } from 'react-router-dom';
import { SkeletonCard } from '../components/Skeleton';

const Home = () => {
  const searchIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="16.6569" y1="16.6569" x2="21.3137" y2="21.3137" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
  const sunIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
      </g>
    </svg>
  );
  const moonIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.8A9 9 0 0111.2 3 7 7 0 1021 12.8z" />
    </svg>
  );
  const bookmarkIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 4C5.44772 4 5 4.44772 5 5V21L12 18L19 21V5C19 4.44772 18.5523 4 18 4H6Z" fill="currentColor"/>
    </svg>
  );
  const dispatch = useDispatch();
  const { surahList, loading, searchTerm, lastRead, darkMode } = useSelector((state) => state.quran);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    dispatch(getAllSurah());
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 15) setGreeting('Good Afternoon');
    else if (hour < 18) setGreeting('Good Evening');
    else setGreeting('Good Night');
  }, [dispatch]);

  const filteredSurah = surahList.filter((s) =>
    s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-10 max-w-7xl min-h-screen transition-colors duration-500">
      <nav className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="w-fit px-5 py-3 h-fit bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">
              QureX
            </h1>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link to="/bookmark" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-amber-50 transition-all">
            {bookmarkIcon} Save
          </Link>
          <button 
            onClick={() => dispatch(toggleDarkMode())}
            className="p-3 bg-white dark:bg-slate-800 text-amber-500 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:rotate-12 transition-all"
          >
            {darkMode ? sunIcon : moonIcon}
          </button>
        </div>
      </nav>

      <section className="relative rounded-[3rem] p-8 md:p-14 mb-12 overflow-hidden shadow-3xl shadow-amber-200/50 dark:shadow-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-600/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-4">
              {greeting}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
              Tadabbur <br />Al-Qur'an.
            </h2>
            <p className="text-amber-50/80 text-lg mb-8 max-w-sm leading-relaxed font-medium">
              "Bacalah apa yang telah diwahyukan kepadamu, yaitu Al-Kitab..."
            </p>
          </div>

          {lastRead ? (
            <div className="bg-white/10 backdrop-blur-xl border border-white/30 p-8 rounded-[2.5rem] shadow-2xl relative group hover:bg-white/20 transition-all">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-300 text-amber-900 rounded-2xl flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-0 transition-all">
                <span className="text-xl">📍</span>
              </div>
              <p className="text-amber-100/70 text-xs font-bold uppercase tracking-[0.2em] mb-2">Last Read</p>
              <h3 className="text-3xl font-black text-white mb-6">{lastRead.name}</h3>
              <Link 
                to={`/surat/${lastRead.id}`} 
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-2xl font-black text-sm hover:gap-4 transition-all shadow-xl"
              >
                Continue Reading <span>→</span>
              </Link>
            </div>
          ) : (
            <div className="hidden md:block text-right">
               <span className="text-white/20 text-9xl font-serif">☪</span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-3xl mx-auto -mt-20 relative z-20 px-4 mb-16">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search surah..."
            className="w-full p-6 pl-24 bg-white dark:bg-slate-800 border-none rounded-[2rem] shadow-2xl shadow-amber-500/10 focus:ring-4 focus:ring-amber-500/20 transition-all outline-none dark:text-white text-lg font-medium"
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-amber-500 p-2.5 rounded-xl shadow-lg">
             <span className="text-white text-xl">{searchIcon}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          filteredSurah.map((surah) => (
            <Link to={`/surat/${surah.nomor}`} key={surah.nomor} className="group">
              <div className="p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2.5rem] hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)] dark:hover:shadow-none transition-all duration-500 hover:-translate-y-3 relative overflow-hidden flex flex-col h-full">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-50 dark:bg-amber-900/10 rounded-full group-hover:scale-[3] transition-transform duration-700 opacity-50"></div>

                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-2xl font-black text-sm">
                    {surah.nomor}
                  </div>
                  <h3 className="text-3xl font-bold text-amber-700 dark:text-amber-500 font-arabic leading-none">
                    {surah.nama}
                  </h3>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1 group-hover:text-amber-600 transition-colors">
                    {surah.namaLatin}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{surah.arti}</p>
                    <span className="w-1 h-1 rounded-full bg-amber-300"></span>
                    <p className="text-xs text-amber-500 font-black uppercase tracking-widest">{surah.jumlahAyat} Ayat</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {!loading && filteredSurah.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-xl font-medium">Surah tidak ditemukan...</p>
        </div>
      )}
    </div>
  );
};

export default Home;