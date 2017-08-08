var express = require('express'),
    app = express()
    server = require('http').Server(app),
    io = require('socket.io')(server),
    pug = require('pug'),
    path = require('path');


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'web', 'views'));

var db = require('./server/db');
var apis = require('./server/apis');

app.get('/', function(req, res){
    res.render('index');
})

server.listen(process.env.PORT || 3000);

io.on('connection', (socket) => {
    console.log('connected');
});