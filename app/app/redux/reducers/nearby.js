const initialState = {
	currentUserIndex: 0,
	currentUser: false,
	users: false,
	allUsers: []
}

export default (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_SEARCH_INDEX_SUCCESS':
			return {
				...state,
				users: action.data,
				allUsers: state.allUsers.push(action.data)
			}
		case 'FETCH_NEARBY':
			return {
				...state,
				fetchingNearby: true
			}
		case 'FETCH_NEARBY_SUCCESS':
			return {
				...state,
				fetchingNearby: false,
				users: action.data,
				allUsers: state.allUsers.concat(action.data)
			}
		case 'FETCH_NEARBY_FAILED':
			return {
				...state,
				fetchingNearby: false,
				fetchingNearbyFailed: action.error
			}
		case 'GET_CURRENT_USER_FAILED':
			return {
				...state,
				getCurrentUserFailed: true
			}
			
		case 'SET_CURRENT_USER':
		console.log('SETTED currentUser');
			console.log(action.data);
			
			return {
				...state,
				currentUser: action.data
			}
		default:
			return state;
	}
}