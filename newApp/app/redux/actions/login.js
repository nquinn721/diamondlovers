import Service from './service';

export const login = () => {
	return (dispatch) => {
		dispatch(getUser());
		Service.post('db/login', {email: 'natethepcspecialist@gmail.com', password: 'nate123'})
			.then(user => {
				user.data ? 
					dispatch(getUserSuccess(user.data)) :
					dispatch(getUserFailed(user.error));
			});
	}
}

const getUser = () => ({type: 'LOGGING_IN'});
const getUser404 = () => ({type: 'LOGGED_IN_404'});
const getUserSuccess  = (data) => ({type: 'LOGGED_IN', data});
const getUserFailed = (err) => ({type: 'LOG_IN_FAILED', err});