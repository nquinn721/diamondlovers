import Service from './service';
import Settings from './settings';

export default class User{
    static events = [];
    static login(user){
        if(!user){
            console.log('no user', user);
            return;
        }
        this.update(user);
        this.emit('login');
    }
    static update(user){
        this.user = user.client;
        this.stripeCust = user.stripeCust;
    }
    static getUser(){
        return this.user;
    }
    static getCards(){
        return this.stripeCust.sources.data;
    }
    static getImages(){
        return this.user.profile.images;
    }
    static defaultImage(){
        return this.user.profile.defaultImage;
    }
    static getDefaultImage(){
        return this.user.profile.defaultImage;
    }
    static getDefaultImageURI(){
        let pic = this.getDefaultImage();
        return Settings.baseUrl + pic.location +'/' + pic.name;
    }


    static on(event, cb = function(){}){
        this.events.push({event, cb});
    }

    static emit(event){
        this.events.forEach(e => e.event === event ? e.cb() : null);
    }
}