const chai = require('chai');
const should = chai.should();
const request = require('supertest');
const app = require('../../index');
const fs = require('fs');
require('./index');

describe('Image Management', (done) => {
	const agent = request.agent(app);
	let user, image1, image2;
	before((done) => {
		User.get({
            firstName: 'Bob', 
            lastName: 'Marley', 
            email: 'bob@marley.com', 
            password: 'bobmarley123', 
            profile: {
                state: 'oh', 
                city: 'columbus', 
                displayName: 'bobbyboy123'
            }
        }, (err, doc) => {
            user = doc;
            done();
        });
	});

	
	
	it('Should login', (done) => {
		agent
			.post('/db/login')
			.send({email :'bob@marley.com', password: 'bobmarley123'})
			.expect(200)
			.then(res => {
				res.body.data.client.firstName.should.equal('Bob');
				done();
			});
	})

	it('Should upload image', (done) => {
		agent.post('/image/add-profile-image')
			.attach('image', 'server/lib/test.jpg')
			.expect(200)
			.then(res  => {
              	let image = res.body.data[0];
              	image.userId.toString().should.equal(user._id.toString());
              	image.status.should.equal('new');
              	image1 = image;
              	done();
			});

	}).timeout(10000);

	it('Should uplaod image and set default', (done) => {
		agent.post('/image/add-profile-image')
              .attach('image', 'server/lib/test.jpg')
              .field('defaultImage', true)
              .expect(200)
              .then(res  => {
              	let user = res.body.data.client;
              	let images = res.body.data.images;
              	let image = res.body.data.images[images.length - 1];
              	image.userId.should.equal(user._id);
              	image.status.should.equal('new');
              	user.profile.defaultImage.toString().should.equal(image._id.toString());
              	image2 = image;
              	done();
              });
	}).timeout(10000);

	it('Should be a basic image', (done) => {
		Image.basic(user._id, (e, images) => {
			
			images[0]._id.toString().should.equal(image1._id.toString());
			images[1]._id.toString().should.equal(image2._id.toString());
			should.equal(images[0].secure_url, undefined);
			done();
		})
	});

	it('Should cleanup user and iamges', (done) => {
		User.delete(user._id, (c, d) => {
			User.find(user._id, (e, doc) => {
				should.equal(e, null);
				should.equal(doc, null);
				Image.basic(user._id, (e, images) => {
					should.equal(e, null);
					images.length.should.equal(0);
					done();
				})

			})
		});
	}).timeout(5000);



});