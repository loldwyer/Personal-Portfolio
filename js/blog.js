document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.getElementById("blog-container");

    if (!blogContainer) {
        console.error("❌ ERROR: Blog container not found.");
        return;
    }

    function loadBlogPosts() {
        let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
        blogContainer.innerHTML = ""; // Clear previous content

        if (blogPosts.length === 0) {
            console.warn("⚠️ WARNING: No blog posts found.");
            blogContainer.innerHTML = "<p>No blog posts available.</p>";
            return;
        }

        console.log("✅ Loading blog posts:", blogPosts);

        blogPosts.forEach((post, index) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("blog-entry");
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p><strong>Published on:</strong> ${new Date(post.timestamp).toLocaleString()}</p>
                ${post.image ? `<img src="${post.image}" style="max-width:100%;">` : ""}
                <p>${post.content}</p>

                <!-- Like Button -->
                <div class="like-section">
                    <button class="like-btn" data-article="${index}">👍 Like</button>
                    <span id="like-count-${index}" class="like-count">0</span> Likes
                </div>

                <!-- Comment Section -->
                <div class="comments-section">
                    <h4>Comments</h4>
                    <div id="comments-${index}" class="comment-list"></div>
                    <form class="comment-form" data-article="${index}">
                        <input type="text" class="comment-name" placeholder="Your Name" required>
                        <textarea class="comment-text" placeholder="Write a comment..." required></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <hr>
            `;
            blogContainer.appendChild(postDiv);
        });

        attachLikeButtonEvents();
        attachCommentFormEvents();
        loadLikes();
        loadAllComments();
    }

    function attachLikeButtonEvents() {
        document.querySelectorAll(".like-btn").forEach(button => {
            button.addEventListener("click", function () {
                const articleId = this.getAttribute("data-article");
                let likes = JSON.parse(localStorage.getItem(`likes-${articleId}`)) || 0;
                likes++;
                localStorage.setItem(`likes-${articleId}`, JSON.stringify(likes));
                document.getElementById(`like-count-${articleId}`).textContent = likes;
            });
        });
    }

    function loadLikes() {
        document.querySelectorAll(".like-count").forEach(likeSpan => {
            const articleId = likeSpan.id.replace("like-count-", "");
            let likes = JSON.parse(localStorage.getItem(`likes-${articleId}`)) || 0;
            likeSpan.textContent = likes;
        });
    }

    function attachCommentFormEvents() {
        document.querySelectorAll(".comment-form").forEach(form => {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                const articleId = form.getAttribute("data-article");
                const nameInput = form.querySelector(".comment-name");
                const textInput = form.querySelector(".comment-text");

                let comments = JSON.parse(localStorage.getItem(`comments-${articleId}`)) || [];
                comments.push({ name: nameInput.value.trim(), text: textInput.value.trim() });
                localStorage.setItem(`comments-${articleId}`, JSON.stringify(comments));

                nameInput.value = "";
                textInput.value = "";
                loadComments(articleId);
            });
        });
    }

    function loadComments(articleId) {
        const commentList = document.getElementById(`comments-${articleId}`);
        if (!commentList) return;

        commentList.innerHTML = "";
        const comments = JSON.parse(localStorage.getItem(`comments-${articleId}`)) || [];

        comments.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.innerHTML = `<strong>${comment.name}</strong>: ${comment.text} <hr>`;
            commentList.appendChild(commentDiv);
        });
    }

    function loadAllComments() {
        document.querySelectorAll(".comment-list").forEach(commentList => {
            const articleId = commentList.id.replace("comments-", "");
            loadComments(articleId);
        });
    }

    loadBlogPosts(); // Call function on page load
});
