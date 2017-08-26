import Service from './service';
import Settings from './settings';
const face = require('../assets/img/avatar.png');

export default class User{
    constructor(user){
        this.user = user;
    }
    update(user){
        this.user = user.client;
        this.stripeCust = user.stripeCust;
        this.emit('update');
    }
    addNearby(users){
        this.nearby = users;
    }
    getUser(){
        return this.user;
    }
    getCards(){
        if(this.stripeCust)
            return this.stripeCust.sources.data;
        else return [];
    }
    getImages(){
        return this.user.images || [];
    }

    getDefaultImage(){
        let id = this.user.profile.defaultImage; 
        if(id && this.user.images && this.user.images.length)
            return {uri: this.user.images.filter(img => img._id === id)[0].url};

        return face;
    }
    getDefaultImage(){
        let id = this.user.profile.defaultImage; 
        if(id && this.user.images && this.user.images.length)
            return {uri: this.user.images.filter(img => img._id === id)[0].url};

        return face;
    }
    displayName(){
        return this.user.profile.displayName;
    }

    