// Initialize Supabase
const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";  // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";  // Replace with your Supabase Key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements
const postButton = document.getElementById("postButton");
const postContent = document.getElementById("postContent");
const feed = document.getElementById("feed");

// Function to Fetch Posts from Supabase
async function loadPosts() {
    const { data, error } = await supabase.from("posts").select("*").order("id", { ascending: false });

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
        postElement.innerHTML = `<p>${post.content}</p>`;
        feed.appendChild(postElement);
    });
}

// Function to Add Post to Supabase
async function addPost() {
    const content = postContent.value.trim();
    if (!content) return;

    const { error } = await supabase.from("posts").insert([{ content }]);

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
