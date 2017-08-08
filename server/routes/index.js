const path = require("path");
module.exports = (app) => {
    app.use('/', require('./web'));
    app.use('/db', require('./db'));
}