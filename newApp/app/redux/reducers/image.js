const initialState = {
}


export default (state = initialState, action) => {
	console.log(action.type, action.data);
	
	switch(action.type){
		case 'LOGGED_IN':
			return updatedImageData(state, action);
		case 'ADD_IMAGE':
			return {
				...state,
				addingImage: true
			}
		case 'ADD_IMAGE_SUCCESS':
			return updatedImageData(state, action);
		case 'ADD_IMAGE_WITH_DEFAULT_SUCCESS':
			return updatedImageData(state, action);
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
			return updatedImageData(state, action);
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
			return updatedImageData(state, action);
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

updatedImageData = (state, action) => {
	let obj = {
		...state,
		addingImage: false,
		defaultImageId: action.data.client.profile.defaultImage,
		defaultImage: getDefaultImage(action.data.client.profile.defaultImage, action.data.images),
		images: sortByDefault(action.data.client.profile.defaultImage, action.data.images)
	}
	console.log('*');
	console.log('*');
	console.log('*');
	console.log('*');
	
	console.log(obj);
	return obj;
}
sortByDefault = (di, images) => {
	let imgs = [];
    if(di && images.length){
      	di = di.toString();
       	images.forEach(img => img._id.toString() === di ? imgs.unshift(img) : imgs.push(img))
    }else{
    	imgs = images;
    }
    return imgs;
}
getDefaultImage = (di, images) => {
	let img;
    if(di && images.length){
      	di = di.toString();
       	images.forEach(image => image._id.toString() === di ? img = image : null);
    }else if(!di && images.length === 1){
    	return {uri: images[0].url};
    }
    if(img)
	    return {uri: img.url};
}