import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    // 🔐 Sign in with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 📄 Fetch user data from Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("User data not found in database.");
      return;
    }

    const userData = userSnap.data();
    const role = userData.role;

    alert("Login successful!");

    // 🚀 Redirect based on role
    if (role === "supervisor") {
      window.location.href = "mentor.html";
    } 
    else if (role === "intern") {
      window.location.href = "intern.html";
    } 
    else {
      alert("Unknown role detected.");
    }

  } catch (error) {
    if (error.code === "auth/user-not-found") {
      alert("User not found. Please sign up first.");
    } 
    else if (error.code === "auth/wrong-password") {
      alert("Incorrect password.");
    } 
    else {
      alert("Login failed: " + error.message);
    }
  }
});