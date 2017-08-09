const express = require('express'),
    app = express()
    server = require('http').Server(app),
    io = require('socket.io')(server),
    pug = require('pug'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'web', 'views'));

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
console.log('ENV ENV ENV', app.get('env'));
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
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