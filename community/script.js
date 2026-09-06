// Handle posting a new status update with optional image
function postStatus() {
    const postContent = document.getElementById('post-input').value;
    const imageUpload = document.getElementById('image-upload').files[0];
    
    // If there is content in the post
    if (postContent || imageUpload) {
        const postContainer = document.getElementById('posts-container');
        const newPost = document.createElement('div');
        newPost.classList.add('post');

        // Handle image if uploaded
        let postImage = '';
        if (imageUpload) {
            const reader = new FileReader();
            reader.onload = function(e) {
                postImage = `<img src="${e.target.result}" alt="User Post Image" class="post-image">`;
                createPost(postContent, postImage); // Create post with image
            };
            reader.readAsDataURL(imageUpload);
        } else {
            postImage = ''; // No image uploaded
            createPost(postContent, postImage); // Create post without image
        }
    } else {
        alert("Please enter a post content or upload an image.");
    }
}

// Create a post with content and optional image
function createPost(postContent, postImage) {
    const postContainer = document.getElementById('posts-container');
    const newPost = document.createElement('div');
    newPost.classList.add('post');

    newPost.innerHTML = `
        <div class="post-header">
            <div class="profile-img"></div>
            <span class="username">Your Name</span>
        </div>
        <p class="post-content">${postContent}</p>
        ${postImage}
        <div class="post-actions">
            <button onclick="likePost(this)">👍 Like</button>
            <button onclick="commentPost(this)">💬 Comment</button>
            <button onclick="sharePost(this)">🔗 Share</button>
        </div>
        <div class="comments">
            <input type="text" placeholder="Add a comment..." class="comment-input">
        </div>
    `;
    
    postContainer.prepend(newPost);
    document.getElementById('post-input').value = ''; // Clear the input field
    document.getElementById('image-upload').value = ''; // Clear the image input field
}

// Handle liking a post
function likePost(button) {
    // Add like logic here
    button.textContent = "👍 Liked";
}
