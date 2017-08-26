import Service from './service';
import Settings from './settings';
const face = require('../assets/img/avatar.png');

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
        this.emit('update');
    }
    static addNearby(users){
        this.nearby = users;
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

    static getDefaultImage(){
        let id = this.user.profile.defaultImage; 
        if(id && this.user.images && this.user.images.length)
            return {uri: this.user.images.filter(img => img._id === id)[0].url};

        return face;
    }


    static on(event, cb = function(){}){
        this.events.push({event, cb});
    }

    static emit(event){
        this.events.forEach(e => e.event === event ? e.cb() : null);
    }
}