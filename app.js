const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

//tá, eu vou usar o mysql mesmo
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'login'
});

//função de login
app.post('/autenticator', (req, res) => {
    let user = request.body.username;
	let pwd = request.body.password;

    if (user && pwd){
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [user, pwd], function(error, results, fields){
            if (results.length > 0){
                request.session.loggedin = true;
                request.session.username = user;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    }
    else{
        response.send('Dados inválidos.');
		response.end();
    }
});

//função de registro
app.post('/registrar', (req, res) => {
    let user = request.body.username;
    let pwd = request.body.password;
    let email = request.body.email;

    if (user && pwd && email){
        connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user, pwd, email], function(error, results, fields){
            if (error){
                response.send('Erro ao registrar usuário.');
            } else {
                response.send('Usuário registrado com sucesso.');
            }
            response.end();
        });
    }
    else{
        response.send('Houve um problema.');
        response.end();
    }
});


app.listen(3000);