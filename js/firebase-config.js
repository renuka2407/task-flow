// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNUSGRgu0L4AMcw-YAbLltBXG7dT2cJYU",
  authDomain: "task-flow-cddb0.firebaseapp.com",
  projectId: "task-flow-cddb0",
  storageBucket: "task-flow-cddb0.firebasestorage.app",
  messagingSenderId: "1027853014979",
  appId: "1:1027853014979:web:9026d9c75eeea05970cf76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
