const config = require('../config');
module.exports = {
	register: function(req, res){
	    if(!req.body.email || !req.body.password)return res.send({error: config.errorMessages.register})
	    User.get({
	        email: req.body.email.trim(), 
	        password: req.body.password.trim(), 
	        firstName: req.body.firstName ? req.body.firstName.trim() : null, 
	        lastName: req.body.lastName ? req.body.lastName.trim() : null,
	        profile: {
		        state: req.body.state ? req.body.state.trim() : null,
		        city: req.body.city ? req.body.city.trim() : null,
		        zip: req.body.zip ? req.body.zip.trim() : null,
	        	displayName: req.body.displayName ? req.body.displayName.trim() : null,
	        	cost: {
	        		date1: 0
	        	}
	        }
	    }, (e, client, doc) => {
	        if(client){
	            req.session.user = {
	                client: client,
	            }
	            req.session.model = doc;
	            res.send({data: req.session.user.client});
	        }else{
	            res.send({error: config.errorMessages.register});
	        }

	    });
	
	},

	login: function(req, res){
	    if(!req.body.email || !req.body.password)return res.send({error: config.errorMessages.login.missingInfo});
	    User.login(req.body.email.trim(),  req.body.password.trim(), (e, user, doc) => {
	        if(doc){
	            req.session.user = user;
	            req.session.model = doc;
	            
	            res.send({data: req.session.user});
	        }else{
	            delete req.session.user;
	            res.send({error: config.errorMessages.login.failedLogin});
	        }
	    });
	},
	checkLogged: function(req, res) {
		console.log('checking logged in');
		console.log('checking logged in');
		console.log('checking logged in');
		console.log('checking logged in');
		console.log('checking logged in');
		console.log('checking logged in');
		console.log('checking logged in');
		console.log(req.session);
		
		if(req.session.user){
			res.send({data: req.session.user});
		}else{
			res.status(400);
			res.send({error: 'not logged in'});
		}
	},
	logout: function(req, res) {
		req.session.destroy(function(err) {
			res.send({msg: 'Logged out'});
	  });
		
	}
}