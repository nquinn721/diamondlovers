import Service from './service';
export default class User{
    static update(){
        Service.getUser(user => this.user = user);
    }   
}