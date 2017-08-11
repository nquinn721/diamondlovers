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
        this.upload(req.session.user.email, file, req); 
        mkdirp(this.imageLocation(req.session.user.email), () => 
            cb(null, this.imageLocation(req.session.user.email))
        );
        
    }
    static filename(req, file, cb) {
        file.location = this.imageLocation(req.session.user.email);
        cb(null, file.originalname);
    }


    static storage(req, res, cb = function(){}){
        let single = this.multer.single('image');
        single(req, res, (err, file) => {
            if(err)req.error = {error: config.errorMessages.fileUpload}; //::TODO ADD A RETRY
            if(req.error)User.removeMostRecentImage(req.session.user.email);
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

    static deleteAllImages(req){
        if(req.session.user.admin){
            rimraf('server/images', function () { console.log('done'); });
        }
    }


    static imageLocation(email){
        return path.join(email,'profile');
    }

}
Image.init();
module.exports = Image;