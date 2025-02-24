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

    // Function to Fetch Posts from Supabase
    async function loadPosts() {
        const { data, error } = await supabaseClient.from("posts").select("*").order("id", { ascending: false });

        if (error) {
            console.error("Error fetching posts:", error);
            return;
        }

        // Clear Feed
        feed.innerHTML = "";

        // Display Posts
        data.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `<p>${post.content}</p>`; // Fixed template string
            feed.appendChild(postElement);
        });
    }

    // Function to Add Post to Supabase
    async function addPost() {
        const content = postContent.value.trim();
        if (!content) return;

        const { error } = await supabaseClient.from("posts").insert([{ content }]);

        if (error) {
            console.error("Error adding post:", error);
            return;
        }

        // Clear input and refresh feed
        postContent.value = "";
        loadPosts();
    }

    // Event Listener for Post Button
    postButton.addEventListener("click", addPost);

    // Load Posts on Page Load
    window.onload = loadPosts;
}); // <-- Closing bracket was missing
