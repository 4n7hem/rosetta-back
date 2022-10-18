const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const parser = require('body-parser')

const app = express();

//tá, eu vou usar o mysql mesmo
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'login'
});

//necessário para as requisições
app.use(parser.json());

//função de login
app.post('/autenticator', (req, res) => {
    let user = req.body.username;
	let pwd = req.body.password;

    if (user && pwd){
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [user, pwd], function(error, results, fields){
            //if (results.length > 0){
            if(false){
                //autentique o usuário
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
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
        connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user, pwd, email], function(error, results, fields){
            if (error){
                res.send('Erro ao registrar usuário.');
            } else {
                res.send('Usuário registrado com sucesso.');
            }
            res.end();
        });
    }
    else{
        res.send('Houve um problema.');
        res.end();
    }
});


app.listen(3000);