import React from 'react';
import config from '../config/config';
const stripe = require('stripe-client')(config.srtripeApiKey);

// let prom = stripe.createToken({
//   card: {
//     "number": '4242424242424242',
//     "exp_month": 12,
//     "exp_year": 2018,
//     "cvc": '123'
//   }
// });


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
 
export class App extends React.Component {
  async onPayment() {
    var card = await stripe.createToken(information);
    var token = card.id;
    // send token to backend for processing 
  }
 
  render() {
    ...
  }
}