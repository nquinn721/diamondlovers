const express = require('express'),
    app = express()
    server = require('http').Server(app),
    io = require('socket.io')(server),
    pug = require('pug'),
    path = require('path'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    formidable = require("express-formidable"),
    bodyParser = require('body-parser');
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
const routes = require('./server/routes');
const controllers = require('./server/controllers')
for(let i in routes){
  let route = routes[i];
  let cmethod = route.method.split('.');
  let controller = cmethod[0];
  let method = cmethod[1];
  let middleWare = [];

  if(route.middleWare){

    if(route.middleWare.indexOf('formidable') > -1){
      middleWare.push(
          bodyParser.urlencoded({ extended: false }),
          formidable(),
          function(req, res, next){
              req.body = req.fields && Object.keys(req.fields).length ? req.fields : req.body;
              next();
          }
      )
    }

    if(route.middleWare.indexOf('loggedIn') > -1){
      middleWare.push((req, res, next) =>  {
          if(req.session.user)next();
          else res.send({error: 'not logged in'});
      });
    }
    if(route.middleWare.indexOf('multer') > -1){

    }
  }

  app[route.type]('/' + i, middleWare, controllers[controller][method]);
}



// Listen
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

io.on('connection', (socket) => {
    console.log('connected');
});