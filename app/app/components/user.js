import Service from './service';
import EventEmitter from 'EventEmitter';

const e = new EventEmitter();


export default class User extends EventEmitter{
    static events = [];
    static update(user){
        this.user = user.user || user;
        this.emit('update', this.user);
    }   
    static on(event, cb = function(){}){

        e.addListener(event, cb);
        // this.events.push({event, cb});
    }
    static emit(event, data){
        e.emit(event, data);
        
        // this.events.forEach(e => e.event === event ? e.data = data && e.cb(data) : null);
    }
}