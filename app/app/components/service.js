import Settings from './settings';
import User from './user';
import fd from 'object-to-formdata';

export default class Service{
    static events = [];
    static login(formData){
        this.post('db/login', fd(formData))
            .then(user => {
                User.login(user);
            }).catch(err => console.log(err));
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
        this.post('app/profile-image-upload', formData).then(user => {
            User.update(user);
            cb();
        });
    }
    static makePicDefault(pic, defaultImage){
        let img = {
            pic, 
            defaultImage : defaultImage ? true : null
        }
        this.post('app/make-image-default', fd({pic})).then((user) => {
            console.log(user);
        })
    }
    /**
     * END IMAGES
     */
    


    /**
     * CARD CALLS
     */
    static addCard(card, cb = function(){}){
        this.post('profile/addCard', fd(card)).then(user => {
            User.update(user);
            cb();
        });
    }
    static removeCard(cardId, cb = function(){}){
        console.log(cardId);
        this.post('profile/removeCard', fd({card: cardId})).then(user => {
            User.update(user);
            cb();
        });
    }
    static setDefaultCard(cardId, cb = function(){}){
        this.post('profile/updateDefaultCard', fd({card: cardId})).then(user => {
            User.update(user);
            cb();
        });
    }
    static chargeCard(amount, cb = function(){}){
        this.post('profile/chargeCard', fd({amount: amount})).then( user => {
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
 
    static post(url, data){
        let promise = fetch(Settings.baseUrl + url, {
            method: 'post',
            body: data,
            credentials: 'same-origin'
        }).then(d => {
            d.json().then(data => promise.resolve(data)).catch(this.emitError.bind(this));

        });
        return promise;
    }
}