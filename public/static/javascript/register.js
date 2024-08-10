document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send POST request
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Parse response
      const result = await response.json();
      if (response.ok) {
        // Display success message and redirect
        showToast("Registration successful", "success");
        setTimeout(() => (window.location.href = "/login"), 2000); // Redirect to login page
      } else {
        // Display error message
        showToast(result.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("An error occurred. Please try again.", "error");
    }
  });
