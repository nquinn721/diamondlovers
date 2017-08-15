import Settings from './settings';
import User from './user';

export default class Service{
    static events = [];
    static login(formData){

        this.post(`db/login`, this.formData(formData))
            .then(user => {
                User.user = user;
                this.emit('loggedin', user);
            }).catch(err => console.log(err));
        
    }

    static uploadImage(uri){
        let formData = new FormData();
        formData.append('image', {
            uri: uri,
            type: 'image/jpg',
            name: 'image.jpg',
        });
        this.post(`app/profile-image-upload`, formData).then(User.update.bind(User));
    }
    static addCard(card){
        this.post(`profile/addCard`, this.formData(card)).then(User.update.bind(User));
    }
    static getUser(cb = function(){}){ 
        this.get(`profile/user`).then(User.update.bind(User));
    }

    static get(url){
        return fetch(Settings.baseUrl + url, {
            method: 'get',
            credentials: 'same-origin'
        }).then(d => d.json());
    }

    static post(url, data){
        return fetch(Settings.baseUrl + url, {
            method: 'post',
            body: data,
            credentials: 'same-origin'
        }).then(d => d.json());
    }
    static formData(data){
        let fd = new FormData();
        for(let i in data)
            fd.append(i, data[i]);
        return fd;
    }
    static handleError(e){
        console.log(e);
    }

    static on(event, cb = function(){}){
        this.events.forEach(e => e.event === event ? cb(e.data) : null);
        this.events.push({event, cb});
    }

    static emit(event, data){
        this.events.forEach(e => e.event === event ? e.data = data && e.cb(data) : null);
    }
    
}