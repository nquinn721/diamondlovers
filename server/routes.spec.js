const request = require('supertest');
const express = require('express');
const chai = require('chai');
const should = chai.should();

// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const app = express();
// require('./routes')(app);

// const db = require('./db');

// var sess = {
//   secret: 'walkingTheDogOnASummerDay',
//   resave: true,
//   saveUninitialized: true,
//   rolling: true,
//   cookie: { maxAge: 30 * 60 * 1000 },
//   store: new MongoStore({
//       dbPromise: db
//   })
// }

const app = require('../index');
// app.get('/test/test', function(req, res) {
//   res.status(200).json({ name: 'tobi' });
// });

describe('App Routes', function() {
	const agent = request.agent(app);
	it('respond with json', () => {
		return agent
			.get('/test/test')
			.expect(200)
			.then(res => {
				res.body.name.should.equal('nate');
			})
	});


	it('should login', (done) => {
		agent
			.post('/db/login')
			.send({email :'natethepcspecialist@gmail.com', password: 'nate123'})
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


