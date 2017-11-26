const initialState = {
	dates: [],
	pendingDates: [],
	approvedDates: [],
	completedDates: []
}

export default (state = initialState, action) => {
	let dates;
	switch(action.type){
		case 'GET_DATES':
			return {
				...state,
				gettingDate: true
			}
		case 'GET_DATES_SUCCESS':
			return {
				...state,
				...setDates(action.data),
				gettingDate: false,
				
			}
		case 'GET_DATES_FAILED':
			return {
				...state,
				gettingDate: false,
				getingDateFailed: action.error
			}
		case 'SET_DATE':
			return {
				...state,
				settingDate: true
			}
		case 'SET_DATE_SUCCESS':
			state.dates.push(action.data);
			return {
				...state,
				...setDates(state.dates),
				settingDate: false
			}
		case 'SET_DATE_FAILED':
			return {
				...state,
				settingDate: false,
				settingDateFailed: action.error
			}

		case 'APPROVE_DATE':

			return {
				...state,
				agreeingToDate: true
			}
		case 'APPROVE_DATE_SUCCESS':
			dates = updateDate(state.dates, action.data);
			return {
				...state,
				...setDates(dates),
				agreeingToDate: false
			}
		case 'APPROVE_DATE_FAILED':
			return {
				...state,
				agreeingToDate: false,
				agreeingToDateFailed: action.error
			}

		case 'CONFIRM_SHOWED':
			return {
				...state,
				confirmingDate: true,
			}
		case 'CONFIRM_SHOWED_SUCCESS':
			dates = updateDate(state.dates, action.data);
			return {
				...state,
				...setDates(dates),
				confirmingDate: false
			}
		case 'CONFIRM_SHOWED_FAILED':
			return {
				...state,
				confirmingDate: false,
				confirmingDateFailed: action.error
			}
		default:
			return state;
	}
}
const setDates = (data) => {
	return {
		dates: data,
		pendingDates: data.filter(d => d.status === 'pending'),
		approvedDates: data.filter(d => d.status === 'approved'),
		completedDates: data.filter(d => d.status === 'completed')
	}
}

const updateDate = (dates, date) => {
	return dates.map( d => {
		if(d._id === date._id)
			return date;
		return d;
	})	
}