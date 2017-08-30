const initialState = {
	user: false,
	isFetching: false,
	error: false,
	notFound: false,
	gettingCard: false
}


export default (state = initialState, action) => {
	console.log(action.type, action.data);
	
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
		case 'LOGGED_IN_404':
			return {
				...state,
				isFetching: false,
				notFound: true
			}
		case 'ADD_CARD':
			return {
				...state,
				gettingCard: true
			}
		case 'ADD_CARD_SUCCESS':
			return {
				...state, 
				gettingCard: false,
				user: action.data
			}
		default:
			return state;
	}
}
