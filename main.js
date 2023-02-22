const express = require('express');
const app = express();
const mysql = require('mysql');
let port = 8081;
let adatbazisNev = 'autok';

app.use(express.static('public'));

app.listen(port,()=>{
    console.log(`A szerver fut a következő porton: ${port}`);
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});


// Adatbázis kapcsolat felépítése
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: adatbazisNev
});

con.connect((err)=>{
    if (err){
        console.log(err.message + "\n" + err.code);
        throw err;
    }
    else{
        console.log('Adatbázis kapcsolat aktív');
    }
});

// Adatbázis létrehozása
app.get('/createdb',(req,res)=>{
    let sql = `CREATE DATABASE ${adatbazisNev};`;
    con.query(sql,(err)=>{
        if (err) throw err;
        else{
            console.log('Adatbázis létrehozva');
            res.send('Adatbázis létrehozva');
        }
    });
});

// Adattábla létrehozása
app.get('/createtable',(req,res)=>{
    let sql = "CREATE TABLE auto (id INT NOT NULL AUTO_INCREMENT, rendszam VARCHAR(10), gyarto VARCHAR(255), PRIMARY KEY(id));";
    con.query(sql,(err)=>{
        if (err) {
            console.log(err.message + "\n" + err.code);
            throw err;
        }
        else {
            console.log('Adattábla létrehozva');
            res.send('Adattábla létrehozva');
        }
    });
});

// Egyed felvétele
app.get('/insert',(req,res)=>{
    
    let beRendszam = "HFU-173";
    let beGyarto = "audi";
    
    let beAuto = {
        rendszam: beRendszam,
        gyarto: beGyarto
    };

    let sql = 'INSERT INTO auto SET ?;';
    con.query(sql, beAuto, (err)=>{
        if (err) {
            console.log(err.message + "\n" + err.code);
            throw err;
        }
        else {
            console.log('Autó hozzáadva');
            res.send('Autó hozzáadva');
        }
    });
});

// Módosítás (Rendszám)
app.get('/update/:id', (req,res)=>{
    let ujRendszam = '\"EEE-156\"';
    let sql = `UPDATE auto SET rendszam = ${ujRendszam} WHERE id = ${req.params.id};`;
    con.query(sql,(err)=>{
        if (err) {
            console.log(err.message + "\n" + err.code);
            throw err;
        }
        else {
            console.log('Rendszám módosítva');
            res.send('Rendszám módosítva');
        } 
    });
});

// Törlés
app.get('/delete/:id',(req,res)=>{
    let sql = `DELETE FROM auto WHERE id = ${req.params.id};`
    con.query(sql,(err)=>{
        if (err) {
            console.log(err.message + "\n" + err.code);
            throw err;
        }
        else {
            console.log('Sikeres törlés');
            res.send('Sikeres törlés');
        } 
    });
});

// Megjelenítés
app.get('/getautok',(req,res)=>{
    let sql = 'SELECT * FROM auto;';
    con.query(sql, (err, result)=>{
        if (err) {
            console.log(err.message + "\n" + err.code);
            throw err;
        }
        else {
            console.log(result);
            res.send(result);
        } 
    });
});