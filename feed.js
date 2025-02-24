// ✅ Initialize Supabase globally
const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";

// Create the Supabase client globally so it can be used anywhere
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Wait for the DOM to be fully loaded before running any script
document.addEventListener("DOMContentLoaded", function () {
    console.log("Supabase initialized:", supabase);

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

    // ✅ Ensure postButton exists before adding event listener
    if (postButton) {
        postButton.addEventListener("click", addPost);
    } else {
        console.error("postButton not found in DOM!");
    }

    // Load Posts on Page Load
    loadPosts();
});
