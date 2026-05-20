
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Redirect logged-in users to dashboard
    if (localStorage.getItem("isAdminLoggedIn") === "true") {
        window.location.href = "admin-dashboard.html";
        return;
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            let loginError = document.getElementById("loginError");

            if (!loginError) {
                loginError = document.createElement("p");
                loginError.id = "loginError";
                loginError.style.color = "red";
                loginForm.appendChild(loginError);
            }

            if (username === "admin" && password === "1234") {
                localStorage.setItem("isAdminLoggedIn", "true");

                // Smooth transition to dashboard
                loginError.textContent = "Logging in...";
                setTimeout(() => {
                    window.location.href = "admin-dashboard.html";
                }, 1000);
            } else {
                loginError.textContent = "Invalid username or password!";
            }
        });
    }
});

