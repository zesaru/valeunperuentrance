import { useState } from 'react';
import { RefreshCw, QrCode, Users } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gestión de Eventos
                </h1>
                <p className="text-sm text-gray-500">Panel de control para staff</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setScannerOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                <QrCode className="w-5 h-5" />
                <span className="hidden sm:inline">Escanear QR</span>
              </button>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg ${
            notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
            notification.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
            'bg-yellow-50 text-yellow-800 border border-yellow-200'
          }`}>
            <p className="font-medium">{notification.message}</p>
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
    </div>
  );
}

export default App;
