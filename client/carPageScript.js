document.addEventListener("DOMContentLoaded", async function(){
    try{
        const myData = localStorage.getItem('objects');
        const carID = JSON.parse(myData).carid;
        
        const response = await fetch(`http://localhost:5000/list/${carID}`,{
            method: 'GET',
        });
        let data = (await response.json())[0];
        
        let heading = document.getElementById("heading");
        let title = document.getElementById("title");
        let price = document.getElementById("carPrice");
        let specs = document.getElementById("specs");
        title.innerHTML = `${data.make} ${data.model}`;
        heading.innerHTML = `${data.make} ${data.model}`;
        price.innerHTML = `&#8377; ${data.price}`;
        specs.innerHTML = `
        <li><strong>Distance:</strong> ${data.distance} Km</li>
        <li><strong>Year:</strong> ${data.year}</li>
        <li><strong>Seller Name:</strong> ${data.seller}</li>
        <li><strong>Ownership:</strong> ${data.ownership}</li>
        <li><strong>Fuel type:</strong> ${data.fuel}</li>
        <li><strong>Seating:</strong> ${data.seat}</li>
        <li><strong>Engine:</strong> ${data.engine} cc</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        `;
    } catch(err){
        console.error(err);
    }
});