export const userServiceCall = () => {
	return (dispatch) => {
		dispatch(getUsers());
		fetch('https://swapi.co/api/people')
			.then(d => d.json())
			.then(users => dispatch(getUsersSuccess(users.results)))		
			.catch(err => dispatch(getUsersFailed(err)));
	}
}

const getUsers = () => ({type: 'FETCHING_USERS'});
const getUsersSuccess  = (data) => ({type: 'FETCHING_USERS_SUCCESS', data});
const getUsersFailed = (err) => ({type: 'FETCHING_USERS_FAILED', err});