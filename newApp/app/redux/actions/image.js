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
		postToImage(dispatch, 'image/add-profile-image', formData, {
			init: 'ADD_IMAGE',
			success: defaultImage ? 'ADD_IMAGE_WITH_DEFAULT_SUCCESS' : 'ADD_IMAGE_SUCCESS',
			error: 'ADD_IMAGE_FAILED'
		});	
	}
}

export const setDefaultImage = (image) => {
	return (dispatch) => {
		postToImage(dispatch, 'image/set-default-image', {image}, {
			init: 'SET_DEFAULT_IMAGE',
			success: 'SET_DEFAULT_IMAGE_SUCCESS',
			error: 'SET_DEFAULT_IMAGE_FAILED'
		});
	}
}

export const deleteImage = (public_id) => {
	return (dispatch) => {
		postToImage(dispatch, 'image/delete-image', {public_id}, {
			init: 'DELETE_IMAGE',
			success: 'DELETE_IMAGE_SUCCESS',
			error: 'DELETE_IMAGE_FAILED'
		});
	}
}

export const sortByDefault = (userDefaultImage, images) => {
	let imgs = [];
	let di = userDefaultImage;
    if(di && images){
      di = di.toString();
       images.forEach(img => img._id.toString() === di ? imgs.unshift(img) : imgs.push(img))
    }else{
    	imgs = images;
    }
    return imgs;
}

export const getDefaultImage = (userDefaultImage, images) => {
	let img;
	let di = userDefaultImage;
    if(di && images){
      di = di.toString();
       images.forEach(image => image._id.toString() === di ? img = image : null);
    }
    return img;
}


const postToImage = (dispatch, url, body, types) => {
	dispatch({type: types.init});
	Service.post(url, body)
		.then(data => {
				data.error ? 
					dispatch({type: types.error, error: data.error}) : 
					dispatch({type: types.success, data: data.data})
			})
		

};

