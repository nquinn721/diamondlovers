import Service from './service';

export default class User{
    static update(user){
        this.user = user.user || user;
    } 
    static getCards(){
        return this.user.stripeCust.sources.data;
    }
    static getImages(){
        return this.user.profile.images;
    }
    static getDefaultImage(){
        return this.user.profile.images.filter(img => img.id === this.user.profile.defaultImage)[0];
    }
}