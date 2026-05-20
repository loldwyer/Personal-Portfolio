document.addEventListener("DOMContentLoaded", function () {
    const profileToggle = document.getElementById("profile-toggle");
    const profileMenu = document.getElementById("profile-menu");

    if (profileToggle && profileMenu) {
        profileToggle.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents click from closing immediately
            profileMenu.classList.toggle("active");
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
            if (!profileToggle.contains(event.target) && !profileMenu.contains(event.target)) {
                profileMenu.classList.remove("active");
            }
        });
    } else {
        console.error("Profile toggle or menu not found! Ensure the IDs are correct.");
    }
});
