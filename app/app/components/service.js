import Settings from './settings';
import User from './user';
import formData from 'object-to-formdata';

export default class Service{
    static login(formData){
        this.post('db/login', formData(formData))
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
        this.post('app/profile-image-upload', formData).then(User.update.bind(User));
    }
    
    static getUser(cb = function(){}){ 
        this.get('profile/user').then(User.update.bind(User));
    }


    /**
     * CARD CALLS
     */
    static addCard(card, cb = function(){}){
        this.post('profile/addCard', formData(card)).then(user => {
            User.update(user);
            cb();
        });
    }
    static removeCard(cardId, cb = function(){}){
        console.log(cardId);
        this.post('profile/removeCard', formData({card: cardId})).then(user => {
            User.update(user);
            cb();
        });
    }
    static setDefaultCard(cardId, cb = function(){}){
        this.post('profile/updateDefaultCard', formData({card: cardId})).then(user => {
            User.update(user);
            cb();
        });
    }
    static chargeCard(amount, cb = function(){}){
        this.post('profile/chargeCard', formData({amount: amount})).then( user => {
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

    static post(url, data){
        return fetch(Settings.baseUrl + url, {
            method: 'post',
            body: data,
            credentials: 'same-origin'
        }).then(d => d.json());
    }
}