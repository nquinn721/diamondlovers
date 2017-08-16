import Service from './service';

export default class User{
    static update(user){
        this.user = user.user || user;
    }   
}