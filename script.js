// ✅ Ensure Supabase is properly initialized
document.addEventListener("DOMContentLoaded", async function () {
    // ✅ Import Supabase library correctly
    if (typeof supabase === 'undefined') {
        console.error("Supabase is not loaded. Check the script link.");
        return;
    }

    const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";

    const { createClient } = supabase;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    console.log("Supabase initialized:", supabaseClient);

    // ✅ Elements
    const showLogin = document.getElementById("showLogin");
    const showSignup = document.getElementById("showSignup");
    const formContainer = document.getElementById("formContainer");
    const formTitle = document.getElementById("formTitle");
    const submitForm = document.getElementById("submitForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (!submitForm || !emailInput || !passwordInput) {
        console.error("One or more elements are missing from the DOM.");
        return;
    }

    let isLogin = true; // Track form mode

    // ✅ Show Login Form
    if (showLogin) {
        showLogin.onclick = function () {
            isLogin = true;
            formTitle.innerText = "Login";
            formContainer.classList.remove("hidden");
        };
    }

    // ✅ Show Signup Form
    if (showSignup) {
        showSignup.onclick = function () {
            isLogin = false;
            formTitle.innerText = "Sign Up";
            formContainer.classList.remove("hidden");
        };
    }

    // ✅ Handle login or signup
    submitForm.onclick = async function () {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        if (isLogin) {
            try {
                let { data, error } = await supabaseClient.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) {
                    throw error;
                }

                alert("Login successful! Redirecting...");
                window.location.href = "dashboard.html";
            } catch (err) {
                alert("Login failed: " + (err.message || "Unknown error"));
            }
        } else {
            try {
                let { data, error } = await supabaseClient.auth.signUp({
                    email,
                    password
                });

                if (error) {
                    if (error.message.includes("User already registered")) {
                        alert("Email already exists. Try logging in.");
                    } else {
                        throw error;
                    }
                } else {
                    alert("Signup successful! Please check your email for verification.");
                }
            } catch (err) {
                alert("Signup failed: " + (err.message || "Unknown error"));
            }
        }
    };
});
