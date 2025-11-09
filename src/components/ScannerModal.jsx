import { X, QrCode } from 'lucide-react';
import QRScanner from './QRScanner';

const ScannerModal = ({ isOpen, onClose, onScanSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-full">
            <QrCode className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Escanear Código QR</h2>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-center mb-4">
            Apunta la cámara al código QR del participante
          </p>
        </div>

        <QRScanner
          onScanSuccess={(decodedText) => {
            onScanSuccess(decodedText);
            onClose();
          }}
          onScanError={(error) => {
            console.error('Scan error:', error);
          }}
        />

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScannerModal;
