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
		try{
			console.log('post to ', url, body);
			
			let data = await axios.post(config.baseUrl + url, body);
			
			return data.data;
		}catch(e) {
			return {error: e};			
		}

		
		
	}


	static handleResponse(res) {
		if(res.status !== 404)
			return res;
		return {json: () => ({error: 404})};
	}

}