const path = require("path");
module.exports = (app) => {
    app.use('/', require('./web'));
    app.use('/db', require('./db'));
    app.use('/app', require('./app'));
}