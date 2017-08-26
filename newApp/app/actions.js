import { FETCHING_USERS, FETCHING_USERS_SUCCESS, FETCHING_USERS_FAILURE } from './config/constants';

export function fetchUsers() {
	return (dispatch) => {
		dispatch(getUsers());
		fetch('https://swapi.co/api/people')
			.then(d => d.json())
			.then(json => dispatch(getUsersSuccess(json.results)))
			.catch(err => dispatch(getUsersFailure(err)));
	}
}

function getUsers(){
	return {
		type: FETCHING_USERS
	}
}

function getUsersSuccess(data) {
	return {
		type: FETCHING_USERS_SUCCESS,
		data
	}
}

function getUsersFailure() {
	return {
		type: FETCHING_USERS_FAILURE
	}
}