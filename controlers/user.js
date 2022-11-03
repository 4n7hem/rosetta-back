const client = require('../Config/db')
const session = require('express-session');

module.exports = {

    teste(req,res){
        console.log('teste'); 
        return 'testado'
    },
     login(req, res){ 
        let user = req.body.username;
        let pwd = req.body.password;

        if (user && pwd){
            var dbo = client.db("mydb");
            dbo.collection("users").findOne({username: user, password: pwd}, function(err, result) {
                if (err) return "deu erro" ;
                if(result){
                    req.session.loggedin = true;
                    req.session.username = user;
                    return "Usuario cadastrado com sucesso" ;
                    //res.redirect('/home');
                }else{
                    return "Usuário e/ou senha incorretos!" ;
                }
                //res.end();
            });
        }
        else{
           return "Por favor, insira nome de usuário e senha!";
            //res.end();
        }
    },
     registrar (req, res){
        let user = req.body.username;
        let pwd = req.body.password;
        let email = req.body.email;   
        if (user && pwd && email){
                var dbo = client.db("mydb");
                var query = { username: user, password: pwd, email: email };
                dbo.collection("users").insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    return 'Sucesso no cadastro. Redirecionando...';
                    res.end();                
            });
        }
        else{
            return 'Houve um problema.';
            res.end();
        }
    },
     findprofile (req, res) {
        let user = req.query.username;
        if (user){
            var dbo = client.db("mydb");
            dbo.collection("users").findOne({username: user}, function(err, result) {
                if (err) throw err;
                if(result){
                    return result;
                }else{
                    return 'Usuário não encontrado!';
                }
                res.end();
            });
        }
        else{
            return  'Um erro aconteceu' ;
            res.end();
        }
    },
}