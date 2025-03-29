function toggleForms() {
    document.getElementById("login-box").style.display =
        document.getElementById("login-box").style.display === "none" ? "block" : "none";
    document.getElementById("signup-box").style.display =
        document.getElementById("signup-box").style.display === "none" ? "block" : "none";
}

function handleGoogleLogin(response) {
    console.log("Google login response:", response);
    alert("Google login successful");
}

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Login form submitted");
});

document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Signup form submitted");
});
