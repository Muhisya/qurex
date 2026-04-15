import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleBookmark } from '../features/quranSlice';

const Bookmark = () => {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.quran);

  return (
    <div className="container mx-auto p-6 max-w-4xl min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-amber-600 mb-2">Saved Verses</h1>
        <p className="text-gray-500 dark:text-gray-400">A collection of your chosen verses</p>
      </div>

      <Link to="/" className="text-amber-600 font-medium mb-6 inline-block hover:underline">
        ← Back to Home
      </Link>

      <div className="space-y-4">
        {bookmarks.length === 0 ? (
          <div className="text-center py-20 bg-amber-50 dark:bg-slate-800 rounded-3xl border-2 border-dashed border-amber-200 dark:border-slate-700">
            <p className="text-amber-800 dark:text-amber-500 font-medium">No verses saved yet.</p>
          </div>
        ) : (
          bookmarks.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-amber-100 dark:border-slate-700 flex justify-between items-center group hover:border-amber-400 transition-all shadow-sm">
              <div>
                <h3 className="font-bold text-amber-900 dark:text-white text-lg">{item.surah}</h3>
                <p className="text-sm text-amber-600">Verse {item.nomor}</p>
              </div>
              <div className="flex gap-3">
                <Link 
                  to={`/surat/${item.suratId}`} 
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors"
                >
                  Read Verse
                </Link>
                <button 
                  onClick={() => dispatch(toggleBookmark({id: item.id}))}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7H5V19H19V7ZM6 19V7H18V19H6Z" />
                    <path d="M16 9H8V11H16V9ZM16 13H8V15H16V13Z" />
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