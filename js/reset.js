document.getElementById("resetForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmNewPassword = document.getElementById("confirmNewPassword").value.trim();
  const resetEmail = localStorage.getItem("resetEmail");
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (newPassword !== confirmNewPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (savedUser && savedUser.email === resetEmail) {
    savedUser.password = newPassword;
    localStorage.setItem("user", JSON.stringify(savedUser));
    localStorage.removeItem("resetEmail");

    alert("Password reset successful! Please login again.");
    window.location.href = "login.html";
  } else {
    alert("Error: No user found to reset password.");
  }
});
