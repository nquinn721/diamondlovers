import Service from './service';

export default class User{
    static update(user){
        console.log('update', user);
        this.user = user.client || user;
        this.stripeCust = user.stripeCust;
    }
    static getUser(){
        return this.user;
    }
    static getCards(){
        console.log(this.user);
        return this.user.stripeCust.sources.data;
    }
    static getImages(){
        return this.user.profile.images;
    }
    static getDefaultImage(){
        return this.user.profile.images.filter(img => img.id === this.user.profile.defaultImage)[0];
    }
}