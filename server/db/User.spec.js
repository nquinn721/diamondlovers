const chai = require('chai');
const should = chai.should();
require('./index');

describe('User', function(done) {
    let image1 = {name: 'image1.jpg', location: 'server/images', mimetype: 'image/jpeg'};
    let image2 = {name: 'image2.jpg', location: 'server/images', mimetype: 'image/jpeg'};
    let user;
    before((done) => {
        User.get({firstName: 'Bob', lastName: 'Marley', email: 'bob@marley.com', password: 'bobmarley123'}, (err, doc) => {
            user = doc;
            done();
        });
    });
    after(() => User.delete(user.email));
    
    it('User first name should be Bob', () => {
        user.firstName.should.equal('Bob');
    });
    
    it('Should be able to login with password', (done) => {
        User.login('bob@marley.com', 'bobmarley123', (e, doc) => {
            doc.email.should.equal('bob@marley.com');
            done();
        });
    });
    it('Should upload image', (done) => {
        User.addImage(user.email, image1, true, (e, doc) => {
            doc.profile.defaultImage.name.should.equal(image1.name);
            doc.profile.images.length.should.equal(1);
            doc.profile.images[0].name.should.equal(image1.name);
            user = doc;
            done();
        });
    });
    it('Should set default image', (done) => {
        User.addImage(user.email, image2, (a, b) => {
            User.setDefaultImage(user.email, b.profile.images[1], (e, doc) => {
                doc.profile.defaultImage.name.should.equal(image2.name);
                doc.profile.images[0].name.should.equal(image1.name);
                doc.profile.images.length.should.equal(2);
                user = doc;
            done();
            })
        });
    });

    it('Should delete image1 and not remove anything from default image', (done) => {
        User.deleteImage(user.email, user.profile.images[0], (e, doc) => {
            doc.profile.images.length.should.equal(1);
            doc.profile.images[0].name.should.equal(image2.name);
            doc.profile.defaultImage.name.should.equal(image2.name);
            user = doc;

            // Add first image back in
            User.addImage(user.email, image1, done);
        });
    });
    it('Should delete image2 and remove it from default image', (done) => {
        User.deleteImage(user.email, user.profile.images[0], (e, doc) => {
            doc.profile.images.length.should.equal(1);
            doc.profile.images[0].name.should.equal(image1.name);
            should.equal(doc.profile.defaultImage, null);
            user = doc;
            done();
        });
    });

    it('Should remove most recent image', (done) => {
        User.addImage(user.email, image2, () => {
            User.addImage(user.email, image1, (e, doc) => {
                doc.profile.images.length.should.equal(3);
                User.removeMostRecentImage(user.email, (e, doc) => {
                    doc.profile.images.length.should.equal(2);
                    doc.profile.images[0].name.should.equal(image1.name);
                    doc.profile.images[1].name.should.equal(image2.name);
                    user = doc;
                    done();
                })
            });
        });
    });

    it('Should soft delete user', (done) => {
        User.softDelete(user.email, (e, doc) => {
            doc.deletedAt.should.be.a.string;
            done();
        });
    });

    it('Should create stripe customer id', (done) => {
        User.createStripeCustomer(user.email, 'stripeid', (e, doc) => {
            doc.stripeId.should.be.a.string;
            done();
        });
    });

    it('Should delete stripe id', (done) => {
        User.deleteStripeCustomer(user.email, (e, doc) => {
            should.equal(doc.stripeId, undefined);
            done();
        });
    });
    
    it('Should add 10,000 diamonds', (done) => {
        User.addDiamonds(user.email, 10000, (e, doc) => {
            doc.diamonds.should.equal(10000);
            done();
        });
    });
});