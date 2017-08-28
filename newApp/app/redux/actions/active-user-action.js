export const selectUser = (user) => {
	console.log('select user', user);
	
	return {
		type: 'USER_SELECTED',
		payload: user
	}
}