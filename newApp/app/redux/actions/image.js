import Service from './service';

export const addImage = (token) => {
	return (dispatch) => {
		postToCard(dispatch, 'image/add-profile-image', {token}, {
			init: 'ADD_IMAGE',
			success: 'ADD_IMAGE_SUCCESS',
			error: 'ADD_IMAGE_FAILED'
		});	
	}
}

export const setDefaultImage = (card) => {
	return (dispatch) => {
		postToCard(dispatch, 'image/set-default-image', {card}, {
			init: 'SET_DEFAULT_IMAGE',
			success: 'SET_DEFAULT_IMAGE_SUCCESS',
			error: 'SET_DEFAULT_IMAGE_FAILED'
		});
	}
}

export const deleteImage = (card) => {
	return (dispatch) => {
		postToCard(dispatch, 'iamge/delete-image', {card}, {
			init: 'DELETE_IMAGE',
			success: 'DELETE_IMAGE_SUCCESS',
			error: 'DELETE_IMAGE_FAILED'
		});
	}
}


const postToImage = (dispatch, url, body, types) => {
	dispatch({type: types.init});
	Service.post(url, body)
		.then(data => {
				data.error ? 
					dispatch({type: types.error, err}) : 
					dispatch({type: types.success, data: data.data})
			})

};

