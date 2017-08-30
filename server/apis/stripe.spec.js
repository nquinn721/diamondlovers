const chai = require('chai');
const should = chai.should();
const stripeClient = require('stripe')('sk_test_His9L7RGJvdVRuuPOkCeuand');
const stripe = require('./stripe');

describe('Stripe API', (done) => {
	let token, cust, 
		email = 'natethepcspecialist@gmail.com';

	before((done) => {

		stripeClient.tokens.create({
			card: {
				"number": '4242424242424242',
				"exp_month": 12,
				"exp_year": 2018,
				"cvc": '123'
			}
		}).then(t => {
			token = t.id;
			done();
		})
	});

	it('should add card and create customer', (done) => {
		stripe.addNewCard(token, email, (e, c) => {
			c.description.should.equal('natethepcspecialist@gmail.com');
			c.sources.data.length.should.equal(1);
			c.sources.data[0].last4.should.equal('4242');
			cust = c;
			done();
		});
	}).timeout(5000);

	it('should add another card and not create customer', (done) => {
		stripeClient.tokens.create({
			card: {
				"number": '4000056655665556',
				"exp_month": 12,
				"exp_year": 2018,
				"cvc": '123'
			}
		}).then(t => {
			stripe.addNewCard(t.id, cust, (e, c, card) => {
				c.id.should.equal(cust.id);
				c.sources.data.length.should.equal(2);
				cust = c;				
				done();
			})
		})
	});

	it('should update default card', (done) => {
		cust.default_source.should.equal(cust.sources.data[0].id);
		stripe.setDefaultCard(cust.id, cust.sources.data[1].id, (e, c) => {
			c.default_source.should.equal(cust.sources.data[1].id);
			cust = c;
			done();
		})
	});

	it('should remove card and update default card', (done) => {
		stripe.deleteCard(cust.sources.data[1].id, cust, (e, c, confirm) => {
			c.default_source.should.equal(cust.sources.data[0].id);
			c.sources.data.length.should.equal(1);
			cust = c;
			done();
		})
	})

	it('should delete customer', (done) => {
		stripe.deleteCustomer(cust.id, (e, confirm) => {
			confirm.deleted.should.be.true;
			confirm.id.should.equal(cust.id);
			done();
		})
	})
});