const StatsCard = ({ stats }) => {
  const { total, checkedIn, pending } = stats;
  const percentage = total > 0 ? Math.round((checkedIn / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
      {/* Card Total - Optimizado para móvil */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 sm:p-6 active:scale-95 transform transition-transform">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
          <div className="text-center sm:text-left w-full">
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{total}</p>
          </div>
          <div className="p-2 sm:p-3 bg-blue-100 rounded-full flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card Check-in */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 sm:p-6 active:scale-95 transform transition-transform">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
          <div className="text-center sm:text-left w-full">
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Check-in</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{checkedIn}</p>
          </div>
          <div className="p-2 sm:p-3 bg-green-100 rounded-full flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card Pendientes */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 sm:p-6 active:scale-95 transform transition-transform">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
          <div className="text-center sm:text-left w-full">
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Pendientes</p>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{pending}</p>
          </div>
          <div className="p-2 sm:p-3 bg-yellow-100 rounded-full flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card Asistencia */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 sm:p-6 active:scale-95 transform transition-transform">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
          <div className="text-center sm:text-left w-full">
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Asistencia</p>
            <p className="text-2xl sm:text-3xl font-bold text-purple-600">{percentage}%</p>
          </div>
          <div className="p-2 sm:p-3 bg-purple-100 rounded-full flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
