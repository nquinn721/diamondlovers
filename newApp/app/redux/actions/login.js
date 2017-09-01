import Service from './service';

export const login = () => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'db/login', {email: 'natethepcspecialist@gmail.com', password: 'nate123'}, {
			init: 'LOGGING_IN',
			success: 'LOGGED_IN',
			error: 'LOG_IN_FAILED'
		})

	}
}

 