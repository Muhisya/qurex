import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleBookmark } from '../features/quranSlice';

const Bookmark = () => {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.quran);

  return (
    <div className="container mx-auto p-4 md:p-10 max-w-5xl min-h-screen transition-colors duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <Link to="/" className="group flex items-center gap-3 text-amber-600 dark:text-amber-500 font-black tracking-tight self-start">
          <div className="w-10 h-10 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
            ←
          </div>
          <span>Back to Home</span>
        </Link>
        
        <div className="text-center md:text-right">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tighter mb-1">
            Saved <span className="text-amber-500">Verses</span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-[0.2em] text-xs">
            {bookmarks.length} Verses Bookmarked
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {bookmarks.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-amber-200 dark:border-slate-700 shadow-xl shadow-amber-500/5">
            <div className="text-6xl mb-6 opacity-20">📖</div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No bookmarks yet</h3>
            <p className="text-slate-400 max-w-xs mx-auto">Save your favorite verses to easily find them again later.</p>
            <Link to="/" className="inline-block mt-8 px-8 py-3 bg-amber-500 text-white font-black rounded-2xl hover:bg-amber-600 shadow-lg shadow-amber-500/30 transition-all">
              Explore Surahs
            </Link>
          </div>
        ) : (
          bookmarks.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-200 dark:hover:border-amber-900/40 transition-all duration-500"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 flex items-center justify-center rounded-[1.5rem] font-black text-xl shadow-inner transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white group-hover:rotate-12">
                  {item.data?.nomorAyat || '•'}
                </div>
                <div>
                  <h3 className="font-black text-slate-800 dark:text-white text-2xl tracking-tight leading-none mb-1">
                    {item.surahName || item.surah}
                  </h3>
                  <p className="text-amber-600 dark:text-amber-500 font-bold uppercase tracking-widest text-xs">
                    Verse {item.data?.nomorAyat || item.nomor}
                  </p>
                </div>
              </div>

              {item.data?.teksArab && (
                <div className="flex-1 text-right hidden lg:block">
                  <p className="text-2xl font-arabic text-slate-400 dark:text-slate-600 truncate max-w-md ml-auto" dir="rtl">
                    {item.data.teksArab}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Link 
                  to={`/surat/${item.id.split(':')[0]}`} 
                  className="flex-1 md:flex-none px-8 py-4 bg-amber-500 text-white rounded-2xl text-sm font-black shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all text-center active:scale-95"
                >
                  Read Verse
                </Link>
                <button 
                  onClick={() => dispatch(toggleBookmark({ id: item.id }))}
                  className="p-4 bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-90 shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookmark;