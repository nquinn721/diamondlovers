const initialState = {
}


export default (state = initialState, action) => {
	switch(action.type){
		case 'LOGGED_IN':
			return {
				...state,
				images: action.data.images
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
				images: action.data.images
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
				settingDefaultImage: false
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
				images: action.data
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
