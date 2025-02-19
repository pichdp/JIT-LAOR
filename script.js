// ✅ Initialize Supabase
const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// ✅ Toggle Login/Signup Form
function toggleForm() {
    document.getElementById("login-form").classList.toggle("hidden");
    document.getElementById("signup-form").classList.toggle("hidden");
}

// ✅ Show/Hide Password Toggle
document.getElementById("show-password").addEventListener("change", function() {
    let passwordField = document.getElementById("signup-password");
    let confirmPasswordField = document.getElementById("confirm-password");
    passwordField.type = this.checked ? "text" : "password";
    confirmPasswordField.type = this.checked ? "text" : "password";
});

// ✅ Handle User Signup (Save Username in Database)
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    // 🔸 Validate Password Length
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // 🔸 Validate Password Match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // 🔸 Check if Username Already Exists
    let { data: existingUser, error: userCheckError } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

    if (existingUser) {
        alert("Username is already taken! Try another one.");
        return;
    }

    // 🔸 Sign Up User in Supabase Authentication
    let { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert("Signup failed: " + error.message);
        return;
    }

    // 🔸 Save Username in "users" Table
    await supabase.from("users").insert([
        { id: data.user.id, username, email }
    ]);

    alert("Signup successful! Check your email to verify.");
});

// ✅ Handle User Login (Accepts Username or Email)
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let loginInput = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let email = loginInput;

    // 🔸 If user enters a username, find the corresponding email
    if (!loginInput.includes("@")) {
        let { data: user, error } = await supabase
            .from("users")
            .select("email")
            .eq("username", loginInput)
            .single();

        if (!user) {
            alert("Username not found!");
            return;
        }
        email = user.email;
    }

    // 🔸 Attempt to Log In
    let { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Login failed: " + error.message);
    } else {
        alert("Login successful!");
        window.location.href = "/dashboard"; // Redirect to dashboard
    }
});
