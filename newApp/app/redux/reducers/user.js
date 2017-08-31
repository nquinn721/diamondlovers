const initialState = {
	user: false,
	isFetching: false,
	error: false,
	notFound: false,
	addingCard: false
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
				addingCard: true
			}
		case 'ADD_CARD_SUCCESS':
			return {
				...state, 
				addingCard: false,
				user: action.data
			}
		case 'ADD_CARD_FAILED':
			return {
				...state,
				addingCard: false,
				addingCardFailed: true
			}
		case 'SET_DEFAULT_CARD':
			return {
				...state,
				settingDefault: true
			}
		case 'SET_DEFAULT_CARD_SUCCESS':
			return {
				...state,
				settingDefault: false,
				user: action.data
			}
		case 'SET_DEFAULT_CARD_FAILED':
			return {
				...state,
				settingDefault: false,
				settingDefaultFailed: true
			}
		case 'DELETE_CARD':
			return {
				...state,
				deletingCard: true,
			}
		case 'DELETE_CARD_SUCCESS':
			return {
				...state,
				user: action.data,
				deletingCard: false
			}
		case 'DELETE_CARD_FAILED':
			return {
				...state,
				deletingCard: false,
				deletingCardFailed: true
			}
		default:
			return state;
	}
}
