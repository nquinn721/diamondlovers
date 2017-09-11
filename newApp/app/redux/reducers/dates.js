const initialState = {
	dates: [],
	pendingDates: [],
	approvedDates: [],
	completedDates: []
}

export default (state = initialState, action) => {
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
			return {
				...state,
				...setDates(state.dates.push(action.data)),
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
			return {
				...state,
				...setDates(updateDate(state.dates, action.data)),
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
			return {
				...state,
				...setDates(updateDate(state.dates, action.data)),
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
	return dates.forEach( d => {
		if(d._id.toString() === date._id.toString())
			return date;
		return d;
	})	
}