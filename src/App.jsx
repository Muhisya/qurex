import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';

function App() {
  const darkMode = useSelector((state) => state.quran.darkMode);

  return (
    <BrowserRouter>
      <div className={`${darkMode ? 'dark bg-slate-900' : 'bg-gray-50'} min-h-screen transition-colors duration-300`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/surat/:nomor" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;