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
    <div className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4 ${isCheckedIn ? 'border-green-500' : 'border-gray-300'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">{participant.fullName || 'Sin nombre'}</h3>
          </div>

          {participant.companyName && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Building2 className="w-4 h-4" />
              <span>{participant.companyName}</span>
            </div>
          )}

          {participant.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="truncate">{participant.email}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          {isCheckedIn ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Clock className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-200">
        <div className="flex-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}>
            {isCheckedIn ? 'Registrado' : participant.status || 'Pendiente'}
          </span>
          {isCheckedIn && (
            <p className="text-xs text-gray-500 mt-1">
              {formatAttendance(participant.attendance)}
            </p>
          )}
        </div>

        {!isCheckedIn && (
          <button
            onClick={() => onCheckIn(participant)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Check-in
          </button>
        )}
      </div>

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
