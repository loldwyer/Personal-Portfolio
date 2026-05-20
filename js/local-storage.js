document.addEventListener("DOMContentLoaded", function () {
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackList = document.getElementById("feedback-list");

    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Store in Local Storage
        const feedbackData = JSON.parse(localStorage.getItem("feedbacks")) || [];
        feedbackData.push({ name, email, message });
        localStorage.setItem("feedbacks", JSON.stringify(feedbackData));

        displayFeedbacks();
        feedbackForm.reset();
    });

    function displayFeedbacks() {
        feedbackList.innerHTML = "";
        const feedbackData = JSON.parse(localStorage.getItem("feedbacks")) || [];
        
        feedbackData.forEach((feedback, index) => {
            const entry = document.createElement("div");
            entry.innerHTML = `<strong>${feedback.name}</strong>: ${feedback.message} <br> <small>${feedback.email}</small><hr>`;
            feedbackList.appendChild(entry);
        });
    }

    displayFeedbacks();
});



//BLOG ON INDEX.HTML
document.addEventListener("DOMContentLoaded", () => {
    const blogContainer = document.querySelector(".blog-preview");

    if (!blogContainer) {
        console.error("Blog container not found.");
        return;
    }

    // Retrieve the latest blog post from localStorage
    let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    if (blogPosts.length > 0) {
        // Get the most recent blog post
        const latestPost = blogPosts[blogPosts.length - 1];

        // Ensure timestamp exists and format it
        const formattedDate = latestPost.timestamp ? new Date(latestPost.timestamp).toLocaleDateString() : "Unknown Date";

        // Update the blog preview section dynamically
        blogContainer.innerHTML = `
            <h3>${latestPost.title}</h3>
            <p><strong>Published on:</strong> ${formattedDate}</p>
            <p>${latestPost.content.substring(0, 150)}...</p>
            <a href="blog.html#latest" class="read-more">📖 Read More</a>
        `;
    } else {
        // If no blog posts are found, display a default message
        blogContainer.innerHTML = `
            <h3>No Blog Posts Yet</h3>
            <p>Stay tuned for the latest updates!</p>
            <a href="blog.html" class="read-more">📖 Visit Blog</a>
        `;
    }
});
