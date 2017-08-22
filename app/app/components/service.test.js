import Service from './service';
import User from './user';

it('Logs the user in', () => {
	Service.login({email: 'natethepcspecialist@gmail.com', password: 'nate123'}, () => {
	  // expect(User.client).toBeTruthy();
	  console.log('WOEIFJWEOFIJ');
		
	})
});

it('')