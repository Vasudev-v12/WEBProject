document.addEventListener("DOMContentLoaded", async function(){
    try{
        const myData = localStorage.getItem('objects');
        const carID = JSON.parse(myData).carid;
        const ct = JSON.parse(myData).ctype;
        console.log(ct);
        console.log(carID);
        const response = await fetch(`http://localhost:5000/list/${ct}/${carID}`,{
            method: 'GET',
        });
        let data = (await response.json())[0];
        
        let heading = document.getElementById("heading");
        let title = document.getElementById("title");
        let price = document.getElementById("carPrice");
        let specs = document.getElementById("specs");
        document.getElementById("image-gallery").innerHTML = `<img src="./images/${data.path}" alt="Main Car Image" id="main-image"></img>`;
        title.innerHTML = `${data.make} ${data.model}`;
        heading.innerHTML = `${data.make} ${data.model}`;
        price.innerHTML = `&#8377; ${data.price}`;
        let userid = localStorage.getItem("profiles").id;
        let carinfo = {userid:`${userid}`,carid:`${data.id}`,used:`${ct}`,make:`${data.make}`,model:`${data.model}`,year:`${data.year}`};
        localStorage.setItem("bookcar",carinfo);
        if(ct=="used"){
            specs.innerHTML = `
            <li><strong>Distance:</strong> ${data.distance} Km</li>
            <li><strong>Year:</strong> ${data.year}</li>
            <li><strong>Fuel type:</strong> ${data.fuel}</li>
            <li><strong>Seating:</strong> ${data.seat}</li>
            <li><strong>Engine:</strong> ${data.engine} cc</li>
            `;
        } else{
            specs.innerHTML = `
            <li><strong>Year:</strong> ${data.year}</li>
            <li><strong>Fuel type:</strong> ${data.fuel}</li>
            <li><strong>Seating:</strong> ${data.seat}</li>
            <li><strong>Engine:</strong> ${data.engine} cc</li>
            `;
        }
    } catch(err){
        console.log(err);
    }
});

function book(){
    if(data = localStorage.getItem("profiles") != null){
        window.location.href = "payment.html";
    }
    else{
        alert("Please login to proceed for booking!");
        window.location.href = "main.html";
    }
}