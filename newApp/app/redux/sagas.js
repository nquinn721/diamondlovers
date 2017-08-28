import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { axios } from 'axios';

// export function* getNearbyUsers(ction) {
// 	try {
// 		const response = yeild call(axios.get, 'https://jsonplaceholder.typicode.com/posts');
// 		yeild put({type: 'FETCHING_USERS_SUCCESS', users: response.data});
// 	} catch(e) {
// 		console.log('failed to get user data');
		
// 		console.log(e);
// 	}
// }

export function* watchGetUsers() {
	console.log('watching');
	
	// yeild takeEvery('FETCHING_USERS', getNearbyUsers);
}

export default function rootSaga() {
	yeild [
		watchGetUsers()
	]
}