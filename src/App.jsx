import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Bookmark from './pages/Bookmark';
function App() {
  const darkMode = useSelector((state) => state.quran?.darkMode || false);

  return (
    <BrowserRouter>
      <div className={`${darkMode ? 'dark bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'} min-h-screen transition-colors duration-300`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/surat/:nomor" element={<Detail />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;