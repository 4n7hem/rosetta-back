const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const parser = require('body-parser')

const app = express();

//conecte no mongodb
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//necessário para as requisições
app.use(parser.json());

//função de login
app.post('/autenticator', (req, res) => {
    let user = req.body.username;
	let pwd = req.body.password;

    if (user && pwd){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var query = { username: user, password: pwd };
            dbo.collection("users").find(query).toArray(function(err, result) {
                if (err) throw err;
                if (result.length > 0){
                    req.session.loggedin = true;
                    req.session.username = user;
                    res.redirect('/home');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }			
                res.end();
            });
        });
    }
    else{
        res.send('Dados inválidos.');
		res.end();
    }
});

//função de registro
app.post('/registrar', (req, res) => {
    let user = req.body.username;
    let pwd = req.body.password;
    let email = req.body.email;
    
    if (user && pwd && email){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var query = { username: user, password: pwd, email: email };
            dbo.collection("users").insertOne(query, function(err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }
    else{
        res.send('Houve um problema.');
        res.end();
    }
});


app.listen(3000);