const config = require('../config');
console.log('db.js');
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
	        	displayName: req.body.displayName ? req.body.displayName.trim() : null
	        }
	    }, (e, client, doc) => {
	        if(client){
	            req.session.user = {
	                client: client,
	            }
	            req.session.model = doc;
	            res.send({data: req.session.user});
	        }else{
	            res.send({error: config.errorMessages.register});
	        }

	    });
	},

	login: function(req, res){
		console.log('LOGIN');
		console.log('LOGIN');
		console.log('LOGIN');
		console.log('LOGIN');
		console.log('LOGIN');
		
		console.log(req.body);
	    if(!req.body.email || !req.body.password)return res.send({error: config.errorMessages.login.missingInfo});
	    User.login(req.body.email.trim(),  req.body.password.trim(), (e, doc, user) => {
	    	console.log(e, doc, user);
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
	logout: function(req, res) {
		delete req.session.user;
		res.send({msg: 'Logged out'});
	}
}