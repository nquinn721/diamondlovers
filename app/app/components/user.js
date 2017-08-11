import Service from './service';
export default class User{
    static update(){
        console.log('update');
        Service.getUser(user => {
            console.log('update user', user);
            this.user = user
        });
    }   
}