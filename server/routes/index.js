const path = require("path");
module.exports = (app) => {
    app.use((req, res, next) => {
        // req.session.destroy();
        next();
    })
    app.use('/', require('./web'));
    app.use('/db', require('./db'));
    app.use((req, res, next) =>  {
        console.log(req.session.user);
        if(req.session.user)next();
        else res.send({error: 'not logged in'});
    })
    app.use('/app', require('./app'));
}