// ✅ 1. Supabase Configuration
const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// ✅ 2. Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {
    const showLogin = document.getElementById("showLogin");
    const showSignup = document.getElementById("showSignup");
    const formContainer = document.getElementById("formContainer");
    const formTitle = document.getElementById("formTitle");
    const submitForm = document.getElementById("submitForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    let isLogin = true; // Track form mode

    // ✅ 3. Show login form
    showLogin.onclick = function () {
        isLogin = true;
        formTitle.innerText = "Login";
        formContainer.classList.remove("hidden");
    };

    // ✅ 4. Show signup form
    showSignup.onclick = function () {
        isLogin = false;
        formTitle.innerText = "Sign Up";
        formContainer.classList.remove("hidden");
    };

    // ✅ 5. Handle login or signup
    submitForm.onclick = async function () {
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        if (isLogin) {
            // 🔹 Login user
            let { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                alert("Login failed: " + error.message);
            } else {
                alert("Login successful! Welcome, " + email);
                window.location.href = "dashboard.html"; // Redirect to another page
            }
        } else {
            // 🔹 Signup user
            let { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) {
                alert("Signup failed: " + error.message);
            } else {
                alert("Signup successful! Please check your email to confirm.");
            }
        }
    };
});
