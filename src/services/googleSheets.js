import axios from 'axios';

// Google Apps Script Web App URL
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

/**
 * Fetch all participants from Google Sheets via Apps Script
 * @returns {Promise<Array>} Array of participant objects
 */
export const fetchParticipants = async () => {
  if (!APPS_SCRIPT_URL) {
    throw new Error('Apps Script URL not configured. Please set VITE_APPS_SCRIPT_URL in .env file');
  }

  try {
    const response = await axios.post(APPS_SCRIPT_URL, {
      action: 'getParticipants'
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch participants');
    }

    return response.data.data.participants || [];
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw new Error('Failed to fetch participants from Google Sheets');
  }
};

/**
 * Search participant by QR Code UUID
 * @param {Array} participants - Array of all participants
 * @param {string} uuid - QR Code UUID to search for
 * @returns {Object|null} Participant object or null if not found
 */
export const findParticipantByQR = (participants, uuid) => {
  return participants.find(p => p.qrCodeUuid === uuid) || null;
};

/**
 * Search participants by name or email
 * @param {Array} participants - Array of all participants
 * @param {string} query - Search query
 * @returns {Array} Filtered participants
 */
export const searchParticipants = (participants, query) => {
  if (!query || query.trim() === '') {
    return participants;
  }

  const lowerQuery = query.toLowerCase();
  return participants.filter(p =>
    p.fullName.toLowerCase().includes(lowerQuery) ||
    p.email.toLowerCase().includes(lowerQuery) ||
    p.companyName.toLowerCase().includes(lowerQuery)
  );
};
