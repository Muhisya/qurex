export const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-slate-800 h-32 rounded-2xl shadow-sm"></div>
);

export const SkeletonAyat = () => (
  <div className="animate-pulse space-y-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
    <div className="flex justify-between items-center">
      <div className="h-10 w-10 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
      <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-lg w-1/2"></div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 ml-auto"></div>
      <div className="h-4 bg-gray-100 dark:bg-slate-700/50 rounded w-full"></div>
    </div>
  </div>
);