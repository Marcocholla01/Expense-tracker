async function logout() {
  try {
    const response = await fetch("/api/v1/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (response.ok) {
      // Clear user details from localStorage
      localStorage.removeItem("user");
      showToast("Successfully logged out. Redirecting...", "success"); // Show success toast
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page
      }, 2000); // Redirect after 2 seconds
    } else {
      showToast(result.message || "Logout failed", "error"); // Show error toast
    }
  } catch (error) {
    console.error("Error:", error);
    showToast("An error occurred during logout. Please try again.", "error"); // Show error toast
  }
}
