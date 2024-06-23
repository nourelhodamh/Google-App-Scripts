const destinationFileURL = 'https://docs.google.com/spreadsheets/provideURLINK';// link for sheet you want to copy data to
const originalSourceFileURL = 'https://docs.google.com/spreadsheets/provideURLINK';// link for sheet you are copying data from

const sourceDateRange = 'D1:D274'; //defining range for date col in my sheet

const sourceActiveSheet = SpreadsheetApp.openByUrl(originalSourceFileURL);
const sourceSheet = sourceActiveSheet.getSheetByName("subsheetName");// Sheet name in the source file
var sourceSheetValues;

const destActiveSheet = SpreadsheetApp.openByUrl(destinationFileURL);
const destSheet = destActiveSheet.getSheetByName("subsheetName"); // Sheet name in the destination file
var destSheetValues;



/** 
 * This function retrieves all date values from the source spreadsheet 
 * and passes them to the todayRowNum function.
 */
function getDatesColumn() {
  var ssDateColumnValues = sourceSheet.getRange(sourceDateRange).getDisplayValues();
  todayRowNum(ssDateColumnValues);// pass dates to todayRowNum function
}

/** 
 * Function to retrieve today's date and format it to match the date format 
 * in the spreadsheet.
 */
function todaysDate() {
  var date = new Date();
  var today = Utilities.formatDate(date, "GMT+2", 'dd/M/yy');// adjust to match your date format in your spreadsheet
  return today;
}

/** 
 * Function that compares today's date with the dates in the sheet 
 * to retrieve today's row number.
 */
function todayRowNum(sourceSheetDateRangeValues) {
  var date = new Date();
  var day = date.getUTCDay();
  // Logger.log(day)
  // Logger.log("Today's date: "+todaysDate());
  if (day == 0) //adjust date to match the date you want to publish your data at if you will publish it manually 
  {
    for (var i = 0; i < sourceSheetDateRangeValues.length; i++) {
      if (sourceSheetDateRangeValues[i][0] == todaysDate()) {
        row = sourceSheetDateRangeValues[i];
        updateCurrentRange(i);
        // Logger.log("todayRowNum: Row value: " + row);
        // Logger.log("todayRowNum: Row num: " + i); // This is your row number
        break;
       
      }
    }
  } else {
    Logger.log("Today is not [whatever day you choose]!");
  }
}

/** 
 * Function to concatenate the row number with column letters 
 * to define the desired range.
 */
function updateCurrentRange(rowNum) {
  var newRow = rowNum + 1;
  var nextWeekRange = "A" + newRow + ":G" + (newRow + 13); //
  sourcetSpreadSheet(nextWeekRange);
  copyDataTodestinationSpreadSheet(nextWeekRange);

  Logger.log("getCurrentRange: New Row Num: " + newRow);
  Logger.log("getCurrentRange: " + nextWeekRange);
  return newRow;
}

/** 
 * Function to retrieve the desired data from the source sheet.
 */
function sourcetSpreadSheet(newDataRange) {
  sourceSheetValues = sourceSheet.getRange(newDataRange).getValues(); //get data from source sheet
}

/** 
 * Function to publish the retrieved data to the destination sheet.
 */
function copyDataTodestinationSpreadSheet(newDataRange) {
  destSheetValues = destSheet.getRange(newDataRange).setValues(sourceSheetValues);
}


