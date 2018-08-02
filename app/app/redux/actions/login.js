import Service from './service';

export const login = (email, password) => {
	console.log('logging in with email and password', email, password);
	
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'db/login', {email, password}, {
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

export const checkLoggedIn = () => {
	return (dispatch) => {
		Service.dispatchGet(dispatch, 'db/check-logged', {
			init: 'CHECKING_LOGGED',
			success: 'LOGGED_IN',
			error: 'NOT_LOGGED_IN'
		})
	}
}

export const logout = () => {
	return (dispatch) => {
		Service.dispatchGet(dispatch, 'db/logout', {
			init: 'LOGOUT'
		})
	}
}
