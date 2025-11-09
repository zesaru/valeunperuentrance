import axios from 'axios';

// Google Apps Script Web App URL - to be deployed separately
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

/**
 * Update participant status and attendance using Google Apps Script
 * @param {number} rowIndex - Row index in the sheet (1-based)
 * @param {string} status - New status value
 * @param {string} attendance - New attendance timestamp
 * @returns {Promise<Object>} Update result
 */
export const updateParticipantViaAppsScript = async (rowIndex, status, attendance) => {
  if (!APPS_SCRIPT_URL) {
    throw new Error('Apps Script URL not configured. Please set VITE_APPS_SCRIPT_URL in .env file');
  }

  try {
    const response = await axios.post(APPS_SCRIPT_URL, {
      action: 'updateParticipant',
      rowIndex,
      status,
      attendance
    });

    return response.data;
  } catch (error) {
    console.error('Error updating participant via Apps Script:', error);
    throw new Error('Failed to update participant');
  }
};

/**
 * Batch update multiple participants
 * @param {Array} updates - Array of update objects {rowIndex, status, attendance}
 * @returns {Promise<Object>} Batch update result
 */
export const batchUpdateParticipants = async (updates) => {
  if (!APPS_SCRIPT_URL) {
    throw new Error('Apps Script URL not configured');
  }

  try {
    const response = await axios.post(APPS_SCRIPT_URL, {
      action: 'batchUpdate',
      updates
    });

    return response.data;
  } catch (error) {
    console.error('Error batch updating participants:', error);
    throw new Error('Failed to batch update participants');
  }
};
