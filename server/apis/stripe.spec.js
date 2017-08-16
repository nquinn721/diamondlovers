const chai = require('chai');
const should = chai.should();
let s = require('./stripe');

// let s = new StripeAPI;
let testTime = 5000;

// let req = {
//   body: {
//       number: '4242424242424242',
//       exp_month: 12,
//       exp_year: 2018,
//       cvc: '123'
//       last4 : "1881"
//       card: cardId,
//       amount: 10000
//       currency: 'usd'
//     }
//   },
//   session: {
//     user: {
//       // email: 'peanut@bob.com',
//       stripeId: 'cus_BDEEGNrC34z89w'
//     }
//   }
// } 

describe('Stripe API charge', function() {
    let req = {
        session: {
            user: {
                client: {
                    email: 'hipster@hiphopannonomys.com',
                },
                stripeCust: null
            }
        }
    }, cardId;
    beforeEach(() => {
        req.body = {};
    });
   
    it('Should create a customer on charge if no stripe customer id is specified', (done) => {
        req.body.number = '4242424242424242';
        req.body.exp_month =  12;
        req.body.exp_year =  2018;
        req.body.cvc =  '123';
        req.body.amount = 10000;

        s.charge(req, (e, cust, charge) => {
            req.session.user.stripeCust = cust;
            charge.object.should.equal('charge');
            charge.source.object.should.equal('card');
            charge.source.last4.should.equal('4242');

            cust.object.should.equal('customer');

            done();
        });
    }).timeout(testTime);

    

    it('Should charge default card if stripe cust already created without specifying card', (done) => {
        req.body.amount = 10000;
        s.charge(req, (e, cust, charge) => {
            charge.status.should.equal('succeeded');
            charge.amount.should.equal(10000);
            done();
        });
    }).timeout(testTime);


     it('Should add card to customer already there', (done) => {
        req.body = {
            number: '4000056655665556',
            exp_month: 12,
            exp_year: 2018,
            cvc: '123'
        }
        
        s.addCard(req, (e, cust, card) => {
            cust.object.should.equal('customer');
            cust.sources.data.length.should.equal(2);
            cardId = card.id;
            done();
        });
    }).timeout(testTime);


    it('Should charge the specific card', (done) => {
        req.body = {
            card: cardId,
            amount: 10000,
        }
        s.charge(req, (e, cust, charge) => {
            charge.source.last4.should.equal('5556');
            charge.amount.should.equal(10000);
            charge.status.should.equal('succeeded');
            done();
        });
    }).timeout(testTime);

    it('Should update default card', (done) => {
        req.session.user.stripeCust.default_source.should.not.equal(cardId);
        req.body.cardId = cardId;
        s.updateDefaultCard(req, (e, cust) => {
            cust.default_source.should.equal(cardId);
            done();
        });
    }).timeout(testTime);

    it('Should remove card from customer', (done) => {
        req.body.card = cardId;
        s.removeCard(req, (e, cust, card) => {
            cust.object.should.equal('customer');
            cust.sources.data.length.should.equal(1);
            card.deleted.should.be.true;
            card.id.should.equal(cardId);
            
            
            s.deleteCustomer(req.session.user.stripeCust.id, done);
        });
    }).timeout(testTime);

    it('Add card should create a customer as well', (done) => {
        delete req.session.user.stripeCust;
        req.session.user.client.email = 'bob@bob.com';
        req.body = {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2018,
            cvc: '123'
        }
        s.addCard(req, (e, cust, card) => {
            cust.object.should.equal('customer');
            cust.email.should.equal('bob@bob.com');
            cust.sources.data.length.should.equal(1);
            s.deleteCustomer(cust.id, done);
        });
    }).timeout(testTime);

   
});
