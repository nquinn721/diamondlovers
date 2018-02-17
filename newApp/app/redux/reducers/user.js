const initialState = {
	user: false,
	isFetching: false,
	error: false,
	notFound: false,
	addingCard: false
}


export default (state = initialState, action) => {
	
	switch(action.type){
		case 'CHECKING_LOGGED':
			return {
				...state,
				isFetching: true,
				checkingLoggedIn: true
			}
		case 'NOT_LOGGED_IN':{
			return {
				...state,
				isFetching: false,
				notLoggedIn: true,
				checkingLoggedIn: false
			}
		}
		case 'LOGGING_IN': 
			return {
				...state,
				loggingIn: true,
				checkingLoggedIn: false,
				user: false
			}
		case 'LOGGED_IN':
			return {
				...state,
				isFetching: false,
				loggingIn: false,
				isLoggedIn: true,
				checkingLoggedIn: false,
				user: action.data.client
			}
		
		case 'LOG_IN_FAILED':
			return {
				...state,
				isFetching: false,
				error: action.error
			}
		case 'LOGGED_IN_404':
			return {
				...state,
				isFetching: false,
				loggingIn: false,
				notFound: true
			}
		case 'ADD_IMAGE_WITH_DEFAULT_SUCCESS':
			return {
				...state,
				user: action.data.client
			}
		case 'DELETE_IMAGE_SUCCESS':
			return {
				...state,
				user: action.data.client
			}
		case 'SET_DEFAULT_IMAGE_SUCCESS':
			return {
				...state,
				user: action.data.client
			}
		case 'CHARGE_CARD_SUCCES':
			return {
				...state,
				user: action.data
			}
		case 'UPDATE_PROFILE':
			return {
				...state,
				updatingProfile: true
			}
		case 'UPDATE_PROFILE_SUCCESS':
			return {
				...state,
				updatingProfile: false,
				user: action.data
			}
		case 'UPDATE_PROFILE_FAILED':
			return {
				...state,
				updatingProfile: false,
				updatingProfileFailed: true
			}

		case 'REGISTERING':
			return {
				...state,
				registering: true
			}
		case 'REGISTERED':
			return {
				...state,
				registering: false,
				user: action.data
			}
		case 'REGISTER_FAILED':
			return {
				...state,
				registering: false,
				error: action.error
			}
		default:
			return state;
	}
}
