const chai = require('chai');
const should = chai.should();
require('./index');

describe('User', function(done) {
    let user;
    beforeEach((done) => {
        User.get({firstName: 'Jon', lastName: 'Snow', email: 'jon@snow.com', password: 'jonsnow123'}, (err, doc) => {
            user = doc;
            done();
        });
    });
    it('User first name should be Jon', () => {
        user.firstName.should.equal('Jon');
    });
    it('User full name should be Jon Snow', () => {
        user.fullName.should.equal('Jon Snow');
    });
    it('Should be able to login with password', (done) => {
        User.login('jon@snow.com', 'jonsnow123', (e, doc) => {
            done();
        });
    });
});