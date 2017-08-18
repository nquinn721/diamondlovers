const allowedUploads = ['image/jpg', 'image/jpeg', 'image/png'];
const config = require('../config');
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const rimraf = require('rimraf');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let location = Image.imageLocation(req.session.user.client.email);
            mkdirp(location, () => 
                cb(null, location)
            );
            
        },
        filename: (req, file, cb) => {
            file.location = Image.imagePath(req.session.user.client.email);
            file.name = Image.imageName(file);
            req.file = file;
            cb(null, file.name);
            
        }
    })
})
class Image{

    static storage(req, res, cb = function(){}){
        let single = upload.single('image');
        
        single(req, res, (err) => {
            if(err)req.error = {error: config.errorMessages.fileUpload}; //::TODO ADD A RETRY
            if(req.error)User.removeMostRecentImage(req.session.user.client.email);


            if(!err && !req.error && req.file)
                this.upload(req, (e, user) =>{
                    req.session.user.client.profile = user.profile;
                    cb();
                }); 
            else
                cb();
        });
    }
    static upload(req, cb = function(){}){
        if(allowedUploads.indexOf(req.file.mimetype) > -1){
            User.addImage(req.session.user.client.email, req.file, req.body.defaultImage, cb);
        }else{
            req.error = {error: config.errorMessages.fileType};
        }
       
    }

    static deleteImage(email, image, cb){
        let location = `server/images/${image.uri}`;
        rimraf(location, function (e) {
            if(e)return cb(e);
            User.deleteImage(email, image, cb);
        });
    }

    static deleteAllImages(){
        rimraf('server/images', function () { console.log('done'); });
        User.deleteAllImages();
    }

    static imageName(imageObj){
        return `profile-image-${Date.now()}.${imageObj.mimetype.replace('image/', '')}`
    }
    static imagePath(email){
        return path.join(email, 'profile');

    }
    static imageLocation(email){
        return path.join('server', 'images', email, 'profile');
    }

}
// Image.init();
module.exports = Image;