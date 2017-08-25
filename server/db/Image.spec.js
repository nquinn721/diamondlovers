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
				res.body.client.firstName.should.equal('Bob');
				done();
			});
	})

	it('Should upload image', (done) => {
		agent.post('/image/profile-image-upload')
              .attach('image', 'server/lib/test.jpg')
              .expect(200)
              .then(res  => {
              	let user = res.body.client;
              	let image = res.body.images[res.body.images.length - 1];
              	image.userId.should.equal(user._id);
              	image.status.should.equal('new');
              	should.equal(user.profile.defaultImage, undefined);
              	image1 = image;
              	done();
              });

	}).timeout(10000);

	it('Should uplaod image and set default', (done) => {
		agent.post('/image/profile-image-upload')
              .attach('image', 'server/lib/test.jpg')
              .field('defaultImage', true)
              .expect(200)
              .then(res  => {
              	let user = res.body.client;
              	let image = res.body.images[res.body.images.length - 1];
              	image.userId.should.equal(user._id);
              	image.status.should.equal('new');
              	user.profile.defaultImage.should.equal(image._id);
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