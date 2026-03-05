import { auth, db } from "./firebase-config.js";
import {
  collection,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

let chartInstance = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const q = query(
    collection(db, "tasks"),
    where("internId", "==", user.uid)
  );

  onSnapshot(q, (snapshot) => {
    let completed = 0;
    let pending = 0;
    let ongoing = 0;

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      if (data.status === "Completed") completed++;
      else if (data.status === "Pending") pending++;
      else ongoing++;
    });

    const total = completed + pending + ongoing;

    // ✅ Update cards
    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("ongoingTasks").textContent = ongoing;

    updateChart(completed, pending, ongoing, total);
  });
});

function updateChart(completed, pending, ongoing, total) {
  const ctx = document.getElementById("progressChart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Pending", "Ongoing"],
      datasets: [
        {
          label: "Task Progress",
          data: [completed, pending, ongoing],
          backgroundColor: ["#28a745", "#ffc107", "#007bff"],
          borderWidth: 2,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Task Completion Overview",
        },
      },
    },
  });

  const tip = document.querySelector(".tip p");

  if (total === 0) {
    tip.textContent = "No tasks assigned yet.";
    return;
  }

  const completionRate = Math.round((completed / total) * 100);

  if (completionRate >= 80) {
    tip.textContent = `🌟 Excellent! You've completed ${completionRate}% of your tasks!`;
  } else if (completionRate >= 50) {
    tip.textContent = `👍 Keep going! You've finished ${completionRate}%.`;
  } else {
    tip.textContent = `💪 You’ve completed ${completionRate}%. Keep pushing!`;
  }
}