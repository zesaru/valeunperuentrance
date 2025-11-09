import { X, CheckCircle, User, Building2, Mail, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const CheckInModal = ({ participant, onConfirm, onCancel, loading }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (participant) {
      setIsAnimating(true);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [participant]);

  if (!participant) return null;

  // Gestión de gestos de deslizar hacia abajo para cerrar (solo móvil)
  const handleTouchStart = (e) => {
    if (loading) return;
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || loading) return;
    const delta = e.touches[0].clientY - startY;
    if (delta > 0) {
      setCurrentY(delta);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || loading) return;
    setIsDragging(false);
    // Si se deslizó más de 100px, cerrar el modal
    if (currentY > 100) {
      onCancel();
    }
    setCurrentY(0);
  };

  const modalTransform = isDragging ? `translateY(${currentY}px)` : 'translateY(0)';

  return (
    <>
      {/* Overlay con fade in */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
          isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={loading ? undefined : onCancel}
      />

      {/* Bottom Sheet - Móvil / Modal centrado - Desktop */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
        <div
          className={`bg-white w-full sm:max-w-lg sm:w-full pointer-events-auto
            rounded-t-3xl sm:rounded-2xl shadow-2xl
            transform transition-transform duration-300 ease-out
            ${isAnimating ? 'translate-y-0' : 'translate-y-full sm:translate-y-0'}
            ${isAnimating ? 'sm:scale-100' : 'sm:scale-95'}
            max-h-[90vh] sm:max-h-[85vh] flex flex-col
          `}
          style={{ transform: modalTransform }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Handle de arrastre - Solo móvil */}
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2.5 sm:p-3 bg-blue-100 rounded-full">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Confirmar Check-in</h2>
            </div>
            <button
              onClick={onCancel}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 active:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading}
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 sm:py-6">
            <div className="space-y-4 sm:space-y-5">
              {/* Nombre */}
              <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <User className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Nombre completo</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-900">{participant.fullName}</p>
                </div>
              </div>

              {/* Empresa */}
              {participant.companyName && (
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <Building2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Empresa</p>
                    <p className="text-base text-gray-900">{participant.companyName}</p>
                  </div>
                </div>
              )}

              {/* Email */}
              {participant.email && (
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-sm sm:text-base text-gray-900 break-words">{participant.email}</p>
                  </div>
                </div>
              )}

              {/* QR Code */}
              {participant.qrCodeUuid && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs text-blue-700 font-medium mb-1.5">Código QR</p>
                  <p className="text-xs sm:text-sm font-mono text-blue-900 break-all">{participant.qrCodeUuid}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer con botones */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onCancel}
                disabled={loading}
                className="order-2 sm:order-1 flex-1 px-5 py-3.5 sm:py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-white active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="order-1 sm:order-2 flex-1 px-5 py-3.5 sm:py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Confirmar Check-in</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckInModal;
