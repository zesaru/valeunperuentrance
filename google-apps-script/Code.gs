/**
 * Google Apps Script for Event Management App
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Copy this entire code into Code.gs
 * 4. Click Deploy > New deployment
 * 5. Select type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy and copy the Web App URL
 * 9. Add the URL to your .env file as VITE_APPS_SCRIPT_URL
 */

// Configuration - Update these values
const SHEET_NAME = 'Sheet1'; // Change to your sheet name

/**
 * Handle POST requests from the web app
 */
function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const action = params.action;

    switch (action) {
      case 'updateParticipant':
        return updateParticipant(params);
      case 'batchUpdate':
        return batchUpdateParticipants(params);
      default:
        return createResponse(false, 'Unknown action');
    }
  } catch (error) {
    return createResponse(false, 'Error: ' + error.message);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'OK', message: 'Event Management API is running' })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Update a single participant's status and attendance
 */
function updateParticipant(params) {
  const { rowIndex, status, attendance } = params;

  if (!rowIndex) {
    return createResponse(false, 'Missing rowIndex');
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    return createResponse(false, 'Sheet not found: ' + SHEET_NAME);
  }

  // Update status (column I, index 9)
  if (status !== undefined && status !== null) {
    sheet.getRange(rowIndex, 9).setValue(status);
  }

  // Update attendance (column J, index 10)
  if (attendance !== undefined && attendance !== null) {
    sheet.getRange(rowIndex, 10).setValue(attendance);
  }

  return createResponse(true, 'Participant updated successfully', {
    rowIndex,
    status,
    attendance
  });
}

/**
 * Batch update multiple participants
 */
function batchUpdateParticipants(params) {
  const { updates } = params;

  if (!updates || !Array.isArray(updates)) {
    return createResponse(false, 'Invalid updates array');
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    return createResponse(false, 'Sheet not found: ' + SHEET_NAME);
  }

  let successCount = 0;
  const errors = [];

  updates.forEach((update, index) => {
    try {
      const { rowIndex, status, attendance } = update;

      if (status !== undefined && status !== null) {
        sheet.getRange(rowIndex, 9).setValue(status);
      }

      if (attendance !== undefined && attendance !== null) {
        sheet.getRange(rowIndex, 10).setValue(attendance);
      }

      successCount++;
    } catch (error) {
      errors.push({ index, error: error.message });
    }
  });

  return createResponse(true, `Updated ${successCount} participants`, {
    successCount,
    totalCount: updates.length,
    errors
  });
}

/**
 * Create a JSON response
 */
function createResponse(success, message, data = null) {
  const response = {
    success,
    message,
    timestamp: new Date().toISOString()
  };

  if (data) {
    response.data = data;
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
