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
export const setDate = () => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'dates/get-dates', {to, from, location, time} {
			init: 'SET_DATE',
			success: 'SET_DATE_SUCCESS',
			error: 'SET_DATE_FAILED'
		});	
	}
}

export const agreeToDate = (id) => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, 'dates/agree-to-date', {id}, {
			init: 'AGREE_TO_DATE',
			success: 'AGREE_TO_DATE_SUCCESS',
			error: 'AGREE_TO_DATE_FAILED'
		});
	}
}

export const confirmShowed = (id) => {
	return (dispatch) => {
		Service.dispatchPost(dispatch, {id}, 'dates/confirm-showed', {
			init: 'CONFIRM_SHOWED',
			success: 'CONFIRM_SHOWED_SUCCESS',
			error: 'CONFIRM_SHOWED_FAILED'
		});
	}
}