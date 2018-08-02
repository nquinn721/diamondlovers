const initialState = {
	
}

export default (state = initialState, action) => {
	switch(action.type){
		case 'GET_YELP':
			return {
				...state,
				fetchingYelp: true
			}
		case 'GET_YELP_SUCCESS':
			return {
				...state,
				fetchingYelp: false,
				data: action.data
			}
		case 'GET_YELP_FAILED':
			return {
				...state,
				fetchingYelp: false,
				fetchingYelpFailed: action.error
			}
		default:
			return state;
	}
}