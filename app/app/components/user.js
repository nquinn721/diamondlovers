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
        console.log(user);
        this.user = user.client;
        this.stripeCust = user.stripeCust;
        this.emit('update');
    }
    static getUser(){
        return this.user;
    }
    static getCards(){
        if(this.stripeCust)
            return this.stripeCust.sources.data;
        else return [];
    }
    static getImages(){
        return this.user.profile.images;
    }
    static defaultImage(){
        return this.user.profile.defaultImage;
    }
    static getDefaultImageURI(){
        let pic = this.defaultImage();
        if(pic)
            return Settings.baseUrl + pic.location +'/' + pic.name;
    }


    static on(event, cb = function(){}){
        this.events.push({event, cb});
    }

    static emit(event){
        this.events.forEach(e => e.event === event ? e.cb() : null);
    }
}