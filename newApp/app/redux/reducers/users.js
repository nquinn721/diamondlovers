const initialState = {
	users: [],
	isFetching: false,
	error: false
}


export default (state = initialState, action) => {
	switch(action.type){
		case 'FETCHING_USERS': 
			return {
				...state,
				isFetching: true,
				users: []
			}
		case 'FETCHING_USERS_SUCCESS':
			return {
				...state,
				isFetching: false,
				users: action.data
			}
		case 'FETCHING_USERS_FAILED':
			return {
				...state,
				isFetching: false,
				error: action.err
			}
		default:
			return state;
	}
}
