document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit",async function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value.trim();
            let email = document.getElementById("email").value.trim();
            let mobile = document.getElementById("mobile").value.trim();
            let password = document.getElementById("password").value.trim();
            if (!validateInput(email, mobile, password)) {
                return;
            }
            const user = { username, email, mobile, password};
            
            let response = await fetch("http://localhost:5000/addUser",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(user),
            });
            console.log(response);
            if (response.ok) {
                alert("Account created successfully! You can now sign in.");
                window.location.href = "login.html";
            }
        });
    }
});

function validateInput(email, mobile, password) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobilePattern = /^\d{10}$/;
    let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;


    if (!email || !mobile || !password) {
        alert("All fields are required!");
        return false;
    }
    if (!emailPattern.test(email)) {
        alert("Invalid email format!");
        return false;
    }
    if (!mobilePattern.test(mobile)) {
        alert("Mobile number must be a 10-digit numeric value!");
        return false;
    }
    if (!passwordPattern.test(password)) {
        alert("Password must be at least 8 characters long, contain a number, a special character, and an uppercase letter!");
        return false;
    }
    return true;
}