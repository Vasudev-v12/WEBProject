const loadNum = 0;
document.getElementById("see-cars").style = "border-top: solid black 5px";
document.addEventListener("DOMContentLoaded",function(){
    const data = localStorage.getItem("profiles");
    console.log(data);
    if(data != null){
        let btn = document.getElementById("login");
        let parent = document.getElementById("hlinks");
        parent.removeChild(btn);
        let profileBtn = document.createElement("a");
        profileBtn.id = "profile";
        profileBtn.textContent = "Profile";
        let sell = document.createElement('a');
        sell.id="sell-car";
        sell.innerText = "Sell Car";
        parent.appendChild(sell);
        parent.appendChild(profileBtn);
        document.getElementById("profile").addEventListener("click",profile);
        document.getElementById("sell-car").addEventListener("click",sellCar);
    }
});

function login(){
    localStorage.clear();
    window.location.href = "login.html";
}

function profile(){
    window.location.href = "userProfile.html";
}

function home(){
    window.location.href = "home.html";
}

function compare(){
    document.getElementById("compare").style = "border-top: solid black 5px";
    document.getElementById("see-cars").style = "";
    window.location.href = "carcomp.html";

}

function seeCars(){
    window.location.reload();
}


function sellCar(){
    document.getElementById("container").innerHTML = `
    <div id="register">
    <form id="car-registration-form">
        <h2>Car Registration Form</h2>
        
        <label for="year">Year of Purchase</label>
        <input id="year" type="number" max="2025" required>

        <label for="fuel-type">Fuel Type</label>
        <select id="fuel-type" name="fuel-type">
            <option value="petrol">Petrol</option>
            <option value="deisel">Deisel</option>
            <option value="ev">Electric</option>
        </select>

        <label for="car-brand">Car Brand</label>
        <select id="car-brand" name="car-brand">
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Maruti Suzuki">Maruti Suzuki</option>
            <option value="Tata">Tata</option>
            <option value="Mahindra">Mahindra</option>
            <option value="Ford">Ford</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Kia">Kia</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Renault">Renault</option>
            <option value="Nissan">Nissan</option>
            <option value="Skoda">Skoda</option>
            <option value="MG">MG</option>
            <option value="Fiat">Fiat</option>
            <option value="Jeep">Jeep</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Audi">Audi</option>
            <option value="Lexus">Lexus</option>
            <option value="Volvo">Volvo</option>
            <option value="Jaguar">Jaguar</option>
            <option value="Land Rover">Land Rover</option>
            <option value="Mini">Mini</option>
            <option value="Porsche">Porsche</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Isuzu">Isuzu</option>
            <option value="Datsun">Datsun</option>
            <option value="Bugatti">Bugatti</option>
            <option value="Lamborghini">Lamborghini</option>
        </select>

        <label for="car-model">Car Model</label>
        <input id="car-model" type="text" required>

        <label for="state">Vehicle Registration</label>
        <select id="state" name="state">
            <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
        </select>

        <label for="address">Address to Pick Up Car</label>
        <textarea id="address" placeholder="Enter address" required></textarea>

        <label for="city">Nearest City</label>
        <input id="city" type="text" required>

        <label for="phone">Phone No</label>
        <input id="phone" type="tel" pattern="[0-9]{10}" required>

        <button id="subbtn" type="button" onclick="carDetSub()">Submit</button>
    </form>
</div>`;
}

function valueCal(){
    // window.location.href = "car-value-calc.html";
    document.getElementById("container").innerHTML = `
        <section class="calculator-section">
            <h1>What's Your Car Worth?</h1>
            <p>Get an accurate estimate for your car's value by entering the details below.</p>
            <form id="car-value-form">
                <div class="form-group">
                    <label for="make">Make:</label>
                    <input type="text" id="make" name="make" placeholder="e.g., BMW" required>
                </div>
                <div class="form-group">
                    <label for="model">Model:</label>
                    <input type="text" id="model" name="model" placeholder="e.g., M340i xDrive AWD Automatic" required>
                </div>
                <div class="form-group">
                    <label for="year">Year:</label>
                    <input type="number" id="year" name="year" placeholder="e.g., 2020" required>
                </div>
                <div class="form-group">
                    <label for="mileage">Mileage:</label>
                    <input type="number" id="mileage" name="mileage" placeholder="e.g., 50000" required>
                </div>
                <button type="button" id="calculate-button">Calculate Value</button>
            </form>

            <!-- Result Section -->
            <section id="result-section" style="display: none;">
                <h2>Estimated Value</h2>
                <table id="result-table">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Estimated Value (₹)</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </section>
        </section>
    `;
    document.getElementById("calculate-button").addEventListener("click",()=>{
            const make = document.getElementById('make').value.trim();
            const model = document.getElementById('model').value.trim();
            const year = parseInt(document.getElementById('year').value.trim());
            const mileage = parseInt(document.getElementById('mileage').value.trim());
            
            const currentYear = new Date().getFullYear();
            
            const baseValue = 3000000; 
            const depreciation = (currentYear - year) * 200; 
            const mileageDeduction = mileage * 15; 
           
           const estimatedValue = baseValue - depreciation - mileageDeduction;
        
           const resultSection = document.getElementById('result-section');
           const resultTableBody = document.querySelector('#result-table tbody');
           resultTableBody.innerHTML = `
               <tr><td>Poor Condition</td><td>${Math.round(estimatedValue * 0.8)}</td></tr> 
               <tr><td>Good Condition</td><td>${Math.round(estimatedValue)}</td></tr> 
               <tr><td>Great Condition</td><td>${Math.round(estimatedValue * 1.2)}</td></tr>`;
           
           resultSection.style.display = 'block';     
    });
}

async function carDetSub(){
    let year = document.getElementById("year").value;
    let fuel = document.getElementById("fuel-type").value;
    let make = document.getElementById("car-brand").value;
    let model = document.getElementById("car-model").value;
    let state = document.getElementById("state").value;
    let phone = document.getElementById("phone").value;
    let addr = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    if(year && fuel && make && model && state && phone && addr && city){
        let data = localStorage.getItem('profiles');
        let userid = JSON.parse(data).id;
        let sellCarDetails = {userid:`${userid}`,year:`${year}`,fuel:`${fuel}`,make:`${make}`,model:`${model}`,state:`${state}`,phone:`${phone}`,address:`${addr}`,city:`${city}`};
        console.log(sellCarDetails);
        try{
            let response = await fetch("http://localhost:5000/sellcar",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(sellCarDetails),
            });
            console.log(response);
            if (response.ok) {
                alert("You Request was successfully submitted");
                document.getElementById("container").innerHTML = `
                <div class="status-message">
                    <h2>You can view and track the status of your request in your profile page</h2>
                    <h2>Once your request is successfully accepted, our agents will call you and confirm the deal</h2>
                    <h2>Then your car will be collected from your location and payment will be debited to your bank account</h2>
                    <h2>Thank you for using our service</h2>
                </div>

            `;
            }else{
                alert("Sorry an error occured. Try again!");
            }
        } catch(err){
            console.error(err);
        }
    }else {
        alert("Please fill all the fields");
    }
}

async function carPage(id,ct){
    try{
        const myData = {carid:`${id}`,ctype:`${ct}`};
        const myDataString = JSON.stringify(myData);
        localStorage.setItem('objects',myDataString);
        window.location.href = "carpage.html";
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
        let ct = document.getElementById("cartype").value;

        if(model == 'all')model = '*';
        if(year == 'all')year = '*';
        if(price == 'all')price = '*';
        if(engine == 'all')engine = '*';
        
        let response = await fetch(`http://localhost:5000/cars/${ct}/${model}/${year}/${price}/${engine}`,{
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
                carItem.innerHTML =  `<span><img src="./images/${car.path}"></img></span><span><h3>${car.make} ${car.model}</h3><p>Distance driven: ${car.distance} km</p><p>Price: ₹${car.price}</p><a><button class="btn" onclick="carPage(${car.id},'${ct}')">View</button></a></span>`;
                carContainer.appendChild(carItem);
            });
        }
    } catch (error) {
        console.error("Error:", error);        
    }
}

document.getElementById("home").addEventListener("click",home);
document.getElementById("showbtn").addEventListener("click", fetchCarListings);
document.getElementById("login").addEventListener("click", login);
document.getElementById("compare").addEventListener("click",compare);
document.getElementById("see-cars").addEventListener("click",seeCars);
document.getElementById("value-cal").addEventListener("click",valueCal);
