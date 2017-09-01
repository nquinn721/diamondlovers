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