import { X, CheckCircle, User, Building2, Mail } from 'lucide-react';

const CheckInModal = ({ participant, onConfirm, onCancel, loading }) => {
  if (!participant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={loading}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Confirmar Check-in</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-600">Nombre completo</p>
              <p className="text-lg font-semibold text-gray-900">{participant.fullName}</p>
            </div>
          </div>

          {participant.companyName && (
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Empresa</p>
                <p className="text-base text-gray-900">{participant.companyName}</p>
              </div>
            </div>
          )}

          {participant.email && (
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-base text-gray-900">{participant.email}</p>
              </div>
            </div>
          )}

          {participant.qrCodeUuid && (
            <div className="bg-gray-50 rounded p-3">
              <p className="text-xs text-gray-500 mb-1">Código QR</p>
              <p className="text-sm font-mono text-gray-700 break-all">{participant.qrCodeUuid}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Procesando...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Confirmar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
