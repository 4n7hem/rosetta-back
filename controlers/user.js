const client = require('./Config/db')

module.exports = {
    async login(req, res){ 
        let user = req.body.username;
        let pwd = req.body.password;

        if (user && pwd){
            var dbo = client.db("mydb");
            dbo.collection("users").findOne({username: user, password: pwd}, function(err, result) {
                if (err) throw err;
                if(result){
                    req.session.loggedin = true;
                    req.session.username = user;
                    return {message:'Usuario cadastrado com sucesso'};
                    //res.redirect('/home');
                }else{
                    return {message:'Usuário e/ou senha incorretos!'};
                }
                res.end();
            });
        }
        else{
           return {message:'Por favor, insira nome de usuário e senha!'};
            res.end();
        }
    },
    async registrar (req, res){
        let user = req.body.username;
        let pwd = req.body.password;
        let email = req.body.email;   
        if (user && pwd && email){
                var dbo = client.db("mydb");
                var query = { username: user, password: pwd, email: email };
                dbo.collection("users").insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    return {message: 'Sucesso no cadastro. Redirecionando...'};
                    res.end();                
            });
        }
        else{
            return {message:'Houve um problema.'};
            res.end();
        }
    },
    async findprofile (req, res) {
        let user = req.query.username;
        if (user){
            var dbo = client.db("mydb");
            dbo.collection("users").findOne({username: user}, function(err, result) {
                if (err) throw err;
                if(result){
                    return {message: result};
                }else{
                    return {message: 'Usuário não encontrado!'};
                }
                res.end();
            });
        }
        else{
            return {message: 'Um erro aconteceu'};
            res.end();
        }
    },
}