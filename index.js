var express = require('express'),
    app = express()
    server = require('http').Server(app),
    io = require('socket.io')(server),
    pug = require('pug'),
    path = require('path'),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 3000;


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'web', 'views'));

// Environment
global.PROD = global.env;
// Database API
require('./server/db');
// External API's
require('./server/apis');
// Routes
require('./server/routes')(app);



// Listen
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

io.on('connection', (socket) => {
    console.log('connected');
});