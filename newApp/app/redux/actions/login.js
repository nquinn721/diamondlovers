import Service from './service';

export const login = (email, password) => {
	console.log('logging in with email and password', email, password);
	
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'db/login', {email, password}, {
		// Service.dispatchPost(dispatch, 'db/login', {email: 'bob@bob.com', password: 'bob123'}, {
		// Service.dispatchPost(dispatch, 'db/login', {email: 'natethepcspecialist@gmail.com', password: 'nate123'}, {
		// Service.dispatchPost(dispatch, 'db/login', {email: 'jessica@gmail.com', password: 'jessica123'}, {
			init: 'LOGGING_IN',
			success: 'LOGGED_IN',
			error: 'LOG_IN_FAILED'
		})

	}
}

export const register = (email, password, displayName) => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'db/register', {email, password, displayName}, {
			init: 'REGISTERING',
			success: 'REGISTERED',
			error: 'REGISTER_FAILED'
		})
	}
}

 