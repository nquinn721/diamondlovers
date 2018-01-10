const initialState = {
	currentUserIndex: 0
}

export default (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_SEARCH_INDEX_SUCCESS':
			return {
				...state,
				users: action.data
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
				users: action.data
			}
		case 'FETCH_NEARBY_FAILED':
			return {
				...state,
				fetchingNearby: false,
				fetchingNearbyFailed: action.error
			}
		case 'SET_CURRENT_USER':
			return {
				...state,
				currentUser: action.data
			}
		default:
			return state;
	}
}