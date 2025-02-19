// ✅ Initialize Supabase FIRST
const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// ✅ Toggle Login / Signup Form
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

// ✅ Show/Hide Password Toggle (Fixed for Both Forms)
document.getElementById("show-password-login").addEventListener("change", function () {
    let passwordField = document.getElementById("login-password");
    passwordField.type = this.checked ? "text" : "password";
});

document.getElementById("show-password-signup").addEventListener("change", function () {
    let passwordField = document.getElementById("signup-password");
    passwordField.type = this.checked ? "text" : "password";
});

// ✅ Handle Sign Up
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

// ✅ Handle Login (by Username or Email)
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
