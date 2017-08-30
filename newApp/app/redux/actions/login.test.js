import {login} from './login';
import axios from 'axios';
const http = require('http');

function request(url) {
  return new Promise(resolve => {
    // This is an example of an http request, for example to fetch
    // user data from an API.
    // This module is being mocked in __mocks__/request.js
    http.get('https://jsonplaceholder.typicode.com', response => {
    	console.log(response);
    	
      let data = '';
      response.on('data', _data => data += _data);
      response.on('end', () => resolve(data));
    });
  });
}
it('should login', (done) => {
	return request().then(d => {
		console.log(d);
		
	})
})