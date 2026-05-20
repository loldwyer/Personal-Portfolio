// Load feedback from localStorage
function loadFeedback() {
    let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbackContainer.innerHTML = "";
    feedbackCount.textContent = feedbackList.length;

    if (feedbackList.length === 0) {
        feedbackContainer.innerHTML = "<p>No feedback received yet.</p>";
        return;
    }

    feedbackList.forEach((feedback, index) => {
        const feedbackDiv = document.createElement("div");
        feedbackDiv.classList.add("feedback-entry");
        feedbackDiv.innerHTML = `
            <strong>${feedback.name}</strong> (<a href="mailto:${feedback.email}">${feedback.email}</a>)<br>
            <p>${feedback.message}</p>
            <p><em>${feedback.timestamp}</em></p>
            <button class="delete-feedback" data-index="${index}">❌ Delete</button>
            <hr>
        `;
        feedbackContainer.appendChild(feedbackDiv);
    });

    document.querySelectorAll(".delete-feedback").forEach(button => {
        button.addEventListener("click", function () {
            deleteFeedback(this.getAttribute("data-index"));
        });
    });
}

// Function to delete feedback
function deleteFeedback(index) {
    let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbackList.splice(index, 1);
    localStorage.setItem("feedbacks", JSON.stringify(feedbackList));
    loadFeedback();
}

// Load projects from localStorage
function loadProjects() {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projectContainer.innerHTML = "";

    if (projects.length === 0) {
        projectContainer.innerHTML = "<p>No projects available.</p>";
        return;
    }


    projects.forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-entry");
        projectDiv.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${project.link ? `<a href="${project.link}" target="_blank">📂 View Project</a>` : ""}
            <p><em>${project.timestamp}</em></p>
            <button class="delete-project" data-index="${index}">❌ Delete</button>
            <hr>
        `;
        projectContainer.appendChild(projectDiv);
    });

    document.querySelectorAll(".delete-project").forEach(button => {
        button.addEventListener("click", function () {
            deleteProject(this.getAttribute("data-index"));
        });
    });
}

// Function to delete projects
function deleteProject(index) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    loadProjects();
}

// Handle adding new projects
projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("projectTitle").value;
    const description = document.getElementById("projectDescription").value;
    const link = document.getElementById("projectLink").value;
   
    if (!title || !description) {
        alert("Please fill in all fields.");
        return;
    }

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push({ title, description, link, timestamp: new Date().toLocaleString()});
    localStorage.setItem("projects", JSON.stringify(projects));
    
    projectForm.reset();
    alert("Project saved successfully!");

});

    
    loadProjects();
document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
})
