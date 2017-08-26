import { FETCHING_USERS, FETCHING_USERS_SUCCESS, FETCHING_USERS_FAILURE } from '../config/constants';

const initialState = {
	users: [],
	isFetching: false,
	error: false
}

export default function userReducer(state = initialState, action) {
	switch(action.type){
		case FETCHING_USERS:
			return {
				...state,
				isFetching: true,
				users: []
			}
		case FETCHING_USERS_SUCCESS:
			return {
				...state,
				isFetching: false,
				users: action.data
			}
		case FETCHING_USERS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			}
		default:
			return state;
	}
}
