/**
 * Keys
 * pk_test_SxLXrzbxiAiTwnt8qiOW1agS
 * sk_test_His9L7RGJvdVRuuPOkCeuand
 *
let req = {
  body: {
    charge: {
       card: {
        "number": '4242424242424242',
        "exp_month": 12,
        "exp_year": 2018,
        "cvc": '123'
        "last4" : "1881"
      }
      amount: 10000
      currency: 'usd'
    }
  },
  session: {
    user: {
      email: 'peanut@bob.com',
      stripeId: 'cus_BDEEGNrC34z89w'
    }
  }
} 
 */
const stripe = require("stripe")(
  "sk_test_His9L7RGJvdVRuuPOkCeuand"
);
class StripeAPI{
  
    
    /**
     * CHARGE
     * REQUIRED
     * - req.body.charge.amount
     * - req.session.user.email
     */
    static charge(req, cb = function(){}){
      if(!req.session.user)return cb({error: 'User not logged in'});

      let charge = req.body.charge;
      let stripeId = req.session.user.stripeId;
      let email = req.session.user.email;
      let last4 = req.body.charge && req.body.charge.card ? req.body.charge.card.last4 : null;

      if(!charge.amount)return cb({error: 'No amount specified'});
      if(!email)return cb({error: 'No email was set for user'});

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
          this.chargeCustomer(charge, cust.id, cb);
        });
      }else{
        this.chargeCustomer(req.body.charge, stripeId, cb);
      }
    }
    /**
     * END CHARGE
     */



    /**
     * ADD CARD
     * REQUIRED
     * - req.session.user.stripeId
     * - req.session.user.email
     * - req.body.charge.card
     *     - {number, exp_month, exp_year, cvc}
     */
    static addCard(req, cb = function(){}){
      if(!req.session.user)return cb({error: 'User not logged in'});

      let stripeId = req.session.user.stripeId;
      let email = req.session.user.email;
      let card = req.body;

      if(!card)return cb({error: 'No card specified'});
      if(!email)return cb({error: 'No email for user'});

      if(stripeId){
        this.retrieveCustomer(stripeId, (e, cust) => {
          if(e)return cb(e);
          this.addCardToCustomer(card, cust, (e, card) => {
            cust.sources.data.push(card);
            cb(e, cust);
          });
        });
      }else{
        this.createToken(card, (e, token) => {
          if(e)return cb(e);
          this.createCustomer(email, token.id, cb);
        });
      }
      
    }
    /**
     * END ADD CARD
     */
    
    /**
     * UPDATE CARD
     * REQUIRE 
     * - req.body.charge.card.last4
     * - req.session.user.stripeId
     */
    static updateDefaultCard(req, cb = function(){}){
      if(!req.session.user)cb({error: 'Uesr not logged in'});

      let stripeId = req.session.user.stripeId;
      let last4 = req.body.last4;

      if(!last4)return cb({error: 'No last 4 passed to update default card'});

      this.getCustCardByLast4(stripeId, last4, (e, card, cust) => {
        if(e)return cb(e);
        this.updateCustomer(cust.id, {
          default_source: card.id
        }, cb);
      });

    }

    /**
     * END UPDATE CARD
     */

    /**
    * GETS
    */
    static getCustomer(user, cb = function(){}){
        this.retrieveCustomer(user.stripeId, cb);
    }
    /**
     * END GETS
     */


    /**
     * REMOVE CARD
     */
    static removeCard(req, cb = function(){}){
      if(!req.session.user)return cb({error: 'No user logged in'});

      let stripeId = req.session.user.stripeId;
      let last4 = req.body.last4;
      if(!last4)return cb({error: 'No last 4 passed to remove card'});
      if(!stripeId)return cb({error: 'Customer is not created'});


      this.getCustCardByLast4(stripeId, last4, (e, card, cust) => {
        if(e)return cb(e);
        this.deleteCard(cust.id, card.id, (e, del) => {
          if(e)return cb(e);
          for(let i = 0; i < cust.sources.data.length; i++)
            if(cust.sources.data[i].id === del.id)
              cust.sources.data.splice(i, 1);
          
          cb(null, cust);
        });
      });
    }
    /**
     * END REMOVE CARD
     */




    /**
     * STRIPE METHODS
     */



    /**
     * card = {number: String, exp_month: String, exp_year: String, cvc: String} 
     */
    static createToken(card, cb = function(){}){
      stripe.tokens.create({
        card: card
      }, cb);
    }

    /**
     * card = {number: String, exp_month: String, exp_year: String, cvc: String}
     */
    static addCardToCustomer(card, cust, cb = function(){}){
      stripe.customers.createSource(
        cust.id,
          { source: 
            {
              object: 'card',
              number: card.number,
              exp_month: card.exp_month,
              exp_year: card.exp_year,
              cvc: card.cvc
          } 
        }, cb);
    }
    /**
     * obj = {amount: 2000, currency(optional): "usd", card(optional): String(card.id)}
     * custid = StripeCustomer id
     */
    static chargeCustomer(obj, custid, cb = function(){}){
      let charge = {
        amount: obj.amount,
        currency: obj.currency || "usd",
        customer: custid
      }
      if(obj.card && typeof obj.card === 'string')
        charge.card = obj.card;
      stripe.charges.create(charge, cb);
    }
    /**
     * email = String
     * token = String
     * cb = (err, customer)
     */
    static createCustomer(email, token, cb = function(){}){
      stripe.customers.create({
        source: token,
        email: email
      }, function(e, cust){
        if(!e)User.createStripeCustomer(email, cust.id);
        cb(e, cust);
      });
    }
    /**
     * id = customer id
     * cb = (err, customer)
     */
    static retrieveCustomer(id, cb = function(){}){
        stripe.customers.retrieve(id, cb);
    }
    /**
     *  id = customer id
     *  last4 = last 4 of card
     */
    static getCustCardByLast4(id, last4, cb = function(){}){

      this.retrieveCustomer(id, (e, cust) => {
        if(e)return cb(e);
        let found;

        cust.sources.data.forEach(card => {
          if(card.last4 === last4)found = card;
        });

        found ? cb(null, found, cust) : cb('failed to find card');
      });
    }
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
    static updateCustomer(id, obj, cb = function(){}){
        stripe.customers.update(id, obj, cb);
    }
    static deleteCustomer(customerId, cb = function(){}){
        User.deleteStripeCustomer(customerId);
        stripe.customers.del(customerId, cb);
    }
    static deleteCard(customerId, cardId, cb = function(){}){
        stripe.customers.deleteCard(customerId, cardId, cb);
    }

}


module.exports = StripeAPI;


