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
    defaultImage: String,
    images: [{
        location: String,
        name: String,
        imageType: String,
        id: String
    }]
});

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    fingerPrint: Boolean,
    passCode: Number,
    admin: Boolean,
    stripeId: String,
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

    static addDiamonds(email, diamonds, cb = function(){}){
        this.findOneAndUpdate({email}, {$inc: {diamonds: diamonds}}, {new: true}, cb);
    }
    static setDefaultImage(email, image, cb = function(){}){
        this.findOne({email}, (e, doc) => {
            if(e)return cb(e);
            for(let i = 0; i < doc.profile.images.length; i++){
                let img = doc.profile.images[i];
                if(img.id === image){
                    img.default = true;
                }else{
                    img.default = false;
                }
            }
            doc.save(cb);
        })
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
    static addImage(email, imageObj, def, cb = function(){}){
        let id = 'img-' + Date.now();
        let update = {
            $push: {
                'profile.images': {
                    name: imageObj.name,
                    location: imageObj.location,
                    imageType: imageObj.mimetype
                }
            }
        };
        if(def)
            update['$set'] = {'profile.defaultImage' : id};
        this.findOneAndUpdate({email}, update, {new: true}, cb);
    }
    static removeMostRecentImage(email){
        this.findOneAndUpdate({email}, {$pop: {'profile.images': 1}});
    }

    static login(email, pw, cb = function(){}){
        let user = this.findOne({email}, (e, doc) => {
            if(e){
                return cb(e);
            }
            if(pw){
                if(doc){
                    doc.comparePassword(pw, (matchError, match) => {
                        doc = doc.toObject();
                        delete doc.password;
                        if(match){
                            if(doc.stripeId){
                                Stripe.getCustomer(doc.stripeId, (e, cust) => {
                                    doc.stripeCust = cust;
                                    cb(e, doc);
                                });
                            }else{
                                cb(e, doc);
                            }
                        }else cb && cb(matchError);
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
    static createStripeCustomer(email, stripeId, cb = function(){}){
        this.findOneAndUpdate({email}, {stripeId: stripeId}, {new: true}, cb);
    }
    static deleteStripeCustomer(stripeId, cb = function(){}){
        this.findOneAndUpdate({stripeId}, {stripeId: null}, {new: true}, cb);
    }

    static clearAllImages(){
        User.update({}, { $set: {'profile.images': []}}, {multi: true}, (e, d) => console.log(e, d));
    }

}
UserSchema.plugin(findOrCreate);
UserSchema.loadClass(UserClass);

const User = mongoose.model('User', UserSchema);

module.exports = User;