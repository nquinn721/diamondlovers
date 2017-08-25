const   formidable = require("express-formidable"),
        bodyParser = require('body-parser'),
        controllers = require('./controllers');

module.exports = function(app){
    let routes = {
        /**
         * WEB
         */
        ':page': {
            type: 'get',
            method: 'web.index'
        },
        'views/:page': {
          type: 'get',
          method: 'web.views'
        },
        /**
         * END WEB
         */

        /**
         * DB
         */
        'db/register': {
            type: 'post',
            middleWare: ['formidable'],
            method: 'db.register'
        },
        'db/login': {
            type: 'post',
            middleWare: ['formidable'],
            method: 'db.login'
        },
        'db/logout': {
            type: 'post',
            method: 'db.logout'
        },

        /**
         * END DB
         */

        /**
         * PROFILE
         */
        'profile/update': {
          type: 'post',
          middleWare: ['loggedIn', 'formidable'],
          method: 'profile.update'
        },
        'profile/get-nearby': {
            type: 'get',
            middleWare: ['loggedIn'],
            method: 'profile.getNearBy'
        },
        /**
         * END PROFILE
         */

        /**
         * IMAGE
         */

        'image/profile-image-upload' : {
            type: 'post',
            middleWare: ['loggedIn'],
            method: 'image.profileImageUpload'
        },

        'image/make-image-default' : {
            type: 'post',
            middleWare: ['loggedIn', 'formidable'],
            method: 'image.makeImageDefault'
        },

        'image/delete-image' : {
            type: 'post',
            middleWare: ['loggedIn', 'formidable'],
            method: 'image.deleteImage'
        },
        

        /**
         * END IMAGE
         */

        

        /**
         * CARD
         */
        'card/add-card' : {
            type: 'post',
            middleWare: ['loggedIn', 'formidable'],
            method: 'card.addCard'
        }, 
        // {card: cardID}
        'card/remove-card' : {
            type: 'post',
            middleWare: ['loggedIn', 'formidable'],
            method: 'card.removeCard'
        }, 
        // {card: cardID}
        'card/update-default-card' : {
            type: 'post',
            middleWare: ['loggedIn', 'formidable'],
            method: 'card.updateDefaultCard'
        }, 
        // {card: cardID} optional
        'card/charge-card' : {
            type: 'post',
            middleWare: ['loggedIn', 'formidable'],
            method: 'card.chargeCard'
        },
        /**
         * END CARD
         */



         /**
         * ADMIN
         */
         'admin/delete-all-images': {
            type: 'post',
            middleWare: ['isAdmin'],
            method: 'admin.deleteAllImages'
         },
         'admin/get-all-users': {
            type: 'post',
            middleWare: ['isAdmin'],
            method: 'admin.getAllUsers'
         },
         'admin/seed': {
            type: 'get', 
            middleWare: ['isAdmin'],
            method: 'admin.seed'
         },
         'admin/clear-db-images': {
            type: 'get',
            middleWare: ['isAdmin'],
            method: 'admin.clearDBImages'
         },
         'admin/update-user': {
            type: 'post',
            middleWare: ['isAdmin'],
            method: 'admin.updateUser'
         },
         'admin/upload-image-for-user/:email': {
            type: 'post',
            middleWare: ['isAdmin'],
            method: 'admin.uploadImageForUser'
         },
         
        /**
         * END ADMIN
         */ 

        /**
         * TEST
         */
        'test/test': {
            type: 'get',
            method: 'test.test'
        },
        'test/loggedin': {
            type: 'post',
            middleWare: ['loggedIn'],
            method: 'test.loggedIn'
        },
        'test/admin': {
            type: 'post',
            middleWare: ['isAdmin'],
            method: 'test.admin'
        }
        /**
         * END TEST
         */
    };


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
              if(req.session && req.session.user)next();
              else res.send({error: 'not logged in'});
          });
        }

        if(route.middleWare.indexOf('isAdmin') > -1){
            middleWare.push((req, res, next) =>  {
              if(req.session && req.session.user)next();
              else res.send({error: 'not logged in'});
            });
            middleWare.push((req, res, next) => {
                if(req.session && req.session.model && req.session.model.admin)next();
                else res.send({error: 'not an admin'});
            })
        }
      }

      if(typeof controllers[controller][method] === 'function')
        app[route.type]('/' + i, middleWare, controllers[controller][method]);
      else
        console.error(`No route for [${controller}][${method}]`);
    }




}

