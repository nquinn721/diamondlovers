const initialState = {
	
}

export default (state = initialState, action) => {
	switch(action.type){
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
		default:
			return state;
	}
}