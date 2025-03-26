document.addEventListener("DOMContentLoaded",function () {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit",async function (event) {
        event.preventDefault();

        const email = document.querySelector("input[type='email']").value.trim();
        const password = document.querySelector("input[type='password']").value.trim();

            
            let data = await fetch(`http://localhost:5000/logUser/${email}/${password}`,{
                method: "GET",
            });
            //console.log(data);
            let result = await data.json();
            console.log(result[0]);
            if(!result[0]) alert("Email or password incorrect");
            else{
                console.log("Login successful!");
                console.log('redirecting...');
                const myDataString = JSON.stringify(result[0]);
                localStorage.setItem('profiles',myDataString);
                window.open("main.html");
            }
    });
});