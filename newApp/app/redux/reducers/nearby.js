const initialState = {
	
}

export default (state = initialState, action) => {
	console.log(action);
	
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
		console.log('returning failed');
		
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