import { format } from 'date-fns';
import { CheckCircle, Clock, User, Building2, Mail } from 'lucide-react';

const ParticipantCard = ({ participant, onCheckIn, onViewDetails }) => {
  const isCheckedIn = participant.attendance && participant.attendance.trim() !== '';

  const getStatusColor = (status) => {
    if (isCheckedIn) return 'bg-green-100 text-green-800';
    if (status) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatAttendance = (attendance) => {
    if (!attendance || attendance.trim() === '') return 'No registrado';
    try {
      // Try to parse and format the date
      return attendance;
    } catch {
      return attendance;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-4 sm:p-5 hover:shadow-lg active:shadow-xl transition-all border-l-4 ${isCheckedIn ? 'border-green-500' : 'border-blue-500'}`}>
      {/* Header con nombre e icono */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0 pr-3">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              {participant.fullName || 'Sin nombre'}
            </h3>
          </div>

          {participant.companyName && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-1">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{participant.companyName}</span>
            </div>
          )}

          {participant.email && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{participant.email}</span>
            </div>
          )}
        </div>

        {/* Icono de estado más grande y visible */}
        <div className="flex-shrink-0">
          {isCheckedIn ? (
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          ) : (
            <div className="p-2 bg-gray-100 rounded-full">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Footer con badge y botón */}
      <div className="flex items-center justify-between gap-3 mt-3 sm:mt-4 pt-3 border-t border-gray-200">
        <div className="flex-1 min-w-0">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}>
            {isCheckedIn ? 'Registrado' : participant.status || 'Pendiente'}
          </span>
          {isCheckedIn && (
            <p className="text-xs text-gray-500 mt-1.5 truncate">
              {formatAttendance(participant.attendance)}
            </p>
          )}
        </div>

        {/* Botón de check-in más grande y táctil */}
        {!isCheckedIn && (
          <button
            onClick={() => onCheckIn(participant)}
            className="px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow flex-shrink-0"
          >
            Check-in
          </button>
        )}
      </div>

      {/* QR Code UUID - Opcional */}
      {participant.qrCodeUuid && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-mono truncate">
            QR: {participant.qrCodeUuid}
          </p>
        </div>
      )}
    </div>
  );
};

export default ParticipantCard;
