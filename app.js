const express = require('express');
const session = require('express-session');
const path = require('path');
const parser = require('body-parser')
const client = require('./Config/db')
const app = express();


//necessário para as requisições
app.use(parser.json());

app.use(session({
    secret: 'keyboard cat',
    username: 'noname',
    loggedin: false,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//função de login
app.post('/autenticator', (req, res) => {
    let user = req.body.username;
	let pwd = req.body.password;

    if (user && pwd){
        var dbo = client.db("mydb");
        dbo.collection("users").findOne({username: user, password: pwd}, function(err, result) {
            if (err) throw err;
            if(result){
                req.session.loggedin = true;
                req.session.username = user;
                //res.redirect('/home');
            }else{
                res.send('Usuário e/ou senha incorretos!');
            }
            res.end();
        });
    }
    else{
        res.send('Por favor, insira nome de usuário e senha!');
        res.end();
    }
   
});

//função de registro
app.post('/registrar', (req, res) => {
    let user = req.body.username;
    let pwd = req.body.password;
    let email = req.body.email;
    
    if (user && pwd && email){
            var dbo = client.db("mydb");
            var query = { username: user, password: pwd, email: email };
            dbo.collection("users").insertOne(query, function(err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                res.send('Sucesso no cadastro. Redirecionando...');
                res.end();                
        });
    }
    else{
        res.send('Houve um problema.');
        res.end();
    }
});

//função de procurar perfil
app.get('/findprofile', (req, res) => {
    let user = req.query.username;
    if (user){
        var dbo = client.db("mydb");
        dbo.collection("users").findOne({username: user}, function(err, result) {
            if (err) throw err;
            if(result){
                res.send(result);
            }else{
                res.send('Usuário não encontrado!');
            }
            res.end();
        });
    }
    else{
        res.send('Um erro aconteceu');
        res.end();
    }
});


app.listen(3000);