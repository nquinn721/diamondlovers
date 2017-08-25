const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const seeds = require('./seed');

/**
 * MODEL
 */

 const Profile = new Schema({
    status: {
        type: String,
        enum: ['new', 'flagged', 'public'],
        default: 'new'
    },
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
    defaultImage: {type: Schema.Types.ObjectId, ref: 'Image'},
    images: [{type: Schema.Types.ObjectId, ref: 'Image'}]
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
    static getPopulatedUser(email, cb = function(){}){
        UserModel.findOne({email}).populate('profile.defaultImage').populate('profile.images').exec(cb);
    }
   
    /**
     * PROFILE
     */
    static updateProfileStatus(doc, status, cb = function(){}){
        if(!doc)return cb({error: 'no doc to update'});
        doc.profile.status = status;
        doc.save(cb);
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
    static addImage(email, imageObj, cb = function(){}){
        UserModel.findOne({email}, (e, user) => {
            if(e)return cb(e);
            
            imageObj.user = user._id;
            Image.create(imageObj, (e, image) => {
                if(e)return cb(e);
    
                user.profile.images.push(image._id);

                if(user.profile.images.length === 0 || !user.profile.defaultImage)
                    user.profile.defaultImage = user.profile.images[0];

                // Set profile to public if it hasn't yet
                if(user.profile.status === 'new')
                    this.updateProfileStatus(user, 'public', cb);
                else UserModel.populate(user, {path: 'profile.images', path: 'profile.defaultImage'}, (e, newUser) => {
                    cb(e, newUser);
                })
            })
        });
    }
   
    static setDefaultImage(email, image, cb = function(){}){
        UserModel.findOneAndUpdate({email}, {$set: {'profile.defaultImage': image}}, {new: true}, cb);
    }
    static deleteImage(email, image, cb = function(){}){
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
        
        UserModel.findOne({email}, (e, doc) => {
            if(e || !doc)return cb(e);
            Image.find({user: doc._id}).remove().exec(cb.bind(this, e, doc));
        })
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
        })

     }
    /**
     * END ADMIN
     */


}
// User.seed();

User.delete('bob@marley.com');

module.exports = User;