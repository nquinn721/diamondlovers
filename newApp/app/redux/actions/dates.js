import Service from './service';

export const getDates = () => {
	return (dispatch) => {
		Service.dispatchGet(dispatch, 'dates/get-dates', {
			init: 'GET_DATES',
			success: 'GET_DATES_SUCCESS',
			error: 'GET_DATES_FAILED'
		});	
	}
}
export const setDate = (to, from, location, time, cost) => {
	console.log('set date', to, from, location, time, cost);
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'dates/set-date', {to, from, location, time, cost}, {
			init: 'SET_DATE',
			success: 'SET_DATE_SUCCESS',
			error: 'SET_DATE_FAILED'
		});	
	}
}

export const approveDate = (id) => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'dates/approve-date', {id}, {
			init: 'APPROVE_DATE',
			success: 'APPROVE_DATE_SUCCESS',
			error: 'APPROVE_DATE_FAILED'
		});
		Service.dispatchPost(dispatch, 'chat/create', {id}, {
			init: 'CREATE_CHAT',
			success: 'CREATE_CHAT_SUCCESS',
			error: 'CREATE_CHAT_FAILED'
		});
	}
}

export const confirmShowed = (id) => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'dates/confirm-showed', {id}, {
			init: 'CONFIRM_SHOWED',
			success: 'CONFIRM_SHOWED_SUCCESS',
			error: 'CONFIRM_SHOWED_FAILED'
		});
	}
}