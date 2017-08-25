const chai = require('chai');
const should = chai.should();
require('./index');

describe('User', function(done) {
    let image1 = {
        public_id: '1234',
        width: 300,
        height: 300,
        url: 'http://image1.jpg',
        secure_url: 'https://image1.jpg',
        original_filename: 'image1.jpg'
    }
    let image2 = {
        public_id: '1234',
        width: 300,
        height: 300,
        url: 'http://image2.jpg',
        secure_url: 'https://image2.jpg',
        original_filename: 'image2.jpg'
    }
    let user;
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
    after((done) => User.delete(user.email, done));
    
    it('User first name should be Bob', () => {
        user.firstName.should.equal('Bob');
    });
    
    it('Should be able to login with password', (done) => {
        User.login('bob@marley.com', 'bobmarley123', (e, doc) => {
            doc.email.should.equal('bob@marley.com');
            doc.profile.state.should.equal('oh');
            done();
        });
    });

    it('Should fail login if email is wrong', (done) => {
        User.login('bob@maferley.cfomf', 'bobmarley123', (e, doc) => {
            e.error.should.equal('no user found');
            done();
        });
    });

    it('Should fail login if password is wrong', (done) => {
        User.login('bob@marley.com', 'bobmarley1234', (e, doc) => {
            e.error.should.equal('passwords do not match');
            done();
        });
    });

    it('Should upload image', (done) => {
        User.addImage(user.email, image1, (e, doc) => {
            console.log(doc);
            
            // doc.profile.defaultImage.original_filename.should.equal(image1.original_filename);
            // doc.profile.images.length.should.equal(1);
            // doc.profile.images[0].original_filename.should.equal(image1.original_filename);
            done();
        });
    });
    // xit('Should set default image', (done) => {
    //     User.addImage(user.email, image2, (a, b) => {
    //         User.setDefaultImage(user.email, b.profile.images[1], (e, doc) => {
    //             doc.profile.defaultImage.original_filename.should.equal(image2.original_filename);
    //             doc.profile.images[0].original_filename.should.equal(image1.original_filename);
    //             doc.profile.images.length.should.equal(2);
    //             user = doc;
    //             done();
    //         })
    //     });
    // });

    // xit('Should delete image1 and not remove anything from default image', (done) => {
    //     User.deleteImage(user.email, user.profile.images[0], (e, doc) => {
    //         doc.profile.images.length.should.equal(1);
    //         doc.profile.images[0].original_filename.should.equal(image2.original_filename);
    //         doc.profile.defaultImage.original_filename.should.equal(image2.original_filename);
    //         user = doc;
    //         // Add first image back in
    //         User.addImage(user.email, image1, done);
    //     });
    // });
    // xit('Should delete image2 and should set default image to image left over', (done) => {
    //     User.deleteImage(user.email, user.profile.images[0], (e, doc) => {
    //         doc.profile.images.length.should.equal(1);
    //         doc.profile.images[0].original_filename.should.equal(image1.original_filename);
    //         doc.profile.defaultImage.original_filename.should.equal(image1.original_filename);
    //         user = doc;
    //         done();
    //     });
    // });

    // xit('Should remove most recent image', (done) => {
    //     User.addImage(user.email, image2, () => {
    //         User.addImage(user.email, image1, (e, doc) => {
    //             doc.profile.images.length.should.equal(3);
    //             User.removeMostRecentImage(user.email, (e, doc) => {
    //                 doc.profile.images.length.should.equal(2);
    //                 doc.profile.images[0].original_filename.should.equal(image1.original_filename);
    //                 doc.profile.images[1].original_filename.should.equal(image2.original_filename);
    //                 user = doc;
    //                 done();
    //             })
    //         });
    //     });
    // });

    // it('Should soft delete user', (done) => {
    //     User.softDelete(user.email, (e, doc) => {
    //         doc.deletedAt.should.be.a.string;
    //         done();
    //     });
    // });

    // it('Should create stripe customer id', (done) => {
    //     User.createStripeCustomer(user.email, 'stripeid', (e, doc) => {
    //         doc.stripeId.should.be.a.string;
    //         done();
    //     });
    // });

    // it('Should delete stripe id', (done) => {
    //     User.deleteStripeCustomer(user.email, (e, doc) => {
    //         should.equal(doc.stripeId, undefined);
    //         done();
    //     });
    // });
    
    // it('Should add 10,000 diamonds', (done) => {
    //     User.addDiamonds(user.email, 10000, (e, doc) => {
    //         doc.diamonds.should.equal(10000);
    //         done();
    //     });
    // });
});