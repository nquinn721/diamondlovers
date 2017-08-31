const initialState = {
}


export default (state = initialState, action) => {
	
	switch(action.type){
		case 'LOGGED_IN':
			return {
				...state,
				images: action.data.images
			}
		default:
			return state;
	}
}
