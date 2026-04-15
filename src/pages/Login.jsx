import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-amber-50 dark:bg-slate-950">
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-amber-100/50 dark:shadow-none border border-amber-100 dark:border-slate-800">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-amber-600 mb-2">QureX</h1>
          <p className="text-gray-500 dark:text-gray-400">Masuk untuk menyimpan progres hafalanmu</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-200 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-4 bg-amber-50/50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all outline-none dark:text-white"
              placeholder="nama@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-200 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-4 bg-amber-50/50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all outline-none dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-200 dark:shadow-none transition-all active:scale-95"
          >
            Masuk Sekarang
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Belum punya akun? 
          <Link to="/register" className="ml-1 text-amber-600 font-bold hover:underline">Daftar</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;