
const allowedUploads = ['image/jpg', 'image/jpeg', 'image/png'];
class Image{
    static upload(email, imageObj){
        if(allowedUploads.indexOf(imageObj.mimetype) > -1){
            User.addImage(email, imageObj);
        }
       
    }

}
module.exports = Image;