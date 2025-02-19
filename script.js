document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ Document loaded, initializing Supabase...");

    // ✅ Initialize Supabase
    const supabaseUrl = "https://YOUR-PROJECT-ID.supabase.co";
    const supabaseAnonKey = "YOUR-ANON-KEY";
    const supabase = window.supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

    console.log("✅ Supabase initialized successfully");

    // ✅ Toggle Login & Signup Form
    function toggleForm() {
        const loginForm = document.getElementById("login-form");
        const signupForm = document.getElementById("signup-form");

        if (loginForm.style.display === "none") {
            loginForm.style.display = "block";
            signupForm.style.display = "none";
        } else {
            loginForm.style.display = "none";
            signupForm.style.display = "block";
        }
    }
    window.toggleForm = toggleForm; // Make available globally

    // ✅ Show/Hide Password
    document.getElementById("show-password-login").addEventListener("change", function () {
        let passwordField = document.getElementById("login-password");
        passwordField.type = this.checked ? "text" : "password";
    });

    document.getElementById("show-password-signup").addEventListener("change", function () {
        let passwordField = document.getElementById("signup-password");
        passwordField.type = this.checked ? "text" : "password";
    });

    // ✅ Handle Signup
    document.getElementById("signup-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("signup-username").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { username: username }
            }
        });

        if (error) {
            alert("Signup failed: " + error.message);
        } else {
            alert("Signup successful! Please check your email.");
        }
    });

    // ✅ Handle Login
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const loginInput = document.getElementById("login-username-email").value;
        const password = document.getElementById("login-password").value;

        let { data, error } = await supabase.auth.signInWithPassword({
            email: loginInput.includes("@") ? loginInput : null,
            password: password
        });

        if (error) {
            alert("Login failed: " + error.message);
        } else {
            alert("Login successful!");
            window.location.href = "/dashboard"; // Redirect to dashboard
        }
    });

    console.log("✅ Script fully loaded and event listeners attached.");
});
