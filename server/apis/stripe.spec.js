const chai = require('chai');
const should = chai.should();
let s = require('./stripe');

// let s = new StripeAPI;
let testTime = 5000;

// let req = {
//   body: {
//     charge: {
//       //  card: {
//         // "number": '4242424242424242',
//         // "exp_month": 12,
//         // "exp_year": 2018,
//         // "cvc": '123'
//         // "last4" : "1881"
//       // },
//       amount: 10000
//       // currency: 'usd'
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
    let req, customerId;
    beforeEach(() => {
        req = {
            body: {
                charge: {
                    amount: 10000
                }
            },
            session: {
                user: {
                    email: 'hipster@hiphopannonomys.com',
                }
            }
        } 
    });
    after(() => s.deleteCustomer(customerId));
   
    it('Should create a customer on charge if no stripe customer id is specified', (done) => {
        req.body.charge.card = {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2018,
            cvc: '123'
        }
        s.charge(req, (e, charge) => {
            customerId = charge.customer;
            charge.object.should.equal('charge');
            charge.source.object.should.equal('card');
            charge.source.last4.should.equal('4242');
            done();
        });
    }).timeout(testTime);

    

    it('Should charge default card if stripe cust already created without specifying card', (done) => {
        req.session.user.stripeId = customerId;
        
        s.charge(req, (e, charge) => {
            charge.status.should.equal('succeeded');
            charge.amount.should.equal(10000);
            done();
        });
    }).timeout(testTime);

    it('Should charge the specific card', (done) => {
        req.session.user.stripeId = customerId;
        req.body.charge.card = {last4: '4242'};
        s.charge(req, (e, charge) => {
            charge.source.last4.should.equal('4242');
            charge.amount.should.equal(10000);
            charge.status.should.equal('succeeded');
            done();
        });
    }).timeout(testTime);
   
});

describe('Stripe API card management', function(){
    let req, customerId;
    beforeEach(() => {
        req = {
            body: {
                charge: {
                    amount: 10000
                }
            },
            session: {
                user: {
                    email: 'hipster@hiphopannonomys.com',
                }
            }
        } 
    });
    after(() => s.deleteCustomer(customerId));
    
    
    it('Add card should create a customer as well', (done) => {
        req.body = {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2018,
            cvc: '123'
        }
        s.addCard(req, (e, cust) => {
            cust.object.should.equal('customer');
            cust.email.should.equal('hipster@hiphopannonomys.com');
            customerId = cust.id;
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
        req.session.user.stripeId = customerId;
        
        s.addCard(req, (e, cust) => {
            cust.object.should.equal('customer');
            done();
        });
    }).timeout(testTime);

    it('Should remove card from customer', (done) => {
        req.session.user.stripeId = customerId;
        req.body.charge.card = {last4: '4242'};

        s.removeCard(req, (e, del) => {
            del.id.should.be.a.string;
            done();
        });
    }).timeout(testTime);

});
