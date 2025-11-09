import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME || 'Sheet1';

// Google Sheets API v4 base URL
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

/**
 * Fetch all participants from Google Sheets
 * @returns {Promise<Array>} Array of participant objects
 */
export const fetchParticipants = async () => {
  try {
    const range = `${SHEET_NAME}!A:J`; // Columns A through J (all data)
    const url = `${BASE_URL}/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

    const response = await axios.get(url);
    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    // First row is headers
    const headers = rows[0];
    const participants = [];

    // Process each row (skip header)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      participants.push({
        rowIndex: i + 1, // +1 because sheets are 1-indexed
        timestamp: row[0] || '',
        participating: row[1] || '',
        fullName: row[2] || '',
        companyName: row[3] || '',
        email: row[4] || '',
        column5: row[5] || '',
        column6: row[6] || '',
        qrCodeUuid: row[7] || '',
        status: row[8] || '',
        attendance: row[9] || ''
      });
    }

    return participants;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw new Error('Failed to fetch participants from Google Sheets');
  }
};

/**
 * Update participant status and attendance
 * Note: Google Sheets API v4 requires OAuth for write operations
 * This is a placeholder - you'll need to implement OAuth or use Apps Script
 * @param {number} rowIndex - Row index in the sheet (1-based)
 * @param {string} status - New status value
 * @param {string} attendance - New attendance timestamp
 */
export const updateParticipant = async (rowIndex, status, attendance) => {
  console.warn('Write operations require OAuth authentication');
  console.log('Update request:', { rowIndex, status, attendance });

  // For write operations, you have two main options:
  // 1. Implement OAuth 2.0 flow (more complex but secure)
  // 2. Use Google Apps Script as a middleware (simpler alternative)

  // Placeholder for OAuth implementation or Apps Script endpoint
  throw new Error('Write operations not yet configured. Please set up OAuth or Apps Script endpoint.');
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
