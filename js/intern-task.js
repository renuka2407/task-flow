import { auth, db } from "./firebase-config.js";
import { collection, query, where, onSnapshot, updateDoc, doc } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

auth.onAuthStateChanged((user) => {
  if (user) {
    const taskTableBody = document.querySelector("#taskTable tbody");

    const q = query(
      collection(db, "tasks"),
      where("internId", "==", user.uid)
    );
    
    onSnapshot(q, (snapshot) => {
      taskTableBody.innerHTML = "";

      let total = 0, completed = 0, pending = 0;

      if (snapshot.empty) {
        taskTableBody.innerHTML = `<tr><td colspan="6">No tasks assigned yet.</td></tr>`;
        document.getElementById("totalTasks").textContent = 0;
        document.getElementById("completedTasks").textContent = 0;
        document.getElementById("pendingTasks").textContent = 0;
        return;
      }

      snapshot.forEach((docSnap) => {
        total++;
        const data = docSnap.data();
        if (data.status === "Completed") completed++;
        else pending++;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${data.taskTitle}</td>
          <td>${data.taskDesc}</td>
          <td>${data.deadline}</td>
          <td>${data.priority}</td>
          <td>${data.status}</td>
          <td><button class="complete-btn" data-id="${docSnap.id}">Mark Complete ✅</button></td>
        `;
        taskTableBody.appendChild(row);
      });

      document.getElementById("totalTasks").textContent = total;
      document.getElementById("completedTasks").textContent = completed;
      document.getElementById("pendingTasks").textContent = pending;
    });

    // ✅ Mark Task as Completed (outside onSnapshot)
    document.querySelector("#taskTable").addEventListener("click", async (e) => {
      if (e.target.classList.contains("complete-btn")) {
        const id = e.target.dataset.id;
        try {
          await updateDoc(doc(db, "tasks", id), { status: "Completed" });
          alert("✅ Task marked as completed!");
        } catch (error) {
          console.error("Error updating task:", error);
          alert("Failed to mark task complete.");
        }
      }
    });

  } else {
    alert("Please log in again.");
    window.location.href = "login.html";
  }
});

// ✅ Logout
const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout Error:", error);
  }
});
