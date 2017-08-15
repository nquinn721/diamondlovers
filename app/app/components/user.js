import Service from './service';
export default class User{
    static events = [];
    static update(user){
        this.user = user.user;
        this.emit('update', this.user);
    }   
    static on(event, cb = function(){}){
        this.events.forEach(e => e.event === event ? cb(e.data) : null);
        this.events.push({event, cb});
    }
    static emit(event, data){
        this.events.forEach(e => e.event === event ? e.data = data && e.cb(data) : null);
    }
}