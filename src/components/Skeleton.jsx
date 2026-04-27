export const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-slate-800 h-32 rounded-2xl shadow-sm"></div>
);

export const SkeletonAyat = () => (
  <div className="bg-white dark:bg-slate-800 p-8 md:p-16 rounded-[4rem] border border-slate-100 dark:border-slate-700/60 animate-pulse">
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-start">
        <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl w-3/4"></div>
      </div>
      
      <div className="space-y-6">
        <div className="h-4 bg-amber-100 dark:bg-amber-900/30 rounded-full w-1/2"></div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-5/6"></div>
        </div>
      </div>
      
      <div className="flex gap-3 pt-4">
        <div className="h-12 w-32 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
        <div className="h-12 w-32 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
        <div className="h-12 w-32 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
  </div>
);