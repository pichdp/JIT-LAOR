// Initialize Supabase
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Function to sign up a new user
async function signUp() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const username = prompt("Enter your username:");

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        alert("Error: " + error.message);
        return;
    }

    // Store user data in Supabase database
    const { data: userData, error: insertError } = await supabase
        .from("users")
        .insert([{ email: email, username: username }]);

    if (insertError) {
        alert("Error saving user: " + insertError.message);
    } else {
        alert("Signup successful! Check your email to verify.");
    }
}

// Function to log in an existing user
async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Log in the user
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Login failed: " + error.message);
        return;
    }

    // Fetch user details from the database
    const { data: user, error: fetchError } = await supabase
        .from("users")
        .select("username")
        .eq("email", email)
        .single();

    if (fetchError) {
        alert("Error fetching user data: " + fetchError.message);
        return;
    }

    document.getElementById("auth-container").classList.add("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("user-info").classList.remove("hidden");

    document.getElementById("user-email").innerText = `${user.username} (${email})`;
}

// Function to log out the user
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert("Logout failed: " + error.message);
    } else {
        alert("You have logged out.");
        window.location.reload();
    }
}
