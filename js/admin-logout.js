document.addEventListener("DOMContentLoaded", () => {
    
    const logoutButton = document.getElementById("logout-button");

    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            localStorage.removeItem("isAdminLoggedIn"); // Remove login session
            window.location.href = "index.html"; // Redirect to login page
        });
    }
});