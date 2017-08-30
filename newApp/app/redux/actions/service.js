import config from 'newApp/app/config/config';

export default class Service{

	static async get(url) {
		let data = await fetch(config.baseUrl + url, {
			type: 'get',
			credentials: 'same-origin'
		});
		let res = this.handleResponse(data);

		return res.json();
	}

	static async post(url, body) {
		let data = await fetch(config.baseUrl + url, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'post',
			body: JSON.stringify(body),
			credentials: 'same-origin'
		});
		let res = this.handleResponse(data);

		return res.json();
	}


	static handleResponse(res) {
		if(res.status !== 404)
			return res;
		return {json: () => ({error: 404})};
	}

}