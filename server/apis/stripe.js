/**
 * Keys
 * pk_test_SxLXrzbxiAiTwnt8qiOW1agS
 * sk_test_His9L7RGJvdVRuuPOkCeuand
 */

function StripeAPI(){
  this.stripe = require("stripe")(
    "sk_test_His9L7RGJvdVRuuPOkCeuand"
  );
}
StripeAPI.prototype = {
    
    charge: function(req, cb = function(){}){
      let charge = req.body.charge;
      let stripeId = req.session.user.stripeCustId;
      let email = req.session.user.email;
      let last4 = req.body.charge && req.body.charge.card ? req.body.charge.card.last4 : null;

      if(!charge.amount)return cb({error: 'No amount specified'});

      if(!stripeId){
        this.createToken(charge.card, (e, token) => {
          if(e)return cb(e);
          this.createCustomer(email, token.id, (e, cust) => {
            if(e)return cb(e);
            this.chargeCustomer(charge, cust.id, cb);
          });
        });
      }else if(last4){
        this.getCustCardByLast4(stripeId, last4, (e, card, cust) => {
          if(e)return cb(e);
          this.chargeCustomer(charge, cust, cb);
        });
      }else{
        this.chargeCustomer(req.body.charge, stripeId, cb);
      }
      
        
    },
    addCard: function(req, cb = function(){}){
      let stripeId = req.session.user.stripeCustId;

      if(stripeId){
        this.retrieveCustomer(req.session.user.stripeCustId, (e, cust) => {
          if(e)return cb(e);
          this.addCardToCustomer(req, cust, cb);
        });
      }else{
        this.createToken(req.body.charge.card, (e, token) => {
          if(e)return cb(e);
          this.createCustomer(req.session.user.email, token.id, cb);
        });
      }
      
    },
    addCardToCustomer: function(req, cust, cb = function(){}){
      this.stripe.customers.createSource(
        cust.id,
          { source: {
            object: 'card',
            number: req.body.charge.card.number,
            exp_month: req.body.charge.card.exp_month,
            exp_year: req.body.charge.card.exp_year,
            cvc: req.body.charge.card.cvc
          } 
        }, cb);
    },
    updateDefaultCard: function(req, cb = function(){}){
      this.getCustCardByLast4(req.session.user.stripeCustId, req.body.charge.card.last4, (e, card, cust) => {
        if(e)return cb(e);
        this.updateCustomer(cust.id, {
          default_source: card.id
        }, cb);
      });

    },


    /**
     * STRIPE METHODS
     */



    /**
     * card = { cardNumber: String, exp: String, cvc: String}
     */
    createToken: function(card, cb = function(){}){
      this.stripe.tokens.create({
        card: card
      }, cb);
    },
    /**
     * obj = {amount: 2000, currency(optional): "usd", card(optional): String(card.id)}
     * custid = StripeCustomer id
     */
    chargeCustomer: function(obj, custid, cb = function(){}){
      let charge = {
        amount: obj.amount,
        currency: obj.currency || "usd",
        customer: custid
      }
      if(obj.card && typeof obj.card === 'string')
        charge.card = obj.card;
      this.stripe.charges.create(charge, cb);
    },
    /**
     * email = String
     * token = String
     * cb = (err, customer)
     */
    createCustomer: function(email, token, cb = function(){}){
      this.stripe.customers.create({
        source: token,
        email: email
      }, cb);
    },
    /**
     * id = customer id
     * cb = (err, customer)
     */
    retrieveCustomer: function(id, cb = function(){}){
      this.stripe.customers.retrieve(id, cb);
    },
    /**
     *  id = customer id
     *  last4 = last 4 of card
     */
    getCustCardByLast4: function(id, last4, cb = function(){}){
      this.retrieveCustomer(id, (e, cust) => {
        if(e)return cb(e);
        cust.sources.data.forEach(card => card.last4 === last4 ? cb(null, card, cust) : cb('failed to update'));
      });
    },
    /**
     * Fields you can update
     *  account_balance - An integer amount in cents that is the starting account balance for your customer. A negative amount represents a credit that will be used before attempting any charges to the customer’s card; a positive amount will be added to the next invoice.
        business_vat_id - The customer’s VAT identification number. If you are using Relay, this field gets passed to tax provider you are using for your orders. This can be unset by updating the value to null and then saving.
        coupon - If you provide a coupon code, the customer will have a discount applied on all recurring charges. Charges you create through the API will not have the discount. This can be unset by updating the value to null and then saving.
        default_source - ID of the source to make the customer’s new default.
        description - An arbitrary string that you can attach to a customer object. It is displayed alongside the customer in the dashboard. This can be unset by updating the value to null and then saving.
        email - Customer’s email address. It’s displayed alongside the customer in your dashboard and can be useful for searching and tracking. This can be unset by updating the value to null and then saving.
        metadata - A set of key/value pairs that you can attach to a customer object. It can be useful for storing additional information about the customer in a structured format. You can unset an individual key by setting its value to null and then saving. To clear all keys, set metadata to null, then save.
        shipping - object
            -  address REQUIRED
                - line1 REQUIRED
                - city
                - country
                - line2
                - postal_code
                - state
            - name REQUIRED
            - phone
        source - The source can either be a Token’s or a Source’s ID, as returned by Elements, or a dictionary containing a user’s credit card details (with the options shown below).
            - object REQUIRED - The type of payment source. Should be "card".
            - exp_month REQUIRED - Two digit number representing the card's expiration month.
            - exp_year REQUIRED - Two or four digit number representing the card's expiration year.
            - number REQUIRED - The card number, as a string without any separators.
            - address_city 
            - address_country
            - address_line1
            - address_line2
            - address_state
            - address_zip
            - cvc REQUIRED - Card security code. Highly recommended to always include this value, but it's only required for accounts based in European countries.
            - metadata - A set of key/value pairs that you can attach to a card object. It can be useful for storing additional information about the card in a structured format.
            - name - Cardholder's full name.
     */
    updateCustomer: function(id, obj, cb){
      this.stripe.customers.update(id, obj, cb);
    },
    deleteCustomer: function(customerId){
        this.stripe.customers.del(customerId);
    }

}


module.exports = StripeAPI;


