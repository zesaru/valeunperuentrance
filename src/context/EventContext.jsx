import { createContext, useContext, useState, useEffect } from 'react';
import { fetchParticipants, searchParticipants as searchParticipantsUtil } from '../services/googleSheets';
import { updateParticipantViaAppsScript } from '../services/googleSheetsWriter';
import { format } from 'date-fns';

const EventContext = createContext();

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    checkedIn: 0,
    pending: 0
  });

  // Load participants on mount
  useEffect(() => {
    loadParticipants();
  }, []);

  // Update filtered participants when search query changes
  useEffect(() => {
    const filtered = searchParticipantsUtil(participants, searchQuery);
    setFilteredParticipants(filtered);
  }, [searchQuery, participants]);

  // Update stats when participants change
  useEffect(() => {
    calculateStats();
  }, [participants]);

  const loadParticipants = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchParticipants();
      setParticipants(data);
      setFilteredParticipants(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading participants:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkInParticipant = async (participant, customStatus = 'Checked In') => {
    try {
      const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      // Update via Apps Script
      await updateParticipantViaAppsScript(
        participant.rowIndex,
        customStatus,
        timestamp
      );

      // Update local state
      setParticipants(prev =>
        prev.map(p =>
          p.rowIndex === participant.rowIndex
            ? { ...p, status: customStatus, attendance: timestamp }
            : p
        )
      );

      return { success: true, timestamp };
    } catch (err) {
      console.error('Error checking in participant:', err);
      throw err;
    }
  };

  const updateParticipantStatus = async (participant, newStatus) => {
    try {
      await updateParticipantViaAppsScript(
        participant.rowIndex,
        newStatus,
        participant.attendance
      );

      // Update local state
      setParticipants(prev =>
        prev.map(p =>
          p.rowIndex === participant.rowIndex
            ? { ...p, status: newStatus }
            : p
        )
      );

      return { success: true };
    } catch (err) {
      console.error('Error updating participant status:', err);
      throw err;
    }
  };

  const calculateStats = () => {
    const total = participants.length;
    const checkedIn = participants.filter(p => p.attendance && p.attendance.trim() !== '').length;
    const pending = total - checkedIn;

    setStats({ total, checkedIn, pending });
  };

  const value = {
    participants,
    filteredParticipants,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    stats,
    loadParticipants,
    checkInParticipant,
    updateParticipantStatus
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
