const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

/**
 * MODEL
 */
 const Profile = new Schema({
    about: String,
    income: String,
    age: Number,
    bodyType: String,
    sex: String,
    children: String,
    education: String,
    height: Number,
    drugs: Boolean,
    drinks: Boolean,
    smokes: Boolean,
    location: String,
    lookingFor: String,
    cost: {
        date1: Number,
        date2: Number,
        date3: Number
    },
    preferences: {
        ethnicity: String,
        distance: Number,
        sex: String,
        children: Number,
        education: String,
        smokes: Boolean,
        drugs: Boolean,
        drinks: Boolean,
        bodyType: String,
        height: Number,
        income: Number,
    },
    images: [String]
});

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    fingerPrint: Boolean,
    passCode: Number,
    displayName: {
        type: String,
        unique: true
    },
    diamonds: Number,
    email: {
        type: String,
        index: true,
        unique: true,
        required: true,
        lowercase: true
    },
    password: String,
    profile: [Profile],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    deletedAt: {type: Date}
});
/**
 * END MODEL
 */

/**
 * METHODS
 */
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    console.log('checking password', candidatePassword, this.password);
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        console.log('MATCHING PASSWORD',err, isMatch);
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
class UserClass {
    // `fullName` becomes a virtual
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(v) {
        const firstSpace = v.indexOf(' ');
        this.firstName = v.split(' ')[0];
        this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
    }


    // `getFullName()` becomes a document method
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    purchaseDiamonds(){
        // Stripe connect and purchase
        // Then add diamonds
    }

    static register(obj, cb){
        new this(obj).save(cb);
    }

    static get(obj, cb){
        console.log(obj);
        this.findOrCreate(obj, (e, doc) => {
            console.log(e, doc);
            doc.password = null;
            cb && cb(e, doc);
        })
    }
    static login(email, pw, cb){
        let user = this.findOne({email}, (e, doc) => {
            console.log(doc);
            if(e){
                return cb && cb(e);
            }
            if(pw){
                if(doc){
                    doc.comparePassword(pw, (matchError, match) => {
                        doc.password = null;
                        if(match)cb && cb(e, doc);
                        else cb && cb(matchError);
                    });
                }
                
            }else{
                if(this.fingerPrint){
                    // Handle fingerprint
                }
                if(this.passCode){
                    // Handle passcode
                }
            }
        });
    }

}
UserSchema.plugin(findOrCreate);
UserSchema.loadClass(UserClass);

const User = mongoose.model('User', UserSchema);

module.exports = User;