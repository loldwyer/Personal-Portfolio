document.addEventListener("DOMContentLoaded", function () {
    // EMAIL VALIDATION FUNCTION
    function validateEmail(email) {
        // Updated regex to ensure a valid suffix (e.g., .com, .org, .net)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // MESSAGE VALIDATION FUNCTION 
    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    // GENERAL FORM VALIDATION FUNCTION 
    function validateForm(form, event) {
        const name = form.querySelector(".comment-name, #feedback-name");
        const email = form.querySelector("#feedback-email, #email");
        const message = form.querySelector(".comment-text, #feedback-message");
        const errorMessage = form.querySelector(".error-message");

        let errors = [];

        // Validate Name
        if (name && name.value.trim() === "") {
            errors.push("⚠ Name is required!");
        }

        // Validate Email
        if (email) {
            const emailValue = email.value.trim();
            if (!validateEmail(emailValue)) {
                errors.push("⚠ Please enter a valid email address (e.g., user@example.com).");
            }
        }

        // Validate Message Length (Must be at least 10 characters)
        if (message) {
            if (!validateMessage(message.value.trim())) {
                errors.push("⚠ Message must be at least 10 characters long.");
            }
        }

        // Display errors or allow form submission
        if (errors.length > 0) {
            event.preventDefault(); // Block form submission
            errorMessage.innerHTML = errors.join("<br>"); // Show all errors in one place
            return false;
        }

        errorMessage.innerHTML = ""; // Clear previous error messages
        return true;
    }

    // FEEDBACK FORM SUBMISSION                   
    const feedbackForm = document.getElementById("feedback-form");
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (event) {
            if (!validateForm(feedbackForm, event)) {
                return; // Stop submission if validation fails
            }

            const name = document.getElementById("feedback-name").value.trim();
            const email = document.getElementById("feedback-email").value.trim();
            const message = document.getElementById("feedback-message").value.trim();

            // Save feedback in local storage
            let feedbackList = JSON.parse(localStorage.getItem("adminFeedback")) || [];
            feedbackList.push({ name, email, message, timestamp: new Date().toLocaleString() });
            localStorage.setItem("adminFeedback", JSON.stringify(feedbackList));

            feedbackForm.reset();
            alert("Feedback submitted successfully!");
            document.getElementById("thank-you").style.display = "block"; // Show thank-you message
            feedbackForm.style.display = "none"; // Hide form
        });
    }

    document.getElementById("feedback-form").addEventListener("submit", function (e) {
        e.preventDefault();
    
        let name = document.getElementById("feedback-name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("feedback-message").value;
    
        if (!name || !email || !message) {
            alert("⚠ Please fill out all fields.");
            return;
        }
    
        // Save feedback to localStorage
        let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];
        feedbackList.push({ name, email, message, timestamp: new Date().toLocaleString() });
        localStorage.setItem("feedbacks", JSON.stringify(feedbackList));
    
        // Notify Admin Dashboard of new feedback
        localStorage.setItem("newFeedback", "true");
    
        document.getElementById("feedback-form").style.display = "none";
        document.getElementById("thank-you").style.display = "block";
    });

 });