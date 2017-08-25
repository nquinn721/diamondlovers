const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');


const ImageSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
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

class Image{
	basic(user){
		return this.find({user}, 'public_id url');
	}
}

ImageSchema.loadClass(Image);
const ImageModel = mongoose.model('Image', ImageSchema);
module.exports = ImageModel;