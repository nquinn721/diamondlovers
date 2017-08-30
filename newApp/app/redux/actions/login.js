import Service from './service';

export const login = () => {
	return (dispatch) => {
		dispatch(getUser());
			Service.post('db/login', {email: 'natethepcspecialist@gmail.com', password: 'nate123'})
			.then(user => user.error ? dispatch(getUser404(user)) : dispatch(getUserSuccess(user.data)))		
			.catch(err => dispatch(getUserFailed(err)));
	}
}

const getUser = () => ({type: 'LOGGING_IN'});
const getUser404 = () => ({type: 'LOGGED_IN_404'});
const getUserSuccess  = (data) => ({type: 'LOGGED_IN', data});
const getUserFailed = (err) => ({type: 'LOG_IN_FAILED', err});