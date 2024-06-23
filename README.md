# Google App Scripts

Google App Scripts repository. This collection of Script files, written in JavaScript, aims to provide helpful scripts for various tasks.

## Scripts

### 1. sendMassEmails

This script sends personalized emails to different users with the same email body but different data. The script uses placeholders to insert user-specific data into the email template.

#### Example Email Template:
Hello %name%,

We Hope you are doing well!

Please follow the following link to access your Profile page on our website:
http://website-link

Use the following username and password:
Username: %data%
Password: %data%

Best regards,

This is an automated message, please do not reply to it



### 2. hideAndProtectRangesBasedOnWeeks

This script hides and protects spreadsheet ranges that fall outside the current week. It ensures that only the data for the current week is visible and editable, protecting past and future weeks.
This is my table set up for better visualization:
<img width="1227" alt="HideAndProtectRangesScheme" src="https://github.com/nourelhodamh/Google-App-Scripts/assets/24853068/9fa26f5d-0043-4b3d-aa3e-fda4329084d9">

To run this code automatically every week, you must set a trigger. You can do this easily using the Google Apps Script web interface and configure it based on your flow. Below are the screenshots of how I configured my trigger:

<img width="1000" alt="Screen Shot 2024-06-22 at 4 33 40 PM" src="https://github.com/nourelhodamh/Google-App-Scripts/assets/24853068/91582563-b1b6-40d1-8757-e1cdb7716b62">
<img width="726" alt="Screen Shot 2024-06-22 at 4 34 07 PM" src="https://github.com/nourelhodamh/Google-App-Scripts/assets/24853068/1e7d0b68-af5d-4528-b457-919f104663f7">

---
Feel free to explore and use these scripts. I hope you find them helpful. Since I'm still learning, I welcome any recommendations or feedback you may have!

