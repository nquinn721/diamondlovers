const initialState = {
	sending: false,
	messages: []
}

export default (state = initialState, action) => {
	console.log(action.type, action);
	
	switch(action.type){
		case 'CURRENT_CHAT':
			return {
				currentChat: action.chatId,
				...state
			}
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

		case 'GETTING_MESSAGES':
			return {
				gettingMessages: true,
				...state
			}
		case 'MESSAGES_RECIEVED':
			return {
				gettingMessages: false,
				messages: action.data,
				...state
			}
		case 'GET_MESSAGES_FAILED':
			return {
				gettingMessages: false,
				gettingMessagesFailed: true,
				...state
			}
		default:
			return state;
	}
}
