const   formidable = require("express-formidable"),
        bodyParser = require('body-parser'),
        controllers = require('./controllers');

module.exports = function(app){
    let routes = {
        /**
         * WEB
         */
        '/': {
            type: 'get',
            method: 'web.index'
        },
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
            middleWare: ['json'],
            method: 'db.login'
        },
        'db/logout': {
            type: 'get',
            method: 'db.logout'
        },
        'db/check-logged': {
            type: 'get',
            method: 'db.checkLogged'
        },
        

        /**
         * END DB
         */

        /**
         * USER
         */
         // {field: field, value: value} - id is retrieved from session
        'user/update-profile-field': {
          type: 'post',
          middleWare: ['loggedIn', 'json'],
          method: 'user.updateProfileField'
        },
        // ----
        'user/get-nearby': {
            type: 'get',
            middleWare: ['loggedIn'],
            method: 'user.getNearBy'
        },
        'user/get-user/:id': {
            type: 'get',
            middleWare: ['loggedIn'],
            method: 'user.getUser'
        },
        'user/update-search-index': {
            type: 'get',
            middleWare: ['loggedIn'],
            method: 'user.updateSearchIndex'
        },
        /**
         * END USER
         */
        

        /**
         * DATES
         */
        'dates/get-dates': {
            type: 'get',
            middleWare: ['loggedIn'],
            method: 'dates.getDates'
        },
        // {to, from, location, time}
        'dates/set-date': {
            type: 'post',
            middleWare: ['loggedIn', 'json'],
            method: 'dates.setDate'
        },
        // {dateId}
        'dates/approve-date': {
            type: 'post',
            middleWare: ['loggedIn', 'json'],
            method: 'dates.approveDate'
        },
        // {dateId}
        'dates/confirm-showed': {
            type: 'post',
            middleWare: ['loggedIn', 'json'],
            method: 'dates.confirmShowed'
        },
        /**
         * END DATES
         */
        

        /**
         * IMAGE
         */

        'image/add-profile-image' : {
            type: 'post',
            middleWare: ['loggedIn'],
            method: 'image.profileImageUpload'
        },

        'image/set-default-image' : {
            type: 'post',
            middleWare: ['loggedIn', 'formidable'],
            method: 'image.setDefaultImage'
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
         * CHAT
         */
        // 'chat/create': {
        //     type: 'post',
        //     middleWare: ['loggedIn', 'json'],
        //     method: 'chat.create'
        // },
        // 'chat/get-chats': {
        //     type: 'get',
        //     middleWare: ['loggedIn'],
        //     method: 'chat.getChats'
        // },
        'chat/send-message': {
            type: 'post',
            middleWare: ['loggedIn', 'json'],
            method: 'chat.sendMessage'
        },
        'chat/get-messages/:chatId': {
            type: 'get',
            middleWare: ['loggedIn'],
            method: 'chat.getMessages'
        },
        /**
         * END CHAT
         */

        /**
         * YELP
         */
        'yelp/search': {
            type: 'post',
            middleWare: ['loggedIn', 'json'],
            method: 'yelp.search'
        },
        /**
         * END YELP
         */

        

        /**
         * CARD
         */
        'card/add-card' : {
            type: 'post',
            middleWare: ['loggedIn', 'json'],
            method: 'card.addCard'
        }, 
        // {card: cardID}
        'card/delete-card' : {
            type: 'post',
            middleWare: ['loggedIn', 'json'],
            method: 'card.deleteCard'
        }, 
        // {card: cardID}
        'card/set-default-card' : {
            type: 'post',
            middleWare: ['loggedIn', 'json'],
            method: 'card.setDefaultCard'
        }, 
        // {card: cardID} optional
        'card/charge-card' : {
            type: 'post',
            middleWare: ['loggedIn', 'json'],
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
         // {_id: _id, field: field, value: value}
         'admin/update-user-profile': {
            type: 'post',
            middleWare: ['isAdmin', 'formidable'],
            method: 'admin.updateUserProfile'
         },
         // {User}
         'admin/update-user': {
            type: 'post',
            middleWare: ['isAdmin', 'json'],
            method: 'admin.updateUser'
         },
         'admin/upload-image-for-user/:id': {
            type: 'post',
            middleWare: ['isAdmin'],
            method: 'admin.uploadImageForUser'
         },
         'admin/delete-image-for-user/:id': {
            type: 'post',
            middleWare: ['isAdmin', 'json'],
            method: 'admin.deleteImageForUser'
         },
         'admin/get-images-for-user/:id': {
            type: 'get',
            middleWare: ['isAdmin'],
            method: 'admin.getImagesForUser'
         },
         'admin/get-full-user': {
            type: 'get',
            middleWare: ['isAdmin'],
            method: 'admin.getFullUser'
         },
         'admin/update-model': {
            type: 'post',
            middleWare: ['isAdmin', 'json'],
            method: 'admin.updateModel'
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

        if(route.middleWare.indexOf('json') > -1){
            middleWare.push(
              bodyParser.urlencoded({ extended: true }),
              bodyParser.json(),
              (req, res, next) => {
                req.body = req.body.data ? req.body.data : req.body;
                next();
              }
            )
        }
        if(route.middleWare.indexOf('formidable') > -1){
          middleWare.push(
              bodyParser.urlencoded({ extended: true }),
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

