import Service from './service';

export const getNearby = () => {
	return (dispatch) => {
		Service.dispatchGet(dispatch, 'user/get-nearby', {
			init: 'FETCH_NEARBY',
			success: 'FETCH_NEARBY_SUCCESS',
			error: 'FETCH_NEARBY_FAILED'
		});	
	}
}

export const setCurrentUser = (user) => {
	return (dispatch) => {
		dispatch({type: 'SET_CURRENT_USER', data: user});
	}
}

export const getCurrentUser = (id) => {
	console.log('GETTING CURRENT USER', id);
	
	return (dispatch) => {
		Service.dispatchGet(dispatch, `user/get-user/${id}`, {
			init: 'FETCH_CURRENT_USER',
			success: 'SET_CURRENT_USER',
			error: 'GET_CURRENT_USER_FAILED'
		});
	}
}