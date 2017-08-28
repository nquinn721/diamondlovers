const initialState = {
	user: false,
	isFetching: false,
	error: false
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
				user: action.data
			}
		case 'LOG_IN_FAILED':
			return {
				...state,
				isFetching: false,
				error: action.err
			}
		default:
			return state;
	}
}
