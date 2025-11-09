import { X, QrCode, Scan } from 'lucide-react';
import { useEffect, useState } from 'react';
import QRScanner from './QRScanner';

const ScannerModal = ({ isOpen, onClose, onScanSuccess }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Full Screen en Móvil / Modal en Desktop */}
      <div
        className={`fixed inset-0 z-50 bg-gray-900 sm:bg-black sm:bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Contenedor Principal */}
        <div className={`
          w-full h-full sm:h-auto sm:max-w-2xl sm:w-full
          bg-gray-900 sm:bg-white sm:rounded-2xl sm:shadow-2xl
          flex flex-col
          transform transition-all duration-300 ease-out
          ${isAnimating ? 'scale-100' : 'scale-95'}
        `}>
          {/* Header - Móvil Full Screen */}
          <div className="bg-gray-900 sm:bg-white px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-gray-800 sm:border-gray-200">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 sm:p-3 bg-purple-600 sm:bg-purple-100 rounded-full">
                <QrCode className="w-6 h-6 sm:w-7 sm:h-7 text-white sm:text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-white sm:text-gray-900">
                  Escanear QR
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 sm:text-gray-500 sm:hidden">
                  Apunta al código QR
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-gray-800 sm:bg-gray-100 hover:bg-gray-700 sm:hover:bg-gray-200 active:bg-gray-600 sm:active:bg-gray-300 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-white sm:text-gray-700" />
            </button>
          </div>

          {/* Instrucciones - Solo Desktop */}
          <div className="hidden sm:block px-6 py-4 bg-purple-50 border-b border-purple-100">
            <p className="text-center text-purple-900 font-medium flex items-center justify-center gap-2">
              <Scan className="w-5 h-5" />
              Apunta la cámara al código QR del participante
            </p>
          </div>

          {/* Scanner Area - Full height en móvil */}
          <div className="flex-1 bg-black flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            {/* Guías visuales del scanner */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                {/* Esquinas del marco de escaneo */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-purple-500 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-purple-500 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-purple-500 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-purple-500 rounded-br-2xl"></div>

                {/* Línea de escaneo animada */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-scan"></div>
              </div>
            </div>

            {/* Componente Scanner */}
            <div className="w-full max-w-2xl">
              <QRScanner
                onScanSuccess={(decodedText) => {
                  onScanSuccess(decodedText);
                  onClose();
                }}
                onScanError={(error) => {
                  console.error('Scan error:', error);
                }}
              />
            </div>
          </div>

          {/* Footer - Botón Cancelar más prominente en móvil */}
          <div className="bg-gray-900 sm:bg-white px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-800 sm:border-gray-200">
            <button
              onClick={onClose}
              className="w-full sm:w-auto sm:mx-auto sm:block px-6 py-3.5 sm:py-3
                bg-gray-800 sm:bg-white
                border-2 border-gray-700 sm:border-gray-300
                text-white sm:text-gray-700
                rounded-xl font-semibold
                hover:bg-gray-700 sm:hover:bg-gray-50
                active:bg-gray-600 sm:active:bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0;
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ScannerModal;
