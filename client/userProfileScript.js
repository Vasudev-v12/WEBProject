document.addEventListener("DOMContentLoaded",action);

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

async function action(){
    let data = localStorage.getItem("profiles");
    let userid = JSON.parse(data).id;
    let result = await fetch(`http://localhost:5000/getsoldstatus/${userid}`,{
        method: 'GET',
    });
    console.log(result);
    if(result.ok){
        let activities = await result.json();
        if(activities.length > 0){
            let cont = document.getElementById('activity-cont');
            cont.innerHTML = `<h3>Cars sold</h3>`;
            let num = 1;
            activities.forEach(activity => {
                let temp = document.createElement("div");
                temp.class="act";
                temp.id = `act-${num}`;
                temp.innerHTML = `
                    <p>
                    Car make: ${activity.make}<br>
                    Car model: ${activity.model}<br>
                    Car registration: ${activity.state}<br>
                    Status: ${activity.status}<br>
                    </p>
                `;
                num++;
                cont.appendChild(temp);
            });
        }
    }

    let result1 = await fetch(`http://localhost:5000/getboughtstatus/${userid}`,{
        method: 'GET',
    });
    console.log(result1);
    if(result.ok){
        let activities = await result1.json();
        if(activities.length > 0) {
            let cont = document.getElementById('activity-cont');
            let h = document.createElement('h3');
            h.innerHTML = `<h3>Cars bought</h3>`;
            cont.appendChild(h);
            let num = 1;
            activities.forEach(activity => {
                let temp = document.createElement("div");
                temp.class = 'act';
                temp.id = `act-${num}`;
                temp.innerHTML = `
                    <p>
                    Car make: ${activity.make}<br>
                    Car model: ${activity.model}<br>
                    Status: ${activity.status}<br>
                    </p>
                `;
                num++;
                cont.appendChild(temp);
            });
        }
    }
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