# Scaler Interview Scheduler
Scheduler application to help organizations schedule meetings
## Features
- SCHEDULE, UPDATE, CANCEL Meetings
- View Scheduled meetings
- Attachments upload and Download
- Email Notification

## Local Setup Instructions
- Open your terminal and then type: $ git clone git@github.com:AayushKShrivastava/Scaler-Interview-Scheduler.git to clones the repository
- Open the cloned repository in vscode.
- cd into the backend folder: $ cd backend
- Run: npm install
- .ENV file setup to start Email Notification service
    - Open src/.ENV file
    - Enter a valid Email ID in ADMIN_EMAILID field 
    - Enter the corressponding Email ID's password in the PASSWORD field
- Run: npm run dev to start the server
- Now open a new terminal and run: cd frontend
- Run: npm install
- Run: npm start to start the react app

## Technology Used
- Node.js
- Express.js
- MongoDb
- Mongoose
- React
- Heroku
- Netlify

