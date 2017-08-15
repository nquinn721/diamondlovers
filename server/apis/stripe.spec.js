const chai = require('chai');
const should = chai.should();
let StripeAPI = require('./stripe');

let s = new StripeAPI;

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
//       stripeCustId: 'cus_BDEEGNrC34z89w'
//     }
//   }
// } 
// s.updateDefaultCard(req, (e, cust) => {
  // console.log(e, cust);
// })
// s.charge(req, (e, charge) => {
//   console.log(e, charge);
// });

// req.body.card = {
//   number: '4242424242424242',// '4012888888881881',
//   expMonth: '05',
//   expYear: '22',
//   cvc: '123'
// }
// s.addCard(req, function(e, cust){
//   console.log('added card');
//   console.log('added card');
//   console.log('added card');
//   console.log(e, cust);
// });

describe('Stripe API charge', function(done) {
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
   
    it('Should create a customer on charge if not customer id is specified', (done) => {
        req.body.charge.card = {
            object: 'card',
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2018,
            cvc: '123'
        }
        s.charge(req, (e, cust) => {
            customerId = cust.id;
            cust.object.should.equal('card');
            cust.last4.should.equal('4242');
            done();
        });
    }).timeout(5000);

    

    // it('Should charge default card if stripe cust already created without specifying card', (done) => {
    //     req.session.user.stripeCustId = customerId;
        
    //     s.charge(req, (e, charge) => {
    //         charge.status.should.equal('succeeded');
    //         charge.amount.should.equal(10000);
    //         done();
    //     });
    // }).timeout(5000);

    // it('Should charge the specific card', (done) => {
    //     req.session.user.stripeCustId = customerId;
    //     req.body.charge.card = {last4: '4242'}
    //     s.charge(req, (e, charge) => {
    //         charge.source.last4.should.equal('4242');
    //         charge.amount.should.equal(10000);
    //         charge.status.should.equal('succeeded');
    //         done();
    //     });
    // }).timeout(5000);
   
});

describe('Stripe API add card', function(done){
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
        delete req.session.user.stripeCustId;
        req.body.charge.card = {
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
    }).timeout(5000);


    it('Should add card to customer already there', (done) => {
        req.body.charge.card = {
            number: '4000056655665556',
            exp_month: 12,
            exp_year: 2018,
            cvc: '123'
        }
        req.session.user.stripeCustId = customerId;
        
        s.addCard(req, (e, cust) => {
            cust.object.should.equal('card');
            cust.last4.should.equal('5556');
            done();
        });
    }).timeout(5000);

});
