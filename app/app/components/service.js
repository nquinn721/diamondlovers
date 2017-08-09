export default class Service{
    static events = [];
    static login(formData){
        fetch('http://diamondlovers.herokuapp.com/db/login', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'same-origin'
        }).then(d => d.json()).then(user => {
            this.user = user
            this.emit('loggedin', user);
        });
    }

    static on(event, cb){
        this.events.push({event, cb});
    }

    static emit(event, data){
        this.events.forEach(e => e.event === event ? e.cb(data) : null);
    }
    
}