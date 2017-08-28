import config from 'newApp/app/config/config';
import fd from 'object-to-formdata';

export const login = () => {
	return (dispatch) => {
		console.log(config.baseUrl + 'db/login');
		dispatch(getUsers());
		fetch(config.baseUrl + 'db/login', {
			type: 'post',
			data: fd({email: 'natethepcspecialist@gmail.com', password: 'nate123'}),
			credentials: 'same-origin'
		})
			.then(d => d.json())
			.then(users => dispatch(getUsersSuccess(users.results)))		
			.catch(err => dispatch(getUsersFailed(err)));
	}
}

const getUsers = () => ({type: 'LOGGING_IN'});
const getUsersSuccess  = (data) => ({type: 'LOGGED_IN', data});
const getUsersFailed = (err) => ({type: 'LOG_IN_FAILED', err});