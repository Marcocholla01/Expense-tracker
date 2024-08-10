document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send POST request
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Parse response
      const result = await response.json();
      if (response.ok) {
        // Save user details to localStorage
        localStorage.setItem("user", JSON.stringify(result.user));

        // Display success message and redirect
        showToast("Login successful", "success");
        setTimeout(() => (window.location.href = "/"), 2000);
      } else {
        // Display error message
        showToast(result.message || "Login failed", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("An error occurred. Please try again.", "error");
    }
  });
