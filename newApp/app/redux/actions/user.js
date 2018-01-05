import Service from './service';

export const updateProfile = (obj) => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'user/update-profile-field', obj, {
			init: 'UPDATE_PROFILE',
			success: 'UPDATE_PROFILE_SUCCESS',
			error: 'UPDATE_PROFILE_FAILED'
		});	
	}
}


