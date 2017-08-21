const path = require("path");
const express = require('express');
module.exports = (app) => {
    app.use('/', require('./web'));
    app.use('/db', require('./db'));
    app.use((req, res, next) =>  {
        if(req.session.user)next();
        else res.send({error: 'not logged in'});
    });
    app.use('/image', require('./image'));
    app.use('/card', require('./card'));
    
    app.use('/admin', require('./admin'));

    app.use(function(req, res){
        res.send({error: 'no route specified'});
    });
}