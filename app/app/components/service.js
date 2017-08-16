import Settings from './settings';
import User from './user';
// import ObjectToFormData from 'object-to-formdata';
const objectToFormData = require('object-to-formdata');

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
        this.post(`profile/addCard`, objectToFormData(card)).then((user) => {
            User.update(user);
        });
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
    static formData(obj, form, namespace){
        let fd = form || new FormData();
        let formKey;
        
        for(let property in obj) {
            if(obj.hasOwnProperty(property) && obj[property]) {
            if (namespace) {
                formKey = namespace + '[' + property + ']';
            } else {
                formKey = property;
            }
            
            // if the property is an object, but not a File, use recursivity.
            if (obj[property] instanceof Date) {
                fd.append(formKey, obj[property].toISOString());
            }
            else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                this.formData(obj[property], fd, formKey);
            } else { // if it's a string or a File object
                fd.append(formKey, obj[property]);
            }
            }
        }
        
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