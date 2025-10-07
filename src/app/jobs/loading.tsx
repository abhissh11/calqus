export default function JobLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}
 