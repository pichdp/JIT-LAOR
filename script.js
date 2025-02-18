function showForm(formType) {
    document.getElementById("login-form").style.display = (formType === "login") ? "flex" : "none";
    document.getElementById("signup-form").style.display = (formType === "signup") ? "flex" : "none";
}

function closeForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "none";
}

function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    
    if (email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }
    alert("Login Successful! (This is a demo)");
    closeForm();
}

function signup() {
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    
    if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }
    alert("Signup Successful! (This is a demo)");
    closeForm();
}
