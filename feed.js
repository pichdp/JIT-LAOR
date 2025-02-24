window.onload = function () {
    // Supabase Setup
    const SUPABASE_URL = "https://ffuwwncszlfjwdttsbnb.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const postButton = document.getElementById("postButton");
    const postContent = document.getElementById("postContent");
    const feed = document.getElementById("feed");

    if (!postButton || !postContent || !feed) {
        console.error("Error: One or more elements not found!");
        return;
    }

    // Function to fetch posts from Supabase
    async function fetchPosts() {
        let { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching posts:", error);
            return;
        }

        feed.innerHTML = ""; // Clear feed before adding posts
        data.forEach(post => {
            let postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerHTML = `<p>${post.content}</p>`;
            feed.appendChild(postDiv);
        });
    }

    // Function to add a new post
    postButton.onclick = async function () {
        let content = postContent.value.trim();
        if (content === "") return;

        let { error } = await supabase
            .from("posts")
            .insert([{ content }]);

        if (error) {
            console.error("Error adding post:", error);
        } else {
            postContent.value = ""; // Clear input
            fetchPosts(); // Refresh feed
        }
    };

    // Load posts when page loads
    fetchPosts();
};
