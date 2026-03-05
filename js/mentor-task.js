import { auth, db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  deleteDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import { signOut, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const taskForm = document.getElementById("taskForm");
const taskTableBody = document.querySelector("#taskTable tbody");

// Render task row
function renderTask(docSnap) {
  const data = docSnap.data();
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${data.internEmail}</td>
    <td>${data.taskTitle}</td>
    <td>${data.taskDesc}</td>
    <td>${data.deadline}</td>
    <td>${data.priority}</td>
    <td>${data.status}</td>
    <td><button class="delete-btn" data-id="${docSnap.id}">🗑️</button></td>
  `;

  taskTableBody.appendChild(row);
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // ✅ ASSIGN TASK WITH UID
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const internEmail = document.getElementById("internEmail").value.trim();
    const taskTitle = document.getElementById("taskTitle").value.trim();
    const taskDesc = document.getElementById("taskDesc").value.trim();
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;

    try {
      // 🔎 Find intern in users collection
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", internEmail)
      );

      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        alert("❌ Intern not found!");
        return;
      }

      const internDoc = querySnapshot.docs[0];
      const internId = internDoc.id;

      // 🔥 Create task
      await addDoc(collection(db, "tasks"), {
        internId: internId,
        internEmail: internEmail, // for display
        mentorId: user.uid,
        taskTitle,
        taskDesc,
        deadline,
        priority,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert("✅ Task Assigned Successfully!");
      taskForm.reset();

    } catch (error) {
      console.error("Error adding task:", error);
      alert(error.message);
    }
  });

  // ✅ Load only this mentor's tasks
  const q = query(
    collection(db, "tasks"),
    where("mentorId", "==", user.uid)
  );

  onSnapshot(q, (snapshot) => {
    taskTableBody.innerHTML = "";

    let total = 0, completed = 0, pending = 0;

    snapshot.forEach((docSnap) => {
      total++;
      const data = docSnap.data();
      if (data.status === "Completed") completed++;
      else pending++;
      renderTask(docSnap);
    });

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
  });
});

// DELETE TASK
taskTableBody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteDoc(doc(db, "tasks", id));
      alert("🗑️ Task deleted!");
    }
  }
});

// LOGOUT
document.querySelector(".logout-btn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});