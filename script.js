// ✅ Initialize Supabase correctly using environment variables
const { createClient } = supabase;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

    const { user, error } = await supabase.auth.signUp({
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

    const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Login Failed: " + error.message);
    } else {
        alert("Logged In Successfully!");
    }
}
