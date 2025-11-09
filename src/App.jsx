import { useState, useEffect } from 'react';
import { RefreshCw, QrCode, Users, Menu, X } from 'lucide-react';
import { useEvent } from './context/EventContext';
import { findParticipantByQR } from './services/googleSheets';
import SearchBar from './components/SearchBar';
import StatsCard from './components/StatsCard';
import ParticipantList from './components/ParticipantList';
import CheckInModal from './components/CheckInModal';
import ScannerModal from './components/ScannerModal';

function App() {
  const {
    filteredParticipants,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    stats,
    loadParticipants,
    checkInParticipant,
    participants
  } = useEvent();

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detectar scroll para mostrar botón de volver arriba
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleCheckIn = async () => {
    if (!selectedParticipant) return;

    setCheckingIn(true);
    try {
      await checkInParticipant(selectedParticipant);
      showNotification(`✓ Check-in exitoso: ${selectedParticipant.fullName}`, 'success');
      setSelectedParticipant(null);
    } catch (err) {
      showNotification(`✗ Error en check-in: ${err.message}`, 'error');
    } finally {
      setCheckingIn(false);
    }
  };

  const handleQRScan = (decodedText) => {
    const participant = findParticipantByQR(participants, decodedText);

    if (!participant) {
      showNotification('✗ Participante no encontrado con este código QR', 'error');
      return;
    }

    if (participant.attendance && participant.attendance.trim() !== '') {
      showNotification(`ℹ ${participant.fullName} ya tiene check-in registrado`, 'warning');
      return;
    }

    setSelectedParticipant(participant);
  };

  const handleRefresh = async () => {
    try {
      await loadParticipants();
      showNotification('✓ Datos actualizados correctamente', 'success');
    } catch (err) {
      showNotification('✗ Error al actualizar datos', 'error');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Optimizado para Móvil */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo y Título - Móvil */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  Gestión de Eventos
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Panel de control para staff</p>
              </div>
            </div>

            {/* Botones Desktop - Ocultos en móvil */}
            <div className="hidden md:flex gap-3">
              <button
                onClick={() => setScannerOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-sm hover:shadow"
              >
                <QrCode className="w-5 h-5" />
                <span>Escanear QR</span>
              </button>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                <span>Actualizar</span>
              </button>
            </div>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        <div
          className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="px-3 py-4 space-y-2">
            <button
              onClick={() => {
                setScannerOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:scale-98 transition-all shadow-sm font-medium"
            >
              <QrCode className="w-5 h-5" />
              <span>Escanear código QR</span>
            </button>
            <button
              onClick={() => {
                handleRefresh();
                setMobileMenuOpen(false);
              }}
              disabled={loading}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm font-medium"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Actualizando...' : 'Actualizar datos'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay para menú móvil */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 sm:pb-8">
        {/* Notificación Optimizada para Móvil */}
        {notification && (
          <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg shadow-lg backdrop-blur-sm ${
            notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
            notification.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
            'bg-yellow-50 text-yellow-800 border border-yellow-200'
          } animate-in slide-in-from-top duration-300`}>
            <p className="font-medium text-sm sm:text-base">{notification.message}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">Error: {error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Intentar nuevamente
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <StatsCard stats={stats} />

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar por nombre, email o empresa..."
          />
        </div>

        {/* Participants List */}
        <ParticipantList
          participants={filteredParticipants}
          onCheckIn={setSelectedParticipant}
          loading={loading}
        />
      </main>

      {/* Modals */}
      <CheckInModal
        participant={selectedParticipant}
        onConfirm={handleCheckIn}
        onCancel={() => setSelectedParticipant(null)}
        loading={checkingIn}
      />

      <ScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleQRScan}
      />

      {/* Botón Flotante: Scroll to Top - Móvil */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 sm:p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all hover:shadow-xl"
          aria-label="Volver arriba"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Barra de Navegación Fija Inferior - Solo Móvil */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="grid grid-cols-2 gap-0">
          <button
            onClick={() => setScannerOpen(true)}
            className="flex flex-col items-center justify-center py-3 px-4 hover:bg-purple-50 active:bg-purple-100 transition-colors border-r border-gray-200"
          >
            <QrCode className="w-6 h-6 text-purple-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Escanear</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex flex-col items-center justify-center py-3 px-4 hover:bg-blue-50 active:bg-blue-100 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-6 h-6 text-blue-600 mb-1 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-xs font-medium text-gray-700">
              {loading ? 'Cargando' : 'Actualizar'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
