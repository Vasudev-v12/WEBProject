const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json()); // To handle JSON data


app.get('/cars/:make/:year/:price/:fuel', async (req, res) => {
    try {
        let make = req.params.make;
        let year = req.params.year;
        let price = req.params.price;
        let fuel = req.params.fuel;
        let result;
        if(make == '*' & year == '*' & price == '*' & fuel == '*'){
            result = await pool.query('SELECT * from cars');
        }
        else if(price == '*' & make == '*' & year == '*'){
            result = await pool.query(`SELECT * FROM cars WHERE fuel='${fuel}'`);
        }
        else if(price == '*' & make == '*' & fuel == '*'){
            result = await pool.query(`SELECT * FROM cars WHERE year=${year}`);
        }
        else if(price == '*' & year == '*' & fuel == '*'){
            result = await pool.query(`SELECT * FROM cars WHERE make='${make}'`);
        }
        else if(price == '*' & make == '*'){
            result = await pool.query(`SELECT * FROM cars WHERE year=${year} AND fuel='${fuel}'`);
        }
        else if(price == '*' & year == '*'){
            result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND fuel='${fuel}'`);
        }
        else if(price == '*' & fuel == '*'){
            result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND year=${year}`);
        }
        else if(price == '*'){
            result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND year=${year} AND fuel='${fuel}'`);
        }
        else{
            if(price == 'low' & make == '*' & year == '*' & fuel == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE price BETWEEN 0 AND 1000000`);
            }
            else if(price == 'low' & fuel == '*' & make == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE price BETWEEN 0 AND 1000000 AND year=${year}`);
            }
            else if(price == 'low' & fuel == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND price BETWEEN 0 AND 1000000`);
            }
            else if(price == 'low' & make == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE fuel='${fuel}' AND price BETWEEN 0 AND 1000000'`);
            }
            else if(price == 'low' & make == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE year=${year} AND price BETWEEN 0 AND 1000000 AND fuel='${fuel}'`);
            }
            else if(price == 'low' & year == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND price BETWEEN 0 AND 1000000 AND fuel='${fuel}'`);
            }
            else if(price == 'low' & fuel == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND price BETWEEN 0 AND 1000000 AND year=${year}`);
            }

            else if(price == 'medium' & make == '*' & year == '*' & fuel == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE price BETWEEN 1000000 AND 5000000`);
            }
            else if(price == 'medium' & fuel == '*' & make == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE price BETWEEN 1000000 AND 5000000 AND year=${year}`);
            }
            else if(price == 'medium' & fuel == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND price BETWEEN 1000000 AND 5000000`);
            }
            else if(price == 'medium' & make == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE fuel='${fuel}' AND price BETWEEN 1000000 AND 5000000`);
            }
            else if(price == 'medium' & make == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE year=${year} AND price BETWEEN 1000000 AND 5000000 AND fuel='${fuel}'`);
            }
            else if(price == 'medium' & year == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND price BETWEEN 1000000 AND 5000000 AND fuel='${fuel}'`);
            }
            else if(price == 'medium' & fuel == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND price BETWEEN 1000000 AND 5000000 AND year=${year}`);
            }
            
            else if(price == 'high' & make == '*' & year == '*' & fuel == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE price>5000000`);
            }
            else if(price == 'high' & fuel == '*' & make == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE price>5000000 AND year=${year}`);
            }
            else if(price == 'high' & fuel == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND price>5000000`);
            }
            else if(price == 'high' & make == '*' & year == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE fuel='${fuel}' AND price>5000000`);
            }
            else if(price == 'high' & make == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE year=${year} AND price>5000000 AND fuel='${fuel}'`);
            }
            else if(price == 'high' & year == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND price>5000000 AND fuel='${fuel}'`);
            }
            else if(price == 'high' & fuel == '*'){
                result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND price>5000000 AND year=${year}`);
            }
            
            else{
                if(price == 'low'){
                    result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND year=${year} AND price BETWEEN 0 AND 1000000 AND fuel='${fuel}'`);
                }
                else if(price == 'medium'){
                    result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND year=${year} AND price BETWEEN 1000000 AND 5000000 AND fuel='${fuel}'`);
                }
                else if(price == 'high'){
                    result = await pool.query(`SELECT * FROM cars WHERE make='${make}' AND year=${year} AND price>5000000 AND fuel='${fuel}'`);
                }
            }
        }
        res.json(result.rows);
        console.log(result.rows);
        
    } catch (err) {
        console.error(err);
    }
});

app.get('/list/:id',async(req,res) => {
    const id = req.params.id;
    try{
        let carList = await pool.query(`SELECT * FROM cars WHERE id=${id}`);
        res.json(carList.rows);
        console.log(carList.rows);
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

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});



