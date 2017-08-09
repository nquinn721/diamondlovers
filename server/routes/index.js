const path = require("path");
module.exports = (app) => {
    app.use((req, res, next) => {
        // req.session.destroy();
        console.log(req.session);
        req.session.super = 'teowiuf';
        next();
    })
    app.use('/', require('./web'));
    app.use('/db', require('./db'));
   
    app.use('/app', require('./app'));
}