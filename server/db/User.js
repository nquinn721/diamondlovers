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
    images: [{
        location: String,
        name: String,
        imageType: String
    }]
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
    profile: Profile,
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
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
class UserClass {

    static purchaseDiamonds(){
        // Stripe connect and purchase
        // Then add diamonds
    }

    static register(obj, cb){
        new this(obj).save(cb);
    }

    static get(obj, cb){
        this.findOrCreate(obj, (e, doc) => {
            doc.password = null;
            cb && cb(e, doc);
        })
    }
    static addImage(email, imageObj, cb = function(){}){
        console.log(email);
        this.findOne({email}, (e, doc) =>{
            if(e){
                return cb(e);
            }
            if(!doc)return cb('No user found');

            if(!doc.profile.images)doc.profile.images = [];
            let obj = {
                name: `profile-image-${doc.profile.images.length}.${imageObj.mimetype.replace('image/', '')}`,
                location: imageObj.location ,
                imageType: imageObj.mimetype
            }

            doc.profile.images.push(obj);
            doc.save(cb);
        });
    }


    static login(email, pw, cb = function(){}){
        let user = this.findOne({email}, (e, doc) => {
            if(e){
                return cb(e);
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