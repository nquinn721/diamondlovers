const config = require('../config');

module.exports = {
	register: function(req, res){
	    if(!req.body.email || !req.body.password)return res.send({error: config.errorMessages.register})
	    User.register({
	        email: req.body.email.trim(), 
	        password: req.body.password.trim(), 
	        firstName: req.body.firstName ? req.body.firstName.trim() : null, 
	        lastName: req.body.lastName ? req.body.lastName.trim() : null,
	        profile: {
	        	displayName: req.body.displayName ? req.body.displayName.trim() : null
	        }
	    }, (e, client, doc) => {
	        if(client){
	            req.session.user = {
	                client: client
	            }
	            req.session.model = doc;
	            res.send(client);
	        }else{
	            res.send({error: config.errorMessages.register});
	        }

	    });
	},

	login: function(req, res){
		console.log(req.body);
	    if(!req.body.email || !req.body.password)return res.send({error: config.errorMessages.login.missingInfo});
	    User.login(req.body.email.trim(),  req.body.password.trim(), (e, doc, client, cust) => {

	        if(doc){
	            req.session.user = {
	                client: client,
	                stripeCust: cust
	            };
	            req.session.model = doc;
	            res.send(req.session.user);
	        }else{
	            delete req.session.user;
	            res.send({error: config.errorMessages.login.failedLogin});
	        }
	    });
	}
}