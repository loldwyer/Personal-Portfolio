document.addEventListener("DOMContentLoaded", function () {
    // Tooltip Hover Event
    const images = document.querySelectorAll(".project-image");
    images.forEach(img => {
        img.addEventListener("mouseover", function () {
            img.title = "Click to enlarge!";
        });
    });

    // Confirmation Alert Before Feedback Submission
    const feedbackForm = document.getElementById("feedback-form");
    feedbackForm.addEventListener("submit", function (event) {
        if (!confirm("Are you sure you want to submit this feedback?")) {
            event.preventDefault();
        }
    });

    // Disable Right-Click on Resume Page
    if (document.title.includes("Resume")) {
        document.addEventListener("contextmenu", function (event) {
            alert("Right-click is disabled on this page.");
            event.preventDefault();
        });
    }
});
