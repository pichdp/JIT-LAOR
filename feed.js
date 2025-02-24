// ✅ Initialize Supabase
const supabaseUrl = "https://ffuwwncszlfjwdttsbnb.supabase.co";
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// ✅ Check if User is Logged In
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        alert("You must log in first!");
        window.location.href = "index.html"; // Redirect to login
    } else {
        document.getElementById("userEmail").innerText = `Logged in as: ${session.user.email}`;
    }
}

// ✅ Logout Function
async function logout() {
    await supabase.auth.signOut();
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

// ✅ Call checkAuth on Page Load
checkAuth();

// ✅ Event Listener for Logout Button
document.getElementById("logoutButton").addEventListener("click", logout);
