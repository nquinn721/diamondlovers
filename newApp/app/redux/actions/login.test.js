import {login} from './login';
import axios from 'axios';

it('should login', (done) => {
	// login()(function(res){
	return axios.post({
		headers: {
			'Content-Type': 'application/json'
		},
		url: 'http://dlovers.herokuapp.com/db/login', 
		body: {email: 'natethepcspecialist@gmail.com', password: 'nate123'},
		withCredentials: true
	}).then(d => {
			console.log(d);
			
		})
		// console.log(res);
	// })
})