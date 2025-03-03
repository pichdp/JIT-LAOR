// ✅ Ensure Supabase is properly initialized
document.addEventListener("DOMContentLoaded", async function () {
    if (typeof supabase === 'undefined') {
        console.error("Supabase is not loaded. Check the script link.");
        return;
    }

    const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
    
    console.log("✅ Supabase initialized");

    // ✅ DOM Elements
    const postButton = document.getElementById("postButton");
    const postContent = document.getElementById("postContent");
    const imageUpload = document.getElementById("imageUpload");
    const previewImage = document.getElementById("previewImage");
    const feed = document.getElementById("feed");
    const userEmail = document.getElementById("userEmail");
    const logoutButton = document.getElementById("logoutButton");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const profilePicture = document.getElementById("profilePicture");
    const usernameDisplay = document.getElementById("username");

    // ✅ Check if User is Logged In
    async function checkAuth() {
        const { data: { session } } = await supabaseClient.auth.getSession();

        if (!session) {
            alert("You must log in first!");
            window.location.href = "index.html"; 
            return;
        }

        userEmail.innerText = `Logged in as: ${session.user.email}`;
        loadUserProfile(session.user.id);
    }

    // ✅ Load User Profile
    async function loadUserProfile(userId) {
        const { data, error } = await supabaseClient
            .from("users")
            .select("username, profile_picture")
            .eq("id", userId)
            .single();
        
        if (error) {
            console.error("⚠️ Error fetching user profile:", error);
            return;
        }

        usernameDisplay.innerText = data.username || "User";
        profilePicture.src = data.profile_picture || "default-avatar.png"; 
    }

    // ✅ Load Posts
    async function loadPosts() {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("id, content, image_url, user_id, users(username)")
            .order("id", { ascending: false });
        
        if (error) {
            console.error("⚠️ Error fetching posts:", error);
            return;
        }

        feed.innerHTML = "";
        data.forEach(post => {
            const username = post.users ? post.users.username : "Anonymous";
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <div class="post-header">
                    <strong>${username}</strong>
                </div>
                <p>${post.content}</p>
                ${post.image_url ? `<img src="${post.image_url}" class="post-image">` : ""}
                <button class="like-button" data-id="${post.id}">👍 Like</button>
                <span class="like-count" id="like-count-${post.id}">0</span>
                <button class="comment-button" data-id="${post.id}">💬 Comment</button>
                <div class="comments" id="comments-${post.id}"></div>
            `;
            feed.appendChild(postElement);
        });

        attachEventListeners();
        loadLikes();
        loadComments();
    }

    // ✅ Handle Post Button Click
postButton.addEventListener("click", async () => {
    const content = postContent.value.trim();
    if (!content) {
        alert("Post content cannot be empty!");
        return;
    }

    // Get the currently logged-in user
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        alert("You need to log in first!");
        return;
    }

    // Insert post into Supabase
    const { error } = await supabaseClient.from("posts").insert([
        { user_id: session.user.id, content: content }
    ]);

    if (error) {
        console.error("⚠️ Error posting:", error);
        alert("Failed to post!");
        return;
    }

    // Clear post input and reload posts
    postContent.value = "";
    loadPosts();
});

    // ✅ Attach Event Listeners
    function attachEventListeners() {
        document.querySelectorAll(".like-button").forEach(button => {
            button.addEventListener("click", function () {
                likePost(this.dataset.id);
            });
        });

        document.querySelectorAll(".comment-button").forEach(button => {
            button.addEventListener("click", function () {
                const comment = prompt("Enter your comment:");
                if (comment) addComment(this.dataset.id, comment);
            });
        });
    }

    // ✅ Like Feature
    async function likePost(postId) {
        await supabaseClient.from("likes").insert([{ post_id: postId }]);
        loadLikes();
    }

    async function loadLikes() {
        const { data, error } = await supabaseClient.from("likes").select("post_id");
        if (error) {
            console.error("⚠️ Error loading likes:", error);
            return;
        }

        const likeCounts = {};
        data.forEach(like => {
            likeCounts[like.post_id] = (likeCounts[like.post_id] || 0) + 1;
        });

        document.querySelectorAll(".like-count").forEach(el => {
            const postId = el.id.replace("like-count-", "");
            el.innerText = likeCounts[postId] || 0;
        });
    }

    // ✅ Comment Feature
    async function addComment(postId, comment) {
        await supabaseClient.from("comments").insert([{ post_id: postId, content: comment }]);
        loadComments();
    }

    async function loadComments() {
        const { data, error } = await supabaseClient.from("comments").select("post_id, content");
        if (error) {
            console.error("⚠️ Error loading comments:", error);
            return;
        }

        document.querySelectorAll(".comments").forEach(el => {
            const postId = el.id.replace("comments-", "");
            el.innerHTML = data
                .filter(comment => comment.post_id == postId)
                .map(comment => `<p>${comment.content}</p>`)
                .join("");
        });
    }

    // ✅ Logout Function
    logoutButton.addEventListener("click", async () => {
        await supabaseClient.auth.signOut();
        window.location.href = "index.html";
    });

    // ✅ Dark Mode Toggle
    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // ✅ Keep Dark Mode Setting
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    // ✅ Initialize Feed
    checkAuth();
    loadPosts();
});
