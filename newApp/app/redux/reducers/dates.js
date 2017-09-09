const initialState = {
	dates: []
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
				gettingDate: false,
				dates: action.data
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
				settingDate: false,
				dates: state.dates.push(action.data)
			}
		case 'SET_DATE_FAILED':
			return {
				...state,
				settingDate: false,
				settingDateFailed: action.error
			}

		case 'AGREE_TO_DATE':

			return {
				...state,
				agreeingToDate: true
			}
		case 'AGREE_TO_DATE_SUCCESS':
			return {
				...state,
				agreeingToDate: false,
				dates: updateDate(state.dates, action.data)
			}
		case 'AGREE_TO_DATE_FAILED':
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
				confirmingDate: false,
				dates: updateDate(state.dates, action.data)
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

const updateDate = (dates, date) => {
	return dates.forEach( d => {
		if(d._id.toString() === date._id.toString())
			return date;
		return d;
	})	
}