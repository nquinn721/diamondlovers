import {addCard, setDefaultCard, deleteCard, chargeCard} from './card';
var stripe = require('stripe-client')('YOUR_PUBLISHABLE_STRIPE_API_KEY');
 
var information = {
  card: {
    number: '4242424242424242',
    exp_month: '02',
    exp_year: '21',
    cvc: '999',
    name: 'Billy Joe'
  }
}
 
 
it('should get data back from addCard', (done) => {
	stripe.createToken(information).then(card => {
		console.log(card);
		done();	
		// addCard()
	})
})