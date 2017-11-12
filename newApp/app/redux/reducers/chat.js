const initialState = {
	sending: false,
	messages: []
}

export default (state = initialState, action) => {
	switch(action.type){
		case 'SENDING_MESSAGE':
			return {
				sending: true,
				...state
			}
		case 'MESSAGE_SENT':
			return {
				sending: false,
				message: action.data,
				...state
			}
		case 'MESSAGE_FAILED':
			return {
				sending: false,
				error: action.error,
				...state
			}
		default:
			return state;
	}
}
