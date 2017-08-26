const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');
const config = require('../config');
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const rimraf = require('rimraf');
const Cloud = require('./cloudinary');

// Multer upload config
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            file.location = path.join('tmp', req.session.user.client._id);
            mkdirp(file.location, () => cb(null, file.location));
        },
        filename: (req, file, cb) => {
            req.file = file; 
            cb(null, file.originalname);
            
        }
    })
})


const ImageSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
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
    eager: [Object],
    status: {
        type: String,
        enum: ['new', 'flagged', 'public'],
        default: 'new'
    }
});
ImageSchema.methods.basic = function() {
    return {
        public_id: this.public_id,
        _id: this._id,
        userId: this.userId,
        status: this.status,
        url: this.url
    }
}

class Image{
	static basic(userId, cb = function(){}){
		return this.find({userId}, '_id public_id url userId status', cb);
	}

    


    static delete(userId, public_id, cb = function(){}){
        Cloud.delete(public_id, (e, file) => e ? cb(e) : this.deleteImageFromDB(public_id, () => this.basic(userId, cb)));
    }

    static deleteAllUserImages(userId, cb = function(){}){
        this.basic(userId, (err, docs) => {
            if(err || !docs.length)return cb(err);

            let done = docs.length;
            docs.forEach(doc => this.delete(userId, doc.public_id, (e, file) => {
                done--;
                if(done === 0)cb(null, {msg: 'deleted all of users images'});
            }));
        });
    }

    static deleteImageFromDB(public_id, cb = function(){}){
        this.findOne({public_id}).remove().exec(cb);
    }


    // Store file locally then upload to Cloudinary
    static addImage(userId, req, res, cb = function(){}){
        let single = upload.single('image');
        
        single(req, res, (err) => {
            if(err)return cb({error: config.errorMessages.fileUpload}); //::TODO ADD A RETRY

            if(!err && req.file){
                Cloud.upload(req.file.location + '/' + req.file.originalname, userId, (e, file) => {
                    if(e)return cb(e);

                    file.userId = userId;

                    rimraf(req.file.location, ()=>{});
                    this.create(file, (e, doc) => cb(e, doc && doc.basic()));
                    
                });
                
            }else cb(err);
            
        });
    }
}

ImageSchema.loadClass(Image);
const ImageModel = mongoose.model('Image', ImageSchema);
module.exports = ImageModel;