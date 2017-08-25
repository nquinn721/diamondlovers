const allowedUploads = ['image/jpg', 'image/jpeg', 'image/png'];
const config = require('../config');
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const rimraf = require('rimraf');
const Cloud = require('./cloudinary');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            file.location = Image.imageLocation(req.session.user.client.email);
            mkdirp(file.location, () => 
                cb(null, file.location)
            );
            
        },
        filename: (req, file, cb) => {
            req.file = file;
            cb(null, file.originalname);
            
        }
    })
})
class Image{

    static storage(email, req, res, cb = function(){}){
        let single = upload.single('image');
        
        single(req, res, (err) => {
            if(err)req.error = {error: config.errorMessages.fileUpload}; //::TODO ADD A RETRY


            if(!err && !req.error && req.file){
                Cloud.upload(req.file.location + '/' + req.file.originalname, email, (e, file) => {
                    if(!e){
                        this.deleteProfileImages(email);
                        User.addImage(email, file, req.body.defaultImage, cb);
                    }else{
                        cb(e);
                    }
                })
                
            }else
                cb(err || req.error);
        });
    }


    static deleteProfileImages(email){
        rimraf('server/images/' + email, function(){});
    }

    static imageLocation(email){
        return path.join('server', 'images', email);
    }

}
module.exports = Image;