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
    defaultImage: {type: Schema.Types.ObjectId, ref: 'Image'}
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
        _id:        this._id,
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

    static find(_id, cb = function(){}){
        UserModel.findOne({_id}, cb);
    }
    
    // TODO:: check for a stripe charge id before adding diamonds
    static addDiamonds(_id, diamonds, cb = function(){}){
        UserModel.findOneAndUpdate({_id}, {$inc: {diamonds: diamonds}}, {new: true}, cb);
    }
    
    static get(obj, cb = function(){}){
        UserModel.findOrCreate(obj, (e, doc) => {
            cb(e, doc.client(), doc);
        })
    }

    static setDefaultImage(_id, imageId, cb = function(){}){
        UserModel.findOneAndUpdate({_id}, {$set: {'profile.defaultImage': imageId}}, {new: true}, cb);
    }

    static update(user, cb = function(){}){
        UserModel.findOneAndUpdate({_id: user._id}, user, {new: true}, cb);
    }
   
    /**
     * PROFILE
     */
    static updateProfileStatus(doc, status, cb = function(){}){
        if(!doc)return cb({error: 'no doc to update'});
        doc.profile.status = status;
        doc.save(cb);
    }
    static updateProfile(_id, field, value, cb = function(){}){
        let update = {};
        update['profile.' + field] = value;
        UserModel.findOneAndUpdate({_id}, update, {new: true}, cb);
    }
    /**
     * END PROFILE
     */


    /**
     * SEARCH
     */
    static getPublicProfilesNearby(_id, cb = function(){}){
        UserModel.findOne({_id}, (e, doc) => {
            if(e || !doc)return cb(e || {error: 'no doc found with _id [' + _id + ']'});
            if(!doc.profile.city || !doc.profile.state)
                return cb({error: 'We need a city and stated to search for local ' + doc.profile.preferences.sex});
            UserModel.find({_id: {'$ne' : _id}, 'profile.city': doc.profile.city, 'profile.state': doc.profile.state}, (e, users) => {
                let done = users.length;
                users.forEach(user => Image.find({userId: user._id}, (e, images) => {
                    user.images = images;
                    done--;
                    if(done === 0)cb(e, users);
                }))
            });
        });
    }
    /**
     * END SEARCH
     */


    /**
     * IMAGE
     */
    static setDefaultImage(_id, image, cb = function(){}){
        UserModel.findOneAndUpdate({_id}, {$set: {'profile.defaultImage': image}}, {new: true}, cb);
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

            let user = {
                client: doc.client()
            }
            
            if(pw){
                doc.comparePassword(pw, (matchError, match) => {
                    if(match){
                        if(doc.stripeId){
                            Stripe.getCustomer(doc.stripeId, (e, cust) => {
                                user.cust = cust
                                
                                this.getImagesForLogin(e, doc, user, cb);
                            });
                        }else{
                            this.getImagesForLogin(e, doc, user, cb);
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

    static getImagesForLogin(e, doc, user, cb){
        Image.basic(doc._id, (e, images) => {
            if(e)return cb(e);
            user.images = images;
            cb(e, doc, user);
        });
    }

    static delete(_id, cb = function(){}){
        
        UserModel.findOne({_id}, (e, doc) => {
            if(e || !doc)return cb(e);
            Image.deleteAllUserImages(doc._id, (e, a) => {
                if(e)return cb(e);
                doc.remove(cb);
            });
        });
    }
    static softDelete(_id, cb = function(){}){
        UserModel.findOneAndUpdate({_id}, {$set: {deletedAt: Date.now()}}, {new: true}, cb);
    }
    /**
     * END DB
     */

    
    /**
     * STRIPE
     */
    static createStripeCustomer(_id, stripeId, cb = function(){}){
        UserModel.findOneAndUpdate({_id}, {stripeId: stripeId}, {new: true}, cb);
    }
    static deleteStripeCustomer(_id, cb = function(){}){
        UserModel.findOneAndUpdate({_id}, {$unset: {stripeId: ''}}, {new: true}, cb);
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
        UserModel.create(seeds);

     }
    /**
     * END ADMIN
     */


}
// User.seed();

// UserModel.findOrCreate({
//     firstName: 'Nate',
//     lastName: 'Quinn',
//     admin: true,
//     email: 'natethepcspecialist@gmail.com',
//     password: 'nate123',
//     profile: {
//         state: 'oh',
//         city: 'columbus',
//         zip: 43119
//     },
// })

module.exports = User;