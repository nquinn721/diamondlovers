const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

/**
 * MODEL
 */
const Image = new Schema({
    location: String,
    name: String,
    imageType: String,
    uri: String
});
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
        displayName:this.displayName,
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
     * IMAGE
     */
    static addImage(email, imageObj, def, cb = function(){}){
        if(typeof def === 'function'){
            cb = def;
            def = false;
        }
        let image = {
            name: imageObj.name,
            location: imageObj.location,
            imageType: imageObj.mimetype,
            uri: imageObj.location + '/' + imageObj.name
        };
        let update = {
            $push: {
                'profile.images': image
            }
        };
        if(def)
            update['$set'] = {'profile.defaultImage' : image};
        UserModel.findOneAndUpdate({email}, update, {new: true}, cb);
    }
    static setDefaultImage(email, image, cb = function(){}){
        UserModel.findOneAndUpdate({email}, {$set: {'profile.defaultImage': image}}, {new: true}, cb);
    }
    static deleteImage(email, image, cb = function(){}){
        if(!image._id)return cb({error: 'no image passed'});
        UserModel.findOneAndUpdate({email},  { $pull: {'profile.images': image}}, {new: true}, (e, doc) => {
            if(doc.profile.defaultImage && doc.profile.defaultImage._id.toString() === image._id.toString())
                doc.profile.defaultImage = doc.profile.images && doc.profile.images.length ? doc.profile.images[0] : null;
            doc.save(cb);
        });
    }
    static removeMostRecentImage(email, cb = function(){}){
        UserModel.findOneAndUpdate({email}, {$pop: {'profile.images': 1}}, {new: true}, cb);
    }
    static deleteAllImages(){
        User.update({}, { $set: {'profile.images': []}}, {multi: true}, (e, d) => console.log(e, d));
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

    

}


module.exports = User;