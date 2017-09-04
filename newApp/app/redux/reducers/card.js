const initialState = {
	card: {
		number: '4242424242424242',
		exp_year: '23',
		exp_month: '03',
		cvc: '123'
	},
	addingCard: false,
	addingCardFailed: false,
	settingDefault: false,
	settingDefaultFailed: false,

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
				defaultCard: getDefaultCard(action.data),
				stripeCust: action.data
			}
		case 'ADD_CARD_FAILED':
			return {
				...state,
				addingCard: false,
				addingCardFailed: action.error,
			}
		case 'SET_DEFAULT_CARD':
			return {
				...state,
				settingDefault: true
			}
		case 'SET_DEFAULT_CARD_SUCCESS':
			return {
				...state,
				defaultCard: getDefaultCard(action.data),
				settingDefault: false,
				stripeCust: action.data
			}
		case 'SET_DEFAULT_CARD_FAILED':
			return {
				...state,
				settingDefault: false,
				settingDefaultFailed: action.error
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
				defaultCard: getDefaultCard(action.data),
				deletingCard: false
			}
		case 'DELETE_CARD_FAILED':
			return {
				...state,
				deletingCard: false,
				deletingCardFailed: action.error
			}
		case 'LOGGED_IN':
			return {
				...state,
				defaultCard: getDefaultCard(action.data.stripeCust),
				stripeCust: action.data.stripeCust
			}
		case 'PURCHASE_DIAMONDS':
			return {
				...state,
				purchase: action.data
			}
		case 'CHARGE_CARD':
			return {
				...state,
				chargingCard: true
			}
		case 'CHARGE_CARD_SUCCESS':
			return {
				...state,
				chargingCard: false,
				chargingCardSuccess: true
			}
		case 'CHARGE_CARD_FAILED':
			return {
				...state,
				chargingCard: false,
				chargingCardFailed: true
			}
		case 'RESET_CARD_CHARGING':
			return {
				...state,
				chargingCardSuccess: false
			}
		default:
			return state;
	}

}

const getDefaultCard = (stripeCust) => {
	if(!stripeCust)return false;
	let def = stripeCust.default_source;
	return stripeCust.sources.data.filter(v => v.id === def)[0];
}
