import config from 'newApp/app/config/config';

export const login = () => {
	return (dispatch) => {
		console.log(config.baseUrl + 'db/login');
		dispatch(getUser());
		fetch(config.baseUrl + 'db/login', {
			type: 'post',
			data: JSON.stringify({email: 'natethepcspecialist@gmail.com', password: 'nate123'}),
			credentials: 'same-origin'
		})
			.then(handleResponse)
			.then(d => d.json())
			.then(user => user.error ? dispatch(getUser404(user)) : dispatch(getUserSuccess(user)))		
			.catch(err => dispatch(getUserFailed(err)));
	}
}

function handleResponse(res) {
	if(res.status !== 404)
		return res;
	return {json: () => ({error: 404})};
}

const getUser = () => ({type: 'LOGGING_IN'});
const getUser404 = () => ({type: 'LOGGED_IN_404'});
const getUserSuccess  = (data) => ({type: 'LOGGED_IN', data});
const getUserFailed = (err) => ({type: 'LOG_IN_FAILED', err});