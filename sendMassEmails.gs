function sendEmail() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var studentList = ss.getSheetByName('Enter your SubSheet Name');
  
  var cellRange="C13:G14"; //change the ragne as to match where did you place your data
  var dataRange = studentList.getRange(cellRange).getValues(); //
  Logger.log(dataRange);//log you data for assurance you are in the correct range

  var emailTemplateCell="A3"; //refrence to the cell where the emial body is written
  var emailTemplate = studentList.getRange(emailTemplateCell).getValue();


  var workEmail = GmailApp.getAliases();//To send emails from an aliased email instead of the registered one.
  Logger.log(workEmail); //check if you aliased email is the correct one


  for (var i = 0; i < dataRange.length; i++) {
    var emailSubject='XYZ' //Emails Subject
    var emailBody = emailTemplate 
      .replace("%name%", dataRange[i][0])
      .replace("%data%", dataRange[i][1])
      .replace("%data%", dataRange[i][2]);
   GmailApp.sendEmail(dataRange[i][3], emailSubject, emailBody, { 'from': workEmail[0] }); //to send emails from alias
   //MailApp.sendEmail(dataRange[i][3], dataRange[i][4], emailBody); // to send emails from your registerd(signed in/default) account
  }
  Logger.log(emailBody);

}
