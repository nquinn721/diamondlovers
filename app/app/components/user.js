import Service from './service';

export default class User{
    static events = [];
    static update(user){
        this.user = user.user || user;
        this.emit('update', this.user);
    }   
    static on(component, event, cb = function(){}){

        this.events.push({component, event, cb});
    }
    static emit(event, data){
        this.events.forEach(e => e.event === event ? e.data = data && e.cb(data) : null);
    }

    static off(component, event){
        for(let i = 0; i < this.events.length; i++){
            let event = this.events[i];
            if(event.component === component && event.event === event){
                this.events.splice(i, 1);
                break;
            }
        }
            
    }
}