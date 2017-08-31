const chai = require('chai');
const should = chai.should();
require('./index');

describe('User', function(done) {
    
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
    after((done) => User.delete(user._id, done));
    
    it('User first name should be Bob', () => {
        user.firstName.should.equal('Bob');
    });
    
    it('Should be able to login with password', (done) => {
        User.login('bob@marley.com', 'bobmarley123', (e, user, doc) => {
            doc.email.should.equal('bob@marley.com');
            doc.profile.state.should.equal('oh');
            done();
        });
    });

    it('Should fail login if email is wrong', (done) => {
        User.login('bob@maferley.cfomf', 'bobmarley123', (e, user, doc) => {
            e.error.should.equal('no user found');
            done();
        });
    });

    it('Should fail login if password is wrong', (done) => {
        User.login('bob@marley.com', 'bobmarley1234', (e, user, doc) => {
            e.error.should.equal('passwords do not match');
            done();
        });
    });

    
    
    it('Should create stripe customer id', (done) => {
        User.createStripeCustomer(user._id, 'stripeid', (e, user, doc) => {
            doc.stripeId.should.be.a.string;
            done();
        });
    });

    it('Should delete stripe id', (done) => {
        User.deleteStripeCustomer(user._id, (e, user, doc) => {
            should.equal(doc.stripeId, undefined);
            done();
        });
    });
    
    it('Should add 10,000 diamonds', (done) => {
        User.addDiamonds(user._id, 10000, (e, user, doc) => {
            doc.diamonds.should.equal(10000);
            done();
        });
    });

    it('Should soft delete user', (done) => {
        User.softDelete(user._id, (e, doc) => {
            doc.deletedAt.should.be.a.string;
            done();
        });
    });

});