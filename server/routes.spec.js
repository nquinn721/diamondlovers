const request = require('supertest');
const express = require('express');
const chai = require('chai');
const should = chai.should();
const app = require('../index');

describe('App Routes', function() {
	const agent = request.agent(app);
	let user, user1;

	before(done => {
		User.get({firstName: 'Nate', lastName: 'Quinn', email: 'natethepcspecialist@gmail.com', admin: 'true', password: 'nate123', profile: {displayName: 'boijw'}}, (e, doc) => {
			user = doc;
			User.get({firstName: 'Bob', lastName: 'Bboart', email: 'bob@bob.com', password: 'bob123', profile: {displayName: 'owiejfowiejf'}}, (e, u) => {
				user1 = u;
				done();
			});
		});
	});
	after(done => User.delete(user._id, () => User.delete(user1._id, done)));
	it('respond with json', (done) => {
		agent
			.get('/test/test')
			.expect(200)
			.then(res => {
				res.body.name.should.equal('nate');
				done();
			})
	});


	it('should login', (done) => {
		agent
			.post('/db/login')
			.send({email: 'natethepcspecialist@gmail.com', password: 'nate123'})
			.expect(200)
			.then(res => {
				res.body.client.firstName.should.equal('Nate');
				done();
			});
	});

	it('should have access to admin routes', (done) => {
		agent
			.post('/test/admin')
			.expect(200)
			.then(res => {
				res.body.msg.should.equal('you are admin');
				done();
			});
	});
	it('should logout', (done) => {
		agent
			.post('/db/logout')
			.expect(200)
			.then(res => {
				res.body.msg.should.equal('Logged out');
				agent
					.post('/test/loggedin')
					.expect(200)
					.then(res => {
						res.body.error.should.equal('not logged in');
						done();
					})
			});
	});

	it('should login to a non admin account', (done) => {
		agent
			.post('/db/login')
			.send({email: 'bob@bob.com', password: 'bob123'})
			.expect(200)
			.then(res => {
				res.body.client.firstName.should.equal('Bob');
				done();

			});
	});

	it('should not allow non admin to non admin route', (done) => {
		agent
			.post('/test/admin')
			.expect(200)
			.then(res => {
				res.body.error.should.equal('not an admin');
				done();
			});
	});	
});


