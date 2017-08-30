import config from 'newApp/app/config/config';
import axios from 'axios';

export default class Service{

	static async get(url) {
		let data = await axion.get(config.baseUrl + url, {
			type: 'get',
			credentials: 'same-origin'
		});
		let res = this.handleResponse(data);

		return res.json();
	}

	static async post(url, body) {
		console.log(body);

		let data = await axios.post(config.baseUrl + url,{
			// headers: {
			// 	'Accept': 'application/json',
			// 	'Content-Type': 'application/json'
			// },
			// method: 'post',
			data: body,
			credentials: 'same-origin'
		});
		
		let res = this.handleResponse(data);
		console.log(res);
		
		return res.json();
	}


	static handleResponse(res) {
		if(res.status !== 404)
			return res;
		return {json: () => ({error: 404})};
	}

}