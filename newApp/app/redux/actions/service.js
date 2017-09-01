import config from 'newApp/app/config/config';
import axios from 'axios';

export default class Service{

	static dispatchPost(dispatch, url, body, types){
		dispatch({type: types.init});
		Service.post(url, body)
			.then(data => {
				data.error ? 
					dispatch({type: types.error, error: data.error}) : 
					dispatch({type: types.success, data: data.data})
			})
	}
	static dispatchGet(dispatch, url, types){
		dispatch({type: types.init});
		Service.get(url)
			.then(data => {
				data.error ? 
					dispatch({type: types.error, error: data.error}) : 
					dispatch({type: types.success, data: data.data})
			})
	}

	static async get(url) {

		try{
			let data = await axios.get(config.baseUrl + url);
			return data.data
		}catch(e){
			return {error: e}
		}
	}

	static async post(url, body) {
		try{
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