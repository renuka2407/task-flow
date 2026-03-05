import { auth, db } from "./firebase-config.js";
import { 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { 
  doc, setDoc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const department = document.getElementById("department").value.trim();
  const role = document.getElementById("role").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // 🔥 Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // 🔥 Save user in Firestore with UID
    await setDoc(doc(db, "users", user.uid), {
      fullname: fullname,
      email: email,
      phone: phone,
      department: department,
      role: role, // intern or supervisor
      createdAt: new Date()
    });

    alert("Account created successfully!");

    // Redirect based on role
    if (role === "supervisor") {
      window.location.href = "login.html";
    } else {
      window.location.href = "login.html";
    }

  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  }
});