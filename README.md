# Task Flow – Internship Task Tracker

Task Flow is a web-based internship task management system designed to help mentors assign tasks and track the progress of interns.
It allows mentors to create tasks, interns to view assigned tasks, and both users to monitor progress efficiently.


##  Features

* User Authentication (Signup / Login)
* Forgot Password & Reset Password
* Mentor Task Creation
* Intern Task Viewing
* Task Progress Tracking
* Secure Firebase Authentication
* Firestore Database Integration
* Responsive UI Design



##  Technologies Used

Frontend:

* HTML
* CSS
* JavaScript

Backend / Database:

* Firebase Authentication
* Firebase Firestore

Development Tools:

* Visual Studio Code
* Git
* GitHub



##  Project Structure

```
project-folder
│
├── css
│   ├── login.css
│   ├── signup.css
│   ├── progress.css
│   └── intern.css
│
├── js
│   ├── firebase-config.js
│   ├── login.js
│   ├── signup.js
│   ├── progress.js
│   └── resetpass.js
│
├── homepage.html
├── login.html
├── signup.html
├── fpass.html
├── resetpass.html
├── mentor.html
├── intern.html
├── internprogress.html
│
└── README.md
```


##  Setup Instructions

Follow these steps to run the project locally:

1. Clone the repository

```
git clone https://github.com/yourusername/task-flow.git
```

2. Open the project in VS Code.

3. Make sure you have an internet connection because Firebase runs online.

4. Open `homepage.html` or `login.html` in a browser.

5. Create a new account using Signup.

6. Start using the Task Flow system.



##  Firebase Configuration

This project uses Firebase for authentication and database.

Steps:

1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Copy Firebase config into `firebase-config.js`



##  Author

Designed and developed by **Renuka Raut**



##  License

This project is created for educational purposes.