import Settings from './settings';
import User from './user';
import fd from 'object-to-formdata';

export default class Service{
    static events = [];
    static login(formData){
        console.log(formData);
        this.post('db/login', fd(formData), user => {
            User.login(user);
        });
    }

    /**
     * IMAGES
     */
    static uploadImage(uri, cb = function(){}){
        let formData = new FormData();
        formData.append('image', {
            uri: uri,
            type: 'image/jpg',
            name: 'image.jpg'
        });
        this.post('image/profile-image-upload', formData, user => {
            User.update(user);
            cb();
        });
    }
    static makePicDefault(pic){
        this.post('image/make-image-default', fd(pic), (user) => {
            User.update(user);
        })
    }
    static deleteImage(pic){
        this.post('image/delete-image', fd(pic), (user) => {
            User.update(user);
        });
    }
    /**
     * END IMAGES
     */
    


    /**
     * CARD CALLS
     */
    static addCard(card, cb = function(){}){
        this.post('profile/addCard', fd(card), user => {
            User.update(user);
            cb();
        });
    }
    static removeCard(cardId, cb = function(){}){
        console.log(cardId);
        this.post('profile/removeCard', fd({card: cardId}), user => {
            User.update(user);
            cb();
        });
    }
    static setDefaultCard(cardId, cb = function(){}){
        this.post('profile/updateDefaultCard', fd({card: cardId}), user => {
            User.update(user);
            cb();
        });
    }
    static chargeCard(amount, cb = function(){}){
        this.post('profile/chargeCard', fd({amount: amount}),  user => {
            console.log(user); 
        })
    }
    /**
     * END CARD CALLS
     */


    /** 
     * SERVICE CALL DEFAULTS
     */
    static get(url){
        return fetch(Settings.baseUrl + url, {
            method: 'get',
            credentials: 'same-origin'
        }).then(d => d.json());
    }
    static on(event, cb){
        this.events.push({event, cb});
    }
    static emitError(){
        this.events.forEach(e => e.event === 'network error' ? e.cb() : null);
    }
 
    static post(url, data, cb){
        console.log(data);
        let promise = fetch(Settings.baseUrl + url, {
            method: 'post',
            body: data,
            credentials: 'same-origin'
        }).then(d => {
            d.json().then(data => cb(data)).catch(this.emitError.bind(this));
        }).catch(e => console.log(e));
        return promise;
    }
}
Service.login({email: 'natethepcspecialist@gmail.com', password: 'nate123'});