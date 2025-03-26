const loadNum = 0;

document.addEventListener("DOMContentLoaded",function(){
    const data = localStorage.getItem("profiles");
    console.log(data);
    if(data.length > 0){
        let btn = document.getElementById("login");
        let parent = document.getElementById("navbar");
        parent.removeChild(btn);
        let profileBtn = document.createElement("button");
        profileBtn.id = "profile";
        profileBtn.textContent = "Profile";
        parent.appendChild(profileBtn);
        document.getElementById("profile").addEventListener("click",profile);
    }
});

function login(){
    localStorage.clear();
    window.location.href = "login.html";
}

function profile(){
    window.location.href = "userProfile.html";
}

async function redirect(id){
    try{
        console.log('redirecting...');
        const myData = {carid:`${id}`};
        const myDataString = JSON.stringify(myData);
        localStorage.setItem('objects',myDataString);
        window.open("carpage.html");
    } catch(err){
        console.log(err);
        console.log('Error in storing temporary data');
    }
}

async function fetchCarListings() {
    try {
        console.log("show cars button was clicked!");

        let model = document.getElementById("brand").value;
        let year = document.getElementById("year").value;
        let price = document.getElementById("price").value;
        let engine = document.getElementById("engine").value;

        if(model == 'all')model = '*';
        if(year == 'all')year = '*';
        if(price == 'all')price = '*';
        if(engine == 'all')engine = '*';
        
        let response = await fetch(`http://localhost:5000/cars/${model}/${year}/${price}/${engine}`,{
            method: 'GET',
        });
        console.log(response);
        if (!response.ok){
            throw new Error("Failed to fetch car listings");
        }


        let cars = await response.json();
        let carContainer = document.querySelector(".inventory");

        if(cars.length == 0) carContainer.innerHTML = '<p id="errorMsg">Sorry!, No cars of the given specifications were found!</p>';
        else{
            carContainer.innerHTML = "";
            cars.forEach(car => {
                let carItem = document.createElement("div");
                carItem.setAttribute("class","cell");
                carItem.setAttribute("id",`${car.id}`);
                carItem.innerHTML =  `<h3>${car.make} ${car.model}</h3><p>Distance driven: ${car.distance} km</p><p>Price: ₹${car.price}</p><a><button class="btn" onclick="redirect(${car.id})">View</button></a>`;
                carContainer.appendChild(carItem);
            });
        }
    } catch (error) {
        console.error("Error:", error);        
    }
}

document.getElementById("showbtn").addEventListener("click", fetchCarListings);
document.getElementById("login").addEventListener("click", login);