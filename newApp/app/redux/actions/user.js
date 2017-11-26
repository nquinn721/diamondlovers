import Service from './service';

export const updateProfile = (field, value) => {
	
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'user/update-profile-field', {field, value}, {
			init: 'UPDATE_PROFILE',
			success: 'UPDATE_PROFILE_SUCCESS',
			error: 'UPDATE_PROFILE_FAILED'
		});	
	}
}


