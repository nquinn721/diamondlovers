const initialState = {
	card: {
		number: '4242424242424242',
		exp_year: '23',
		exp_month: '03',
		cvc: '123'
	}
}

export default (state = initialState, action) => {
	switch(action.type){
		case 'ADD_CARD':
			return {
				...state,
				addingCard: true
			}
		case 'ADD_CARD_SUCCESS':
			return {
				...state, 
				addingCard: false,
				stripeCust: action.data
			}
		case 'ADD_CARD_FAILED':
			return {
				...state,
				addingCard: false,
				addingCardFailed: true
			}
		case 'SET_DEFAULT_CARD':
			return {
				...state,
				settingDefault: true
			}
		case 'SET_DEFAULT_CARD_SUCCESS':
			return {
				...state,
				settingDefault: false,
				stripeCust: action.data
			}
		case 'SET_DEFAULT_CARD_FAILED':
			return {
				...state,
				settingDefault: false,
				settingDefaultFailed: true
			}
		case 'DELETE_CARD':
			return {
				...state,
				deletingCard: true,
			}
		case 'DELETE_CARD_SUCCESS':
			return {
				...state,
				stripeCust: action.data,
				deletingCard: false
			}
		case 'DELETE_CARD_FAILED':
			return {
				...state,
				deletingCard: false,
				deletingCardFailed: true
			}
		case 'LOGGED_IN':
			return {
				...state,
				stripeCust: action.data.stripeCust
			}
		default:
			return state;
	}

}
