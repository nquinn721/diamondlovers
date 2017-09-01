const initialState = {
}


export default (state = initialState, action) => {
	console.log(action.type, action.data);
	
	switch(action.type){
		case 'LOGGED_IN':
			return {
				...state,
				defaultImageId: action.data.client.profile.defaultImage,
				images: sortByDefault(action.data.client.profile.defaultImage, action.data.images),
				defaultImage: getDefaultImage(action.data.client.profile.defaultImage, action.data.images)
			}
		case 'ADD_IMAGE':
			return {
				...state,
				addingImage: true
			}
		case 'ADD_IMAGE_SUCCESS':
			return {
				...state,
				addingImage: false,
				images: action.data
			}
		case 'ADD_IMAGE_WITH_DEFAULT_SUCCESS':
			return {
				...state,
				addingImage: false,
				defaultImageId: action.data.client.profile.defaultImage,
				images: sortByDefault(action.data.client.profile.defaultImage, action.data.images)
			}
		case 'ADD_IMAGE_FAILED':
			return {
				...state,
				addingImage: false,
				addingImageFailed: action.error
			}
		case 'SET_DEFAULT_IMAGE':
			return {
				...state,
				settingDefaultImage: true
			}
		case 'SET_DEFAULT_IMAGE_SUCCESS':
			return {
				...state,
				settingDefaultImage: false,
				defaultImageId: action.data.profile.defaultImage,
				defaultImage: getDefaultImage(action.data.profile.defaultImage, state.images)
			}
		case 'SET_DEFAULT_IMAGE_FAILED':
			return {
				...state,
				settingDefaultImage: false,
				settingDefaultImageFailed: action.error
			}
		case 'DELETE_IMAGE':
			return {
				...state,
				deletingImage: true
			}
		case 'DELETE_IMAGE_SUCCESS':
			return {
				...state,
				deletingImage: false,
				defaultImageId: action.data.client.profile.defaultImage,
				defaultImage: getDefaultImage(action.data.user.profile.defaultImage, state.images),
				images: sortByDefault(action.data.client.profile.defaultImage, action.data.images)
			}
		case 'DELETE_IMAGE_FAILED':
			return {
				...state,
				deletingImage: false,
				deletingImageFailed: action.error
			}
		default:
			return state;
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
    if(img)
	    return {uri: img.url};
}