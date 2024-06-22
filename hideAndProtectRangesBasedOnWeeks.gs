/** This code is part of an employee timesheet project for my department. Its main purpose is to define a specific range for employees to submit their work within the current week while protecting data from past and future weeks.*/



/** Function to find range for the current week, Range of weeks before current week,Range of weeks after current week */
function hideColumnsOutsideCurrentWeek() {
  // Remove old protections to prevent overlapping and redundancy
  removeProtectionFromAllSheet();

  // Get the spreadsheet and sheet object
  const sheet = SpreadsheetApp.getActiveSheet();

  // Get today's date and day of the week
  const today = new Date();
  const day = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the first day of the current week
  const firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day);

  // Get the index of the first column containing dates
  const datesFirstColIndex = sheet.getRange("I1").getColumnIndex(); //replace it with the starting index of your weeks
  // Find the index of the first day of the week
  let everyWeekStartDate = -1;
  for (let col = 1; col <= sheet.getLastColumn(); col++) {
    const date = sheet.getRange(1, col).getValue();
    if (date instanceof Date && date.toDateString() === firstDay.toDateString()) {
      everyWeekStartDate = col;
      break;
    }
  }
  // Log the index of the first day of the week
  Logger.log("Index of the first day of the week: " + everyWeekStartDate);

  // Calculate the start and end column indices of the current week
  const currentWeekStartIndex = everyWeekStartDate - 1; // Adjusting to 0-based index
  const currentWeekEndIndex = currentWeekStartIndex + 6; // Assuming a week has 7 days

  // Get the range for the current week
  const currentWeekRange = sheet.getRange(1, currentWeekStartIndex + 1, sheet.getMaxRows(), currentWeekEndIndex - currentWeekStartIndex + 1); // Adjusting to 1-based index
  // Log the A1 notation of the current week range
  Logger.log("Range of the current week: " + currentWeekRange.getA1Notation() + ", currentWeekStartIndex: " + currentWeekStartIndex + ", currentWeekEndIndex: " + currentWeekEndIndex);

  // Range of weeks before current week
  const weeksBeforeRange = sheet.getRange(1, datesFirstColIndex, sheet.getMaxRows(), currentWeekStartIndex - datesFirstColIndex + 1);
  Logger.log('weeksBefore: ' + weeksBeforeRange.getA1Notation());

  // Range of weeks after current week
  const weeksAfterRange = sheet.getRange(1, currentWeekEndIndex + 2, sheet.getMaxRows(), sheet.getLastColumn() - (currentWeekEndIndex + 2) + 1);
  Logger.log('weeksAfter: ' + weeksAfterRange.getA1Notation());

  // Call function to protect and hide the ranges
  protectAndHideRanges(weeksBeforeRange, weeksAfterRange, currentWeekRange);
}


/** Function to protect and hide ranges */
function protectAndHideRanges(weeksBeforeRange, weeksAfterRange, currentWeekRange) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Protect and hide weeks before range
    if (weeksBeforeRange) {
      const weeksBeforeProtection = weeksBeforeRange.protect().setDescription("Protected Weeks Before");
      weeksBeforeProtection.removeEditors(weeksBeforeProtection.getEditors());
      const startColumnBefore = weeksBeforeRange.getColumn();
      const endColumnBefore = weeksBeforeRange.getLastColumn();
      sheet.hideColumns(startColumnBefore, endColumnBefore - startColumnBefore + 1); // Hide columns before weeksBeforeRange
    } else {
      throw new Error("Weeks before range is null or undefined.");
    }

    // Protect and hide weeks after range
    if (weeksAfterRange) {
      const weeksAfterProtection = weeksAfterRange.protect().setDescription("Protected Weeks After");
      weeksAfterProtection.removeEditors(weeksAfterProtection.getEditors());
      const startColumnAfter = weeksAfterRange.getColumn();
      const endColumnAfter = weeksAfterRange.getLastColumn();
      sheet.hideColumns(startColumnAfter, endColumnAfter - startColumnAfter + 1); // Hide columns after weeksAfterRange
    } else {
      throw new Error("Weeks after range is null or undefined.");
    }

    // Get all protections applied to the sheet
    const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);

    // Loop over each protection to choose which range to remove protection of
    protections.forEach(function (protection) {
      const range = protection.getRange();
      // Check if the protection range matches the current week range
      if (currentWeekRange && range.getRow() === currentWeekRange.getRow() &&
        range.getLastRow() === currentWeekRange.getLastRow() &&
        range.getColumn() === currentWeekRange.getColumn() &&
        range.getLastColumn() === currentWeekRange.getLastColumn()) {
        // Remove protection from the current week range
        protection.remove();
        // Add the desired editor to the current week range
        // const editors = ['user1@gmail.com', 'user2@example.com', 'user3@example.com']; // List of users to add as editors
        // currentWeekRange.protect().addEditors(editors);
        currentWeekRange.protect().addEditor('yourEmail@gmail.com');
      }
    });
  } catch (error) {
    console.error("Error in protectAndHideRanges function:", error);
  }
}


/** Function to remove all protected ranges */
function removeProtectionFromAllSheet() {
  Logger.log("removeProtectionFromAllSheet")
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  if (protections) {
    protections.forEach(function (protection) {
      protection.remove();
      console.log(protection.getRange().getA1Notation());
    });
    Logger.log("Protection removed");
    Logger.log("----------------------------------------------------------------------");
  }
}
