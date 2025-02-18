// ✅ Import Supabase (Ensure this is at the TOP)
const { createClient } = supabase;

// ✅ Initialize Supabase
const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Show the correct form when clicking the button
function showForm(formId) {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "none";
    document.getElementById(formId).style.display = "block";
}

// ✅ Sign Up Function
async function signUp() {
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Sign Up Successful! Check your email to confirm.");
    }
}

// ✅ Log In Function
async function logIn() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Login Failed: " + error.message);
    } else {
        alert("Logged In Successfully!");
    }
}
