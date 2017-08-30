/**
sk_test_His9L7RGJvdVRuuPOkCeuand
pk_test_SxLXrzbxiAiTwnt8qiOW1agS


	RETURN OBJECTS

	CUSTOMER
{
  "id": "cus_BIrEmpmPtpVO0f",
  "object": "customer",
  "account_balance": 0,
  "created": 1504035390,
  "currency": "usd",
  "default_source": null,
  "delinquent": false,
  "description": null,
  "discount": null,
  "email": null,
  "livemode": false,
  "metadata": {
  },
  "shipping": null,
  "sources": {
    "object": "list",
    "data": [

    ],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/customers/cus_BIrEmpmPtpVO0f/sources"
  },
  "subscriptions": {
    "object": "list",
    "data": [

    ],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/customers/cus_BIrEmpmPtpVO0f/subscriptions"
  }
}


	CARD
{
  "id": "card_1AwFVj2lgQyeTycPjbXCGXlL",
  "object": "card",
  "address_city": null,
  "address_country": null,
  "address_line1": null,
  "address_line1_check": null,
  "address_line2": null,
  "address_state": null,
  "address_zip": null,
  "address_zip_check": null,
  "brand": "Visa",
  "country": "US",
  "customer": "cus_BIrEK5AQlFkAVX",
  "cvc_check": null,
  "dynamic_last4": null,
  "exp_month": 8,
  "exp_year": 2018,
  "fingerprint": "6Q6KJGsnx1EW0RBd",
  "funding": "credit",
  "last4": "4242",
  "metadata": {
  },
  "name": null,
  "tokenization_method": null
}

	CHARGE
{
  "id": "ch_1AupWj2lgQyeTycPcsYEpZeu",
  "object": "charge",
  "amount": 10000,
  "amount_refunded": 0,
  "application": null,
  "application_fee": null,
  "balance_transaction": "txn_1Au2kc2lgQyeTycPU8rass6W",
  "captured": true,
  "created": 1503697181,
  "currency": "usd",
  "customer": "cus_BHOJdy64Kk8USu",
  "description": null,
  "destination": null,
  "dispute": null,
  "failure_code": null,
  "failure_message": null,
  "fraud_details": {
  },
  "invoice": null,
  "livemode": false,
  "metadata": {
  },
  "on_behalf_of": null,
  "order": null,
  "outcome": {
    "network_status": "approved_by_network",
    "reason": null,
    "risk_level": "normal",
    "seller_message": "Payment complete.",
    "type": "authorized"
  },
  "paid": true,
  "receipt_email": null,
  "receipt_number": null,
  "refunded": false,
  "refunds": {
    "object": "list",
    "data": [

    ],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/charges/ch_1AupWj2lgQyeTycPcsYEpZeu/refunds"
  },
  "review": null,
  "shipping": null,
  "source": CARD,
  "source_transfer": null,
  "statement_descriptor": null,
  "status": "succeeded",
  "transfer_group": null
}

*/
const stripe = require("stripe")(
  "sk_test_His9L7RGJvdVRuuPOkCeuand"
);

class Stripe{
	static addNewCard(token, cust, cb = function(){}){
    console.log('add new card', token, cust);
    
		cust.id ? 
			this.addCard(token, cust, cb) :
			this.createCustomer(token, cust, cb);
	}


	/**
	 * STRIPE METHODS
	 */

	 // Returns customer
	 static createCustomer(token, email, cb = function(){}){
    console.log('craeting customer', email);
    
		stripe.customers.create({
		  description: email,
		  source: token
		}, cb);	 	
	 }
	 // Returns customer
	 static getCustomer(stripeId, cb = function(){}){
	 	stripe.customers.retrieve(stripeId, cb);
	 }

	 // Returns charge
	 static charge(token, charge, cb = function(){}){
	 	stripe.charges.create({
		  amount: charge.amount || 10000,
		  currency: charge.currency || "usd",
		  source: token, // obtained with Stripe.js
		  description: charge.description || null
		}, cb);
	 }

	// Returns card
	static addCard(token, cust, cb = function(){}){
		stripe.customers.createSource(cust.id, { source: token }, (e, card) => {
      card && cust.sources.data.push(card);
			cb(e, cust, card)
		});
	}
	// Returns card
	static getCard(cardId, custId){
		stripe.customers.retrieveCard(custId, cardId, cb);
	}
	// Returns customer
	static setDefaultCard(custId, cardId, cb = function(){}){
        stripe.customers.update(custId, {default_source: cardId}, cb);
    }
	// Returns customer 
	// confrim = {"deleted": true, "id": "card_1AwFVj2lgQyeTycPjbXCGXlL"}
	static deleteCard(cardId, cust, cb = function(){}){
		stripe.customers.deleteCard(cust.id, cardId, (e, confirm) => {
      if(confirm)cust.sources.data = cust.sources.data.filter(card => card.id !== confirm.id);
      cb(e, cust, confirm);
    });
	}
	// Returns confirmation
	// {"deleted": true, "id": "cus_BIrEBYxN8bqXjv"}
	static deleteCustomer(custId, cb = function(){}){
		stripe.customers.del(custId, cb);
	}
}	


module.exports = Stripe;