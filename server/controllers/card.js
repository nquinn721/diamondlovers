const StripAPI = require('../apis/stripe');

module.exports = {
	addCard: (req, res) => {
		let custId = req.session.user.stripeCust ? req.session.user.stripeCust : req.session.user.client.email;
	    StripAPI.addNewCard(req.body.token, custId, updateClientWithStripeUser.bind(this, req, res));
	},
	// {card: cardID}
	deleteCard: (req, res) => {
		let cust = req.session.user.stripeCust;
	    StripAPI.deleteCard(req.body.card, cust, updateClientWithStripeUser.bind(this, req, res));
	},
	// {card: cardID}
	setDefaultCard: (req, res) => {
		let custId = req.session.user.stripeCust.id;
	    StripAPI.setDefaultCard(custId, req.body.card, updateClientWithStripeUser.bind(this, req, res));
	},
	// {card: cardID} optional
	chargeCard: (req, res) => {
		let userId = req.session.user.client._id,
			token = req.body.token,
			amount = req.body.amount;
		
	    StripAPI.charge(token, {amount}, (e, cust, charge) => {
	        if(charge && charge.status === 'succeeded'){
	            User.addDiamonds(userId, charge.amount / 10, (e, user) => {
	                req.session.user.client = user;
	                req.session.user.stripeCust = cust;
	                
	                res.send({data: req.session.user.stripeCust})
	            });
	        }else{
	            res.send({error: 'failed to charge card'});
	        }
	    });
	}

}
function updateClientWithStripeUser(req, res, e, data){
	console.log(e);
	
    if(data){
    	if(!data.deleted){
    		if(!req.session.model.stripeId){
		    	User.createStripeCustomer(req.session.user.client._id, data.id, (e, user, model) => {
		    		req.session.user.client = user
			        req.session.user.stripeCust = data;
			        req.session.model = model;
			        res.send({data: req.session.user.stripeCust});
		    	});
		    }else{
		        req.session.user.stripeCust = data;
		        res.send({data: req.session.user.stripeCust});
		    }
    	}else{
	        res.send({data: req.session.user.stripeCust});
    	}
    }else{
        res.send({error: 'failed'});
    }
}