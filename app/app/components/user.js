import Service from './service';
export default class User{
    static update(user){
        this.user = user.user;
        console.log('update');
        // Service.getUser(user => {
        //     console.log('update user', user);
        //     this.user = user
        // });
    }   
}