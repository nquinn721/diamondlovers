const allowedUploads = ['image/jpg', 'image/jpeg', 'image/png'];
const config = require('../config');
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');



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
        mkdirp(this.imageLocation(req.session.user.email), () => 
            cb(null, this.imageLocation(req.session.user.email))
        );
        
    }
    static filename(req, file, cb) {
        file.location = this.imageLocation(req.session.user.email);
        this.upload(req.session.user.email, file, req); 
        cb(null, file.originalname);
    }


    static storage(req, res, cb = function(){}){
        let single = this.multer.single('image');
        single(req, res, (err) => {
            if(err)req.error = {error: config.errorMessages.fileUpload};
            cb();
        });
    }
    static upload(email, imageObj, req){
        if(allowedUploads.indexOf(imageObj.mimetype) > -1){
            User.addImage(email, imageObj);
        }else{
            req.error = {error: config.errorMessages.fileType};
        }
       
    }


    static imageLocation(email){
        return path.join('server', 'images', email,'profile');
    }

}
Image.init();
module.exports = Image;