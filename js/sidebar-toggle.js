// Sidebar menu
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("adminSidebar");
sidebar.style.transform = "translateX(-250px)"; // Hide initially
setTimeout(() => {
    sidebar.style.transition = "transform 0.5s ease-in-out";
    sidebar.style.transform = "translateX(0)";
}, 500);

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});