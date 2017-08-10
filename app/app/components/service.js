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

    static uploadImage(uri){
        console.log('uplaoding', uri);
        fetch('http://diamondlovers.herokuapp.com/app/profile-image-upload', {
            method: 'post',
            body: JSON.stringify({image: uri}),
            credentials: 'same-origin'
        })
    }

    static on(event, cb = function(){}){
        this.events.forEach(e => e.event === event ? cb(e.data) : null);
        this.events.push({event, cb});
    }

    static emit(event, data){
        this.events.forEach(e => e.event === event ? e.data = data && e.cb(data) : null);
    }
    
}