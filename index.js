var express = require('express'),
    app = express()
    server = require('http').Server(app),
    io = require('socket.io')(server),
    path = require('path');


app.use(express.static(path.join(__dirname, 'web')));


server.listen(process.env.PORT || 3000);

io.on('connection', (socket) => {
    console.log('connected');
});