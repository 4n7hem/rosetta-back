const express = require('express');

const routes = express.Router();

const controllers = {
    'user': require('./controlers/user')
}

routes.get('/', (req, res) => {
    return res.json({
        message: 'Hello World'
    });
});

routes.all('/*', async (req, res) => {
    console.log(req.url)
    regex = new RegExp("[/]|[?]")
    splittedUrl = req.url.split(regex);
    func = controllers[splittedUrl[1]][splittedUrl[2]];
    if(func){
        resp = await func(req, res)
        //if (resp.status) res.status(resp.status)
        res.json({resp})
    }else{
        return res.json({
            message: 'Hello World :)' 
        });
    }
});

module.exports = routes;