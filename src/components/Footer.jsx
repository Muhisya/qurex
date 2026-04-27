const Footer = () => {
  return (
    <footer className="mt-20 pb-32 md:pb-12 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">
              Qude<span className="text-amber-500">X</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-xs">
              A modern digital Al-Quran experience designed for clarity and spiritual immersion.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-6 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-amber-500 transition-colors">Home</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Bookmark</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Settings</a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-slate-400 dark:text-slate-600 text-[11px] font-bold uppercase tracking-widest">
                Data provided by
              </p>
              <a 
                href="https://equran.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-600 dark:text-amber-500 font-black text-sm hover:underline"
              >
                EQuran.id
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Muhisya • Developed with Heart
          </p>
          <div className="flex gap-4">
            {/* You can add small social icons here */}
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-amber-500 hover:text-white transition-all cursor-pointer">
              <span className="text-xs">GH</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-amber-500 hover:text-white transition-all cursor-pointer">
              <span className="text-xs">IN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;