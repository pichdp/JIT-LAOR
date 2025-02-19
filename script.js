// ✅ Ensure Supabase is properly initialized
document.addEventListener("DOMContentLoaded", async function () {
    // ✅ Import Supabase library correctly
    if (typeof supabase === 'undefined') {
        console.error("Supabase is not loaded. Check the script link.");
        return;
    }

    const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";

    const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
    
    // ✅ Debug: Check if Supabase is loaded correctly
    console.log("Supabase initialized:", supabaseClient);

    // ✅ Elements
    const showLogin = document.getElementById("showLogin");
    const showSignup = document.getElementById("showSignup");
    const formContainer = document.getElementById("formContainer");
    const formTitle = document.getElementById("formTitle");
    const submitForm = document.getElementById("submitForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    let isLogin = true; // Track form mode

    // ✅ Show Login Form
    showLogin.onclick = function () {
        isLogin = true;
        formTitle.innerText = "Login";
        formContainer.classList.remove("hidden");
    };

    // ✅ Show Signup Form
    showSignup.onclick = function () {
        isLogin = false;
        formTitle.innerText = "Sign Up";
        formContainer.classList.remove("hidden");
    };

    // ✅ Handle login or signup
    submitForm.onclick = async function () {
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        if (isLogin) {
            let { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                alert("Login failed: " + error.message);
            } else {
                alert("Login successful! Welcome, " + email);
                window.location.href = "dashboard.html";
            }
        } else {
            let { data, error } = await supabaseClient.auth.signUp({
                email,
                password
            });

            if (error) {
                alert("Signup failed: " + error.message);
            } else {
                alert("Signup successful! Check your email to verify.");
            }
        }
    };
});
