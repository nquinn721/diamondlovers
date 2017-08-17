import Service from './service';

export default class User{
    static events = [];
    static login(user){
        this.update(user);
        this.emit('login');
    }
    static update(user){
        this.user = user.client || user;
        this.stripeCust = user.stripeCust;
    }
    static getUser(){
        return this.user;
    }
    static getCards(){
        console.log('get cards');
        console.log(this.stripeCust);
        return this.stripeCust.sources.data;
    }
    static getImages(){
        return this.user.profile.images;
    }
    static getDefaultImage(){
        return this.user.profile.images.filter(img => img.id === this.user.profile.defaultImage)[0];
    }


    static on(event, cb = function(){}){
        this.events.push({event, cb});
    }

    static emit(event){
        this.events.forEach(e => e.event === event ? e.cb() : null);
    }
}