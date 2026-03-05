import { auth } from "./firebase-config.js";
import { sendPasswordResetEmail } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const form = document.getElementById("forgotForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();

  try {
    await sendPasswordResetEmail(auth, email);
    alert("✅ Password reset link sent to your email!");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});