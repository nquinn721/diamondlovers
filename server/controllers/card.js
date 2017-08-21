const StripAPI = require('../apis/stripe');

module.exports = {
	addCard: (req, res) => {
	    StripAPI.addCard(req, updateClientWithStripeUser.bind(this, req, res));
	},
	// {card: cardID}
	removeCard: (req, res) => {
	    console.log('rmeove card');
	    StripAPI.removeCard(req, updateClientWithStripeUser.bind(this, req, res));
	},
	// {card: cardID}
	updateDefaultCard: (req, res) => {
	    console.log('update default card');
	    StripAPI.updateDefaultCard(req, updateClientWithStripeUser.bind(this, req, res));
	},
	// {card: cardID} optional
	chargeCard: (req, res) => {
	    StripAPI.charge(req, (e, cust, charge) => {
	        if(charge && charge.status === 'succeeded'){
	            User.addDiamonds(req.session.user.email, charge.amount / 10, (e, user) => {
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