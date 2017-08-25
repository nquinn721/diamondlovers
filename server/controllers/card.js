const StripAPI = require('../apis/stripe');

module.exports = {
	addCard: (req, res) => {
	    StripAPI.addCard(req, updateClientWithStripeUser.bind(this, req, res));
	},
	// {card: cardID}
	removeCard: (req, res) => {
	    StripAPI.removeCard(req, updateClientWithStripeUser.bind(this, req, res));
	},
	// {card: cardID}
	updateDefaultCard: (req, res) => {
	    StripAPI.updateDefaultCard(req, updateClientWithStripeUser.bind(this, req, res));
	},
	// {card: cardID} optional
	chargeCard: (req, res) => {
		let userId = req.session.user.client._id;
		
	    StripAPI.charge(req, (e, cust, charge) => {
	        if(charge && charge.status === 'succeeded'){
	            User.addDiamonds(userId, charge.amount / 10, (e, user) => {
	                req.session.user.client = user;
	                req.session.user.stripeCust = cust;
	                
	                res.send(req.session.user)
	            });
	        }else{
	            res.send({error: 'failed to charge card'});
	        }
	    });
	}

}
function updateClientWithStripeUser(req, res, e, data){
    if(data){
        req.session.user.stripeCust = data;
        res.send(req.session.user);
    }else{
        res.send(e);
    }
}