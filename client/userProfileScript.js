function logout(){
    localStorage.clear();
    window.location.href = "home.html";
}

function loadData(){
    let data = localStorage.getItem("profiles");
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    name.innerHTML = JSON.parse(data).name;
    email.innerHTML = JSON.parse(data).email;
    phone.innerHTML = JSON.parse(data).phone;
}

async function changePwd(){
    let oldpwd = document.getElementById("oldpwd").value;
    let newpwd = document.getElementById("newpwd").value;
    let confirm = document.getElementById("confirm").value;
    if(oldpwd == JSON.parse(localStorage.getItem("profiles")).password){
        if(newpwd == confirm){
            let email = JSON.parse(localStorage.getItem("profiles")).email;
            let credential = {email,newpwd};
            //console.log(credential);
            try{
                let response = await fetch("http://localhost:5000/changePwd",{
                    method: 'POST',
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(credential),
                });
                if(response.ok){
                    alert("Password changed successfuly");
                } else{
                    alert("Unexpected Error Occured! Please try again");
                }
            } catch(err){
                console.error(err);
            }
            
            
        }
        else{
            alert("The confirm password field must be same as new password");
        }
    }
    else{
        alert("Wrong password");
    }
}

document.addEventListener("DOMContentLoaded",loadData);