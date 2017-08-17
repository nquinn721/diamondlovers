const path = require("path");
const express = require('express');
module.exports = (app) => {
    app.use((req, res, next) => {
        // req.session.destroy();
        next();
    })
    app.use('/', require('./web'));
    app.use('/db', require('./db'));
    app.use((req, res, next) =>  {
        if(req.session.user)next();
        else res.send({error: 'not logged in'});
    });
    app.use('/app', require('./app'));
    app.use('/profile', require('./profile'));
    app.use((req, res, next) => {
        if(req.session.user.client.admin)next();
        else res.send({error: 'Not an admin'});
    });
    app.use('/admin', require('./admin'));
}