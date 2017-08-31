const initialState = {
	user: false,
	isFetching: false,
	error: false,
	notFound: false,
	addingCard: false
}


export default (state = initialState, action) => {
	
	switch(action.type){
		case 'LOGGING_IN': 
			return {
				...state,
				isFetching: true,
				user: false
			}
		case 'LOGGED_IN':
			return {
				...state,
				isFetching: false,
				user: action.data.client
			}
		case 'LOG_IN_FAILED':
			return {
				...state,
				isFetching: false,
				error: action.err
			}
		case 'LOGGED_IN_404':
			return {
				...state,
				isFetching: false,
				notFound: true
			}
		case 'ADD_IMAGE_WITH_DEFAULT_SUCCESS':
			return {
				...state,
				user: action.data.client
			}
		
		default:
			return state;
	}
}
