import Service from './service';

export const addImage = (uri, defaultImage) => {
	let formData = new FormData();
    formData.append('image', {
        uri: uri,
        type: 'image/' + uri.split('.')[1],
        name: 'image.' + uri.split('.')[1]
    });

    if(defaultImage)
    	formData.append('defaultImage', true);
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'image/add-profile-image', formData, {
			init: 'ADD_IMAGE',
			success: defaultImage ? 'ADD_IMAGE_WITH_DEFAULT_SUCCESS' : 'ADD_IMAGE_SUCCESS',
			error: 'ADD_IMAGE_FAILED'
		});	
	}
}

export const setDefaultImage = (image) => {
	console.log('in set default image', image);
	
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'image/set-default-image', {image}, {
			init: 'SET_DEFAULT_IMAGE',
			success: 'SET_DEFAULT_IMAGE_SUCCESS',
			error: 'SET_DEFAULT_IMAGE_FAILED'
		});
	}
}

export const deleteImage = (public_id) => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'image/delete-image', {public_id}, {
			init: 'DELETE_IMAGE',
			success: 'DELETE_IMAGE_SUCCESS',
			error: 'DELETE_IMAGE_FAILED'
		});
	}
}
