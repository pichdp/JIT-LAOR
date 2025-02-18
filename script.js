// ✅ Import Supabase (Make sure this script is included in the HTML)
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Initialize Supabase
const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdXd3bmNzemxmandkdHRzYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MTExNzYsImV4cCI6MjA1NTQ4NzE3Nn0.YZDN4nc1kJpSNgnYE7NVwdGIMxM6TE7Ss9S_jhFDVqM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Ensure functions are declared AFTER Supabase is initialized

// Function to show the correct form
function showForm(formId) {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "none";
    document.getElementById(formId).style.display = "block";
}

// Function to handle user sign-up
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

// Function to handle user login
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

// Ensure the page is fully loaded before assigning event listeners
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signup-button").onclick = signUp;
    document.getElementById("login-button").onclick = logIn;
});
