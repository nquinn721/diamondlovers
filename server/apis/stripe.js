/**
 * Keys
 * pk_test_SxLXrzbxiAiTwnt8qiOW1agS
 * sk_test_His9L7RGJvdVRuuPOkCeuand
 *
let req = {
  body: {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2018,
    cvc: '123'
    last4 : "1881"
    card: cardId,
    amount: 10000
    currency: 'usd'
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
     * - req.body.amount
     * - req.session.user.client.email
     */
    static charge(req, cb = function(){}){
      if(!req.session.user.client)return cb({error: 'User not logged in'});

      let charge = req.body;
      let email = req.session.user.client.email;
      let cust = req.session.model.stripeCust;
      if(!cust){
        this.createCustomer(email, charge, (e, cust) => this.chargeCustomer(charge, cust.id, (e, c) => cb( e, cust, c)));
      }else{
        this.chargeCustomer(charge, cust.id, (e, c) => cb(e, cust, c));
      }

    }
    /**
     * END CHARGE
     */



    /**
     * ADD CARD
     * REQUIRED
     * - req.session.user.client.email
     * - req.body.charge.card
     *     - {number, exp_month, exp_year, cvc}
     */
    static addCard(req, cb = function(){}){
      if(!req.session.user.client)return cb({error: 'User not logged in'});

      let cust = req.session.model.stripeCust;
      let email = req.session.user.client.email;
      let card = req.body;

      if(!card)return cb({error: 'No card specified'});
      if(!email)return cb({error: 'No email for user'});

      if(cust){
        this.addCardToCustomer(card, cust, (e, card) => {
          cust.sources.data.push(card);
          cb(e, cust, card);
        });
      }else{
          this.createCustomer(email, card, (e, cust) => {
            if(e)return cb(e);
            this.addCardToCustomer(card, cust, (e, card) =>{
                cb(e, cust, card);
            })
          });
      }
      
    }
    /**
     * END ADD CARD
     */
    
    /**
     * UPDATE CARD
     * REQUIRE 
     * - req.body.last4 || req.body.cardId
     * - req.session.model.stripeCust
     */
    static updateDefaultCard(req, cb = function(){}){
      if(!req.session.user.client)cb({error: 'Uesr not logged in'});

      let last4 = req.body.last4;
      let cardId = req.body.card;
      let cust = req.session.model.stripeCust;


      if(last4){
        this.getCustCardByLast4(cust, last4, (card) => {
          this.updateCustomer(cust.id, {
            default_source: card.id
          }, cb);
        });
      }else{
        this.updateCustomer(cust.id, {
          default_source: cardId
        }, cb);
      }

    }
    static getCustCardByLast4(cust, last4, cb = function(){}){
      for(let i = 0; i < cust.sources.data; i++)
        if(cust.sources.data[i].last4 === last4)return cust.sources.data[i];
    }

    /**
     * END UPDATE CARD
     */


    /**
     * REMOVE CARD
     */
    static removeCard(req, cb = function(){}){
      if(!req.session.user.client)return cb({error: 'No user logged in'});

      let cust = req.session.model.stripeCust;
      let last4 = req.body.last4;
      let cardId = req.body.card;

      if(!cardId){
        this.getCustCardByLast4(cust.id, last4, (e, card, cust) => {
          if(e)return cb(e);
          this.deleteCard(cust.id, card.id, (e, del) => this.removeCardFromCustomer(cust, e, del, cb));
        });
      }else{
          this.deleteCard(cust.id, cardId, (e, del) => this.removeCardFromCustomer(cust, e, del, cb));
      }
      
    }
    static removeCardFromCustomer(cust, e, del, cb){
          if(e)return cb(e);
          for(let i = 0; i < cust.sources.data.length; i++)
            if(cust.sources.data[i].id === del.id)
              cust.sources.data.splice(i, 1);
          cb(null, cust, del);
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
    static createCustomer(email, charge, cb = function(){}){
      let source =  {
          object: 'card',
          number: charge.number,
          exp_month: charge.exp_month,
          exp_year: charge.exp_year,
          cvc: charge.cvc
        };
      stripe.customers.create({source, email}, function(e, cust){
        if(!e)User.createStripeCustomer(email, cust.id);
        cb(e, cust);
      });
    }
    /**
     * id = customer id
     * cb = (err, customer)
     */
    static getCustomer(id, cb = function(){}){
        stripe.customers.retrieve(id, cb);
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


