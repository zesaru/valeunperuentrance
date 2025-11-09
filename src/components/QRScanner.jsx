import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = ({ onScanSuccess, onScanError }) => {
  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!scannerRef.current) {
      return;
    }

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2,
      },
      false
    );

    const success = (decodedText, decodedResult) => {
      setIsScanning(false);
      if (onScanSuccess) {
        onScanSuccess(decodedText, decodedResult);
      }
      // Stop scanner after successful scan
      scanner.clear().catch(console.error);
    };

    const error = (errorMessage) => {
      // Don't log every scan error, only critical ones
      if (onScanError && !errorMessage.includes('No MultiFormat Readers')) {
        onScanError(errorMessage);
      }
    };

    scanner.render(success, error);
    setIsScanning(true);

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        id="qr-reader"
        ref={scannerRef}
        className="rounded-lg overflow-hidden shadow-lg"
      />
      {isScanning && (
        <p className="text-center mt-4 text-gray-600">
          Apunta la cámara al código QR
        </p>
      )}
    </div>
  );
};

export default QRScanner;
