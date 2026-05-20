document.addEventListener("DOMContentLoaded", function () {
    const projectContainer = document.getElementById("projects"); // Use "projects" instead of "projects-container"

    if (!projectContainer) {
        console.error("Projects container not found.");
        return;
    }

    function loadProjects() {
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        projectContainer.innerHTML = ""; // Clear previous content

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
                ${project.image ? `<img src="${project.image}" style="max-width:100%;">` : ""}
                ${project.link ? `<a href="${project.link}" target="_blank">📂 View Project</a>` : ""}
                <hr>
            `;
            projectContainer.appendChild(projectDiv);
        });
    }

    loadProjects(); // Call function on page load
});
