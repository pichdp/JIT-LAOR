// ✅ Ensure Supabase is properly initialized
document.addEventListener("DOMContentLoaded", async function () {
    if (typeof supabase === 'undefined') {
        console.error("Supabase is not loaded. Check the script link.");
        return;
    }

    const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";

    const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
    
    console.log("Supabase initialized:", supabaseClient);

    // DOM Elements
    const postButton = document.getElementById("postButton");
    const postContent = document.getElementById("postContent");
    const feed = document.getElementById("feed");
    const userEmail = document.getElementById("userEmail"); // Show logged-in user
    const logoutButton = document.getElementById("logoutButton"); // Logout button
    const profilePic = document.getElementById("profile-pic"); // Profile picture

    // ✅ Check if User is Logged In
    async function checkAuth() {
        const { data: { session } } = await supabaseClient.auth.getSession();

        if (!session) {
            alert("You must log in first!");
            window.location.href = "index.html"; // Redirect to login
        } else {
            userEmail.innerText = `Logged in as: ${session.user.email}`;
            fetchUserProfile(session.user.id); // ✅ Fetch user profile
        }
    }

    // ✅ Fetch User Profile and Handle Missing Profile Picture
    async function fetchUserProfile(userId) {
        const { data, error } = await supabaseClient
            .from("users")
            .select("username, avatar_url")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Error fetching user profile:", error);
            return;
        }

        profilePic.src = data.avatar_url || "default-avatar.png"; // ✅ Use default avatar if missing
    }

    // ✅ Function to Fetch Posts from Supabase with Usernames
    async function loadPosts() {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("content, user_id, users(username)") // Ensure 'users' is the correct reference
            .order("id", { ascending: false });

        if (error) {
            console.error("Error fetching posts:", error);
            return;
        }

        // Clear Feed
        feed.innerHTML = "";

        // Display Posts with Username
        data.forEach(post => {
            const username = post.users ? post.users.username : "Anonymous"; // Show username or default to "Anonymous"

            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <div class="post-header">
                    <strong>${username}</strong> <!-- Display poster's username -->
                </div>
                <p>${post.content}</p>
            `;

            feed.appendChild(postElement);
        });
    }

    // ✅ Function to Add Post to Supabase
    async function addPost() {
        const content = postContent.value.trim();
        if (!content) return;

        // Get current user ID
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            alert("You must be logged in to post.");
            return;
        }

        const userId = session.user.id; // Get the logged-in user's ID

        const { error } = await supabaseClient.from("posts").insert([{ content, user_id: userId }]);

        if (error) {
            console.error("Error adding post:", error);
            return;
        }

        // Clear input and refresh feed
        postContent.value = "";
        loadPosts();
    }

    // ✅ Logout Function
    async function logout() {
        await supabaseClient.auth.signOut();
        alert("Logged out successfully!");
        window.location.href = "index.html"; // Redirect to login page
    }

    // ✅ Event Listeners
    postButton.addEventListener("click", addPost);
    logoutButton.addEventListener("click", logout); 

    // ✅ Load Posts on Page Load
    checkAuth(); // Ensure the user is logged in before loading feed
    loadPosts();
});
