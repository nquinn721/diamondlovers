const allowedUploads = ['image/jpg', 'image/jpeg', 'image/png'];
const config = require('../config');
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
var rimraf = require('rimraf');


class Image{
    static init(){
        this.multer = multer({
            storage: multer.diskStorage({
                destination: this.destination.bind(this),
                filename: this.filename.bind(this)
            })
        })
    }
    static destination(req, file, cb){
        mkdirp(this.imageLocation(req.session.user.client.email), () => 
            cb(null, this.imageLocation(req.session.user.client.email))
        );
        
    }
    static filename(req, file, cb) {
        file.location = this.imagePath(req.session.user.client.email);
        file.name = this.imageName(file);
        req.file = file;
        cb(null, file.name);
        
    }


    static storage(req, res, cb = function(){}){
        let single = this.multer.single('image');
        single(req, res, (err) => {
            if(err)req.error = {error: config.errorMessages.fileUpload}; //::TODO ADD A RETRY
            if(req.error)User.removeMostRecentImage(req.session.user.client.email);
            if(!err && !req.error)
                this.upload(req, (e, user) =>{
                    req.session.user.client = user;
                }); 
            cb();
        });
    }
    static upload(req, cb = function(){}){
        if(allowedUploads.indexOf(req.file.mimetype) > -1){
            User.addImage(req.session.user.client.email, req.file, req.body.default, cb);
        }else{
            req.error = {error: config.errorMessages.fileType};
        }
       
    }

    static deleteAllImages(){
        rimraf('server/images', function () { console.log('done'); });
        User.clearAllImages();
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
Image.init();
module.exports = Image;