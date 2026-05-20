
function loadBlogPosts() {

    let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || []; //retrieve blog posts from localStorage and parse them into an array
    blogContainer.innerHTML = ""; //clear the current content before reloading

    // If no blog posts
    if (blogPosts.length === 0) {
        blogContainer.innerHTML = "<p>No blog posts available.</p>";
        return;
    }
    // Iterate over each blog post
    blogPosts.forEach((post, index) => { 
        const postDiv = document.createElement("div"); //new div for newly added blog post
        postDiv.classList.add("blog-entry"); // CSS class for styling
        
        // Retrieve the number of likes for this post from localStorage
        let likes = JSON.parse(localStorage.getItem(`likes-${index}`)) || 0;

        // Retrieve comments from localStorage and count them
        let comments = JSON.parse(localStorage.getItem(`comments-${index}`)) || [];
        let commentCount = comments.length; // Count the number of comments
        
        // Content of the newly added blog post
        postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Published on:</strong> ${post.timestamp}</p>
        ${post.image ? `<img src="${post.image}" style="max-width:100%;">` : ""}
        <p>${post.content}</p>

        <!-- Display only the number of likes -->
        <p><strong>👍 Likes:</strong> ${likes}</p>

        <!-- Display only the number of comments -->
        <p><strong>💬 Comments:</strong> ${commentCount}</p>

        <!-- Delete Button -->
        <button class="delete-blog" data-index="${index}">❌ Delete</button>

        <hr>
        `;
    
        // Append to the blog container
        blogContainer.appendChild(postDiv);
    });
    //Load existing likes and comments (from blog.html) properly
    document.querySelectorAll(".like-button").forEach(button => {
    const articleId = button.getAttribute("data-article");
    const likeCount = button.querySelector(".like-count");

    let likes = JSON.parse(localStorage.getItem(`likes-${articleId}`)) || 0;
    likeCount.textContent = likes;
    });
   
    document.querySelectorAll(".comment-list").forEach(commentList => {
        const articleId = commentList.id.replace("comments-", "");
        loadComments(articleId);
    });
    

    //Attach event listener to delete buttons for each blog post
    document.querySelectorAll(".delete-blog").forEach(button => {
        button.addEventListener("click", function () {
            deleteBlogPost(this.getAttribute("data-index")); //call delete function with the post index
        });
    });
}

// Function to delete blog posts
function deleteBlogPost(index) {
    // Retrieve the current list of blog posts from localStorage
    let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    blogPosts.splice(index, 1); //remove the selected blog post from the array using splice()
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts)); //update localStorage with the new array after deletion

    // Remove likes and comments associated with the deleted post
    localStorage.removeItem(`likes-${index}`);
    localStorage.removeItem(`comments-${index}`);

    // Shift storage keys for remaining posts (if needed)
    updateBlogPostIndexes();

    // Reload current blog posts to verify deletion
    loadBlogPosts();
}


// Function to update storage keys for likes and comments after deleting a blog post
function updateBlogPostIndexes() {
    // Retrieve the current list of blog posts from localStorage
    let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    // Iterate through the remaining blog posts and update their localStorage keys
    blogPosts.forEach((post, newIndex) => {
        // Retrieve stored likes and comments for the old index (assuming the previous index was newIndex + 1)
        let oldLikes = localStorage.getItem(`likes-${newIndex + 1}`);
        let oldComments = localStorage.getItem(`comments-${newIndex + 1}`);

        // If likes exist for the previous index, move them to the new index
        if (oldLikes !== null) {
            localStorage.setItem(`likes-${newIndex}`, oldLikes); // Assign old likes to the new index
            localStorage.removeItem(`likes-${newIndex + 1}`); // Remove the old likes entry
        }

        // If comments exist for the previous index, move them to the new index
        if (oldComments !== null) {
            localStorage.setItem(`comments-${newIndex}`, oldComments); // Assign old comments to the new index
            localStorage.removeItem(`comments-${newIndex + 1}`); // Remove the old comments entry
        }
    });
}

// Apply style to the selected text in the blog editor
applyStyleButton.addEventListener("click", () => {
    // Get the selected font, font size, and font color from dropdown inputs
    const blogFont = document.getElementById("blogFont").value;
    const blogFontSize = document.getElementById("blogFontSize").value;
    const blogFontColor = document.getElementById("blogColor").value;

    // Get the currently selected text in the editor
    const selection = window.getSelection();

    // If no text is selected, exit the function
    if (!selection.rangeCount) return;

    // Get the range of the selected text (start and end positions)
    const range = selection.getRangeAt(0);

    // Create a new span element to wrap the selected text
    const span = document.createElement("span");

    // Apply the selected styles to the span element
    span.style.fontFamily = blogFont;
    span.style.fontSize = blogFontSize;
    span.style.color = blogFontColor;

    // Get the text that was selected
    const selectedText = range.toString();

    // If no actual text is selected, exit the function
    if (selectedText.length === 0) return;

    // Create a formatted HTML span element with the selected styles applied
    const styledText = `<span style="font-family:${blogFont}; font-size:${blogFontSize}; color:${blogFontColor};">${selectedText}</span>`;

    // Insert the formatted span into the editor, replacing the selected text
    document.execCommand("insertHTML", false, styledText);
});

// Handle the submission of a new blog post
blogForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the title and content from the input fields
    const title = document.getElementById("blogTitle").value;
    const content = document.getElementById("blogEditor").innerHTML; // Capture formatted content

    // Retrieve the stored blog image from localStorage, if available
    const blogImage = localStorage.getItem("blogImagePreview") || "";

    // Check if the title and content are not empty
    if (!title || !content.trim()) {
        alert("Please enter a title and content."); // Show an alert if fields are empty
        return;
    }

    // Retrieve the existing blog posts from localStorage or initialize an empty array
    let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    // Add the new blog post to the array with a timestamp
    blogPosts.push({ title, content, image: blogImage, timestamp: new Date().toLocaleString() });

    // Save the updated blog posts array back to localStorage
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

    // Remove the preview image from localStorage after saving the blog post
    localStorage.removeItem("blogImagePreview");

    // Reset the form fields
    blogForm.reset();
    document.getElementById("blogEditor").innerHTML = ""; // Clear the editor after saving

    // Reload the blog posts to update the UI with the newly added post
    loadBlogPosts();
});

// Handle image upload for blog posts
document.getElementById("blogImage").addEventListener("change", function (event) {
    // Get the uploaded file from the input field
    const file = event.target.files[0];

    // Check if a file was selected
    if (file) {
        const reader = new FileReader(); // Create a FileReader to read the image

        // When the file is read, store the image data in localStorage
        reader.onload = function (e) {
            localStorage.setItem("blogImagePreview", e.target.result); // Store the image as base64

            // Append the image preview to the blog content field
            document.getElementById("blogContent").value += `<img src="${e.target.result}" style="max-width:100%;">`;
        };

        // Read the uploaded file as a Data URL (base64 encoding)
        reader.readAsDataURL(file);
    }
});
