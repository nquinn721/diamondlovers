const express = require('express'),
    app = express()
    server = require('http').Server(app),
    io = require('socket.io')(server),
    pug = require('pug'),
    path = require('path'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    
    PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'web', 'views'));
app.use(express.static(path.join(__dirname, 'server', 'images')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'web')));

// Environment
global.PROD = global.env;
// Database API
const db = require('./server/db');

var sess = {
  secret: 'walkingTheDogOnASummerDay',
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: { maxAge: 30 * 60 * 1000 },
  store: new MongoStore({
      dbPromise: db
  })
}
if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));




// External API's
require('./server/apis');
// Routes
require('./server/routes')(app);



// Listen
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

io.on('connection', (socket) => {
    console.log('connected');
});

module.exports = app;