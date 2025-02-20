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
    const usernameInput = document.getElementById("username"); // Username input field
    const statusMessage = document.getElementById("statusMessage");

    let isLogin = true; // Track form mode

    // ✅ Show Login Form
    showLogin.onclick = function () {
        isLogin = true;
        formTitle.innerText = "Login";
        usernameInput.classList.add("hidden"); // Hide username field
        formContainer.classList.remove("hidden");
        statusMessage.textContent = "";
    };

    // ✅ Show Signup Form
    showSignup.onclick = function () {
        isLogin = false;
        formTitle.innerText = "Sign Up";
        usernameInput.classList.remove("hidden"); // Show username field
        formContainer.classList.remove("hidden");
        statusMessage.textContent = "";
    };

    // ✅ Handle login or signup
    submitForm.onclick = async function () {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const username = usernameInput.value.trim();

        if (!email || !password || (isLogin === false && !username)) {
            statusMessage.textContent = "Please fill in all fields.";
            statusMessage.style.color = "red";
            return;
        }

        if (isLogin) {
            let { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                statusMessage.textContent = "Login failed: " + error.message;
                statusMessage.style.color = "red";
            } else {
                statusMessage.textContent = "Login successful! Welcome, " + email;
                statusMessage.style.color = "green";
                window.location.href = "dashboard.html";
            }
        } else {
            let { data, error } = await supabaseClient.auth.signUp({
                email,
                password
            });

            if (error) {
                statusMessage.textContent = "Signup failed: " + error.message;
                statusMessage.style.color = "red";
            } else {
                // ✅ Store the username in the Supabase database
                const { error: dbError } = await supabaseClient.from("users").insert([
                    { id: data.user.id, username }
                ]);

                if (dbError) {
                    statusMessage.textContent = "Error saving username: " + dbError.message;
                    statusMessage.style.color = "red";
                } else {
                    statusMessage.textContent = "Signup successful! Check your email to verify.";
                    statusMessage.style.color = "green";
                }
            }
        }
    };
});
