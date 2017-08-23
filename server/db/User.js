const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const seeds = require('./seed');

/**
 * MODEL
 */
// const Image = new Schema({
//     location: String,
//     name: String,
//     imageType: String,
//     uri: String
// });
const Image = new Schema({
    public_id: String,
    version: Number,
    signature: String,
    width: Number,
    height: Number,
    format: String,
    resource_type: String,
    created_at: String,
    tags: [String],
    bytes: Number,
    type: String,
    etag: String,
    url: String,
    secure_url: String,
    original_filename: String,
    eager: [Object]
});
 const Profile = new Schema({
    status: [{
        type: String,
        enum: ['created', 'public', 'qualified'],
        default: 'created'
    }],
    displayName: {
        type: String,
        unique: true
    },
    city: String,
    state: String,
    zip: String,
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
    defaultImage: Image,
    images: [Image]
});

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    fingerPrint: Boolean,
    passCode: Number,
    admin: Boolean,
    stripeId: String,
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
        if(err) return cb(err);
        if(!isMatch)return cb({error: 'passwords do not match'});
        cb(null, isMatch);
    });
};
UserSchema.methods.client = function() {
    return {
        firstName:  this.firstName,
        lastName:   this.lastName,
        diamonds:   this.diamonds,
        email:      this.email,
        profile:    this.profile,
        stripeCust: this.stripeCust
    }
}
UserSchema.plugin(findOrCreate);

const UserModel = mongoose.model('User', UserSchema);

    

class User {
    
    // TODO:: check for a stripe charge id before adding diamonds
    static addDiamonds(email, diamonds, cb = function(){}){
        UserModel.findOneAndUpdate({email}, {$inc: {diamonds: diamonds}}, {new: true}, cb);
    }
    
    static get(obj, cb = function(){}){
        UserModel.findOrCreate(obj, (e, doc) => {
            cb(e, doc.client(), doc);
        })
    }
   
    /**
     * PROFILE
     */
    static updateProfileStatus(email, e, doc, cb = function(){}){
        if(doc && doc.profile){
            if(doc.profile.status === 'created'){
                if(doc.profile.images.length && doc.profile.displayName){
                    doc.profile.status.push('puclic');
                }
            }
            console.log('in update profile status callback');
            cb(e, doc);
        }else{
            UserModel.findOne({email}, (e, doc) => {
                this.updateProfileStatus(email, e, doc, cb);    
            });
        }
    }
    static updateProfile(email, field, value, cb = function(){}){
        let update = {};
        update['profile.' + field] = value;
        UserModel.findOneAndUpdate({email}, update, {new: true}, cb);
    }
    /**
     * END PROFILE
     */


    /**
     * SEARCH
     */
    static getPublicProfilesNearby(email, cb = function(){}){
        UserModel.findOne({email}, (e, doc) => {
            if(e || !doc)return cb(e || {error: 'no doc found with email [' + email + ']'});
            if(!doc.profile.city || !doc.profile.state)
                return cb({error: 'We need a city and stated to search for local ' + doc.profile.preferences.sex});
            UserModel.find({email: {'$ne' : email}, 'profile.city': doc.profile.city, 'profile.state': doc.profile.state}, cb);
        });
    }
    /**
     * END SEARCH
     */


    /**
     * IMAGE
     */
    static addImage(email, imageObj, def, cb = function(){}){
        if(typeof def === 'function'){
            cb = def;
            def = false;
        }
        let update = {
            $push: {
                'profile.images': imageObj
            }
        };
        if(def)
            update['$set'] = {'profile.defaultImage' : image};
        UserModel.findOneAndUpdate({email}, update, {new: true}, (e, doc) => {
            if(doc.profile.images.length === 0 || !doc.profile.defaultImage)
                doc.profile.defaultImage = doc.profile.images[0];
            // this.updateProfileStatus(email, doc, cb);
            cb(e, doc);
        });
    }
    static setDefaultImage(email, image, cb = function(){}){
        UserModel.findOneAndUpdate({email}, {$set: {'profile.defaultImage': image}}, {new: true}, cb);
    }
    static deleteImage(email, image, cb = function(){}){
        console.log(image);
        UserModel.findOneAndUpdate({email},  { $pull: {'profile.images': { _id: image._id}}}, {new: true}, (e, doc) => {
            if(doc.profile.defaultImage && doc.profile.defaultImage._id.toString() === image._id.toString())
                doc.profile.defaultImage = doc.profile.images && doc.profile.images.length ? doc.profile.images[0] : null;
            doc.save(cb);
        });
    }
    static removeMostRecentImage(email, cb = function(){}){
        UserModel.findOneAndUpdate({email}, {$pop: {'profile.images': 1}}, {new: true}, cb);
    }
    static deleteAllImages(cb = function(){}){
        UserModel.update({}, { $set: {'profile.images': []}}, {multi: true}, cb);
    }
    /**
     * END IMAGE
     */

    
     /**
      * DB
      */
    static login(email, pw, cb = function(){}){
        let user = UserModel.findOne({email}, (e, doc) => {
            if(e)return cb(e);
            if(!doc)return cb({error: 'no user found'});

            let client = doc.client();
            
            if(pw){
                doc.comparePassword(pw, (matchError, match) => {
                    if(match){
                        if(doc.stripeId){
                            Stripe.getCustomer(doc.stripeId, (e, cust) => {
                                cb(e, doc, client, cust);
                            });
                        }else{
                            cb(e, doc, client);
                        }
                    }else cb(matchError);
                });
                
            // }else if(this.fingerPrint || this.passCode){
            //     if(this.fingerPrint){
            //         // Handle fingerprint
            //     }
            //     if(this.passCode){
            //         // Handle passcode
            //     }
            }else{
                cb({error: 'no password and no other form of login'});
            }
        });
    }

    static delete(email, cb = function(){}){
        UserModel.find({email}).remove().exec(cb);        
    }
    static softDelete(email, cb = function(){}){
        UserModel.findOneAndUpdate({email}, {$set: {deletedAt: Date.now()}}, {new: true}, cb);
    }
    /**
     * END DB
     */

    
    /**
     * STRIPE
     */
    static createStripeCustomer(email, stripeId, cb = function(){}){
        UserModel.findOneAndUpdate({email}, {stripeId: stripeId}, {new: true}, cb);
    }
    static deleteStripeCustomer(email, cb = function(){}){
        UserModel.findOneAndUpdate({email}, {$unset: {stripeId: ''}}, {new: true}, cb);
    }
    /**
     * END STRIPE
     */

    /**
     * ADMIN
     */
     static getAllUsers(cb){
         UserModel.find({}, cb)
     }

     static seed(cb = function(){}){
        UserModel.create(seeds, (e, doc) => {
            console.log(e, doc);
        })

     }
    /**
     * END ADMIN
     */


}
// User.seed();

module.exports = User;