// Only allow access to the admin dasboard to logged in users (admin-only)
document.addEventListener("DOMContentLoaded", () => {
if (localStorage.getItem("isAdminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
    }
});


// Sidebar menu options
const panelOptions = document.querySelectorAll(".panel-option");

// Main Page of the Dashboard
const mainDashboardSection=document.getElementById("mainDashboard-section");
const mainDashboardButton = document.getElementById("mainDashboard");

// Feedback from feedback.html sent to the Admin Inbox
const adminInboxSection = document.getElementById("adminInbox-section");
const adminInboxButton = document.getElementById("adminInboxButton");
const feedbackContainer = document.getElementById("feedback-container");  //where the feedback will be displayed in the admin inbox section
const feedbackCount = document.getElementById("feedback-count"); //how many feedback messages have been received

// Projects can be added/deleted to projects.html for viewing
const projectManagementSection = document.getElementById("projectManagement-section");
const manageProjectsButton = document.getElementById("manageProjectsButton");
const projectContainer = document.getElementById("projects"); //where the projects will be printed in projects.html
const projectForm = document.getElementById("projectForm"); //the form to add new projects
const showProjectsButton = document.getElementById("showProjects"); //toggles the preview of the projects.html 

// Blog Posts can be added/deleted to blog.html
const manageBlogSection = document.getElementById("manageBlog-section");
const manageBlogButton = document.getElementById("manageBlogButton");
const blogEditor = document.getElementById("blogEditor"); //where the blog content can be typed
const blogFont = document.getElementById("blogFont"); //font type
const blogFontSize = document.getElementById("blogFontSize"); //font size
const blogColor = document.getElementById("blogColor"); //font colour
const applyStyleButton = document.getElementById("applyStyle"); //button to apply the font styles to selected text
const blogForm = document.getElementById("blogForm"); //form to add blog posts
const showBlogsButton = document.getElementById("showBlogs"); //toggle preview of blog.html
const blogContainer = document.getElementById("blog-posts"); //where the blog is posted in the manageBlogSection
const blogStatsContainer = document.getElementById("blog-stats-container"); //where like and comment count is posted in manageBlogSection

// Element counts for main page of the dashboard
document.getElementById("feedbackCount").textContent = JSON.parse(localStorage.getItem("feedbacks") || "[]").length;
document.getElementById("projectCount").textContent = JSON.parse(localStorage.getItem("projects") || "[]").length;
const blogs = JSON.parse(localStorage.getItem("blogPosts") || "[]");
document.getElementById("lastBlogDate").textContent = blogs.length ? blogs[blogs.length - 1].timestamp : "No posts yet";

// Function to hide all sections initially
function hideAllSections() {
    document.querySelectorAll(".content-section").forEach(section => section.classList.add("hidden"));
}

// Automatically show the Main Dashboard on page load
hideAllSections(); // Hide everything first
mainDashboardSection.classList.remove("hidden"); // Show Main Dashboard

// Show the main dashboard again when clicking the "Main" option
document.getElementById("mainDashboard").addEventListener("click", (event) => {
    event.preventDefault();
    // Hide all sections
    document.querySelectorAll(".content-section").forEach(section => section.classList.add("hidden"));
    // Show the main dashboard again
    document.getElementById("mainDashboard-section").classList.remove("hidden");
});

// Event listeners for toggling section
adminInboxButton.addEventListener("click", () => {
    loadFeedback();
    document.querySelectorAll(".content-section").forEach(section => section.classList.add("hidden"));
    adminInboxSection.classList.remove("hidden");
});

manageProjectsButton.addEventListener("click", () => showSection("projectManagement-section"));
manageBlogButton.addEventListener("click", () => showSection("manageBlog-section"));


// Function to show a specific section
function showSection(sectionId) {
    hideAllSections(); // Hide all sections initially

    const section = document.getElementById(sectionId.trim()); // Ensure it's a proper string
    if (section) { 
        section.classList.remove("hidden"); // Show the section if it exists

        // Load data when switching to the Projects or Blog sections
        if (sectionId === "projectManagement-section") {
            console.log("🛠 Loading projects...");
            loadProjects(); // Reload projects when section is shown
        }
        if (sectionId === "manageBlog-section") {
            console.log("🛠 Loading blog posts...");
            loadBlogPosts(); // Reload blog posts when section is shown
        }

        const resumeEditor = document.getElementById("resumeEditor");
        const savedResume = localStorage.getItem("savedResume") || "Start editing your resume here..."; //default text in the text editor
        if (resumeEditor) {
            resumeEditor.innerHTML = savedResume; //the last content that was saved in this editor, is what is loaded into the editor for editing
        }
    } else {
        console.error("Section not found:", sectionId);
    }
}

// Apply this function to all sidebar menu options (panel options)
document.querySelectorAll(".panel-option").forEach(option => {
    option.addEventListener("click", (event) => {
        const buttonId = event.target.getAttribute("id"); 
        let sectionId = ""; //reset sectionId

        // Map button IDs to their respective section IDs
        if (buttonId === "mainDashboard") {
            sectionId = "mainDashboard-section";
        } else if (buttonId === "adminInboxButton") {
            sectionId = "adminInbox-section";
        } else if (buttonId === "manageProjectsButton") {
            sectionId = "projectManagement-section";  
        } else if (buttonId === "manageBlogButton") {
            sectionId = "manageBlog-section"; 
        } else if (buttonId === "editResumeButton") {
            sectionId = "editResume-section";
        }

        if (sectionId) {
            console.log("Trying to show section:", sectionId); // Debugging
            showSection(sectionId);
        } else {
            console.error("No matching section found for button:", buttonId);
        }
    });
});





panelOptions.forEach(option => {
    option.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        sidebar.classList.remove("open");
    });
});


// Logout function
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "index.html";
});







// Load initial data
loadFeedback();
loadProjects();
loadBlogPosts();



