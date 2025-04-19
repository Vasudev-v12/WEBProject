const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json()); // To handle JSON data


app.get('/cars/:ct/:make/:year/:price/:fuel', async (req, res) => {
    
    try {
        let ct = req.params.ct;
        let tbl = 'cars';
        if(ct == 'new'){
            tbl = 'ncars';
        }
        let make = req.params.make;
        let year = req.params.year;
        let price = req.params.price;
        let fuel = req.params.fuel;
        let result;
        if(make == '*' & year == '*' & price == '*' & fuel == '*'){
            result = await pool.query(`SELECT * from ${tbl}`);
        }
        else if(price == '*' & make == '*' & year == '*'){
            result = await pool.query(`SELECT * FROM ${tbl} WHERE fuel='${fuel}'`);
        }
        else if(price == '*' & make == '*' & fuel == '*'){
            result = await pool.query(`SELECT * FROM ${tbl} WHERE year=${year}`);
        }
        else if(price == '*' & year == '*' & fuel == '*'){
            result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}'`);
        }
        else if(price == '*' & make == '*'){
            result = await pool.query(`SELECT * FROM ${tbl} WHERE year=${year} AND fuel='${fuel}'`);
        }
        else if(price == '*' & year == '*'){
            result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND fuel='${fuel}'`);
        }
        else if(price == '*' & fuel == '*'){
            result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND year=${year}`);
        }
        else if(price == '*'){
            result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND year=${year} AND fuel='${fuel}'`);
        }
        else{
            if(price == 'low' & make == '*' & year == '*' & fuel == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE price BETWEEN 0 AND 1000000`);
            }
            else if(price == 'low' & fuel == '*' & make == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE price BETWEEN 0 AND 1000000 AND year=${year}`);
            }
            else if(price == 'low' & fuel == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND price BETWEEN 0 AND 1000000`);
            }
            else if(price == 'low' & make == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE fuel='${fuel}' AND price BETWEEN 0 AND 1000000'`);
            }
            else if(price == 'low' & make == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE year=${year} AND price BETWEEN 0 AND 1000000 AND fuel='${fuel}'`);
            }
            else if(price == 'low' & year == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND price BETWEEN 0 AND 1000000 AND fuel='${fuel}'`);
            }
            else if(price == 'low' & fuel == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND price BETWEEN 0 AND 1000000 AND year=${year}`);
            }

            else if(price == 'medium' & make == '*' & year == '*' & fuel == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE price BETWEEN 1000000 AND 5000000`);
            }
            else if(price == 'medium' & fuel == '*' & make == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE price BETWEEN 1000000 AND 5000000 AND year=${year}`);
            }
            else if(price == 'medium' & fuel == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND price BETWEEN 1000000 AND 5000000`);
            }
            else if(price == 'medium' & make == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE fuel='${fuel}' AND price BETWEEN 1000000 AND 5000000`);
            }
            else if(price == 'medium' & make == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE year=${year} AND price BETWEEN 1000000 AND 5000000 AND fuel='${fuel}'`);
            }
            else if(price == 'medium' & year == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND price BETWEEN 1000000 AND 5000000 AND fuel='${fuel}'`);
            }
            else if(price == 'medium' & fuel == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND price BETWEEN 1000000 AND 5000000 AND year=${year}`);
            }
            
            else if(price == 'high' & make == '*' & year == '*' & fuel == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE price>5000000`);
            }
            else if(price == 'high' & fuel == '*' & make == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE price>5000000 AND year=${year}`);
            }
            else if(price == 'high' & fuel == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND price>5000000`);
            }
            else if(price == 'high' & make == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE fuel='${fuel}' AND price>5000000`);
            }
            else if(price == 'high' & make == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE year=${year} AND price>5000000 AND fuel='${fuel}'`);
            }
            else if(price == 'high' & year == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND price>5000000 AND fuel='${fuel}'`);
            }
            else if(price == 'high' & fuel == '*'){
                result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND price>5000000 AND year=${year}`);
            }
            
            else{
                if(price == 'low'){
                    result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND year=${year} AND price BETWEEN 0 AND 1000000 AND fuel='${fuel}'`);
                }
                else if(price == 'medium'){
                    result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND year=${year} AND price BETWEEN 1000000 AND 5000000 AND fuel='${fuel}'`);
                }
                else if(price == 'high'){
                    result = await pool.query(`SELECT * FROM ${tbl} WHERE make='${make}' AND year=${year} AND price>5000000 AND fuel='${fuel}'`);
                }
            }
        }
        res.json(result.rows);
        console.log(result.rows);
        
    } catch (err) {
        console.error(err);
    }
});

app.get('/list/:ct/:id',async(req,res) => {
    const ct = req.params.ct;
    let tbl = 'cars';
    if(ct == 'new'){
        tbl = 'ncars';
    }
    const id = req.params.id;
    try{
        let carList = await pool.query(`SELECT * FROM ${tbl} WHERE id=${id}`);
        res.json(carList.rows);
        console.log(carList.rows);
    } catch(err){
        console.error(err);
    }
});

app.get('/getsoldstatus/:userid',async(req,res)=>{
    try{
        let id = req.params.userid;
        let data = await pool.query(`SELECT * from soldcars where userid=${id}`);
        res.json(data.rows);
    } catch(err){
        console.error(err);
    }
});

app.get('/getboughtstatus/:userid',async(req,res)=>{
    try{
        let id = req.params.userid;
        let data = await pool.query(`SELECT * from boughtcars where userid=${id}`);
        res.json(data.rows);
    } catch(err){
        console.error(err);
    }
});

app.get('/logUser/:email/:pwd',async (req,res)=>{
    try{
        let email = req.params.email;
        let pwd = req.params.pwd;
        let data = await pool.query(`SELECT * FROM users WHERE email='${email}'`);
        console.log(data);
        if((data.rows[0]).password == pwd){
            res.json(data.rows);
        }
        else{
            console.log("password wrong");
            res.json({message: "password wrong"});
        }
    }catch(err){
        console.error(err);
    }
    
});

app.post('/addUser', async(req,res) => {
    try{
        const data = req.body;
        let result = await pool.query(`INSERT INTO users(name,email,password,phone)VALUES($1,$2,$3,$4)`,[data.username,data.email,data.password,Number(data.mobile)]);
        console.log(result);
        res.json("data received");
    } catch(err){
        console.error(err);
    }
});

app.post('/changePwd',async(req,res) =>{
    try{
        const data = req.body;
        console.log(data);
        let result = await pool.query(`UPDATE users SET password=$1 WHERE email=$2`,[data.newpwd,data.email]);
        res.json("password changed");
    }catch(err){
        console.error(err);
    }
});

app.post('/sellcar',async(req,res) => {
    try{
        const data = req.body;
        let result = await pool.query(`INSERT INTO soldcars(userid,year,fuel,make,model,city,state,address,phone,status)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,'booked')`,[data.userid,data.year,data.fuel,data.make,data.model,data.city,data.state,data.addr,data.phone]);
        console.log(result);
        res.json("request sent");
    }catch(err){
        console.error(err);
    }
});

app.post('/buycar',async(req,res) => {
    try{
        const data = req.body;
        let result = await pool.query(`INSERT INTO boughtcars(userid,carid,make,model,status,used)VALUES($1,$2,$3,$4,'booked',$5)`,[data.userid,data.carid,data.make,data.model,data.used]);
        console.log(result);
        res.json("request sent");
    }catch(err){
        console.error(err);
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});



