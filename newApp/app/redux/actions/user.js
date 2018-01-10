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

export const updateSearchIndex = () => {
	return (dispatch) => {
		Service.dispatchGet(dispatch, 'user/update-search-index', {
			init: 'UPDATE_SEARCH_INDEX',
			success: 'UPDATE_SEARCH_INDEX_SUCCESS',
			error: 'UPDATE_SEARCH_INDEX_FAILED'
		});
	}
}


