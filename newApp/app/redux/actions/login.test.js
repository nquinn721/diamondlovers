import Service from './service';

it('should login', (done) => {
  Service.post({email: 'natethepcspecialist@gmail.com', password: 'nate123'})
    .then(user => {
      console.log(user);
      done();
      
    })
})